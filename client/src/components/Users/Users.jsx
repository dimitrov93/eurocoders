import React, { useEffect, useState } from "react";
import { getAllPicsPerUser } from "../../services/pictureService";
import CardItem from "../Card/CardItem/CardItem";

const Users = () => {
  const [picturesByAuthor, setPicturesByAuthor] = useState([]);

  useEffect(() => {
    try {
      getAllPicsPerUser().then((res) => {
        setPicturesByAuthor(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleDelete = () => {
    getAllPicsPerUser().then((res) => {
      setPicturesByAuthor(res.data);
    });
  }
  
  const handleCommentAdded = () => {
    getAllPicsPerUser().then((res) => {
      setPicturesByAuthor(res.data);
    })
  }

  return (
    <div className="container">
      <h1 className="center">Потребители и техните снимки</h1>

      {picturesByAuthor &&
        picturesByAuthor.map((x, i) => {
          return (
            <div key={i}>
              <h4 className="center">Author: {x.author}</h4>
              <div className="album" >
                <CardItem  data={x.pictures} onDelete={handleDelete} onCommentAdded={handleCommentAdded} />
              </div>
            </div>
          );
        })}

    </div>
  );
};

export default Users;
