import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const BannerContext = createContext();

export const BannerProvider = ({ children }) => {
  const [banner, setBanner] = useState({
    description: "",
    timer: 0,
    link: "",
    visible: true,
  });

  useEffect(() => {
    const fetchBanner = async () => {
      const response = await axios.get(
        "http://astonishing-beauty-production.up.railway.app/api/banner"
      );
      setBanner(response.data);
    };

    fetchBanner();
  }, []);

  return (
    <BannerContext.Provider value={{ banner, setBanner }}>
      {children}
    </BannerContext.Provider>
  );
};
