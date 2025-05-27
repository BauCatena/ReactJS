import "./productCounter.scss";

function ProductCounter({ stock, counter, onChange }) {
  const increment = () => {
    if (counter < stock) {
      onChange(counter + 1);
    }
  };

  const decrement = () => {
    if (counter > 1) {
      onChange(counter - 1);
    }
  };

  return (
    <div className="counter-container">
      <button className="button" onClick={decrement}>-</button>
      <p key={counter}>{counter}</p>
      <button className="button" onClick={increment}>+</button>
    </div>
  );
}

export default ProductCounter;
