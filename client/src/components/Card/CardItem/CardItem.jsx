import React from "react";
import { useAuthContext } from "../../../context/AuthContext";
import "./carditem.css";
import { deletePicture } from "../../../services/pictureService";
import { addComment } from "../../../services/commentService";

const CardItem = ({ data, onDelete, onCommentAdded  }) => {
  const { user } = useAuthContext();

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

  const handleSubmit = async (e, picId) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const content = formData.get("comment");
    try {
      const newComment = await addComment(picId, user._id, content )
      console.log(newComment);
      onCommentAdded(picId, content)
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      {data &&
        data.map((x) => {
          return (
            <div className="album__section" key={x._id}>
              <h5>Id: {x._id} </h5>
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
                      {x.comments && x.comments.map((x, i) => {
                        return (
                          <li key={i}>Comment {i + 1} from {x.email}: {x.content}</li>
                        )
                      })}

                    </ul>
                  </div>
                  <form onSubmit={(e) => {handleSubmit(e, x._id)}}>
                    <label htmlFor="comment">Add a Comment:</label>
                    <textarea id="comment" name="comment" ></textarea>
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
