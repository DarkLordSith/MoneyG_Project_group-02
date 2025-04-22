import { Form, Formik, Field, ErrorMessage } from "formik";
import {
  MdOutlineMailOutline,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";

import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.svg";
import s from "./LoginForm.module.css";
import { login } from "../../redux/auth/operations";
import FormButton from "../common/FormButton/FormButton";
import clsx from "clsx";
import * as Yup from "yup";

const LoginForm = () => {
  const dispatch = useDispatch();

  // Стейт для видимости пароля
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(login(values)).unwrap(); // works with createAsyncThunk
      actions.resetForm();
    } catch (error) {
      toast.error("User not found or wrong input details.");
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  return (
    <div className={s.backdrop}>
      <Toaster position="top-right" reverseOrder={false} />
      <motion.div
        className={s.sectionLogin}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className={s.wrapper}></div>
        <div className={s.modal}>
          <div className={clsx(s.logo)}>
            <img
              // style={{ width, height, fontSize }}
              src={logo}
              alt="Money Guard Logo"
            />
            <h2 className={s.textLogo}>Money Guard</h2>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className={s.form}>
              <div className={s.inputs}>
                {/* Email Field */}
                <div className={s.inputGroup}>
                  <MdOutlineMailOutline className={s.inputIcon} />
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className={s.input}
                    required
                  />
                  <div className={s.underline}></div>
                  <ErrorMessage
                    className={s.error}
                    name="email"
                    component="span"
                  />
                </div>

                {/* Password Field */}
                <div className={s.inputGroup}>
                  <MdLock className={s.inputIcon} />
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className={s.input}
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className={s.eyeIcon}
                  >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </span>
                  <div className={s.underline}></div>
                  <ErrorMessage
                    className={s.error}
                    name="password"
                    component="span"
                  />
                </div>
              </div>

              <div className={s.btns}>
                <FormButton
                  type="submit"
                  text="Log In"
                  variant="multiColorButtton"
                />
                <Link to="/register">
                  <FormButton
                    type="button"
                    text="Register"
                    variant="whiteButtton"
                  />
                </Link>
              </div>
            </Form>
          </Formik>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
