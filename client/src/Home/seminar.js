import React from "react";

const Seminar = ({ feed }) => {
  return (
    <li key={feed._id}>
      <div className="icon">
        <img src="/img/presentation-icon.png" />
      </div>
      <div className="text">
        <div className=".post-date">{moment(feed.createdAt).format("LL")}</div>
        <div className="title">
          Prochain séminaire: <a href="#">{feed.title}</a>
        </div>
        <div className="presentator">{feed.presentator}</div>
        <div className="date">{moment(feed.date).format("LLLL")}</div>
        <div
          className="location"
          dangerouslySetInnerHTML={{ __html: feed.location }}
        />
      </div>
    </li>
  );
};

export default Seminar;
