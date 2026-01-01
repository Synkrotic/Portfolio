import { useEffect, useRef } from "react";
import "./Stylings/projectCard.css"

interface ProjectCardProps {
  url: string;
  title?: string;
  children?: React.ReactNode;
}

const ProjectCard = ({ title, children, url }: ProjectCardProps) => {

  const projectContainerRef = useRef<HTMLDivElement>(null);

  const loadWebsite = () => {
    projectContainerRef.current?.classList.add("active");
    const interval = setInterval(() => {
      if (!projectContainerRef.current) return;
      projectContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    setTimeout(() => {
      clearInterval(interval);
      window.location.href = url;
    }, 1500)
  }

  useEffect(() => {
    if (!projectContainerRef.current) return;

    projectContainerRef.current.style.top = `${projectContainerRef.current?.clientTop}px`;
    projectContainerRef.current.style.left = `${projectContainerRef.current?.clientLeft}px`;
  })

  return (
    <div className="project-container" ref={projectContainerRef}>
      <iframe className="project-iframe" src={url} loading="lazy"/>
      <div className="project-card" onClick={() => { loadWebsite(); }} >
        <h3 className="project-title micro-header">{title}</h3>
        <p className="project-description">{children}</p>
      </div>
    </div>
  )
}

export default ProjectCard