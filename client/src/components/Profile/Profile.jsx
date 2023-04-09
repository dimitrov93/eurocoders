import React, { useEffect, useState } from "react";
import "./profile.css";
import { useAuthContext } from "../../context/AuthContext";
import { getLastFiveUsers, getUserById } from "../../services/userService";
import { getLastFivePictures } from "../../services/pictureService";
import CardItem from "../Card/CardItem/CardItem";
import { AiFillEdit, AiOutlineCloudUpload } from "react-icons/ai";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuthContext();
  const [lastFiveUsers, setLastFiveUsers] = useState([]);
  const [lastFivePictures, setLastFivePictures] = useState([]);
  const [profile, setProfile] = useState({});
  // useEffect(() => {
  //   if (user.isAdmin) {
  //     getLastFiveUsers()
  //       .then((data) => setLastFiveUsers(data.data))
  //       .catch((error) => console.error(error));

  //     getLastFivePictures()
  //       .then((data) => setLastFivePictures(data))
  //       .catch((error) => console.error(error));
  //   }
  // }, [user.isAdmin]);

  useEffect(() => {
    try {
      getUserById(user._id).then((res) => {
        setProfile(res.data);
        if (res.data.isAdmin) {
          getLastFiveUsers()
            .then((data) => setLastFiveUsers(data.data))
            .catch((error) => console.error(error));

          getLastFivePictures()
            .then((data) => setLastFivePictures(data))
            .catch((error) => console.error(error));
        }
      });
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  return (
    <div className="container">
      <div className="profile-card center">
        <Link to={"/add"}>
          <span>
            Upload picture:
            <AiOutlineCloudUpload />
          </span>
        </Link>
        <Link to={`${profile._id}`}>
          <span>
            Edit profile:
            <AiFillEdit />{" "}
          </span>
        </Link>
        <img
          src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"
          alt="Profile Picture"
          className="profile-picture"
        />
        <h2 className="name">{profile?.username}</h2>
        <ul className="contact-info">
          <li>id: {profile?._id}</li>
          <li>Email: {profile?.email}</li>
          <li>Created at: {new Date(profile?.createdAt).toLocaleString()}</li>
          <li>Admin: {profile?.isAdmin ? "Yes" : "No"}</li>
        </ul>
      </div>

      {profile?.isAdmin ? (
        <>
          <h4>Last 5 registered users</h4>
          {lastFiveUsers.map((x, i) => {
            return (
              <ul key={i}>
                <li>{x.email}</li>
              </ul>
            );
          })}

          <h4>Last 5 added pictures</h4>
          <div className="album">
            {lastFivePictures.map((x, i) => {
              return (
                  <div className="album__section" key={i}>
                  <h5>Author: {x.author.username}</h5>
                  <img src={x.url} alt="picture" />
                  </div>

              );
            })}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;
