import { Link, useNavigate } from "react-router-dom"; // Add useNavigate for redirection
import { useState, useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import apiRequest from "../../lib/apiRequest";
import "./card.scss";

function Card({ item }) {
  console.log("Card item:", item); // Keep this for debugging the 'item' structure
  const { CurrentUser } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate

  // Add defensive checks for CurrentUser and item.savedPosts
  const [saved, setSaved] = useState(() => {
    // Check if CurrentUser exists AND CurrentUser.id exists AND item.savedPosts is an array
    if (CurrentUser && CurrentUser.id && Array.isArray(item.savedPosts)) {
      return item.savedPosts.some(post => post.userId === CurrentUser.id);
    }
    return false; // Default to not saved if CurrentUser or savedPosts are not ready
  });

  const handleSave = async (id) => {
    if (!CurrentUser) {
      navigate("/login");
      return; // Stop execution if no user
    }
    setSaved((prev) => !prev); // Optimistic UI update

    try {
      await apiRequest.post('/users/save', { postId: id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev); // Revert if API call fails
    }
  };

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">₹ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div
              className="icon"
              onClick={() => { handleSave(item.id) }}
              style={{
                backgroundColor: saved ? "#fece51" : "white"
              }}
            >
              <img src="/save.png" alt="" />
              {saved ? "Place Saved" : "Save Place"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;