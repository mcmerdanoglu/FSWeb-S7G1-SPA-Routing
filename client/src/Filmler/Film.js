import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

export default function Film(props) {
  const history = useHistory();
  const [movie, setMovie] = useState();

  //let id = 1;
  // URL'den alınan :id parametresini bu değişkene aktarın
  // App.js'den <Route path="/movies/:id">
  let { id } = useParams();
  const { save } = props;

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/filmler/${id}`) // Bu uç noktayı Postman'le çalışın
      .then((response) => {
        // Bu kısmı log statementlarıyla çalışın
        // ve burdan gelen response'u 'movie' e aktarın
        console.log(response.data);
        setMovie(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // Bu effect her `id ` değiştiğinde çalışmalı
    // Bunu nasıl gerçekleştirebiliriz?
  }, [id]);

  // Yalnızca esnek görevlere geçtiğinizde burdaki yorum etiketini kaldırın
  // const filmiKaydet = evt => { }

  if (!movie) {
    return <div>Film bilgisi yükleniyor...</div>;
  }

  const saveAction = () => {
    save(id);
    history.push("/");
  };

  const { title, director, metascore, stars } = movie;
  // const title = movie.title;
  // const director = movie.director;

  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map((star) => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>
      <div onClick={() => saveAction()} className="save-button">
        Kaydet
      </div>
    </div>
  );
}
