import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { api_base } from "../api";

import "../styles/MovieDetails.css";

import backIcon from "../assets/back.png";
import durationIcon from "../assets/clock.png";
import releaseIcon from "../assets/calendar.png";
import scoreIcon from "../assets/score.png";

import ImageMovie from "../components/ImageDetails";

export default function Details() {
  const params = useParams();
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetch(api_base+params.id)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      });
  }, []);

  return (
    <div
      className="detailsContainer"
      style={{
        background: `url(${movie.movie_banner}) no-repeat center`,
      }}
    >
      <div className="movieDetails">
        <Link className="backIcon" to="/">
          <img src={backIcon} alt="back to home" />
        </Link>

        <div className="infos">
          <div className="titles">
            <h1>{movie.title}</h1>
            <h4>
              {movie.original_title_romanised} - {movie.original_title}
            </h4>
          </div>
          <div className="cardMovie">
            <ImageMovie image={movie.image} />
          </div>

          <div className="infoMovie">
            <ul>
              <li>
                <img src={scoreIcon} className="icon" /> Score {movie.rt_score}
              </li>
              <li>
                <img src={releaseIcon} className="icon" /> Ano{" "}
                {movie.release_date}
              </li>
              <li>
                <img src={durationIcon} className="icon" /> Duração{" "}
                {movie.running_time} min.
              </li>
            </ul>
          </div>

          <div className="description">{movie.description}</div>

          <div className="directionInfo">
            <ul>
              <li>
                Director: <span>{movie.director}</span>
              </li>
              <li>
                Producer: <span>{movie.producer}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
