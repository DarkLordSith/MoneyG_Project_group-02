import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import s from "./Loader.module.css";

const MIN_LOADER_TIME = 300; // Минимальное время отображения лоадера в мс

const Loader = () => {
  const isLoading = useSelector((state) => state.global?.isLoading);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (isLoading) {
      // Показываем лоадер немедленно при isLoading=true
      setShouldShow(true);
    } else {
      // При isLoading=false даем лоадеру минимальное время отображения
      timeoutId = setTimeout(() => {
        setShouldShow(false);
      }, MIN_LOADER_TIME);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isLoading]);

  // Если лоадер не должен показываться, не рендерим ничего
  if (!shouldShow) return null;

  return (
    <div className={s.loaderBackdrop}>
      <div className={s.spinnerWrapper}>
        <ClipLoader
          color="#e15b64"
          loading={true}
          size={80}
          aria-label="Loading Spinner"
          speedMultiplier={0.8}
          cssOverride={{
            borderWidth: "10px",
          }}
        />
      </div>
    </div>
  );
};

export default Loader;
