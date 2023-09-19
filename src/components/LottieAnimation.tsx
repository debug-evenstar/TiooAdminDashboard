import Lottie from "lottie-react";
import React from "react";


interface LottieProps {
  data?: any
}

const LottieAnimation: React.FC<LottieProps> = ({ data }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: data,

    // renderer: "svg"
  };

  return (
    <div>
      <Lottie {...defaultOptions} height={100} width={100} />
    </div>
  );
};

export default LottieAnimation;
