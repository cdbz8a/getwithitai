<?php
// Follow-along: the instructor posts their position, students read it every few seconds.
declare(strict_types=1);
require __DIR__ . '/private/lib.php';
security_headers();
$role = role();
if ($role === null) json_out(['error' => 'signed out'], 401);

$file = PRIV . '/state.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($role !== 'instructor') json_out(['error' => 'instructor only'], 403);
    if (!check_csrf((string) ($_POST['csrf'] ?? ''))) json_out(['error' => 'bad token'], 403);
    $m = filter_var($_POST['m'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 0, 'max_range' => 99]]);
    $p = filter_var($_POST['p'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 0, 'max_range' => 99]]);
    if ($m === false || $p === false) json_out(['error' => 'bad position'], 400);
    $state = ['m' => $m, 'p' => $p, 't' => (int) round(microtime(true) * 1000)];
    if (!write_json($file, $state)) json_out(['error' => 'could not save'], 500);
    json_out($state);
}

$state = read_json($file);
json_out($state ?: ['m' => 0, 'p' => 0, 't' => 0]);
