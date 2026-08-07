import { MixTailwindsLanding } from "../../../components/landing/mix-tailwinds/MixTailwindsLanding";

const description =
  "Write Tailwind utility classes, render native Flutter widgets. Every example is measured against a real browser rendering the same class string, at three viewport widths.";

export const viewport = {
  themeColor: "#05040A",
};

export const metadata = {
  title: "mix_tailwinds — Tailwind classes. Native Flutter.",
  description,
  applicationName: "mix_tailwinds",
  openGraph: {
    title: "mix_tailwinds — Tailwind classes, native Flutter widgets",
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "mix_tailwinds — Tailwind classes. Native Flutter.",
    description,
  },
};

export default function Page() {
  return <MixTailwindsLanding />;
}
