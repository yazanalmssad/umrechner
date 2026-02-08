# Unit Converter / Umrechner

Statischer Umrechner (HTML/CSS/JS) mit Kategorien:

- Länge
- Fläche
- Gewicht
- Zeit
- Geschwindigkeit
- Temperatur
- Volumen
- Energie
- Druck
- Währung (live via open.er-api.com)

Sprache: Deutsch

## Lokales Testen
- Öffne das Projekt in VS Code und starte die **Live Server** Extension oder
- Starte einen einfachen statischen Server: `npx serve .` oder `python -m http.server 8000` und öffne `http://localhost:5000` bzw. `8000`.

Wichtig: Einige Browser blockieren lokale `fetch()`-Aufrufe bei `file://`-Aufrufen; deshalb einen lokalen Server verwenden.

## Deployment
- Für eine statische Seite: GitHub Pages oder Netlify / Vercel (als static site)

## Anleitung

Wähle oben die Kategorie (Länge, Fläche, Gewicht, Zeit, Geschwindigkeit, Temperatur, Volumen, Energie, Druck oder Währung). Gib einen Wert ein, wähle die Einheiten bei „von“ und „nach“ und klicke auf „Umrechnen“. Bei allen Kategorien außer Währung wird live beim Tippen umgerechnet. Die Währungsumrechnung nutzt Live‑Kurse und kann bei fehlender Internetverbindung nicht laden.

## Datenquelle / Data source
open.er-api.com (free)

## Inhalte je Kategorie

Länge
Die Längeneinheiten basieren auf dem SI‑System und erweitern es um gängige imperiale Einheiten. Basiseinheit ist der Meter (m). Umrechnungen erfolgen über feste Faktoren.

Fläche
Fläche ist zweidimensional. Längeneinheiten werden quadriert (m², km², usw.). Umrechnungen erfolgen über feste Faktoren.

Gewicht/Masse
Die Basiseinheit ist das Kilogramm (kg). Kleinere Einheiten: Gramm (g), Milligramm (mg). Größere Einheit: Tonne (t). Umrechnungen erfolgen über feste Faktoren.

Zeit, Geschwindigkeit, Temperatur, Volumen, Energie, Druck
Diese Kategorien nutzen etablierte physikalische Einheiten und feste Faktoren. Bei Temperatur erfolgt die Umrechnung über Formeln.

Währung
Währungsumrechnungen basieren auf Wechselkursen, die sich laufend ändern. Die Seite nutzt Live‑Kurse eines externen Dienstes. Ohne Internetverbindung kann die Umrechnung nicht geladen werden.

## Build der Seiten

Es gibt echte Seiten pro Kategorie in `pages/`. Um sie aus dem Template zu erzeugen:

```bash
python build_pages.py
```

Die Seiten sind dann z. B. unter `pages/length.html`, `pages/temperature.html` usw. erreichbar.
