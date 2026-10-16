import { FaArrowRight } from "react-icons/fa";
import ProjectCover from "../projects/ProjectCover";
import { PROJECTS } from "../projects/data";
import "./Projects.css";

// Home page: one big featured card on the left, four smaller ones on the right.
// Clicking a card opens that project's own page (#/projects/<slug>).
function Projects() {
  return (
    <section id="projects" className="page-section">
      <div className="section-heading" data-aos="fade-up" data-aos-duration="1000">
        <span className="section-eyebrow">Learning projects</span>
        <h2>
          Things I've <span>Built</span>
        </h2>
        <p>Hands-on projects where I practised backend, cloud and DevOps skills end to end.</p>
      </div>

      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <a
            key={p.slug}
            href={`#/projects/${p.slug}`}
            onClick={() => sessionStorage.setItem("returnToProjects", "1")}
            className={`project-card ${i === 0 ? "featured" : ""}`}
            style={{ "--c1": p.accent } as React.CSSProperties}
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay={i * 100}
          >
            <ProjectCover project={p} />

            <div className="project-card-body">
              <h3>{p.title}</h3>
              <p className="project-card-tagline">{p.tagline}</p>
              <div className="project-card-footer">
                <div className="project-card-chips">
                  {p.stack
                    .flatMap((g) => g.items)
                    .slice(0, i === 0 ? 5 : 3)
                    .map((s) => (
                      <span key={s.name}>{s.name}</span>
                    ))}
                </div>
                <span className="project-card-cta">
                  View <FaArrowRight aria-hidden="true" />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Projects;
