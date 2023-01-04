import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/Home.css";

const Home = () => {
  return (
    <div className="hero-section">
      <h1 className="hero-section__title mb-3">Mailpiece Calculator</h1>
      <div className="two-col-container d-flex">
        <div className="col1">
          <h2>
            No Mess.
            <br />
            No Mockups.
            <br />
            No Time Wasted.
          </h2>
          <h5>Calculate Mailpiece Weight & Thickness</h5>
        </div>

        <div className="col2">
          <Link to="./calculator">
            <Button variant="outline-primary">Go To App</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
