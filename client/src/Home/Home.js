import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import Feeds from "./feeds";

import "./Home.css";

export default () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFeeds();
  }, []);

  const fetchFeeds = async () => {
    setLoading(true);
    const dataJSON = await fetch("http://localhost:3000/api/feed", {
      method: "GET",
      mode: "cors",
      headers: { "accept-language": "fr" }
    });
    const data = await dataJSON.json();
    setFeeds(data);
    setLoading(false);
  };

  return (
    <>
      <div className="jumbotron">
        <p>
          Le <strong>laboratoire Semantic IA</strong> est un laboratoire de
          recherche qui lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aenean eu nunc pretium, finibus quam in, varius urna. Nunc vestibulum
          at nibh at egestas. Nulla interdum iaculis dui, quis varius lacus
          elementum id. Vestibulum ante ipsum primis in faucibus orci luctus et
          ultrices posuere cubilia Curae; Sed eu imperdiet felis. Etiam
          hendrerit id libero quis ultricies. Nunc molestie tellus ultrices elit
          molestie tincidunt. Mauris id interdum turpis. Nullam fermentum ornare
          arcu, id vehicula leo. Vestibulum ante ipsum primis in faucibus orci
          luctus et ultrices posuere cubilia Curae; Vivamus aliquam dignissim
          volutpat. Nunc sit amet varius risus. Curabitur ex libero, rhoncus
          tincidunt hendrerit et, feugiat ut purus.
        </p>
        <p>
          Nunc id sodales odio, ut pretium tortor. Sed gravida semper est et
          finibus. Mauris vulputate fringilla nulla et pretium. Nulla facilisi.
          Maecenas scelerisque convallis dui tincidunt volutpat. Curabitur vitae
          feugiat tortor. Duis vitae turpis consequat, lacinia nisl vitae,
          lobortis nisi. Mauris aliquet, felis in blandit cursus, odio arcu
          suscipit sem, id blandit massa eros non nunc. Fusce ac sodales tellus,
          vel efficitur metus.
        </p>
        <p>
          In congue, justo at auctor consequat, dolor eros laoreet augue, sit
          amet molestie felis massa sed nunc. Curabitur at nibh et ipsum
          facilisis molestie. Donec dictum dapibus diam, sed fringilla tellus
          tincidunt ut. Nam porttitor in diam ut dapibus. Cras sit amet diam
          odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          sit amet eros quis sem imperdiet suscipit. Fusce luctus turpis ut
          metus convallis, ac ornare augue fermentum. Phasellus aliquet, elit eu
          tempus aliquam, odio est tristique quam, quis luctus augue lorem sit
          amet lorem. Quisque tellus sem, rutrum vitae hendrerit in, tempus
          vitae neque. Morbi blandit sagittis risus a placerat.
        </p>
      </div>
      <h2>Nouvelles</h2>
      <div className="loading-container">
        {loading ? <Loader /> : <Feeds feeds={feeds} />}
      </div>
    </>
  );
};
