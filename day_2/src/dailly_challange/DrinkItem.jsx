export default function DrinkItem({ name, selected, onSelect }) {
  return (
    <li>
      <button
        type="button"
        className={`coffee-drink${selected ? ' coffee-drink--selected' : ''}`}
        onClick={() => onSelect(name)}
        aria-pressed={selected}
      >
        {name}
      </button>
    </li>
  )
}
