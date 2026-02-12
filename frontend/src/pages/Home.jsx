import React from "react";
import Hero from "../components/Hero";
import LatestCollectioon from "../components/LatestCollectioon";
import BestSealer from "../components/BestSealer";
import Ourpolicy from "../components/Ourpolicy";
import { Link, NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollectioon />
      <NavLink
        to={"/collection"}
        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
      >
        <div className=" flex justify-center ">
          
       <button className="btn "> رؤية المزيد</button>
 
        </div>
      </NavLink>
      <BestSealer />
      <Ourpolicy />
    </div>
  );
};

export default Home;
