# Nestboard

A short design questionnaire that turns your answers into a personalized apartment vision board — a color palette, materials, furniture picks, a rough room sketch, and rental-friendly/budget tips.

This is a static site: open `index.html` in a browser, or serve the folder with any static file server.

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Structure

- `index.html` — markup for the quiz and results screens
- `css/styles.css` — styling (paper/pinboard aesthetic)
- `js/app.js` — quiz logic and the style engine that turns answers into a board
