<?php
// Classroom: code login, then the follow-along course player.
declare(strict_types=1);
require __DIR__ . '/private/lib.php';
security_headers();
header('Cache-Control: no-store');
$role = role();
$csrf = csrf();
$error = $_SESSION['login_error'] ?? '';
unset($_SESSION['login_error']);
?><!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>AI Hero Academy Classroom</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Figtree:wght@400;600;700&display=swap">
<link rel="stylesheet" href="player.css">
</head>
<body>
<?php if ($role === null): ?>
  <div class="login">
    <form method="post" action="login.php" autocomplete="off">
      <a class="logo" href="/"><img src="/assets/logo.svg" alt="">GetWithItAI<span class="dot">.</span></a>
      <h1>Classroom</h1>
      <p>Enter the class code your instructor gave you to follow along with today's session.</p>
      <?php if ($error): ?><p class="err" role="alert"><?= h($error) ?></p><?php endif; ?>
      <label for="code">Class code</label>
      <input id="code" name="code" type="text" required maxlength="64" autocapitalize="none" spellcheck="false" autofocus>
      <input type="hidden" name="csrf" value="<?= h($csrf) ?>">
      <button type="submit">Enter classroom</button>
      <p class="small">No code? Start with the free course at <a href="/28">getwithitai.com/28</a>, or email <a href="mailto:getwithitai@protonmail.com">getwithitai@protonmail.com</a>.</p>
    </form>
  </div>
<?php else: ?>
  <header class="top">
    <div class="top-in">
      <a class="logo" href="/"><img src="/assets/logo.svg" alt="">GetWithItAI<span class="dot">.</span></a>
      <button class="tbtn only-sm" id="menu" type="button">Modules</button>
      <span class="spacer"></span>
      <span class="status hide-sm" id="status"></span>
      <?php if ($role === 'instructor'): ?>
        <button class="tbtn live" id="broadcast" type="button">Go live</button>
      <?php else: ?>
        <button class="tbtn" id="follow" type="button">Follow instructor</button>
      <?php endif; ?>
      <a class="tbtn" href="logout.php">Sign out</a>
    </div>
    <div class="bar"><i id="barfill"></i></div>
  </header>
  <div class="wrap">
    <aside class="side" id="side"></aside>
    <main class="main" id="main">Loading the course...</main>
  </div>
  <nav class="nav">
    <div class="nav-in">
      <button class="nbtn" id="prev" type="button">&larr; Back</button>
      <span class="pos" id="pos"></span>
      <button class="nbtn go" id="next" type="button">Next &rarr;</button>
    </div>
  </nav>
  <script id="cls" type="application/json"><?= json_encode(['role' => $role, 'csrf' => $csrf], JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) ?></script>
  <script src="boot.js"></script>
  <script src="player.js"></script>
<?php endif; ?>
</body>
</html>
