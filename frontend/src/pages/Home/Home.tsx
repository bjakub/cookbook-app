import React from "react";
import { Container } from "./Home.styled";
import { MyDishes } from "../../components/Home/MyDishes/MyDishes";
import { RandomDishes } from "../../components/Home/RandomDishes/RandomDishes";

export const Home = () => {
  return (
    <Container>
      <MyDishes />
      <RandomDishes />
    </Container>
  );
};
