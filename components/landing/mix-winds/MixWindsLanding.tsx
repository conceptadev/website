"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { motion, MotionConfig } from "framer-motion";
import { HighlightedCode } from "../HighlightedCode";
import { LandingButton } from "../LandingButton";
import { fadeUp, reveal, staggerChild, staggerParent } from "../motion";
import { SectionHead } from "../SectionHead";
import { Aurora } from "../sections/Aurora";
import { ComparisonSeam } from "./ComparisonSeam";
import {
  DART_SNIPPET,
  EXAMPLES,
  FEATURES,
  HTML_SNIPPET,
  INSTALL_SNIPPET,
} from "./content";
import "../landing.css";
import "./mix-winds.css";

const PUB_DEV_URL = "https://pub.dev/packages/mix_winds";
const GITHUB_URL =
  "https://github.com/btwld/mix/tree/main/packages/mix_winds";

const exampleTabId = (slug: string) => `mtw-example-tab-${slug}`;
const examplePanelId = (slug: string) => `mtw-example-panel-${slug}`;

function CodePane({
  language,
  lang,
  filename,
  code,
}: {
  language: string;
  lang: "html" | "dart";
  filename: string;
  code: string;
}) {
  return (
    <div className="mtw-pane">
      <div className="mtw-pane-bar">
        <span className="mtw-pane-lang">{language}</span>
        <span className="mtw-pane-file">{filename}</span>
      </div>
      <HighlightedCode className="mtw-pane-code" code={code} lang={lang} />
    </div>
  );
}

export function MixWindsLanding() {
  const [activeSlug, setActiveSlug] = useState(EXAMPLES[0].slug);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = EXAMPLES.find((e) => e.slug === activeSlug) ?? EXAMPLES[0];

  const handleExampleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % EXAMPLES.length;
        break;
      case "ArrowLeft":
        nextIndex = (index - 1 + EXAMPLES.length) % EXAMPLES.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = EXAMPLES.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextExample = EXAMPLES[nextIndex];
    setActiveSlug(nextExample.slug);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <MotionConfig reducedMotion="user">
      <main className="lp-root mtw-root" data-pagefind-ignore>
        <Aurora />

        <section className="mtw-hero">
          <motion.div
            className="mtw-hero-copy"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.p className="mtw-eyebrow" variants={fadeUp} custom={0}>
              mix_winds
              <span className="mtw-eyebrow-badge">Alpha</span>
            </motion.p>

            <motion.h1 className="mtw-h1" variants={fadeUp} custom={0.05}>
              Tailwind classes.
              <br />
              <em>Native Flutter.</em>
            </motion.h1>

            <motion.p className="mtw-lead" variants={fadeUp} custom={0.1}>
              Write the utilities you already know and get real Flutter widgets
              — not a webview, not a screenshot.
            </motion.p>

            <motion.div className="mtw-cta-row" variants={fadeUp} custom={0.15}>
              <LandingButton href={PUB_DEV_URL} arrow="right">
                Get started
              </LandingButton>
              <LandingButton href={GITHUB_URL} variant="secondary">
                View on GitHub
              </LandingButton>
            </motion.div>

            <motion.div
              className="mtw-install"
              variants={fadeUp}
              custom={0.2}
            >
              <HighlightedCode
                className="mtw-install-code"
                code={INSTALL_SNIPPET}
                lang="bash"
              />
            </motion.div>
          </motion.div>
        </section>

        <section className="mtw-section" id="examples">
          <SectionHead
            eyebrow="Built with class strings"
            title={
              <>
                Real components, <span className="mtw-accent">no CSS</span>
              </>
            }
            lead="Every example uses the same class string in Tailwind and Flutter. Pick one, then drag the seam to compare both renderings."
          />

          <motion.div className="mtw-gallery" {...reveal}>
            <div className="mtw-picker" role="tablist" aria-label="Example">
              {EXAMPLES.map((example, index) => (
                <button
                  key={example.slug}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  id={exampleTabId(example.slug)}
                  role="tab"
                  type="button"
                  aria-controls={examplePanelId(example.slug)}
                  aria-selected={example.slug === activeSlug}
                  tabIndex={example.slug === activeSlug ? 0 : -1}
                  className="mtw-picker-tab"
                  onClick={() => setActiveSlug(example.slug)}
                  onKeyDown={(event) => handleExampleKeyDown(event, index)}
                >
                  {example.title}
                </button>
              ))}
            </div>

            {EXAMPLES.map((example) => (
              <div
                key={example.slug}
                className="mtw-gallery-body"
                id={examplePanelId(example.slug)}
                role="tabpanel"
                aria-labelledby={exampleTabId(example.slug)}
                hidden={example.slug !== activeSlug}
              >
                {example.slug === activeSlug ? (
                  <ComparisonSeam key={active.slug} example={active} />
                ) : null}
              </div>
            ))}
          </motion.div>
        </section>

        <section className="mtw-section mtw-section-wide">
          <SectionHead
            eyebrow="The API"
            title="If you can write the markup, you can write the widget"
            lead="The functional helpers mirror the elements they replace, so a component ports across without a translation step."
          />

          <motion.div className="mtw-panes" {...reveal}>
            <CodePane
              language="HTML"
              lang="html"
              filename="card.html"
              code={HTML_SNIPPET}
            />
            <div className="mtw-panes-seam" aria-hidden="true">
              <span>becomes</span>
            </div>
            <CodePane
              language="Dart"
              lang="dart"
              filename="card.dart"
              code={DART_SNIPPET}
            />
          </motion.div>
        </section>

        <section className="mtw-section">
          <SectionHead
            eyebrow="What you get"
            title="Built for Flutter, not bolted onto it"
          />

          <motion.ul
            className="mtw-features"
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {FEATURES.map((feature) => (
              <motion.li
                className="mtw-feature"
                key={feature.title}
                variants={staggerChild}
              >
                <h3 className="mtw-feature-title">{feature.title}</h3>
                <p className="mtw-feature-body">{feature.body}</p>
              </motion.li>
            ))}
          </motion.ul>
        </section>

        <section className="mtw-close">
          <motion.div className="mtw-close-inner" {...reveal}>
            <h2 className="mtw-close-title">Start with one class string.</h2>
            <p className="mtw-close-lead">
              mix_winds is an open-source alpha built on Mix. Add it to a
              Flutter project and style your first widget the way you already
              think about layout.
            </p>
            <div className="mtw-cta-row">
              <LandingButton href={PUB_DEV_URL} arrow="right">
                Install from pub.dev
              </LandingButton>
              <LandingButton href={GITHUB_URL} variant="secondary">
                Read the source
              </LandingButton>
            </div>
          </motion.div>
        </section>
      </main>
    </MotionConfig>
  );
}
