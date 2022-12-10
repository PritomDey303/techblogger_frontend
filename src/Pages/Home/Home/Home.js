import React from "react";
import About from "../About/About";
import CategoryArea from "../CategoryArea/CategoryArea";
import Hero from "../Hero/Hero";
import LatestPost from "../LatestPost/LatestPost";

const Home = () => {
  return (
    <section>
      <Hero />
      <CategoryArea />
      <LatestPost />
      <About />
    </section>
  );
};

export default Home;
