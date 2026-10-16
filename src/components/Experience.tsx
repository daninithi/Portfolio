import { useRef, useState } from "react";
import { FaBriefcase, FaGraduationCap, FaMapMarkerAlt } from "react-icons/fa";
import "./Experience.css";

// All details are taken from the CV.
const EDUCATION = {
  degree: "BSc in Computer Science",
  school: "University of Colombo School of Computing",
  location: "Colombo, Sri Lanka",
  start: "May 2023",
  end: "Sept 2026",
  startYear: 2023,
  endYear: 2026,
};

type Role = {
  title: string;
  company: string;
  period: string;
  type?: string;
  current?: boolean;
  points: string[];
  tags: string[];
};

const ROLES: Role[] = [
  {
    title: "Associate Software Engineer",
    company: "Protonest IoT (Pvt) Ltd",
    period: "Apr 2026 – Present",
    current: true,
    points: [
      "Completed Phase 1 and Phase 2 development of the SoftKey IoT platform, contributing to backend functionality, business logic, and system enhancements.",
      "Implemented Stripe subscription and payment workflows, including subscription migration, invoice generation, payment processing, and webhook integration.",
      "Maintained and updated existing AWS ECS deployments to support new phase releases and application changes.",
      "Troubleshot and resolved backend, database, integration, and deployment issues across development, QA, and production environments.",
      "Led the deployment of Protonest Connect – Intel4 Factory on AWS EC2, configuring the application environment and supporting the production rollout.",
      "Contributed to the NAPCO project by providing technical guidance to a software engineering intern and reviewing implementation against business requirements.",
    ],
    tags: ["Spring Boot", "Stripe", "Webhooks", "AWS ECS", "AWS EC2", "PostgreSQL"],
  },
  {
    title: "Software Engineer",
    company: "Alphintra (Pvt) Ltd",
    period: "Aug 2026 – Present",
    type: "Part-time",
    current: true,
    points: [
      "Contribute to the Brainweber project, developing educational video decks focused on human body parts.",
      "Use Claude-based AI prompting workflows to assist in generating and structuring content for video deck development.",
      "Provide technical guidance and task support to two software engineering interns working under the project.",
      "Contribute to maintaining development quality and following structured software engineering practices.",
    ],
    tags: ["AI Prompting", "Claude", "Mentoring", "Content Workflows"],
  },
  {
    title: "Software Engineering Intern",
    company: "Protonest IoT (Pvt) Ltd",
    period: "Oct 2025 – Apr 2026",
    points: [
      "Built and enhanced backend services for IoT-based digital access systems using Spring Boot, REST APIs, PostgreSQL, and microservices architecture.",
      "Deployed and supported the application across Azure development environments and AWS development, QA, and production environments.",
      "Containerized backend services using Docker and supported deployments on AWS ECS Fargate, configuring Amazon RDS for database hosting and Amazon CloudWatch for application and infrastructure monitoring.",
      "Troubleshot backend, database, integration, and deployment issues across development and QA environments.",
    ],
    tags: ["Spring Boot", "REST APIs", "Microservices", "Docker", "ECS Fargate", "RDS", "CloudWatch", "Azure"],
  },
];

function Experience() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const role = ROLES[active];

  // Up/Down (or Left/Right) arrow keys move between the role tabs
  const onTabKey = (e: React.KeyboardEvent) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + ROLES.length) % ROLES.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="experience" className="page-section">
      <div className="section-heading" data-aos="fade-up" data-aos-duration="1000">
        <span className="section-eyebrow">My journey</span>
        <h2>
          Education <span>&amp;</span> Experience
        </h2>
        <p>Where I studied, and where I've been building production software.</p>
      </div>

      <div className="journey-grid">
        {/* ---------- Education ---------- */}
        <div className="journey-card edu-card" data-aos="fade-right" data-aos-duration="900">
          <h3 className="journey-label">
            <FaGraduationCap aria-hidden="true" /> Education
          </h3>

          <div className="edu-icon">
            <FaGraduationCap aria-hidden="true" />
          </div>
          <h4 className="edu-degree">{EDUCATION.degree}</h4>
          <p className="edu-school">{EDUCATION.school}</p>
          <p className="edu-location">
            <FaMapMarkerAlt aria-hidden="true" /> {EDUCATION.location}
          </p>

          {/* A simple bar from start year to end year */}
          <div className="edu-timeline" aria-label={`${EDUCATION.start} to ${EDUCATION.end}`}>
            <div className="edu-track">
              <div className="edu-fill" />
            </div>
            <div className="edu-years">
              <span>{EDUCATION.start}</span>
              <span>{EDUCATION.end}</span>
            </div>
          </div>
        </div>

        {/* ---------- Experience ---------- */}
        <div
          className="journey-card exp-card"
          data-aos="fade-left"
          data-aos-duration="900"
          data-aos-delay="150"
        >
          <h3 className="journey-label">
            <FaBriefcase aria-hidden="true" /> Experience
          </h3>

          <div className="exp-body">
            <div className="exp-tabs" role="tablist" aria-orientation="vertical" onKeyDown={onTabKey}>
              {ROLES.map((r, i) => (
                <button
                  key={r.title + r.company}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`exp-tab-${i}`}
                  aria-selected={active === i}
                  aria-controls="exp-panel"
                  tabIndex={active === i ? 0 : -1}
                  className={`exp-tab ${active === i ? "active" : ""}`}
                  onClick={() => setActive(i)}
                >
                  <span className="exp-tab-dot" aria-hidden="true" />
                  <span className="exp-tab-title">{r.title}</span>
                  <span className="exp-tab-company">{r.company.replace(" (Pvt) Ltd", "")}</span>
                  <span className="exp-tab-period">{r.period}</span>
                </button>
              ))}
            </div>

            {/* key={active} re-mounts the panel so its entry animation plays on every switch */}
            <div
              key={active}
              className="exp-panel"
              role="tabpanel"
              id="exp-panel"
              aria-labelledby={`exp-tab-${active}`}
            >
              <div className="exp-panel-head">
                <div>
                  <h4>{role.title}</h4>
                  <p className="exp-company">{role.company}</p>
                </div>
                <div className="exp-meta">
                  <span className="exp-period">{role.period}</span>
                  {(role.current || role.type) && (
                    <span className="exp-badges">
                      {role.current && <span className="exp-badge live">Current</span>}
                      {role.type && <span className="exp-badge">{role.type}</span>}
                    </span>
                  )}
                </div>
              </div>

              <ul className="exp-points">
                {role.points.map((p, i) => (
                  <li key={i} style={{ animationDelay: `${0.08 + i * 0.06}s` }}>
                    {p}
                  </li>
                ))}
              </ul>

              <div className="exp-tags">
                {role.tags.map((t) => (
                  <span key={t} className="exp-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
