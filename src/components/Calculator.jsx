import React, { useState } from "react";
import Result from "./Result";
import Logo from "../assets/images/logo.svg";
import DollarIcon from "../assets/images/icon-dollar.svg";
import PersonIcon from "../assets/images/icon-person.svg";

const TIP_PERCENTAGES = [5, 10, 15, 25, 50];

export default function Calculator() {
  const [selectedTip, setSelectedTip] = useState(null);
  const [bill, setBill] = useState(null);
  const [numOfPeople, setNumOfPeople] = useState(null);
  const [customTip, setCustomTip] = useState(null);

  const calculateTip = () => {
    if (!bill || !numOfPeople || (!selectedTip && !customTip)) return 0;
    const tipPercentage = customTip || selectedTip;
    const tipAmount = (bill * (tipPercentage / 100)) / numOfPeople;
    return tipAmount;
  };

  const calculateTotal = () => {
    if (!bill || !numOfPeople) return 0;
    const tipAmount = calculateTip();
    const total = bill / numOfPeople + tipAmount;
    return total;
  };

  const tipAmount = calculateTip();
  const total = calculateTotal();

  const canReset = Boolean(bill || customTip || selectedTip || numOfPeople);

  const handleReset = () => {
    setBill(null);
    setCustomTip(null);
    setSelectedTip(null);
    setNumOfPeople(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleTipClick = (percentage) => {
    // Force state update with new function
    if (!customTip) {
      setSelectedTip((current) => {
        const newValue = percentage === current ? null : percentage;
        return newValue;
      });
    }
  };

  return (
    <div className="bg-grey-200 h-full ">
      <div className="h-[125vh] flex flex-col items-center justify-start md:p-4">
        <img className="mx-auto my-10 md:py-0 md:my-32" src={Logo} alt="Logo" />
        {/* Calculator Container */}
        <div className="flex flex-col md:flex-row md:gap-12 items-center justify-center bg-white w-screen md:max-w-4xl h-fit md:h-[475px] p-8 rounded-3xl">
          <div className="md:max-w-4xl md:ml-4 md:mt-4" role="main">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between items-center">
                <label htmlFor="bill" className="mb-4">
                  Bill
                </label>
                {bill === 0 && (
                  <label className="!text-red-500 !transition-opacity !duration-200">
                    Can't be zero
                  </label>
                )}
              </div>
              <div className="relative">
                <img
                  src={DollarIcon}
                  alt="Dollar"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                />
                <input
                  id="bill"
                  className={`w-full text-dark bg-grey-50 py-2 px-4 text-right rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                    bill === 0 ? "outline-2 outline-red-500" : ""
                  }`}
                  type="number"
                  placeholder="0"
                  aria-label="Bill amount"
                  aria-invalid={bill === 0}
                  min="0"
                  step="any"
                  value={bill || ""}
                  onChange={(e) => {
                    const value =
                      e.target.value === "" ? null : Number(e.target.value);
                    setBill(value);
                  }}
                />
              </div>
            </form>

            <form onSubmit={handleSubmit}>
              <label id="tip-group-label">Select Tip %</label>
              <div
                className="grid grid-cols-2 gap-4 mt-2 md:grid-cols-3"
                role="group"
                aria-labelledby="tip-group-label"
              >
                {TIP_PERCENTAGES.map((percentage) => (
                  <button
                    key={`tip-${percentage}`}
                    type="button"
                    onClick={() => handleTipClick(percentage)}
                    className="text-2xl py-2 rounded-md bg-emerald-950 text-white hover:bg-emerald-800"
                    style={{
                      backgroundColor:
                        selectedTip === percentage && !customTip
                          ? "hsl(172, 67%, 45%)"
                          : "hsl(183, 100%, 15%)",
                      color:
                        selectedTip === percentage && !customTip
                          ? "hsl(183, 100%, 15%)"
                          : "hsl(0, 100%, 100%)",
                    }}
                  >
                    {percentage}%
                  </button>
                ))}
                <input
                  type="number"
                  placeholder="Custom"
                  value={customTip || ""}
                  aria-label="Custom tip percentage"
                  onChange={(e) => {
                    const value =
                      e.target.value === "" ? null : Number(e.target.value);
                    setCustomTip(value);
                    if (value !== null) {
                      setSelectedTip(null);
                    }
                  }}
                  min="0"
                  step="any"
                  className="bg-grey-50 text-dark text-center rounded-md placeholder:text-medium placeholder:text-2xl md:placeholder:text-[1.3rem] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                ></input>
              </div>
            </form>
            <form>
              <div className="flex justify-between items-center">
                <label htmlFor="people">Number of People</label>
                {numOfPeople === 0 && (
                  <div
                    className="!text-red-500 !transition-opacity !duration-200"
                    role="alert"
                  >
                    Can't be zero
                  </div>
                )}
              </div>
              <div className="relative">
                <img
                  src={PersonIcon}
                  alt="Dollar"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                />
                <input
                  id="people"
                  className={`w-full text-dark bg-grey-50 py-2 px-4 text-right rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                    numOfPeople === 0 ? "outline-2 outline-red-500" : ""
                  }`}
                  type="number"
                  placeholder="0"
                  aria-label="Number of people"
                  aria-invalid={numOfPeople === 0}
                  min="0"
                  step="any"
                  value={numOfPeople || ""}
                  onChange={(e) => {
                    const value =
                      e.target.value === "" ? null : Number(e.target.value);
                    setNumOfPeople(value);
                  }}
                />
              </div>
            </form>
          </div>
          <Result
            tipAmount={tipAmount}
            total={total}
            onReset={handleReset}
            canReset={canReset}
          />
        </div>
      </div>
    </div>
  );
}
