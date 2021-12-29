import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  detailsUser,
  updateUserProfile,
} from "../../redux/actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../../redux/constants/userConstants";
import "./profile.css";

export default function Profile() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.userSignin);
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.userUpdateProfile);

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
    }

    dispatch(updateUserProfile({ userId: user._id, name, email, password }));
  };

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <form className="profile-form" onSubmit={handleSubmit}>
          <h1>PROFILE</h1>
          {loading ? (
            "Loading..."
          ) : error ? (
            { error }
          ) : (
            <>
              {loadingUpdate && "Loading..."}
              {errorUpdate && { error }}
              {successUpdate && "Profile updated successfully!"}
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="confirmPassword"
                id="confirmPassword"
                placeholder="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button className="center" type="submit">
                UPDATE
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
