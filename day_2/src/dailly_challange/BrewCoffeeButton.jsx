export default function BrewCoffeeButton({ onBrew, disabled, selectedDrink }) {
  return (
    <button
      type="button"
      className="coffee-brew"
      onClick={onBrew}
      disabled={disabled}
    >
      Brew My Coffee
      {selectedDrink ? (
        <span className="coffee-brew__sub">({selectedDrink})</span>
      ) : null}
    </button>
  )
}
