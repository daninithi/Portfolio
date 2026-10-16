import { FaArrowLeft, FaArrowRight, FaCheck, FaGithub } from "react-icons/fa";
import ArchitectureDiagram from "./ArchitectureDiagram";
import { PROJECTS } from "./data";
import { leaveProject } from "./route";
import type { Project } from "./types";
import "./ProjectPage.css";

type Props = { project: Project };

// One project's own page. No site header here, just a Back button.
function ProjectPage({ project: p }: Props) {
  const index = PROJECTS.findIndex((x) => x.slug === p.slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <div className="project-page" style={{ "--c1": p.accent, "--c2": p.accent2 } as React.CSSProperties}>
      <button className="back-btn" onClick={leaveProject}>
        <FaArrowLeft aria-hidden="true" /> Back
      </button>

      {/* ---------- Intro ---------- */}
      <div className="pp-hero">
        <div className="pp-hero-text" data-aos="fade-up" data-aos-duration="800">
          <span className="pp-eyebrow">Learning project · {String(index + 1).padStart(2, "0")}</span>
          <h1>{p.title}</h1>
          <p className="pp-tagline">{p.tagline}</p>
          <p className="pp-description">{p.description}</p>

          <ul className="pp-highlights">
            {p.highlights.map((h) => (
              <li key={h}>
                <FaCheck aria-hidden="true" /> {h}
              </li>
            ))}
          </ul>

          <a className="pp-repo" href={p.repo} target="_blank" rel="noreferrer">
            <FaGithub aria-hidden="true" /> View code on GitHub
          </a>
        </div>
      </div>

      <div className="pp-body">
        {/* ---------- Architecture ---------- */}
        <section className="pp-block" data-aos="fade-up" data-aos-duration="700">
          <h2>Architecture</h2>
          <figure className="pp-diagram">
            <ArchitectureDiagram diagram={p.diagram} accent={p.accent} title={p.title} />
            <figcaption>{p.diagramCaption}</figcaption>
          </figure>
        </section>

        {/* ---------- Stack ---------- */}
        <section className="pp-block" data-aos="fade-up" data-aos-duration="700">
          <h2>Tech stack</h2>
          <div className="pp-stack">
            {p.stack.map((g) => (
              <div key={g.group} className="pp-stack-group">
                <h3>{g.group}</h3>
                <div className="pp-stack-items">
                  {g.items.map(({ name, icon: Icon, color }) => (
                    <span key={name} className="pp-stack-item" style={{ "--brand": color ?? p.accent } as React.CSSProperties}>
                      {Icon && <Icon aria-hidden="true" />}
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Flow ---------- */}
        <section className="pp-block" data-aos="fade-up" data-aos-duration="700">
          <h2>How it works, end to end</h2>
          <ol className="pp-flow">
            {p.flow.map((step, i) => (
              <li key={step.title} data-aos="fade-up" data-aos-duration="600" data-aos-delay={Math.min(i, 4) * 60}>
                <span className="pp-flow-num">{i + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- Learned ---------- */}
        <section className="pp-block" data-aos="fade-up" data-aos-duration="700">
          <h2>What I learned</h2>
          <div className="pp-learned">
            {p.learned.map((l, i) => (
              <div key={l} className="pp-learned-card" data-aos="zoom-in" data-aos-duration="500" data-aos-delay={i * 60}>
                <span className="pp-learned-icon">
                  <FaCheck aria-hidden="true" />
                </span>
                <p>{l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Challenges ---------- */}
        <section className="pp-block" data-aos="fade-up" data-aos-duration="700">
          <h2>Problems I faced &amp; how I solved them</h2>
          <div className="pp-challenges">
            {p.challenges.map((c) => (
              <div key={c.problem} className="pp-challenge" data-aos="fade-up" data-aos-duration="600">
                <div className="pp-problem">
                  <span className="pp-tag problem">Problem</span>
                  <p>{c.problem}</p>
                </div>
                <div className="pp-solution">
                  <span className="pp-tag solution">Solution</span>
                  <p>{c.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Footer nav ---------- */}
        <div className="pp-footer">
          <button className="pp-footer-back" onClick={leaveProject}>
            <FaArrowLeft aria-hidden="true" /> All projects
          </button>
          <a className="pp-next" href={`#/projects/${next.slug}`}>
            <span>Next project</span>
            <strong>
              {next.title} <FaArrowRight aria-hidden="true" />
            </strong>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
