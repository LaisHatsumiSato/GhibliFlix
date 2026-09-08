import iconScore from "../assets/score.png";
import duration from "../assets/clock.png";
import Button from "./Button";
import "../styles/Banner.css";

export default function Banner({ onClick, title, time, score, banner }) {
  return (
    <div className="banner-container">
      <div
        className="banner"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <div className="banner-content">
          <span className="info">
            <img className="infoIcon" src={iconScore} alt="Score" />
            <p>Score {score}</p>
            <img className="infoIcon" src={duration} alt="Duração" />
            <p>Duração {time} min</p>
          </span>
          <h1>{title}</h1>
          <span>
            <Button title="Ver Detalhes" onClick={onClick} />
          </span>
        </div>
      </div>
    </div>
  );
}
