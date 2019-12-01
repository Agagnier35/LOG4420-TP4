import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";

import "./Project.css";
import PublicationTable from "../Publication/PublicationTable";

export default ({ match }) => {
  const [project, setProject] = useState({});
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    setLoading(true);
    const dataJSON = await fetch(
      `http://localhost:3000/api/projects/${match.params.id}`,
      {
        method: "GET",
        mode: "cors",
        headers: { "accept-language": "fr" }
      }
    );
    const {
      project: projectData,
      publications: publicationsData
    } = await dataJSON.json();
    setProject(projectData);
    setPublications(publicationsData);
    setLoading(false);
  };

  return (
    <div className="loading-container">
      {loading ? (
        <Loader loading={loading} />
      ) : (
        project &&
        Object.keys(project).length !== 0 && (
          <>
            <h1>{project.title}</h1>
            <section className="description">
              <footer className="meta">
                <p>Étudiant: {project.student}</p>
                <p>Directeur(e): {project.supervisor}</p>
                {project.cosupervisor && (
                  <p>Co-directeur(e)(s): {project.cosupervisor}</p>
                )}
              </footer>
              <div>
                {project.description.split("\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p> // key=i technically not recommanded but dont have a choice here
                ))}
              </div>
              {project.thesisUrl && (
                <p>
                  Pour plus d'informations,{" "}
                  <a href={project.thesisUrl}>cliquez ici</a>
                </p>
              )}
            </section>
            {publications.length > 0 && (
              <>
                <h2>Publications</h2>
                <PublicationTable
                  onDelete={() => fetchProject()}
                  publications={publications}
                />
              </>
            )}
          </>
        )
      )}
    </div>
  );
};
