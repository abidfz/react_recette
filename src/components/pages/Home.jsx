import React from "react";
import Veggie from "../Veggie";
import Popular from "../Popular";
import Dessert from "../Dessert";

const Home = () => {
  return (
    <div>
      <Popular />
      <Veggie />
      <Dessert />
    </div>
  );
};

export default Home;
