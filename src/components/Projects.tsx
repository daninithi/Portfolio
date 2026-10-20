import { FaArrowRight } from "react-icons/fa";
import ProjectCover from "../projects/ProjectCover";
import { PROJECTS } from "../projects/data";
import "./Projects.css";

// Home page: six equal project cards in a grid.
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
            className="project-card"
            style={{ "--c1": p.accent } as React.CSSProperties}
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay={i * 100}
          >
            <ProjectCover project={p} />

            <div className="project-card-body">
              <h3>{p.title}</h3>
              <div className="project-card-footer">
                <div className="project-card-chips">
                  {p.mainStack.map((name) => (
                    <span key={name}>{name}</span>
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
