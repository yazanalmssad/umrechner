# Unit Converter / Umrechner

Kleines statisches Projekt (HTML/CSS/JS) mit folgenden Funktionen:

- Länge: mm, cm, dm, m, km
- Fläche: m², ha, km²
- Währung: EUR, USD, GBP, JPY, CHF, CAD, AUD, CNY (live via open.er-api.com)
- Zweisprachig: Deutsch & Englisch (umschaltbar)

## Lokales Testen
- Öffne das Projekt in VS Code und starte die **Live Server** Extension oder
- Starte einen einfachen statischen Server: `npx serve .` oder `python -m http.server 8000` und öffne `http://localhost:5000` bzw. `8000`.

Wichtig: Einige Browser blockieren lokale `fetch()`-Aufrufe bei `file://`-Aufrufen; deshalb einen lokalen Server verwenden.

## Deployment
- Für eine statische Seite: GitHub Pages oder Netlify / Vercel (als static site)

## Weiteres
Sag Bescheid, wenn du zusätzliche Einheiten, eine Optik-Anpassung oder automatische Tests möchtest.
## Anleitung / Guide

Deutsch: Wähle oben die Kategorie (Länge, Fläche, Gewicht oder Währung). Gib einen Wert ein, wähle die Einheiten bei „von“ und „nach“ und klicke auf „Umrechnen“ (bei Länge/Fläche/Gewicht wird auch live beim Tippen umgerechnet). Die Währungsumrechnung nutzt Live‑Kurse und kann bei fehlender Internetverbindung nicht laden.

English: Choose a category at the top (Length, Area, Weight, or Currency). Enter a value, select the units for “from” and “to”, and click “Convert” (length/area/weight also update live while typing). Currency conversion uses live rates and won’t load without an internet connection.

## Datenquelle / Data source
open.er-api.com (free)
## Inhalte je Kategorie / Category content

Deutsch – Länge
Die Längeneinheiten basieren auf dem SI‑System. Die Basiseinheit ist der Meter (m). Kleinere Einheiten sind Millimeter (mm), Zentimeter (cm) und Dezimeter (dm). Größere Einheiten sind Kilometer (km).
Umrechnungen sind Zehnerpotenzen: 1 m = 100 cm, 1 cm = 10 mm, 1 km = 1000 m. Von kleiner nach größer wird der Zahlenwert kleiner, von größer nach kleiner wird er größer.
Beispiele: 1 m = 0,001 km · 250 cm = 2,5 m · km → m ×1000, m → km ÷1000.

Deutsch – Fläche
Fläche ist zweidimensional. Längeneinheiten werden quadriert: m², cm², km². Dadurch sind die Umrechnungsfaktoren größer als bei Länge.
Wichtige Beziehungen: 1 m² = 10.000 cm², 1 ha = 10.000 m², 1 km² = 1.000.000 m². Hektar (ha) ist üblich in Landwirtschaft und Forst.
Beispiele: 2 ha = 20.000 m² · 0,5 km² = 500.000 m² · km² → m² ×1.000.000.

Deutsch – Gewicht/Masse
Im Alltag sagt man „Gewicht“, physikalisch ist es die Masse. Die Basiseinheit ist das Kilogramm (kg). Kleinere Einheiten: Gramm (g), Milligramm (mg). Größere Einheit: Tonne (t).
Umrechnungen: 1 kg = 1000 g, 1 g = 1000 mg, 1 t = 1000 kg. Faktoren sind Zehnerpotenzen.
Beispiele: 1,5 kg = 1500 g · 250.000 mg = 250 g · t → kg ×1000.

Deutsch – Währung
Währungsumrechnungen basieren auf Wechselkursen, die sich laufend ändern. Daher können Ergebnisse je nach Zeitpunkt variieren.
Die Seite nutzt Live‑Kurse eines externen Dienstes. Ohne Internetverbindung kann die Umrechnung nicht geladen werden. Bei realen Zahlungen können Bank- oder Anbietergebühren hinzukommen.
Beispiel: 10 EUR → USD hängt vom aktuellen Kurs ab.

English – Length
Length units use the SI system. The base unit is the meter (m). Smaller units are millimeter (mm), centimeter (cm), and decimeter (dm). Larger units are kilometer (km).
Conversions are powers of ten: 1 m = 100 cm, 1 cm = 10 mm, 1 km = 1000 m. Converting to a larger unit makes the number smaller; converting to a smaller unit makes it larger.
Examples: 1 m = 0.001 km · 250 cm = 2.5 m · km → m ×1000, m → km ÷1000.

English – Area
Area is two‑dimensional, so length units are squared: m², cm², km². Squaring makes conversion factors larger than for length.
Key relations: 1 m² = 10,000 cm², 1 ha = 10,000 m², 1 km² = 1,000,000 m². Hectares (ha) are often used in agriculture and forestry.
Examples: 2 ha = 20,000 m² · 0.5 km² = 500,000 m² · km² → m² ×1,000,000.

English – Weight/Mass
In daily use people say “weight”, but physically it is mass. The base unit is the kilogram (kg). Smaller units: gram (g), milligram (mg). Larger unit: tonne (t).
Conversions: 1 kg = 1000 g, 1 g = 1000 mg, 1 t = 1000 kg. Factors are powers of ten.
Examples: 1.5 kg = 1500 g · 250,000 mg = 250 g · t → kg ×1000.

English – Currency
Currency conversions depend on exchange rates that change continuously, so results can vary over time.
This site uses live rates from an external service. Without an internet connection, currency conversion can’t be loaded. For real payments, banks or providers may apply their own rates and fees.
Example: 10 EUR → USD depends on the current rate.

## Build der Seiten

Es gibt echte Seiten pro Kategorie in `pages/`. Um sie aus dem Template zu erzeugen:

```bash
python build_pages.py
```

Die Seiten sind dann z. B. unter `pages/length.html`, `pages/temperature.html` usw. erreichbar.

