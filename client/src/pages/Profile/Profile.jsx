import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "../../redux/actions/userActions";
import "./profile.css";

export default function Profile() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);
  const { loading, error, user } = useSelector((state) => state.userDetails);

  useEffect(() => {
    dispatch(detailsUser(userInfo._id));
  }, [dispatch, userInfo._id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: dispatch update profile
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
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                value={user.name}
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={user.email}
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="password"
                value={user.password}
              />

              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="confirmPassword"
                id="confirmPassword"
                placeholder="confirmPassword"
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
