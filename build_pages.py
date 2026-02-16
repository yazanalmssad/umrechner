from pathlib import Path
import shutil

base = Path(r"c:\workspace\unit-converter")
dist = base / "dist"

if dist.exists():
    shutil.rmtree(dist)
dist.mkdir()

# Copy assets
for folder in ("css", "js", "locales"):
    src = base / folder
    if src.exists():
        shutil.copytree(src, dist / folder)

# Helper: render HBS -> HTML and adjust links to directory-style URLs

def render(src: Path, dst: Path):
    text = src.read_text(encoding="utf-8")
    # convert .hbs to directory-style links
    text = text.replace("index.hbs", "index.html")
    for name in [
        "length","area","weight","time","speed","temperature","volume","energy","pressure","currency",
        "impressum","datenschutz"
    ]:
        text = text.replace(f"pages/{name}.hbs", f"pages/{name}/")
        text = text.replace(f"{name}.hbs", f"../pages/{name}/")
    # ensure root index links to /index.html for file systems
    text = text.replace("../index.hbs", "../index.html")
    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_text(text, encoding="utf-8")

# root index
render(base / "index.hbs", dist / "index.html")

# category pages -> dist/pages/<name>/index.html
pages_dir = base / "pages"
for hbs in pages_dir.glob("*.hbs"):
    name = hbs.stem
    render(hbs, dist / "pages" / name / "index.html")

print("Build complete (directory-style URLs).")