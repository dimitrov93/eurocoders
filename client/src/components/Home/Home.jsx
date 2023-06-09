import React, { useEffect, useState } from "react";
import "./home.css";
import CardItem from "../Card/CardItem/CardItem";
import { getLastTenPictures } from "../../services/pictureService";

const Home = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    try {
      getLastTenPictures().then((res) => {
        setImages(res);
      });
    } catch (error) {}
  }, []);

  const handleDelete = () => {
    getLastTenPictures().then((res) => {
      setImages(res);
    });
  }

  const handleCommentAdded = () => {
    getLastTenPictures().then((res) => {
      setImages(res);
    })
  }
  
  return (
    <div className="container">
      <h1 className="center">Последните 10 снимки качени</h1>

      <div className="album">
        <CardItem data={images} onDelete={handleDelete} onCommentAdded={handleCommentAdded} />
      </div>
    </div>
  );
};

export default Home;
