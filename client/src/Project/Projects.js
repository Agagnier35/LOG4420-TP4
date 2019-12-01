import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Projects.css";

import Loader from "../Loader/Loader";

const ProjectDescription = ({ project }) => {
  return (
    <li>
      <span>{project.student}, </span>
      <Link to={`/projects/${project._id}`}>{project.title}</Link>
      <footer className="meta">
        <p>Directeur(e): {project.supervisor}</p>
        {project.cosupervisor && (
          <p>Co-directeur(e)(s): {project.cosupervisor}</p>
        )}
      </footer>
    </li>
  );
};

export default () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const dataJSON = await fetch("http://localhost:3000/api/projects", {
      method: "GET",
      mode: "cors",
      header: { "accept-language": "fr" }
    });
    const data = await dataJSON.json();
    setProjects(data);
    setLoading(false);
  };

  const currentProjects = projects
    .filter(p => p.current)
    .sort((p1, p2) => (p1.year < p2.year ? 1 : p1.year > p2.year ? -1 : 0));
  const pastProjects = projects
    .filter(p => !p.current)
    .sort((p1, p2) => (p1.year < p2.year ? 1 : p1.year > p2.year ? -1 : 0));

  return (
    <div className="loading-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>Projets en cours</h1>
          {currentProjects.length === 0 ? (
            <p>Aucuns projets en cours</p>
          ) : (
            <ul className="projects">
              {currentProjects.map(project => (
                <ProjectDescription key={project._id} project={project} />
              ))}
            </ul>
          )}
          <h1>Projets passés</h1>
          {pastProjects.length === 0 ? (
            <p>Aucuns projets passés</p>
          ) : (
            <ul className="projects">
              {pastProjects.map(project => (
                <ProjectDescription key={project._id} project={project} />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};
