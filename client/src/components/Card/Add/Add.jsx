import React, { useRef } from "react";

import { useAuthContext } from "../../../context/AuthContext";
import { createPicture } from "../../../services/pictureService";

const Add = () => {
    const { user } = useAuthContext();
    const userId = user._id
    const imgUrlRef = useRef(null)


   const onSubmitHandler = async (e) => {
    e.preventDefault()
    const imgUrl = imgUrlRef.current.value

    try {
        const newPic = await createPicture(userId, imgUrl)
        console.log(newPic);
    } catch (error) {
        console.error(error)
    }
   } 
  return (
    <div className="container center">
      <form onSubmit={onSubmitHandler}>
        <input type="text" name="image" ref={imgUrlRef} />
        <button type="submit">Create Picture</button>
      </form>
    </div>
  );
};

export default Add;
