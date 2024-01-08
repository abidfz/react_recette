import "../styles/popular.css";
import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

const Dessert = () => {
  const [dessert, setDessert] = useState([]);

  useEffect(() => {
    getHealthy();
  }, []);
  const getHealthy = async () => {
    const check = localStorage.getItem("dessert");

    if (check) {
      setDessert(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=12&tags=dessert`
      );
      const data = await api.json();
      localStorage.setItem("dessert", JSON.stringify(data.recipes));
      console.log(data.recipes);
      setDessert(data.recipes);
    }
  };
  return (
    <div className="app__popular app__container">
      <h2>Dessert</h2>
      <div className="app__cards">
        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            gap: "5rem",
          }}
        >
          {dessert.map((recipe) => (
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

export default Dessert;
