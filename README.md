Live:
https://yazanalmssad.github.io/umrechner/
 
 # Unit Converter / Umrechner

Statischer Einheiten-Umrechner (HTML/CSS/JavaScript) mit deutschsprachiger Oberfläche.

## Funktionen
- 10 Einheitenkategorien: Länge, Fläche, Gewicht, Zeit, Geschwindigkeit, Temperatur, Volumen, Energie, Druck, Leistung
- Zusätzlich: Währungsumrechnung mit Live-Kursen (`open.er-api.com`)
- Direkte Ergebnisanzeige inkl. Rechenweg bei physikalischen Kategorien
- Pair-URLs pro Umrechnung (z. B. `/pages/length/m-zu-km/`)

## Projektstruktur
- `index.html`: Startseite
- `js/script.js`: Logik für Umrechnung, Routing, Währungsabruf
- `css/styles.css`: Styles
- `locales/de.json`: Texte/Übersetzungen
- `pages/<kategorie>/...`: statische Kategorieseiten und Paarseiten

## Lokal starten
Nutze einen lokalen statischen Server (nicht `file://`), damit `fetch()` zuverlässig funktioniert:

```bash
python -m http.server 8000
```

Dann öffnen: `http://localhost:8000`

Alternativ funktioniert auch z. B. `npx serve .`.

## Bedienung
1. Kategorie auswählen.
2. Wert eingeben.
3. Einheit bei „von“ und „nach“ wählen.
4. Ergebnis wird berechnet (bei Währung per Button, um API-Anfragen zu begrenzen).

Hinweis Währung:
- Datenquelle: `https://open.er-api.com/v6/latest/<BASE>`
- Kurse werden im Browser für 12 Stunden gecacht (`localStorage`).
- Ohne Internetverbindung sind keine Live-Kurse verfügbar.

## Deployment
Da es sich um eine statische Seite handelt, eignet sich das Projekt direkt für:
- GitHub Pages
- Netlify
- Vercel (Static Site)

## Lizenz
Siehe `LICENSE`.
