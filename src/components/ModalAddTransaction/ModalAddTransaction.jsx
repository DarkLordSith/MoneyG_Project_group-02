import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import styles from "./ModalAddTransaction.module.css";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";

const ModalAddTransaction = ({ closeModal }) => {
  const [isIncome, setIsIncome] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);
  const formRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEscKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEscKey);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [closeModal]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  const toggleTransactionType = () => setIsIncome(!isIncome);

  const getClasses = (baseClass, mobileClass, tabletClass, desktopClass) => {
    const classes = [baseClass];
    if (isMobile && mobileClass) classes.push(mobileClass);
    if (isTablet && tabletClass) classes.push(tabletClass);
    if (isDesktop && desktopClass) classes.push(desktopClass);
    return classes.filter(Boolean).join(" ");
  };

  const modalContainerClasses = [
    styles.modalContainer,
    !isIncome ? styles.expenseContainer : "",
    isMobile ? styles.modalContainerMobile : "",
    isTablet ? styles.modalContainerTablet : "",
    isDesktop ? styles.modalContainerDesktop : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleFormRef = (formSubmitHandler, isValid) => {
    formRef.current = {
      submitHandler: formSubmitHandler,
      isValid: isValid,
    };
  };

  const handleAddTransaction = async () => {
    setShowErrors(true);

    if (formRef.current && formRef.current.isValid && !isSubmitting) {
      try {
        setIsSubmitting(true);
        await formRef.current.submitHandler();
        closeModal();
      } catch (error) {
        console.error("Ошибка при добавлении транзакции:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleBackdropClick}
      ref={modalRef}
    >
      <div
        className={modalContainerClasses}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalBackground}></div>
        <div className={styles.closeButton}>
          <button onClick={closeModal}>
            <X className={styles.closeIcon} />
          </button>
        </div>

        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Add transaction</h2>
        </div>

        <div
          className={getClasses(
            styles.toggleContainer,
            styles.toggleContainerMobile
          )}
        >
          <div className={styles.toggleWrapper}>
            <div
              className={`${styles.toggleOption} ${isIncome ? styles.activeIncome : ""}`}
              onClick={() => setIsIncome(true)}
            >
              Income
            </div>
            <div
              className={styles.toggleSwitch}
              onClick={toggleTransactionType}
            >
              <div
                className={`${styles.toggleSlider} ${isIncome ? "" : styles.sliderRight}`}
              ></div>
            </div>
            <div
              className={`${styles.toggleOption} ${!isIncome ? styles.activeExpense : ""}`}
              onClick={() => setIsIncome(false)}
            >
              Expense
            </div>
          </div>
        </div>

        <AddTransactionForm
          closeModal={closeModal}
          transactionType={isIncome ? "income" : "expense"}
          onFormRef={handleFormRef}
          showErrors={showErrors}
        />

        <div
          className={getClasses(
            styles.buttonsContainer,
            styles.buttonsContainerMobile,
            styles.buttonsContainerTablet,
            styles.buttonsContainerDesktop
          )}
        >
          <button
            type="button"
            className={getClasses(
              styles.addButton,
              styles.addButtonMobile,
              styles.addButtonTablet,
              styles.addButtonDesktop
            )}
            onClick={handleAddTransaction}
            disabled={isSubmitting}
          >
            {isSubmitting ? "ADDING..." : "ADD"}
          </button>
          <button
            className={getClasses(
              styles.cancelButton,
              styles.cancelButtonMobile,
              styles.cancelButtonTablet,
              styles.cancelButtonDesktop
            )}
            onClick={closeModal}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddTransaction;
