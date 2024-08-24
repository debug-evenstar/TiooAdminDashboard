import React from 'react';
import { ThreeCircles } from "react-spinners";

export const ThreeCirclesLoading = ({
    size,
    color,
  }: {
    size: string;
    color: string;
  }) => {
    return (
      <ThreeCircles
        height={size}
        width={size}
        color={color}
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    );
  };
