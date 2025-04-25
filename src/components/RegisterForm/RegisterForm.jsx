import {
  MdOutlineMailOutline,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdPerson,
} from "react-icons/md";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import clsx from "clsx";

import { register as registerThunk } from "../../redux/auth/operations";
import logo from "../LoginForm/images/logo.svg";
import s from "./RegisterForm.module.css";
import FormButton from "../common/FormButton/FormButton";
import PasswordStrengthCustom from "../PasswordStrengthCustom/PasswordStrengthCustom";

const schema = yup.object().shape({
  name: yup.string().required("Необхідно вказати ім'я"),
  email: yup
    .string()
    .trim("Зайві пробіли")
    .email("Неправильний формат електронної пошти")
    .required("Необхідно вказати електронну пошту"),
  password: yup
    .string()
    .min(6, "Пароль має бути не менше 6 символів")
    .max(12, "Пароль має містити не більше 12 символів")
    .required("Необхідно ввести пароль"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Паролі мають збігатися")
    .required("Будь ласка, підтвердьте свій пароль"),
});

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Паролі не збігаються");
      return;
    }

    const payload = {
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password,
    };

    try {
      await dispatch(registerThunk(payload)).unwrap();
    } catch (error) {
      const errorMsg = error?.message || "Щось пішло не так. Спробуйте ще раз.";
      toast.error(errorMsg);
    }
  };

  const handleEmailBlur = (e) => {
    const trimmed = e.target.value.trim();
    setValue("email", trimmed);
  };

  return (
    <div className={s.backdrop}>
      <div className={s.wrapper}></div>
      <div className={s.modal}>
        <div className={s.conmobile}>
          <div style={{ marginBottom: "40px" }} className={clsx(s.logo)}>
            <img src={logo} alt="Money Guard Logo" />
            <h2 className={s.textLogo}>Money Guard</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
            <div className={s.inputs}>
              <div className={s.inputGroup}>
                <MdPerson className={s.inputIcon} />
                <input
                  type="text"
                  placeholder="Name"
                  {...register("name")}
                  className={s.input}
                />
                <div className={s.underline}></div>
                {errors.name && (
                  <span className={s.error}>{errors.name.message}</span>
                )}
              </div>

              <div className={s.inputGroup}>
                <MdOutlineMailOutline className={s.inputIcon} />
                <input
                  type="email"
                  placeholder="E-mail"
                  {...register("email")}
                  onBlur={handleEmailBlur}
                  className={s.input}
                />
                <div className={s.underline}></div>
                {errors.email && (
                  <span className={s.error}>{errors.email.message}</span>
                )}
              </div>

              <div className={s.inputGroup}>
                <MdLock className={s.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  className={s.input}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className={s.eyeIcon}
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </span>
                <div className={s.underline}></div>
                {errors.password && (
                  <span className={s.error}>{errors.password.message}</span>
                )}
              </div>

              <div className={s.inputGroup} style={{ marginBottom: 0 }}>
                <MdLock className={s.inputIcon} />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm password"
                  {...register("confirmPassword")}
                  className={s.input}
                />
                <span
                  onClick={() => setShowConfirm(!showConfirm)}
                  className={s.eyeIcon}
                >
                  {showConfirm ? <MdVisibilityOff /> : <MdVisibility />}
                </span>
                <div className={s.underline}></div>
                {errors.confirmPassword && (
                  <span className={s.error}>
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <PasswordStrengthCustom password={watch("confirmPassword")} />
            </div>

            <div className={s.btns}>
              <FormButton
                type="submit"
                text="Register"
                variant="multiColorButtton"
              />
              <Link to="/login">
                <FormButton
                  type="button"
                  text="Log In"
                  variant="whiteButtton"
                />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
