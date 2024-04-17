"use client";

import { ThreeCircles } from "react-loader-spinner";
const Loading = () => {
  return (
    <div className="flex w-full justify-center pt-20">
      <ThreeCircles
        visible={true}
        height="50"
        width="50"
        color="#4682a9"
        ariaLabel="three-circles-loading"
      />
    </div>
  );
};

export default Loading;
