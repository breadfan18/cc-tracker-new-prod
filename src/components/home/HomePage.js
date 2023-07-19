import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="jumbotron">
      <h2 className="sectionHeaders">Credit Cards Administration</h2>
      <p>Application to track credit card applications and rewards</p>
      <Link to="about" className="btn btn-primary btn-lg">
        Learn more
      </Link>
    </div>
  );
}
