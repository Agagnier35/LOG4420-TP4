import React, { useState, useEffect } from "react";
import "./Publication.css";

import PublicationTable from "./PublicationTable";
import PublicationCreationModal from "./PublicationCreationModal";
import Loader from "../Loader/Loader";

export default ({ location, history }) => {
  const [showModal, setShowModal] = useState(false);
  const [publications, setPublications] = useState({
    count: 0,
    publications: []
  });
  const [pagingOptions, setPagingOptions] = useState({
    limit: 10,
    pageNumber: 1,
    sortBy: "date",
    orderBy: "desc"
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const fetchPublications = async () => {
    setLoading(true);
    const dataJSON = await fetch("http://localhost:3000/api/publications", {
      method: "GET",
      mode: "cors",
      header: { "accept-language": "fr" }
    });
    const data = await dataJSON.json();
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setPublications(data);
    }
    setLoading(false);
  };

  const createPublication = async pub => {
    setLoading(true);
    const dataJSON = await fetch("http://localhost:3000/api/publications", {
      method: "POST",
      mode: "cors",
      header: { "accept-language": "fr" }
    });
    const data = await dataJSON.json();
    if (data.errors) {
      setErrors(data.errors);
      setLoading(false);
    } else {
      fetchPublications();
    }
  };

  useEffect(() => {
    fetchPublications();
  }, [location.search]);

  const numberOfPages = Math.ceil(publications.count / pagingOptions.limit);

  const previousPageNumber =
    pagingOptions.pageNumber === 1
      ? pagingOptions.pageNumber
      : pagingOptions.pageNumber - 1;
  const nextPageNumber =
    pagingOptions.pageNumber === numberOfPages
      ? pagingOptions.pageNumber
      : pagingOptions.pageNumber + 1;

  // Fonction à exécuter si on change le type de trie: sort_by
  const fieldFilterHandler = e => {
    const search_params = new URLSearchParams(location.search);
    search_params.set("sort_by", e.target.value);
    history.push({
      pathname: location.pathname,
      search: "?" + search_params.toString()
    });
    setPagingOptions({ ...pagingOptions, sortBy: e.target.value });
  };

  // Fonction à exécuter si on change l'ordre de trie: order_by
  const filterAscValueHandler = e => {
    const search_params = new URLSearchParams(location.search);
    search_params.set("order_by", e.target.value);
    history.push({
      pathname: location.pathname,
      search: "?" + search_params.toString()
    });
    setPagingOptions({ ...pagingOptions, orderBy: e.target.value });
  };

  const elementsPerPageHandler = e => {
    const search_params = new URLSearchParams(location.search);
    search_params.set("limit", e.target.value);
    search_params.set("page", 1);
    history.push({
      pathname: location.pathname,
      search: "?" + search_params.toString()
    });
    setPagingOptions({
      ...pagingOptions,
      limit: Number(e.target.value),
      pageNumber: 1
    });
  };

  const paginationClickHandler = e => {
    const search_params = new URLSearchParams(location.search);
    search_params.set("limit", pagingOptions.limit);
    search_params.set("page", e.target.dataset.pagenumber);
    history.push({
      pathname: location.pathname,
      search: "?" + search_params.toString()
    });
    setPagingOptions({
      ...pagingOptions,
      pageNumber: Number(e.target.dataset.pagenumber)
    });
  };

  return (
    <div className="laoding-container">
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <>
          <h2>Publications</h2>
          {errors && errors.length > 0 && (
            <div className="errors">
              <p>
                Il y a des erreurs dans la soumission du formulaire. Veuillez
                les corriger.
              </p>
              <ul>
                {errors.map((err, i) => (
                  <li key={`error${i}`}>{err}</li>
                ))}
              </ul>
            </div>
          )}
          <button className="trigger" onClick={() => setShowModal(true)}>
            Ajouter une publication
          </button>
          <PublicationCreationModal
            show={showModal}
            createPublication={createPublication}
            onClose={setShowModal(false)}
          />
          <p>Trié par: </p>
          <select
            id="fieldFilterSection"
            defaultValue={pagingOptions.sortBy}
            onChange={fieldFilterHandler}
          >
            {["date", "title"].map(option => (
              <option key={`option${option}`} value={option}>
                {option}
              </option>
            ))}
          </select>
          <p>Ordonner par: </p>
          <select
            id="filterAscValueSection"
            defaultValue={pagingOptions.orderBy}
            onChange={filterAscValueHandler}
          >
            <option value="desc">décroissant</option>
            <option value="asc">croissant</option>
          </select>
          <PublicationTable
            onDelete={fetchPublications}
            publications={publications}
          />
          <div className="pagination">
            <a
              className="pagination-link"
              data-pagenumber={previousPageNumber}
              onClick={paginationClickHandler}
            >
              &laquo;
            </a>
            {[...Array(numberOfPages).keys()]
              .map(p => p + 1)
              .map(page => (
                <a
                  key={`pagination-link-${page}`}
                  className={`pagination-link ${
                    page === pagingOptions.pageNumber ? "active" : ""
                  }`}
                  data-pagenumber={page}
                  onClick={paginationClickHandler}
                >
                  {page}
                </a>
              ))}
            <a
              className="pagination-link"
              data-pagenumber={nextPageNumber}
              onClick={paginationClickHandler}
            >
              &raquo;
            </a>
          </div>
          <p>
            Afficher{" "}
            <select
              id="elementsPerPageSection"
              defaultValue={pagingOptions.limit}
              onChange={elementsPerPageHandler}
            >
              {[10, 20, 30, 50, 100].map(value => (
                <option key={`option${value}`} value={value}>
                  {value}
                </option>
              ))}
            </select>{" "}
            résultats par page
          </p>
        </>
      )}
    </div>
  );
};
