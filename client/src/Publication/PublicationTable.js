import React from "react";
import "./PublicationTable.css";

export default ({ onDelete, publications }) => {
  const handleDeletePublication = async id => {
    await fetch(`http://localhost:3000/api/publications/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: { "accept-language": "fr" }
    });
    onDelete && onDelete();
  };

  return (
    <table className="publications">
      <tbody>
        {publications.map(pub => (
          <tr key={pub._id}>
            <td>
              <div className="del-icon" data-id={pub._id}>
                <i
                  className="fa fa-trash-o fa-2x"
                  onClick={() => handleDeletePublication(pub._id)}
                />
              </div>
            </td>
            <td>
              <span className="annee">{pub.year}</span>
              <br />
              {pub.month && <span className="mois">{pub.month}</span>}
            </td>
            <td className="publication">
              <p className="pubtitle">{pub.title}</p>
              <p className="authors">{pub.authors.join(", ")}</p>
              <p className="venuetype">
                <i>{pub.venue}</i>
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
