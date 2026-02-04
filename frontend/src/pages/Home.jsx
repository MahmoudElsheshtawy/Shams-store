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
      <NavLink  to={"/collection"}
       onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
      >
        <button className="btn">
          See more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            height="15px"
            width="15px"
            className="icon"
          >
            <path
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width="1.5"
              stroke="#292D32"
              d="M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008"
            ></path>
          </svg>
        </button>
      </NavLink>
      <BestSealer />
      <Ourpolicy />
    </div>
  );
};

export default Home;
