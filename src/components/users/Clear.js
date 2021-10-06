import React from "react";

export const Clear = ({ clearAll }) => {
  return (
    <div>
      <input
        type="button"
        value="Clear"
        className="btn btn-light btn-block"
        onClick={() => clearAll()}
      />
    </div>
  );
};
