import { useState } from 'react'
import './OrderQueue.css'

const DRINK_POOL = [
  'Espresso',
  'Americano',
  'Cappuccino',
  'Latte',
  'Flat white',
  'Mocha',
  'Macchiato',
  'Cold brew',
]

function createRandomOrder() {
  const drink = DRINK_POOL[Math.floor(Math.random() * DRINK_POOL.length)]
  return {
    id: crypto.randomUUID(),
    drink,
  }
}

/**
 * AutoBarista OrderQueue — state is an array of orders (each has id + drink).
 *
 * Step-by-step: how `orders` changes
 *
 * 1) The dashboard loads
 *    - `useState([])` runs once.
 *    - `orders` is `[]` (empty array).
 *    - The list UI shows no rows (empty-queue message).
 *
 * 2) The user clicks "Add Random Order" twice
 *    - After click 1: `setOrders` runs with updater `(prev) => [...prev, newOrder]`.
 *      `orders` becomes `[ order₁ ]` (one object, e.g. { id, drink: "Latte" }).
 *    - After click 2: same pattern appends another object.
 *      `orders` becomes `[ order₁, order₂ ]` — same order as arrival (FIFO display).
 *
 * 3) The user clicks "Mark as Served" on the first order (order₁)
 *    - Handler runs `setOrders((prev) => prev.filter((o) => o.id !== servedId))`.
 *    - `orders` becomes `[ order₂ ]` only — first item removed, others unchanged.
 */
export default function OrderQueue() {
  const [orders, setOrders] = useState([])

  function addRandomOrder() {
    setOrders((previous) => [...previous, createRandomOrder()])
  }

  function markAsServed(orderId) {
    setOrders((previous) => previous.filter((order) => order.id !== orderId))
  }

  return (
    <section className="order-queue" aria-labelledby="order-queue-title">
      <div className="order-queue__head">
        <h2 id="order-queue-title">AutoBarista order queue</h2>
        <button type="button" className="order-queue__add" onClick={addRandomOrder}>
          Add Random Order
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="order-queue__empty">No orders yet — add one to start the queue.</p>
      ) : (
        <ol className="order-queue__list">
          {orders.map((order, index) => (
            <li key={order.id} className="order-queue__item">
              <span className="order-queue__position">{index + 1}.</span>
              <span className="order-queue__drink">{order.drink}</span>
              <button
                type="button"
                className="order-queue__served"
                onClick={() => markAsServed(order.id)}
              >
                Mark as Served
              </button>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
