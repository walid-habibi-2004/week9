import DrinkItem from './DrinkItem.jsx'

export default function DrinkMenu({ drinks, selectedDrink, onSelectDrink }) {
  return (
    <section className="coffee-menu" aria-labelledby="coffee-menu-heading">
      <h3 id="coffee-menu-heading" className="coffee-menu__title">
        Available drinks
      </h3>
      <ul className="coffee-menu__list">
        {drinks.map((name) => (
          <DrinkItem
            key={name}
            name={name}
            selected={selectedDrink === name}
            onSelect={onSelectDrink}
          />
        ))}
      </ul>
    </section>
  )
}
