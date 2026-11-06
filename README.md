# GetWithItAI website

Public marketing site and With It newsletter for [getwithitai.com](https://getwithitai.com).

This repo is the working copy. Edit here, push to GitHub, then deploy the static files to Hostinger `public_html` for getwithitai.com.

**Do not change [getwithitai.net](https://getwithitai.net) from this repo.** That is the separate student portal.

## What’s in here

- Root HTML pages: home, learn, course, pricing, register, 404
- `assets/` — logos, CSS, JS
- `with-it/` — newsletter (issues, archive, daily)
- `classroom/` — day-of class player on .com (codes stay out of git)
- `.htaccess` — HTTPS, www→apex, `/byte-bait/` → `/with-it/`

## GitHub Pages preview

https://cdbz8a.github.io/getwithitai/

Live production stays on Hostinger: https://getwithitai.com

## Classroom codes

1. Copy `classroom/private/config.example.php` to `classroom/private/config.php`
2. Put the real student and instructor codes in `config.php`
3. `config.php` is gitignored. On Hostinger, edit it in File Manager only.

## Deploy to Hostinger

1. Zip the site with `index.html` at the zip root (not inside a folder)
2. Include `classroom/private/config.php` in the zip you upload (from your local machine or secrets store)
3. Upload to the getwithitai.com hosting account and deploy into `public_html`
4. Leave getwithitai.net alone

## Local preview

```bash
cd getwithitai
python3 -m http.server 8765
```

Open http://127.0.0.1:8765/
