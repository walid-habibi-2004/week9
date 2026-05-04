/**
 * Daily challenge: component tree (who wraps whom).
 * Rendered as documentation on the page — matches the exercise format.
 */
export default function ComponentTreeAnswer() {
  const tree = `<CoffeeOrderScreen> (Parent)

<UserWelcome userName={...} /> (Child)

<DrinkMenu drinks={...} selectedDrink={...} onSelectDrink={...} /> (Child)
  └── inside DrinkMenu: <DrinkItem /> repeated once per drink (Grandchildren)

<RobotArmStatus status="ready" | "busy" /> (Child)

<BrewCoffeeButton onBrew={...} disabled={...} selectedDrink={...} /> (Child)`

  return (
    <section className="coffee-tree" aria-labelledby="coffee-tree-heading">
      <h3 id="coffee-tree-heading" className="coffee-tree__title">
        Component tree (solution)
      </h3>
      <pre className="coffee-tree__pre">{tree}</pre>
    </section>
  )
}
