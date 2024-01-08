import "../styles/popular.css";
import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

const Popular = () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);
  const getPopular = async () => {
    const check = localStorage.getItem("popular");

    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=12`
      );
      const data = await api.json();
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      console.log(data.recipes);
      setPopular(data.recipes);
    }
  };
  return (
    <div className="app__popular app__container">
      <h2>Popular Recipes</h2>
      <div className="app__cards">
        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            gap: "5rem",
          }}
        >
          {popular.map((recipe) => (
            <SplideSlide key={recipe.id}>
              <div className="app__card">
                <img src={recipe.image} alt={recipe.title} />
                <h3>{recipe.title}</h3>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default Popular;
