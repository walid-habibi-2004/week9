export default function UserWelcome({ userName }) {
  return (
    <header className="coffee-welcome">
      <p className="coffee-welcome__label">Welcome back</p>
      <h2 className="coffee-welcome__name">{userName}</h2>
    </header>
  )
}
