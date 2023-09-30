import { useEffect, useState } from "react";
import "./App.scss";
import InputBox from "./components/inputBox.component";
import useCurrencyConverter from "./hooks/useCurrencyConverter";
import { getSymbol } from "./components/currencySymbol";
import {FaExchangeAlt} from 'react-icons/fa';

function App() {

  const [currency1, setCurrency1] = useState("usd");
  const [amount1, setAmount1] = useState(0);

  const [currency2, setCurrency2] = useState("inr");
  const [amount2, setAmount2] = useState(0);

  const currencyInfo = useCurrencyConverter(currency1);
  let data = Object.keys(currencyInfo);

  useEffect(()=> {
    onAmountChange(amount1, "From")
  }, [currencyInfo])

  const onCurrencyChange = (currency, label) => {
    if (label === "From") {
      setCurrency1(currency);
      return;
    }
    setCurrency2(currency);
  };

  const onAmountChange = (amount, label) => {
    if (amount === 0) {
      if (label === "From") {
        setAmount1("");
        setAmount2(0);
        return;
      }
      setAmount2("");
      setAmount1(0);
      return;
    }

    if (label === "From") {
      setAmount1(amount);
      setAmount2((amount * currencyInfo[currency2]).toFixed(2));
      return;
    }

    setAmount2(amount);
    setAmount1((amount / currencyInfo[currency2]).toFixed(2));
  };

  const swapCurrency = () => {
    const c1 = currency1, c2 = currency2;
    onCurrencyChange(c2, "From");
    onCurrencyChange(c1, "To");
  }

  return (
    <div className="main">
      <h1>Know the Exchange Rates</h1>
      <div className="container">
      <button className="exchange-btn" onClick={swapCurrency}><FaExchangeAlt /></button>
        <InputBox
          onAmountChange={onAmountChange}
          onCurrencyChange={onCurrencyChange}
          currency={currency1}
          amount={amount1}
          label="From"
          currencyList={data}
          symbol={getSymbol(currency1.toUpperCase())}
        />
        <InputBox
          onAmountChange={onAmountChange}
          onCurrencyChange={onCurrencyChange}
          currency={currency2}
          amount={amount2}
          label="To"
          currencyList={data}
          symbol={getSymbol(currency2.toUpperCase())}
        />
      </div>
    </div>
  );
}

export default App;
