import React, { useRef, useState } from "react";

import { useAuthContext } from "../../../context/AuthContext";
import { createPicture } from "../../../services/pictureService";

const Add = () => {
    const { user } = useAuthContext();
    const userId = user._id
    const imgUrlRef = useRef(null)
    const [message, setMessage] = useState('')

   const onSubmitHandler = async (e) => {
    e.preventDefault()
    const imgUrl = imgUrlRef.current.value

    try {
        await createPicture(userId, imgUrl)
        setMessage('Picture has been added')
        imgUrlRef.current.value = ''
    } catch (error) {
      setMessage(error.message)
        console.error(error)
    } finally {
        setTimeout(() => {
          setMessage('');
        }, 3000);
    }
   } 
  return (
    <div className="container center">
      <h3>Качване на снимка</h3>
      <form onSubmit={onSubmitHandler}>
        <input type="text" name="image" ref={imgUrlRef} placeholder="Place url for your picture" />
        <button type="submit">Upload Picture</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Add;
