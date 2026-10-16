import type { Project } from "./types";

type Props = { project: Project };

// A generated cover for the project cards: the project's two colors,
// a soft grid and one faint background logo. Drawn in code, so it's always sharp.
function ProjectCover({ project }: Props) {
  const Icon = project.coverIcon;

  return (
    <div
      className="project-cover"
      style={{ "--c1": project.accent, "--c2": project.accent2 } as React.CSSProperties}
      aria-hidden="true"
    >
      <div className="cover-grid" />
      <div className="cover-glow" />
      <Icon className="cover-watermark" />
    </div>
  );
}

export default ProjectCover;
