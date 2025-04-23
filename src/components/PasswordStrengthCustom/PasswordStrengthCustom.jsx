import React from "react";
import styles from "./RegisterPage.module.css";

const PasswordStrengthCustom = ({ password }) => {
  const getStrength = (pwd) => {
    if (!pwd) return 0;
    if (pwd.length < 6) return 0;
    if (pwd.length <= 7) return 25;
    if (pwd.length <= 9) return 50;
    if (pwd.length <= 11) return 75;
    return 100;
  };

  const getColor = (strength) => {
    if (strength === 0) return "#b8b8b8"; 
    if (strength <= 25) return "#ff4d4f"; 
    if (strength <= 50) return "#f7b733"; 
    if (strength <= 75) return "#45b649"; 
    return "#007aff"; 
  };

  const strength = getStrength(password);
  const color = getColor(strength);

  return (
    <div className={styles.passwordStrengthBar}>
      <div
        className={styles.strengthFill}
        style={{
          width: `${strength}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
};

export default PasswordStrengthCustom;