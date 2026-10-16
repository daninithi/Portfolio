import type { IconType } from "react-icons";
import { FaAws, FaJava } from "react-icons/fa";
import {
  SiCss,
  SiDocker,
  SiEclipseide,
  SiGithub,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiKubernetes,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNginx,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiSpringboot,
  SiSpringsecurity,
  SiTailwindcss,
} from "react-icons/si";
import { TbApi, TbBrandVscode, TbSql } from "react-icons/tb";
import { VscAzure } from "react-icons/vsc";
import "./Skills.css";

type Skill = { name: string; icon: IconType; color: string };
// cols = how many logos per row inside the card
// span = how many grid columns the card takes
// note = small extra detail shown next to the card title
type SkillGroup = { title: string; skills: Skill[]; cols: number; span?: number; note?: string };

// Taken from the "Technical Skills" part of the CV, in this order:
// Languages, Frontend, Backend, Databases, Cloud & DevOps, Tools (then Concepts).
// Colors are each brand's own color, a little brighter where needed to show on black.
const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Languages",
    cols: 2,
    skills: [
      { name: "Java", icon: FaJava, color: "#f89820" },
      { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
      { name: "Python", icon: SiPython, color: "#4b8bbe" },
      { name: "SQL", icon: TbSql, color: "#c084fc" },
    ],
  },
  {
    title: "Frontend",
    cols: 3,
    skills: [
      { name: "React", icon: SiReact, color: "#61dafb" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "HTML5", icon: SiHtml5, color: "#e34f26" },
      { name: "CSS3", icon: SiCss, color: "#2965f1" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06b6d4" },
    ],
  },
  {
    title: "Backend",
    cols: 2,
    skills: [
      { name: "Spring Boot", icon: SiSpringboot, color: "#6db33f" },
      { name: "Spring Security", icon: SiSpringsecurity, color: "#6db33f" },
      { name: "REST APIs", icon: TbApi, color: "#a78bfa" },
      { name: "JWT", icon: SiJsonwebtokens, color: "#d63aff" },
    ],
  },
  {
    title: "Databases",
    cols: 2,
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#6b8cff" },
      { name: "MySQL", icon: SiMysql, color: "#5d9bd5" },
      { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
    ],
  },
  {
    title: "Cloud & DevOps",
    cols: 4,
    span: 2,
    skills: [
      { name: "AWS", icon: FaAws, color: "#ff9900" },
      { name: "Azure", icon: VscAzure, color: "#0089d6" },
      { name: "Docker", icon: SiDocker, color: "#2496ed" },
      { name: "Kubernetes", icon: SiKubernetes, color: "#5b8def" },
      { name: "GitHub Actions", icon: SiGithubactions, color: "#2088ff" },
      { name: "Nginx", icon: SiNginx, color: "#22b14c" },
      { name: "Linux", icon: SiLinux, color: "#fcc624" },
    ],
  },
  {
    title: "Tools",
    cols: 2,
    skills: [
      { name: "GitHub", icon: SiGithub, color: "#ffffff" },
      { name: "VS Code", icon: TbBrandVscode, color: "#23a9f2" },
      { name: "Postman", icon: SiPostman, color: "#ff6c37" },
      { name: "Eclipse", icon: SiEclipseide, color: "#8f7ee8" },
    ],
  },
];

const CONCEPTS = [
  "Microservices Architecture",
  "MVC",
  "Client–Server Architecture",
  "API Security",
  "Role-Based Access Control",
  "CI/CD Pipelines",
];

// Moves a soft light around the card so it follows the mouse
function handleSpotlight(e: React.MouseEvent<HTMLDivElement>) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--x", `${e.clientX - rect.left}px`);
  card.style.setProperty("--y", `${e.clientY - rect.top}px`);
}

function Skills() {
  return (
    <section id="skills" className="page-section">
      <div className="section-heading" data-aos="fade-up" data-aos-duration="1000">
        <span className="section-eyebrow">What I work with</span>
        <h2>
          Skills <span>&amp;</span> Technologies
        </h2>
        <p>
          The languages, frameworks and platforms I use to build, ship and run
          backend systems in production.
        </p>
      </div>

      <div className="skills-grid">
        {SKILL_GROUPS.map((group, gi) => (
          <div
            key={group.title}
            className={`skill-card span-${group.span ?? 1}`}
            onMouseMove={handleSpotlight}
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay={gi * 100}
          >
            <div className="skill-card-header">
              <h3>{group.title}</h3>
              {group.note && <span className="skill-card-note">{group.note}</span>}
            </div>

            <ul
              className="skill-list"
              style={{ "--cols": group.cols } as React.CSSProperties}
            >
              {group.skills.map(({ name, icon: Icon, color }, si) => (
                <li
                  key={name}
                  className="skill-item"
                  style={{ "--brand": color } as React.CSSProperties}
                  data-aos="zoom-in"
                  data-aos-duration="500"
                  data-aos-delay={gi * 100 + si * 60}
                >
                  <span className="skill-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="skill-name">{name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div
          className="skill-card"
          onMouseMove={handleSpotlight}
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay={SKILL_GROUPS.length * 100}
        >
          <div className="skill-card-header">
            <h3>Concepts</h3>
          </div>
          <div className="concept-list">
            {CONCEPTS.map((c) => (
              <span key={c} className="concept-chip">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
