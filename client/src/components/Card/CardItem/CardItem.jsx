import React, { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import "./carditem.css";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../utils/apiConfig";
import { deletePicture } from "../../../services/pictureService";

const CardItem = ({ data, onDelete  }) => {
  const { user } = useAuthContext();
  const [isImageDeleted, setIsImageDeleted] = useState(false);

  const onDeleteHandler = (e, id) => {
    e.preventDefault();
    let confirmation = window.confirm(
      "Are you sure that you would like to delete this image?"
    );

    if (confirmation) {
      try {
        deletePicture(id, user._id).then(res => {
          onDelete()
        })
      } catch (error) {
        console.error(error)
      }
    }
  };

  return (
    <>
      {data &&
        data.map((x) => {
          return (
            <div className="album__section" key={x._id}>
              <h5>Author: {x.author.email}</h5>
              <h5>Date: {new Date(x.createdAt).toLocaleString()}</h5>
              <img src={x.url} alt="" />
              <div className="album__btn">
                {x.author._id === user._id ? (
                  <>
                    <button className="active__btn edit">Edit</button>
                    {/* <Link to={`${BASE_URL}/api/pictures/`}> */}
                    <span
                      className="active__btn delete"
                      onClick={(e) => onDeleteHandler(e, x._id)}
                    >
                      Delete
                    </span>
                    {/* </Link> */}
                  </>
                ) : (
                  ""
                )}
              </div>

              {user.email && (
                <>
                  <div className="album__comments">
                    <h3>Comments:</h3>
                    <ul>
                      <li>Comment 1</li>
                      <li>Comment 2</li>
                      <li>Comment 3</li>
                    </ul>
                  </div>
                  <form>
                    <label htmlFor="comment">Add a Comment:</label>
                    <textarea id="comment" name="comment"></textarea>
                    <button type="submit">Submit</button>
                  </form>
                </>
              )}
            </div>
          );
        })}
    </>
  );
};

export default CardItem;
