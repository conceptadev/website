/* Content for the mix_winds landing page.

   The captures under public/mix-winds/ are produced by the package's own
   comparison suite: each example is rendered once in a real browser on
   Tailwind 4.3.1 and once in Flutter, from the same class string. Regenerate
   them with `npm run compare:advanced` in packages/mix_winds/tool/
   visual-comparison and copy the per-example captures across. The suite keeps
   a 16px diagnostic margin around every capture; the landing crops that margin
   at presentation time while preserving the source evidence. */

export type Example = {
  slug: string;
  title: string;
  /** Ratio of the visible desktop capture after cropping its 16px margin. */
  ratio: string;
  /** Ratio of the visible phone capture after cropping its 16px margin. */
  ratioSm: string;
};

/* Below this the desktop capture is too small to read, so the narrow capture —
   the same component laid out for a phone — is served instead. Matches the CSS
   breakpoint in mix-winds.css. */
export const NARROW_CAPTURE_QUERY = "(max-width: 720px)";

export const EXAMPLES: Example[] = [
  {
    slug: "launch-command",
    title: "Launch command",
    ratio: "976 / 476",
    ratioSm: "432 / 786",
  },
  {
    slug: "signal-analytics",
    title: "Signal analytics",
    ratio: "976 / 570",
    ratioSm: "432 / 1007",
  },
  {
    slug: "incident-room",
    title: "Incident room",
    ratio: "976 / 627",
    ratioSm: "432 / 995",
  },
  {
    slug: "release-timeline",
    title: "Release timeline",
    ratio: "976 / 488",
    ratioSm: "432 / 1116",
  },
  {
    slug: "capacity-map",
    title: "Capacity map",
    ratio: "976 / 595",
    ratioSm: "432 / 988",
  },
];

/* Every class string stays on one line in both panes. Splitting a Dart string
   across lines needs adjacent-literal concatenation, and that plumbing reads as
   noise next to the markup it is supposed to mirror — so the panes are sized to
   fit these instead of the strings being broken to fit the panes. */
export const HTML_SNIPPET = `<div class="flex flex-col gap-4 rounded-3xl bg-slate-950 p-6">
  <p class="text-sm text-slate-400">Northstar</p>
  <h2 class="text-3xl font-bold text-white md:text-4xl">Atlas</h2>

  <button
    class="rounded-full bg-indigo-500 px-5 py-2 hover:bg-indigo-400"
  >
    <span class="text-sm font-semibold text-white">Deploy</span>
  </button>
</div>`;

/* The functional API: lowercase helpers that read like the markup above. */
export const DART_SNIPPET = `div('flex flex-col gap-4 rounded-3xl bg-slate-950 p-6', [
  p('text-sm text-slate-400', 'Northstar'),
  h2('text-3xl font-bold text-white md:text-4xl', 'Atlas'),

  button(
    'rounded-full bg-indigo-500 px-5 py-2 hover:bg-indigo-400',
    [span('text-sm font-semibold text-white', 'Deploy')],
    onPressed: deploy,
  ),
])`;

export const INSTALL_SNIPPET = `flutter pub add "mix_winds:{git:{url: https://github.com/btwld/mix.git, path: packages/mix_winds}}"`;

export const FEATURES = [
  {
    title: "Real Flutter widgets",
    body: "Classes compile to Mix stylers and render as native widgets. No webview, no HTML bridge, no runtime CSS engine.",
  },
  {
    title: "The utilities you know",
    body: "Tailwind v4 grammar: responsive prefixes, state variants, arbitrary values, gradients, and the full spacing and color scales.",
  },
  {
    title: "Interaction states included",
    body: "hover:, focus-visible:, active:, and disabled: map onto Flutter widget states, with keyboard and semantics wired up.",
  },
  {
    title: "Tailwind's theme, generated",
    body: "The default palette, radii, shadows, and type scale come from a pinned upstream Tailwind snapshot, not hand-copied values.",
  },
  {
    title: "Nothing fails silently",
    body: "A token that can't be honored is reported through onDiagnostic with a reason and a workaround, never dropped without a word.",
  },
  {
    title: "Drops down to Mix",
    body: "Reach past the class string into typed Mix stylers whenever you need something the utility grammar doesn't express.",
  },
] as const;
