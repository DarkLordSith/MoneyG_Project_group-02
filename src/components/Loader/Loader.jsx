import React from "react";
import { ColorRing } from "react-loader-spinner";
import { useSelector } from "react-redux";
import s from "./Loader.module.css";

const Loader = () => {
  // Отримуємо стан завантаження з Redux store (Підписуємось на global.isLoading)
  const isLoading = useSelector((state) => state.global?.isLoading);

  // Якщо немає завантаження, не відображаємо лоадер
  if (!isLoading) return null;

  return (
    <div className={s.loaderBackdrop}>
      <div className={s.spinnerWrapper}>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    </div>
  );
};

export default Loader;
