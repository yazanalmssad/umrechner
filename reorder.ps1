$path = "c:\workspace\unit-converter\index.html"
$content = Get-Content -Path $path -Raw

$pattern = '(?s)(<div class="row">\s*<button id="length-convert">[^<]*</button>\s*<div id="length-result" class="result">—</div>\s*</div>)\s*<div id="length-calc" class="calc"></div>\s*<div class="info">'
$replacement = '$1' + "`r`n      <div id=\"length-calc\" class=\"calc\"></div>`r`n      <div class=\"info\">"
$content = [regex]::Replace($content, $pattern, $replacement, [System.Text.RegularExpressions.RegexOptions]::Singleline)

$pattern = '(?s)(<div class="row">\s*<button id="area-convert">[^<]*</button>\s*<div id="area-result" class="result">—</div>\s*</div>)\s*<div id="area-calc" class="calc"></div>\s*<div class="info">'
$replacement = '$1' + "`r`n      <div id=\"area-calc\" class=\"calc\"></div>`r`n      <div class=\"info\">"
$content = [regex]::Replace($content, $pattern, $replacement, [System.Text.RegularExpressions.RegexOptions]::Singleline)

$pattern = '(?s)(<div class="row">\s*<button id="weight-convert">[^<]*</button>\s*<div id="weight-result" class="result">—</div>\s*</div>)\s*<div id="weight-calc" class="calc"></div>\s*<div class="info">'
$replacement = '$1' + "`r`n      <div id=\"weight-calc\" class=\"calc\"></div>`r`n      <div class=\"info\">"
$content = [regex]::Replace($content, $pattern, $replacement, [System.Text.RegularExpressions.RegexOptions]::Singleline)

Set-Content -Path $path -Value $content -Encoding utf8
