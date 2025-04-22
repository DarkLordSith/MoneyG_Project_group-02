import axios from "axios";
import { useEffect, useState } from "react";

function Currency() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currencyRates, setCurrencyRates] = useState({ usd: null, eur: null });

  const fetchCurrencyRates = async () => {
    try {
      setError(false);
      setLoading(true);

      const response = await axios.get("https://api.monobank.ua/bank/currency");
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
          date: Math.min(usdCurrency.date, eurCurrency.date),
        })
      );
    } catch {
      setError("Failed to load currency rates");
    } finally {
      setLoading(false);
    }
  };

  const isCurrencyFresh = (savedData) => {
    const oneHour = 60 * 60;
    const currentTime = Date.now() / 1000;
    const parsedData = JSON.parse(savedData);
    return currentTime - parsedData.date < oneHour;
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

  return (
    <div>
      {loading && <p>Loading currency rates...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && isCurrencyLoaded && (
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Purchase</th>
              <th>Sale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>USD</td>
              <td>{currencyRates.usd?.rateBuy || "-"}</td>
              <td>{currencyRates.usd?.rateSell || "-"}</td>
            </tr>
            <tr>
              <td>EUR</td>
              <td>{currencyRates.eur?.rateBuy || "-"}</td>
              <td>{currencyRates.eur?.rateSell || "-"}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Currency;
