import React from "react";
import Seminar from "./seminar";
import News from "./news";

const Feed = ({ feed }) => {
  if (feed.length === 0) {
    return <p>Aucune nouvelle</p>;
  }
  return (
    <ul className="news">
      {feed.map(feed => {
        if (feed.type === "seminar") {
          return <Seminar feed={feed} />;
        } else if (feed.type === "news") {
          return <News feed={feed} />;
        }
      })}
    </ul>
  );
};

export default Feed;
