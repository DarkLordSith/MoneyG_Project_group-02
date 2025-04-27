import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { TbFaceIdError } from "react-icons/tb";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import CurrencyChart from "../CurrencyChart/CurrencyChart";
import currencyGraph from "./images/currency-graph.svg";
import css from "./Currency.module.css";

function Currency() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currencyRates, setCurrencyRates] = useState({ usd: null, eur: null });

  const fetchCurrencyRates = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://api.monobank.ua/bank/currency",
        {
          withCredentials: false,
        }
      );
      const usdCurrency = response.data.find(
        (item) => item.currencyCodeA === 840 && item.currencyCodeB === 980
      );
      const eurCurrency = response.data.find(
        (item) => item.currencyCodeA === 978 && item.currencyCodeB === 980
      );

      if (!usdCurrency || !eurCurrency) {
        throw new Error("Required currency data is missing.");
      }

      setCurrencyRates({
        usd: usdCurrency,
        eur: eurCurrency,
      });

      window.localStorage.setItem(
        "saved-currencyRates",
        JSON.stringify({
          usd: usdCurrency,
          eur: eurCurrency,
          fetchTime: Date.now(),
        })
      );
    } catch {
      setError("Too many requests, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const isCurrencyFresh = (savedData) => {
    const oneHour = 60 * 60 * 1000;
    const currentTime = Date.now();
    const parsedData = JSON.parse(savedData);
    return currentTime - parsedData.fetchTime < oneHour;
  };

  useEffect(() => {
    const savedCurrencyRates = window.localStorage.getItem(
      "saved-currencyRates"
    );
    if (savedCurrencyRates && isCurrencyFresh(savedCurrencyRates)) {
      const parsedCurrencyRates = JSON.parse(savedCurrencyRates);
      setCurrencyRates({
        usd: parsedCurrencyRates.usd,
        eur: parsedCurrencyRates.eur,
      });
      setError(null);
    } else {
      fetchCurrencyRates();
    }
  }, []);

  const isCurrencyLoaded = currencyRates?.usd && currencyRates?.eur;

  const isDesktop = useMediaQuery({ minWidth: 1280 });

  // Loader for currency
  const loader = () => {
    return (
      <div className={css.loaderBackdrop}>
        <div className={css.spinnerWrapper}>
          <ClipLoader
            color="#e15b64"
            loading={true}
            size="50px"
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

  return (
    <div className={css.container}>
      {loading && loader()}
      {!loading && error && (
        <div className={css.errorWrap}>
          <TbFaceIdError size="50px" />
          <span className={css.errorMsg}>{error}</span>
        </div>
      )}
      {!loading && !error && isCurrencyLoaded && (
        <div className={css.componentWrapper}>
          <CurrencyChart currencyRates={currencyRates} />
          <div className={css.graphicHolder}>
            <div className={css.graphic}>
              {isDesktop && (
                <>
                  <p className={`${css.rate} ${css.usdRate}`}>
                    {currencyRates.usd?.rateBuy.toFixed(2) || "-"}
                  </p>
                  <p className={`${css.rate} ${css.eurRate}`}>
                    {currencyRates.eur?.rateBuy.toFixed(2) || "-"}
                  </p>
                </>
              )}
              <img
                className={css.image}
                src={currencyGraph}
                alt="Currency graphic"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Currency;
