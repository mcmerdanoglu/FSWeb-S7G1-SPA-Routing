import React from "react";
import { NavLink, useHistory } from "react-router-dom";

export default function FilmListesi(props) {
  return (
    <div className="movie-list">
      <NavLink activeClassName="active" exact to="/">
        {props.movies.map((movie) => (
          <FilmDetayları key={movie.id} movie={movie} />
        ))}
      </NavLink>
    </div>
  );
}

function FilmDetayları(props) {
  const { title, director, metascore } = props.movie;

  const history = useHistory();

  const moveTo = () => {
    history.push("/movies/:id");
  };

  return (
    <div className="movie-card" onClick={moveTo}>
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
    </div>
  );
}
