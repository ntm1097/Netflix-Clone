import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // <-- Add this import
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";

const Player = () => {
  const { id } = useParams(); // <-- Get the movie id from the URL
 
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODBmMTE4NDEyZGFjYzgwZGU3Njc0OWYzMWM0NTVjYiIsIm5iZiI6MTc1MzE5NzA1Mi4yMjgsInN1YiI6IjY4N2ZhOWZjNWE4NTliZTlkNWY3NzI5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4-T_zGzQB7iKyjsUJL7EbUzszuww0qkptok7ZWRiZ9M",
    },
  };

  useEffect(() => {
    if (!id) return; // Don't fetch if id is not present
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results?.[0] || {}))
      .catch((err) => console.error(err));
  }, [id]); // <-- Add id as a dependency

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-1)}} />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}?autoplay=1`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
