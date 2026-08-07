"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
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
  NARROW_CAPTURE_QUERY,
  TAILWIND_VERSION,
} from "./content";
import "../landing.css";
import "./mix-tailwinds.css";

const PUB_DEV_URL = "https://pub.dev/packages/mix_tailwinds";
const GITHUB_URL =
  "https://github.com/btwld/mix/tree/main/packages/mix_tailwinds";

/* The class string is the product, so it gets typeset rather than printed:
   utility roots stay quiet, values carry the accent, and the whole thing keeps
   the monospace grid a Tailwind user already reads by shape. */
function ClassSpecimen({ value }: { value: string }) {
  return (
    <code className="mtw-specimen">
      {value.split(" ").map((token, index) => {
        const split = token.lastIndexOf("-");
        const hasValue =
          split > 0 && /^[\d[]|\d|\/|^(?:full|auto|none)$/.test(token.slice(split + 1));
        return (
          <span className="mtw-specimen-token" key={`${token}-${index}`}>
            {hasValue ? (
              <>
                <span className="mtw-specimen-root">
                  {token.slice(0, split)}
                </span>
                <span className="mtw-specimen-value">
                  -{token.slice(split + 1)}
                </span>
              </>
            ) : (
              <span className="mtw-specimen-root">{token}</span>
            )}
          </span>
        );
      })}
    </code>
  );
}

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

export function MixTailwindsLanding() {
  const [activeSlug, setActiveSlug] = useState(EXAMPLES[0].slug);
  const active = EXAMPLES.find((e) => e.slug === activeSlug) ?? EXAMPLES[0];

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
              mix_tailwinds
              <span className="mtw-eyebrow-badge">Alpha</span>
            </motion.p>

            <motion.h1 className="mtw-h1" variants={fadeUp} custom={0.05}>
              Tailwind classes.
              <br />
              <em>Native Flutter.</em>
            </motion.h1>

            <motion.p className="mtw-lead" variants={fadeUp} custom={0.1}>
              Write the utilities you already know and get real Flutter widgets
              — not a webview, not a screenshot. Same class string, same result,
              on both sides of the seam below.
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

          <motion.div
            className="mtw-hero-stage"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <ComparisonSeam example={EXAMPLES[0]} />
            <p className="mtw-hero-hint">
              Drag the seam. The left half is a browser on Tailwind{" "}
              {TAILWIND_VERSION}; the right half is Flutter.
            </p>
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
            lead="Every one of these is a Flutter widget tree described entirely in Tailwind utilities. Pick one to see it, and the exact string that produced it."
          />

          <motion.div className="mtw-gallery" {...reveal}>
            <div className="mtw-picker" role="tablist" aria-label="Example">
              {EXAMPLES.map((example) => (
                <button
                  key={example.slug}
                  role="tab"
                  type="button"
                  aria-selected={example.slug === activeSlug}
                  className="mtw-picker-tab"
                  onClick={() => setActiveSlug(example.slug)}
                >
                  {example.title}
                </button>
              ))}
            </div>

            <div className="mtw-gallery-body">
              <figure
                className="mtw-shot"
                style={
                  {
                    "--mtw-ratio": active.ratio,
                    "--mtw-ratio-sm": active.ratioSm,
                  } as CSSProperties
                }
              >
                <picture key={active.slug}>
                  <source
                    media={NARROW_CAPTURE_QUERY}
                    srcSet={`/mix-tailwinds/${active.slug}-flutter-sm.png`}
                  />
                  <img
                    src={`/mix-tailwinds/${active.slug}-flutter.png`}
                    alt={`${active.title} rendered by Flutter with mix_tailwinds`}
                  />
                </picture>
              </figure>

              <div className="mtw-gallery-meta">
                <p className="mtw-gallery-eyebrow">{active.eyebrow}</p>
                <h3 className="mtw-gallery-title">{active.title}</h3>
                <p className="mtw-gallery-blurb">{active.blurb}</p>
                <p className="mtw-gallery-label">Root element</p>
                <ClassSpecimen value={active.classNames} />
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mtw-section">
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
              mix_tailwinds is an open-source alpha built on Mix. Add it to a
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
