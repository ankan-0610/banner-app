import React, { useContext, useEffect, useState } from "react";
import { BannerContext } from "./BannerContext";
import './Banner.css'

const Banner = () => {
  const { banner } = useContext(BannerContext);
  const [timer, setTimer] = useState(banner.timer);

  useEffect(() => {
    setTimer(banner.timer);

    if (banner.visible && banner.timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [banner]);

  if (!banner.visible) {
    return (
      <div className="banner">
        <p>Visibility turned off</p>
      </div>
    );
  }

  return (
    <div className="banner">
      {timer > 0 ? (
        <>
          <p>{banner.description}</p>
          {banner.link && <a href={banner.link}>Click here</a>}
          <p>Time remaining: {timer} seconds</p>
        </>
      ) : (
        <p>Banner has expired</p>
      )}
    </div>
  );
};

export default Banner;