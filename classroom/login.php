<?php
// Handles the classroom code form.
declare(strict_types=1);
require __DIR__ . '/private/lib.php';
security_headers();
start_session();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Location: ./'); exit; }

$fail = function (string $why) {
    $_SESSION['login_error'] = $why;
    header('Location: ./');
    exit;
};

if (!check_csrf((string) ($_POST['csrf'] ?? ''))) $fail('Your session timed out. Try again.');
if (too_many_attempts()) $fail('Too many tries. Wait 15 minutes and try again.');

$code = trim((string) ($_POST['code'] ?? ''));
$c = cfg();
$role = null;
if ($code !== '' && hash_equals((string) $c['instructor_code'], $code)) $role = 'instructor';
elseif ($code !== '' && strcasecmp((string) $c['student_code'], $code) === 0) $role = 'student';

if ($role === null) { record_failure(); $fail("That code didn't work. Check it with your instructor."); }
if ($role === 'student' && student_code_expired()) $fail('That class code has expired. Email getwithitai@protonmail.com for help.');

session_regenerate_id(true);
$_SESSION = [
    'role'     => $role,
    'exp'      => time() + ((int) $c['session_hours']) * 3600,
    'code_sig' => hash('sha256', (string) ($role === 'instructor' ? $c['instructor_code'] : $c['student_code'])),
    'csrf'     => bin2hex(random_bytes(32)),
];
header('Location: ./');
