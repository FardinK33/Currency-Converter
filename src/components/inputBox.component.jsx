import React, { useEffect } from "react";
import './inputBox.styles.scss';

const InputBox = ({
  onAmountChange,
  onCurrencyChange,
  currency,
  label,
  amount,
  currencyList = [],
  symbol
}) => {

  // const handleChange = (e) => {
  //   console.log(e.target.value);
  //   onCurrencyChange(e.target.value, label);
  //   console.log(currency)
  //   onAmountChange(amount, label);
  // }

  useEffect(()=>{
    onAmountChange(amount, label);
  }, [currency]);

  return (
    <div className="form-container">
      
      <div className="label-box">
        <label >{label}</label>
        <label>{symbol}</label>
      </div>

      <div className="input-box">
        <input
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(Number(e.target.value), label)}
        />
        <select
          value={currency}
          onChange={(e) => (onCurrencyChange(e.target.value, label))}
          >
          {currencyList.map((currUnit) => (
            <option key={currUnit} value={currUnit}>
              {currUnit}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InputBox;
