import React, { useState } from "react";

export default function Checkbox() {
  const [state, setState] = useState({
    experian: true,
    equifax: true,
    transunion: false,
  });

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;

    console.log("Handle checkbox called");
    // console.log(e.target);
    console.log(value, checked);
    setState((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  return (
    <div>
      <input
        name="inquiries"
        type="checkbox"
        value="experian"
        checked={state.experian}
        onChange={handleCheckbox}
      />
      Experian
      <input
        name="inquiries"
        type="checkbox"
        value="equifax"
        checked={state.equifax}
        onChange={handleCheckbox}
      />
      Equifax
      <input
        name="inquiries"
        type="checkbox"
        value="transunion"
        checked={state.trans}
        onChange={handleCheckbox}
      />
      Transunion
    </div>
  );
}
