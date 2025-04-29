import React from "react";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import s from "./Loader.module.css";

const Loader = () => {
  // Отримуємо стан завантаження з Redux store (підписуємось на global.isLoading)
  const isLoading = useSelector((state) => state.global?.isLoading);

  // Якщо немає завантаження, не відображаємо лоадер
  if (!isLoading) return null;

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
