# Visualization for Applied Econometrics

Interactive, geometric visualizations for an applied econometrics course.

## Contents
- `index.html` — landing page (contents list)
- `fwl_demo_v10.html` — 01 · The FWL Theorem
- `fe_demo_v1.html` — 02 · Fixed Effects (Applying the FWL theorem)

---

## Option A — fastest: use your existing Pages site

You already have `HanqYe/hanqye.github.io`, so Pages is already switched on.
Copy this folder into it as `econ-viz`:

```bash
git clone https://github.com/HanqYe/hanqye.github.io.git
cp -R /path/to/this/folder hanqye.github.io/econ-viz
cd hanqye.github.io
git add . && git commit -m "Add econometrics visualizations" && git push
```

Live in ~1 minute at:

    https://hanqye.github.io/econ-viz/

## Option B — a dedicated repo

Create an empty repo named `applied-econometrics-viz` on GitHub
(https://github.com/new), then from inside this folder:

```bash
git init
git add .
git commit -m "Add econometrics visualizations"
git branch -M main
git remote add origin https://github.com/HanqYe/applied-econometrics-viz.git
git push -u origin main
```

Then **Settings → Pages → Deploy from a branch → main / (root) → Save.**

Live at:

    https://hanqye.github.io/applied-econometrics-viz/

## Updating

```bash
git add . && git commit -m "Update" && git push
```

---

## Privacy

The repo can be private, but a GitHub Pages *site* is reachable by anyone with
the URL (true access control needs GitHub Enterprise Cloud). This folder ships
`robots.txt` and `noindex` meta tags so search engines will not list it — in
practice only people you send the link to will find it. Don't put anything
confidential here.

## Requirements

Pages load React, Babel, and Google Fonts from a CDN, so viewers need to be
online. For a fully offline copy, use the bundled single-file versions.
