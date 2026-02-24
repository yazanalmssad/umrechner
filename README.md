# Unit Converter / Umrechner

Live:
https://yazanalmssad.github.io/umrechner/

Statischer Einheiten-Umrechner (HTML/CSS/JavaScript) mit deutschsprachiger Oberfläche.

## Funktionen
- 10 Einheitenkategorien: Länge, Fläche, Gewicht, Zeit, Geschwindigkeit, Temperatur, Volumen, Energie, Druck, Leistung
- Direkte Ergebnisanzeige inkl. Rechenweg bei physikalischen Kategorien
- Pair-URLs pro Umrechnung (z. B. `/pages/length/m-zu-km/`)
- Währung ist aktuell deaktiviert (nicht im Menü verlinkt, im Script deaktiviert)

## Projektstruktur
- `index.html`: Startseite
- `css/styles.css`: Styles
- `js/script.js`: Umrechnungslogik, Routing, Paarnavigation
- `locales/de.json`: Texte/Übersetzungen
- `pages/<kategorie>/...`: statische Kategorieseiten und Paarseiten
- `robots.txt`: Crawling-Regeln + Sitemap-Verweis
- `sitemap.xml`: Sitemap für Suchmaschinen (ohne Währungsseiten)

## Lokal starten
Nutze einen lokalen statischen Server (nicht `file://`), damit `fetch()` zuverlässig funktioniert:

```bash
python -m http.server 8000
```

Dann öffnen: `http://localhost:8000`

Alternativ: `npx serve .`

## Bedienung
1. Kategorie auswählen.
2. Wert eingeben.
3. Einheit bei „von“ und „nach“ wählen.
4. Ergebnis wird sofort berechnet.

## Deployment (GitHub Pages)
Das Projekt läuft als GitHub Pages Project Site unter:
`https://yazanalmssad.github.io/umrechner/`

Hinweis:
- Pfad-Logik ist für lokal und GitHub Pages angepasst.
- Nach JS-Änderungen ggf. Cache-Busting über die Script-Version in HTML erhöhen (z. B. `js/script.js?v=34`).

## SEO
Umgesetzt:
- `meta description` auf allen Seiten (ohne Währung)
- `canonical` auf allen Seiten (ohne Währung)
- ein `h1` pro Seite (ohne Währung)
- `robots.txt` + `sitemap.xml`

Google Search Console:
- Property: `https://yazanalmssad.github.io/umrechner/`
- Sitemap einreichen als: `sitemap.xml`

## Lizenz
Siehe `LICENSE`.
