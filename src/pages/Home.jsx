import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Container.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Banner from "../components/Banner";
import CardMovie from "../components/CardMovie";
import { api_base } from "../api";

export default function Container() {
  const navegation = useNavigate();

  const [allMovies, setMovies] = useState([]);
  const [topMovies, setTopMovie] = useState([]);

  const settings = {
    dots: true,
    arrows: false,
    speed: 400,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  function getDetails(id) {
    navegation(`/movie/${id}`);
  }

  useEffect(() => {
    fetch(api_base)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.films);

        let top5 = data.films
          .filter((top) => top.rt_score > 95)
          .sort((a, b) => b.rt_score - a.rt_score);
        let top = top5.map((top) => top);
        setTopMovie(top);
      });
  }, []);
  return (
    <div className="container">
      <Slider {...settings} className="carousel">
        {topMovies.map((top) => (
          <Banner
            key={top.id}
            onClick={() => getDetails(top.id)}
            banner={top.movie_banner}
            title={top.title}
            score={top.rt_score}
            time={top.running_time}
          />
        ))}
      </Slider>

      <div className="movies">
        {allMovies.map((movie) => (
          <CardMovie
            onClick={() => getDetails(movie.id)}
            key={movie.id}
            title={movie.title}
            image={movie.image}
            height="275px"
            width="180px"
          />
        ))}
      </div>
    </div>
  );
}
