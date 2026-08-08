import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const root = process.cwd()

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}

test('wires the mix_winds page into the landing shell', () => {
  const route = read('src/app/mix-winds/page.tsx')
  const landing = read('components/landing/mix-winds/MixWindsLanding.tsx')
  const styles = read('components/landing/mix-winds/mix-winds.css')

  assert.match(route, /<MixWindsLanding\s*\/>/)
  assert.match(route, /Tailwind classes\. Native Flutter\./)
  assert.match(landing, /className="lp-root mtw-root"/)
  assert.match(landing, /<Aurora \/>/)

  // Accents live on the page root, not html[data-product]: this is a page
  // inside the Mix site rather than a separate product in the navbar switcher.
  assert.match(styles, /\.mtw-root \{[^}]*--lp-accent:/s)
  const productStyles = read('components/landing/landing.css')
  assert.doesNotMatch(productStyles, /data-product='mix-winds'/)
  const layout = read('src/app/layout.jsx')
  assert.doesNotMatch(layout, /mix-winds/)
})

test('sells the package instead of reporting a pixel diff', () => {
  const landing = read('components/landing/mix-winds/MixWindsLanding.tsx')
  const content = read('components/landing/mix-winds/content.ts')
  const seam = read('components/landing/mix-winds/ComparisonSeam.tsx')

  assert.match(landing, /Get started/)
  assert.match(landing, /flutter pub add|INSTALL_SNIPPET/)
  assert.match(content, /flutter pub add mix_winds/)

  // No parity percentages, budgets, or pass/fail language on the page.
  const pageSource = [landing, content, seam].join('\n')
  assert.doesNotMatch(pageSource, /diffPercent|toFixed\(2\)|tolerance/i)
  assert.doesNotMatch(pageSource, /% of pixels/)
})

test('makes every gallery example a clean browser-to-Flutter comparison', () => {
  const landing = read('components/landing/mix-winds/MixWindsLanding.tsx')
  const content = read('components/landing/mix-winds/content.ts')
  const styles = read('components/landing/mix-winds/mix-winds.css')

  assert.match(
    landing,
    /<ComparisonSeam\s+key=\{active\.slug\}\s+example=\{active\}\s*\/>/s,
  )
  assert.doesNotMatch(landing, /Root element|ClassSpecimen|mtw-shot|mtw-gallery-meta/)
  assert.doesNotMatch(
    landing,
    /mtw-hero-stage|mtw-hero-hint|<ComparisonSeam example=\{EXAMPLES\[0\]\}/,
  )
  assert.doesNotMatch(content, /\b(?:eyebrow|blurb|classNames):/)

  // The comparison evidence keeps its 16px diagnostic capture margin. The
  // landing crops that matte instead of creating presentation-only variants.
  assert.match(styles, /--mtw-capture-width: 103\.278689%/)
  assert.match(styles, /--mtw-capture-width: 107\.407408%/)
  assert.match(styles, /max-width: none/)
  assert.match(styles, /border-radius: clamp\(1\.25rem, 2\.5vw, 1\.75rem\)/)
  assert.match(styles, /border-radius: clamp\(1\.125rem, 5\.25vw, 2\.375rem\)/)
  assert.match(content, /ratio: "976 \/ 476"/)
  assert.match(content, /ratioSm: "432 \/ 786"/)
  assert.doesNotMatch(styles, /\.mtw-shot\b/)
})

test('connects the example tabs to one keyboard-operable comparison panel', () => {
  const landing = read('components/landing/mix-winds/MixWindsLanding.tsx')

  assert.match(landing, /aria-controls=\{examplePanelId\(example\.slug\)\}/)
  assert.match(landing, /tabIndex=\{example\.slug === activeSlug \? 0 : -1\}/)
  assert.match(landing, /onKeyDown=\{\(event\) => handleExampleKeyDown\(event, index\)\}/)
  assert.match(landing, /role="tabpanel"/)
  assert.match(landing, /aria-labelledby=\{exampleTabId\(example\.slug\)\}/)
  assert.match(landing, /hidden=\{example\.slug !== activeSlug\}/)
})

test('shows the functional API with real HTML and Dart highlighting', () => {
  const content = read('components/landing/mix-winds/content.ts')
  const landing = read('components/landing/mix-winds/MixWindsLanding.tsx')
  const highlighter = read('components/landing/HighlightedCode.tsx')

  // Functional helpers, not the class-based widget constructors.
  assert.match(content, /DART_SNIPPET = `div\('flex/)
  assert.match(content, /\n  p\('text-sm/)
  assert.match(content, /\n  h2\('text-3xl/)
  assert.match(content, /button\(/)
  assert.match(content, /onPressed: deploy/)
  assert.doesNotMatch(content, /Div\(classNames:/)

  assert.match(landing, /lang="html"/)
  assert.match(landing, /lang="dart"/)
  assert.match(highlighter, /"html"/)
  assert.match(highlighter, /"dart"/)
})

test('serves a legible capture on narrow screens', () => {
  const content = read('components/landing/mix-winds/content.ts')
  const seam = read('components/landing/mix-winds/ComparisonSeam.tsx')
  const styles = read('components/landing/mix-winds/mix-winds.css')

  assert.match(content, /NARROW_CAPTURE_QUERY = "\(max-width: 720px\)"/)
  assert.match(seam, /<source\s+media=\{NARROW_CAPTURE_QUERY\}/s)
  assert.match(styles, /max-width: 720px/)

  for (const slug of [
    'launch-command',
    'signal-analytics',
    'incident-room',
    'release-timeline',
    'capacity-map',
  ]) {
    for (const suffix of [
      'tailwind.png',
      'flutter.png',
      'tailwind-sm.png',
      'flutter-sm.png',
    ]) {
      assert.equal(
        fs.existsSync(path.join(root, `public/mix-winds/${slug}-${suffix}`)),
        true,
        `missing capture: ${slug}-${suffix}`,
      )
    }
  }
})

test('keeps the seam operable by keyboard and screen readers', () => {
  const seam = read('components/landing/mix-winds/ComparisonSeam.tsx')

  assert.match(seam, /type="range"/)
  assert.match(seam, /aria-labelledby=/)
  assert.match(seam, /aria-valuetext=/)
  assert.match(seam, /alt=\{`\$\{example\.title\} rendered in a browser/)
  assert.match(seam, /alt=\{`\$\{example\.title\} rendered by Flutter/)
})
