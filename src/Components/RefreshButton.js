import React from "react";

import refreshBlack from "../Assets/refresh_black_24dp.svg";
import refreshWhite from "../Assets/refresh_white_24dp.svg";

export const RefreshButton = ({ refreshData, isRotating, theme }) => {
  return (
    <button
      className={`ml-6 ${isRotating ? "rotate-once" : ""}`}
      onClick={refreshData}
    >
      {theme === "dark" ? (
        <img src={refreshWhite} alt="Refresh" />
      ) : (
        <img src={refreshBlack} alt="Refresh" />
      )}
    </button>
  );
};
