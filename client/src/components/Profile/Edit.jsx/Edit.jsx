import React, { useContext, useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import "./edit.css";
import { updateUser } from "../../../services/userService";
import { useParams } from "react-router-dom";
import { getLastFiveUsers, getUserById } from "../../../services/userService";

const Edit = () => {
  const [profile, setProfile] = useState({});
  const { user } = useAuthContext();
  const { id } = useParams();
  const [values, setValues] = useState({
    username: profile.username,
    email: profile.email,
  });

  useEffect(() => {
    setValues({
      username: profile.username,
      email: profile.email,
    });
  }, [profile]);

  useEffect(() => {
    try {
      getUserById(user._id).then((res) => {
        console.log(res.data);
        setProfile(res.data);
      });
    } catch (error) {}
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    try {
      updateUser(id, data).then((res) => {
        console.log(res.data);
      });
    } catch (error) {}
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <form className="edit__card" onSubmit={onSubmitHandler}>
        <label htmlFor="username-input">Username:</label>
        <input
          id="username-input"
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
        />
        <label htmlFor="email-input">Email:</label>
        <input
          id="email-input"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <button type="submit" className="save-profile-btn">
          Save
        </button>
        <button
          type="button"
          className="cancel-profile-btn"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Edit;
