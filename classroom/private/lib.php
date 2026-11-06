<?php
// Shared helpers for the classroom. Loaded by every classroom page.

declare(strict_types=1);

const PRIV = __DIR__;

function cfg(): array {
    static $c = null;
    if ($c === null) $c = require PRIV . '/config.php';
    return $c;
}

function is_https(): bool {
    return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https')
        || (($_SERVER['SERVER_PORT'] ?? '') === '443');
}

function security_headers(): void {
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('Referrer-Policy: same-origin');
    header("Content-Security-Policy: default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'self'; connect-src 'self'; img-src 'self' data:; frame-ancestors 'none'; form-action 'self'; base-uri 'none'");
}

function start_session(): void {
    if (session_status() === PHP_SESSION_ACTIVE) return;
    $hours = (int) (cfg()['session_hours'] ?? 12);
    ini_set('session.use_strict_mode', '1');
    ini_set('session.gc_maxlifetime', (string) ($hours * 3600));
    session_name('gwai_class');
    session_set_cookie_params([
        'lifetime' => $hours * 3600,
        'path'     => '/classroom/',
        'secure'   => is_https(),
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

// Returns "student", "instructor", or null.
function role(): ?string {
    start_session();
    $r = $_SESSION['role'] ?? null;
    $exp = $_SESSION['exp'] ?? 0;
    if (!$r || time() > $exp) return null;
    // a student session ends when the student code expires or changes
    if ($r === 'student') {
        if (student_code_expired()) return null;
        if (($_SESSION['code_sig'] ?? '') !== hash('sha256', (string) cfg()['student_code'])) return null;
    }
    if ($r === 'instructor' && ($_SESSION['code_sig'] ?? '') !== hash('sha256', (string) cfg()['instructor_code'])) return null;
    return $r;
}

function student_code_expired(): bool {
    $d = cfg()['student_expires'] ?? '';
    if ($d === '') return false;
    $end = strtotime($d . ' 23:59:59');
    return $end !== false && time() > $end;
}

function csrf(): string {
    start_session();
    if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(32));
    return $_SESSION['csrf'];
}

function check_csrf(string $t): bool {
    start_session();
    return !empty($_SESSION['csrf']) && hash_equals($_SESSION['csrf'], $t);
}

// Login throttling: 8 failed tries per address per 15 minutes.
function attempts_file(): string { return PRIV . '/attempts.json'; }

function too_many_attempts(): bool {
    $key = hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'x');
    $data = read_json(attempts_file());
    $now = time();
    $list = array_values(array_filter($data[$key] ?? [], fn($t) => $t > $now - 900));
    return count($list) >= 8;
}

function record_failure(): void {
    $key = hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'x');
    $now = time();
    $fh = fopen(attempts_file(), 'c+');
    if (!$fh) return;
    flock($fh, LOCK_EX);
    $raw = stream_get_contents($fh);
    $data = json_decode($raw ?: '{}', true) ?: [];
    // drop anything older than 15 minutes so the file stays small
    foreach ($data as $k => $list) {
        $data[$k] = array_values(array_filter($list, fn($t) => $t > $now - 900));
        if (!$data[$k]) unset($data[$k]);
    }
    $data[$key][] = $now;
    ftruncate($fh, 0);
    rewind($fh);
    fwrite($fh, json_encode($data));
    flock($fh, LOCK_UN);
    fclose($fh);
}

function read_json(string $file): array {
    if (!is_file($file)) return [];
    $raw = @file_get_contents($file);
    return json_decode($raw ?: '[]', true) ?: [];
}

function write_json(string $file, array $data): bool {
    return file_put_contents($file, json_encode($data), LOCK_EX) !== false;
}

function json_out($data, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function h(string $s): string { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }
