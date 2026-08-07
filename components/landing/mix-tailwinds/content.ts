/* Content for the mix_tailwinds landing page.

   The captures under public/mix-tailwinds/ are produced by the package's own
   comparison suite: each example is rendered once in a real browser on
   Tailwind 4.3.1 and once in Flutter, from the same class string. Regenerate
   them with `npm run compare:advanced` in packages/mix_tailwinds/tool/
   visual-comparison and copy the per-example captures across. */

export const TAILWIND_VERSION = "4.3.1";

export type Example = {
  slug: string;
  title: string;
  eyebrow: string;
  blurb: string;
  classNames: string;
  /** Intrinsic ratio of the 1024px captures, so frames never reflow. */
  ratio: string;
  /** Ratio of the 480px captures, which lay out taller and narrower. */
  ratioSm: string;
};

/* Below this the desktop capture is too small to read, so the narrow capture —
   the same component laid out for a phone — is served instead. Matches the CSS
   breakpoint in mix-tailwinds.css. */
export const NARROW_CAPTURE_QUERY = "(max-width: 720px)";

export const EXAMPLES: Example[] = [
  {
    slug: "launch-command",
    title: "Launch command",
    eyebrow: "Release control",
    blurb:
      "Status, metrics, live progress, and two interaction states on a dark surface.",
    classNames:
      "flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-slate-950 shadow-2xl",
    ratio: "1008 / 508",
    ratioSm: "464 / 818",
  },
  {
    slug: "signal-analytics",
    title: "Signal analytics",
    eyebrow: "Acquisition",
    blurb:
      "A dense analytics card: fractional bars, tight type, hairline borders.",
    classNames:
      "flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl",
    ratio: "1008 / 602",
    ratioSm: "464 / 1039",
  },
  {
    slug: "incident-room",
    title: "Incident room",
    eyebrow: "Active incident",
    blurb:
      "An operational timeline with severity colors, avatars, and real actions.",
    classNames:
      "flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-amber-200 bg-amber-50 shadow-xl",
    ratio: "1008 / 659",
    ratioSm: "464 / 1027",
  },
  {
    slug: "release-timeline",
    title: "Release timeline",
    eyebrow: "Launch orbit",
    blurb:
      "Four stages across a multi-stop gradient, with nested type and borders.",
    classNames:
      "flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-linear-to-br from-indigo-950 via-blue-950 to-slate-950 shadow-2xl",
    ratio: "1008 / 520",
    ratioSm: "464 / 1148",
  },
  {
    slug: "capacity-map",
    title: "Capacity map",
    eyebrow: "Sprint 42",
    blurb:
      "Portfolio allocation: responsive sections, gradients, compact team cards.",
    classNames:
      "flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl",
    ratio: "1008 / 627",
    ratioSm: "464 / 1020",
  },
];

/* Kept under ~56 columns so both panes read without horizontal scrolling. */
export const HTML_SNIPPET = `<div class="flex flex-col gap-4 rounded-3xl
            bg-slate-950 p-6 shadow-2xl">
  <p class="text-sm text-slate-400">Northstar</p>
  <h2 class="text-3xl font-bold text-white">Atlas</h2>

  <button class="rounded-full bg-indigo-500 px-5 py-2.5
                 text-sm font-semibold text-white
                 hover:bg-indigo-400">
    Deploy
  </button>
</div>`;

/* The functional API: lowercase helpers that read like the markup above. */
export const DART_SNIPPET = `div('flex flex-col gap-4 rounded-3xl '
    'bg-slate-950 p-6 shadow-2xl', [
  p('text-sm text-slate-400', 'Northstar'),
  h2('text-3xl font-bold text-white', 'Atlas'),

  button(
    'rounded-full bg-indigo-500 px-5 py-2.5 '
    'text-sm font-semibold text-white '
    'hover:bg-indigo-400',
    [p('text-white', 'Deploy')],
    onPressed: deploy,
  ),
])`;

export const INSTALL_SNIPPET = `flutter pub add mix_tailwinds`;

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
