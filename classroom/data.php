<?php
// Serves the course to signed-in users only. Students don't get instructor notes.
declare(strict_types=1);
require __DIR__ . '/private/lib.php';
security_headers();
$role = role();
if ($role === null) json_out(['error' => 'signed out'], 401);

$course = read_json(PRIV . '/academy.json');
if (!$course) json_out(['error' => 'course missing'], 500);

if ($role !== 'instructor') {
    foreach ($course['modules'] as &$m) {
        foreach ($m['panels'] as &$p) unset($p['n']);
    }
    unset($m, $p);
}
json_out($course);
