import React, { useEffect, useState } from "react";
import "./details.css";
import { useParams } from "react-router-dom";
import { getById } from "../../../services/pictureService";

const Detail = () => {
    let picId = useParams().id 
    const [picture, setPicture] = useState({})
    useEffect(() => {
      getById(picId).then(res => {
        setPicture(res.data);
      })
    

    }, [])
    
  return (
    <div className="container">
      <div class="picture-container">
        <img src={picture.url} alt="Picture" />
        <div class="info-container">
          <p class="author-name">Author Name: {picture?.author?.username}</p>
          <ul class="comments">

            <li>Comment 1</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Detail;
