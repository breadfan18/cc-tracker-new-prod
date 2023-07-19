import React from "react";
import PropTypes from "prop-types";

const EmptyList = ({ dataType }) => {
  return (
    <div className="alert alert-danger" role="alert">
      <p style={{ marginBottom: "0" }}>
        No {`${dataType}s`} to display. Add a new {dataType}.
      </p>
    </div>
  );
};

EmptyList.propTypes = {
  dataType: PropTypes.string.isRequired,
};

export default EmptyList;
