export default function Result({ tipAmount = 0, total = 0, canReset, onReset }) {
  // Format number to always show 2 decimal places
  const formatNumber = (number) => {
    return Number(number).toFixed(2);
  };

  return (
    <div className="flex flex-col justify-between gap-4 bg-dark w-full md:w-5xl h-full px-6 md:px-8 py-6 md:py-10 rounded-2xl">
      <div className="flex flex-col gap-4 md:gap-8 ">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-[clamp(1rem,2vw,0.875rem)]">
              Tip Amount
            </p>
            <p className="text-medium text-[clamp(0.875rem,1.5vw,0.75rem)]">
              / person
            </p>
          </div>
          <p className="text-primary text-[clamp(2rem,5vw,3rem)]">
            ${formatNumber(tipAmount)}
          </p>
        </div>
        <div className="flex items-center justify-between">
          {" "}
          <div>
            <p className="text-white text-[clamp(1rem,2vw,0.875rem)]">Total</p>
            <p className="text-medium text-[clamp(0.875rem,1.5vw,0.75rem)]">
              / person
            </p>
          </div>
          <p className="text-primary text-[clamp(2rem,5vw,3rem)]">
            ${formatNumber(total)}
          </p>
        </div>
      </div>
      <button
        onClick={onReset}
        disabled={!canReset}
        className="bg-primary text-dark w-full mt-4 md:mt-8 p-2 uppercase rounded text-[clamp(1.25rem,3vw,1.5rem)] disabled:opacity-25 active:bg-light"
      >
        Reset
      </button>
    </div>
  );
}
