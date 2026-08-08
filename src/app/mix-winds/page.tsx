import { MixWindsLanding } from "../../../components/landing/mix-winds/MixWindsLanding";

const description =
  "Write Tailwind utility classes, render native Flutter widgets. Every example is measured against a real browser rendering the same class string, at three viewport widths.";

export const viewport = {
  themeColor: "#05040A",
};

export const metadata = {
  title: "mix_winds — Tailwind classes. Native Flutter.",
  description,
  applicationName: "mix_winds",
  openGraph: {
    title: "mix_winds — Tailwind classes, native Flutter widgets",
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "mix_winds — Tailwind classes. Native Flutter.",
    description,
  },
};

export default function Page() {
  return <MixWindsLanding />;
}
