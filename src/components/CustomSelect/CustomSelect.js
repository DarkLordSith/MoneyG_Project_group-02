import React, { useState, useRef, useEffect } from "react";
import styles from "./CustomSelect.module.css";

const CustomSelect = ({ options, onChange, placeholder, value, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || "");
  const dropdownRef = useRef(null);

  // Закрытие выпадающего списка при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Обработчик выбора опции
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange && onChange({ target: { name, value: option } });
  };

  // Создаем SVG path элемент
  const pathElement = React.createElement("path", {
    d: "M1 1L9 8L17 1",
    stroke: "white",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    key: "arrow-path", // Добавляем уникальный ключ
  });

  // Создаем SVG элемент
  const svgElement = React.createElement(
    "svg",
    {
      className: isOpen ? styles.arrowUp : styles.arrow,
      width: "18",
      height: "9",
      viewBox: "0 0 18 9",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      key: "arrow-svg", // Добавляем уникальный ключ
    },
    pathElement
  );

  // Создаем элементы заголовка
  const spanElement = React.createElement(
    "span",
    { key: "header-text" },
    selectedOption || placeholder || "Select a category"
  );

  // Создаем заголовок с текстом и стрелкой
  const headerElement = React.createElement(
    "div",
    {
      className: styles.selectHeader,
      onClick: () => setIsOpen(!isOpen),
      key: "header-container", // Добавляем уникальный ключ
    },
    [spanElement, svgElement] // Передаем массив с элементами, у каждого есть свой ключ
  );

  // Создаем опции для выпадающего списка
  const optionElements = options.map((option, index) => {
    return React.createElement(
      "div",
      {
        key: `option-${index}-${option.replace(/\s+/g, "-")}`, // Создаем более надежный ключ
        className:
          selectedOption === option
            ? `${styles.option} ${styles.selected}`
            : styles.option,
        onClick: () => handleOptionClick(option),
      },
      option
    );
  });

  // Создаем контейнер для опций (только если список открыт)
  const optionsContainer = isOpen
    ? React.createElement(
        "div",
        {
          className: styles.optionsContainer,
          key: "options-container", // Добавляем уникальный ключ
        },
        optionElements
      )
    : null;

  // Собираем все элементы, которые будут в корневом div
  const children = [headerElement];
  if (optionsContainer) {
    children.push(optionsContainer);
  }

  // Собираем весь компонент воедино
  return React.createElement(
    "div",
    {
      className: styles.customSelect,
      ref: dropdownRef,
    },
    children // Передаем массив детей
  );
};

export default CustomSelect;
