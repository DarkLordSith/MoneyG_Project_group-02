import axios from "axios";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ClipLoader } from "react-spinners";
import { TbFaceIdError } from "react-icons/tb";
import css from "./Currency.module.css";
import currencyGraph from "./images/currency-graph.svg";

function Currency() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currencyRates, setCurrencyRates] = useState({ usd: null, eur: null });

  const fetchCurrencyRates = async () => {
    setLoading(true);
    setError(false);

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
      setError("Failed to load currency rates");
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
      setError(false);
      return;
    }

    fetchCurrencyRates();
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
          <table className={css.table}>
            <thead className={css.thead}>
              <tr className={css.mainRow}>
                <th className={css.th}>Currency</th>
                <th className={css.th}>Purchase</th>
                <th className={css.th}>Sale</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={css.td}>USD</td>
                <td className={css.td}>
                  {currencyRates.usd?.rateBuy.toFixed(2) || "-"}
                </td>
                <td className={css.td}>
                  {currencyRates.usd?.rateSell.toFixed(2) || "-"}
                </td>
              </tr>
              <tr>
                <td className={css.td}>EUR</td>
                <td className={css.td}>
                  {currencyRates.eur?.rateBuy.toFixed(2) || "-"}
                </td>
                <td className={css.td}>
                  {currencyRates.eur?.rateSell.toFixed(2) || "-"}
                </td>
              </tr>
            </tbody>
          </table>
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
