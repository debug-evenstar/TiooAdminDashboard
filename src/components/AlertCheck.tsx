import React from "react";

export const SuccessCheck = () => {
  return (
    <>
      <div className="animation-ctn">
        <div className="icon icon--order-success svg flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="154px" height="154px">
            <g fill="none" stroke="#4f46e5" stroke-width="2">
              <circle
                cx="77"
                cy="77"
                r="52"
                className=""
                strokeDasharray="480px, 480px"
                strokeDashoffset="960px"
              ></circle>
              <circle
                id="colored"
                fill="#4f46e5"
                cx="77"
                cy="77"
                r="52"
                strokeDasharray="480px, 480px"
                strokeDashoffset="960px"
              ></circle>
              <polyline
                className="st0"
                stroke="#fff"
                stroke-width="6"
                points="43.5,77.8 63.7,97.9 112.2,49.4 "
                strokeDasharray="100px, 100px"
                strokeDashoffset="200px"
              />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
};

export const FailureCheck = () => {
    return (
      <>
        <div className="animation-ctn">
          <div className="icon icon--order-success svg flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="154px" height="154px">
              <g fill="none" stroke="#F44812" stroke-width="2">
                <circle
                  cx="77"
                  cy="77"
                  r="52"
                  strokeDasharray="480px, 480px"
                  strokeDashoffset="960px"
                ></circle>
                <circle
                  id="colored"
                  fill="#F44812"
                  cx="77"
                  cy="77"
                  r="52"
                  strokeDasharray="480px, 480px"
                  strokeDashoffset="960px"
                ></circle>
                <polyline
                  className="st0"
                  stroke="#fff"
                  stroke-width="6"
                  points="43.5,77.8  112.2,77.8 "
                  strokeDasharray="100px, 100px"
                  strokeDashoffset="200px"
                />
              </g>
            </svg>
          </div>
        </div>
      </>
    );
  };