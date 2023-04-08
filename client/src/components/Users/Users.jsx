import React, { useEffect, useState } from "react";
import { getAllPicsPerUser } from "../../services/pictureService";
import CardItem from "../Card/CardItem/CardItem";

const Users = () => {
  const [picturesByAuthor, setPicturesByAuthor] = useState([]);

  useEffect(() => {
    try {
      getAllPicsPerUser().then((res) => {
        console.log(res.data);
        setPicturesByAuthor(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="container">
      <h1 className="center">Потребители и техните снимки</h1>

      {picturesByAuthor &&
        picturesByAuthor.map((x) => {
          return (
            <>
              <h4 className="center">Author: {x.author}</h4>
              <div className="album">
                <CardItem data={x.pictures} />
              </div>
            </>
          );
        })}

    </div>
  );
};

export default Users;
