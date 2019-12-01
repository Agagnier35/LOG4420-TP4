import React from "react";

const News = ({ feed }) => {
  return (
    <li>
      <div className="icon">
        <i className="fa fa-file-text-o" />
      </div>
      <div className="text">
        <div
          className="title"
          dangerouslySetInnerHTML={{ __html: feed.text }}
        />
      </div>
    </li>
  );
};

export default News;
