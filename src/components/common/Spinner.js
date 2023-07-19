import React from "react";
import "./Spinner.css";

export function Spinner() {
  return <div className="loader">Loading..</div>;
}

export function HeaderSpinner() {
  return (
    <div className="spinner-border spinner-grow-sm" role="status">
      <span className="sr-only"></span>
    </div>
  );
}
