import React, { useState } from "react";
import moment from "moment";

export default ({ show, createPublication, onClose }) => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState([""]);
  const [venue, setVenue] = useState("");

  const monthNames = moment.months();

  const changeAuthor = (index, value) => {
    setAuthors(
      authors.map((author, i) => {
        if (index !== i) return author;
        return value;
      })
    );
  };

  return (
    <div hidden={!show} className="modal show-modal">
      <div className="modal-content">
        <i
          className="fa fa-window-close da-2x close-button"
          onClick={onClose}
        />
        <h2>Création d'une publication</h2>
        <form
          onSubmit={() => {
            createPublication({ year, month, title, authors, venue });
            onClose();
          }}
        >
          <label htmlFor="year">Année:</label>
          <input
            type="number"
            name="year"
            min="1900"
            max="2099"
            step="1"
            value={year}
            placeholder="Année"
            onChange={e => setYear(e.target.value)}
          />

          <br />

          <label htmlFor="month">Mois:</label>
          <select
            name="month"
            value={month}
            onChange={e => setMonth(e.target.value)}
          >
            <option value=""> Mois - </option>
            {monthNames.map((monthName, i) => (
              <option key={monthName} value={i}>
                {monthName.charAt(0).toUpperCase() + monthName.slice(1)}
              </option>
            ))}
          </select>

          <br />

          <label htmlFor="title">Titre:</label>
          <input
            type="text"
            name="title"
            placeholder="Titre"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <br />

          <label htmlFor="authors">Auteur:</label>
          <br />
          {authors.map((author, i) => (
            <React.Fragment key={`author${i}`}>
              <div className="author-input">
                <input
                  type="text"
                  name="authors[]"
                  placeholder="Auteur"
                  value={author}
                  onChange={e => changeAuthor(i, e.target.value)}
                />
              </div>
              {i > 0 && (
                <div className="remove-author">
                  <i
                    className="fa fa-minus fa-3x"
                    onClick={() =>
                      setAuthors([
                        ...authors.slice(0, i),
                        ...authors.slice(i + 1)
                      ])
                    }
                  />
                </div>
              )}
            </React.Fragment>
          ))}
          <div className="add-author">
            <i
              className="fa fa-plus fa-3x"
              onClick={() => setAuthors([...authors, ""])}
            />
          </div>

          <label htmlFor="venue">Revue:</label>
          <input
            type="text"
            name="venue"
            placeholder="Revue"
            value={venue}
            onChange={e => setVenue(e.target.value)}
          />

          <br />

          <input type="submit" value="Création d'une publication" />
        </form>
      </div>
    </div>
  );
};
