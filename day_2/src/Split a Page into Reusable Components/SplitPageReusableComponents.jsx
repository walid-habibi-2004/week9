import './SplitPageReusableComponents.css'

export default function SplitPageReusableComponents() {
  return (
    <article className="split-page-reusable">
      <h1>Split a Page into Reusable Components</h1>

      <section className="split-page-reusable__section">
        <h2>Objective</h2>
        <p>Apply the bounding box method to your actual project.</p>
      </section>

      <section className="split-page-reusable__section">
        <h2>Instructions</h2>
        <p>
          Look at the cover image we generated for your project. Focus only on
          the computer monitor showing the dashboard. Write down a list of every
          component you would need to build.
        </p>

        <figure
          className="split-page-reusable__monitor"
          aria-label="Stylized monitor framing a dashboard — use your real cover image for the exercise"
        >
          <div className="split-page-reusable__monitor-bezel">
            <div className="split-page-reusable__dashboard">
              <div className="split-page-reusable__dash split-page-reusable__dash--top" />
              <div className="split-page-reusable__dash-row">
                <div className="split-page-reusable__dash split-page-reusable__dash--card" />
                <div className="split-page-reusable__dash split-page-reusable__dash--card" />
                <div className="split-page-reusable__dash split-page-reusable__dash--card" />
              </div>
              <div className="split-page-reusable__dash-row">
                <div className="split-page-reusable__dash split-page-reusable__dash--wide" />
                <div className="split-page-reusable__dash split-page-reusable__dash--chart" />
              </div>
            </div>
          </div>
          <div className="split-page-reusable__monitor-stand" />
          <figcaption className="split-page-reusable__monitor-caption">
            Bounding-box practice: treat each distinct region on your real
            dashboard as a candidate component.
          </figcaption>
        </figure>

        <div className="split-page-reusable__worksheet">
          <label htmlFor="component-list" className="split-page-reusable__label">
            Your component list (type in your editor or on paper)
          </label>
          <ol id="component-list" className="split-page-reusable__numbered">
            <li>
              <span className="split-page-reusable__placeholder">Component 1</span>
            </li>
            <li>
              <span className="split-page-reusable__placeholder">Component 2</span>
            </li>
            <li>
              <span className="split-page-reusable__placeholder">…</span>
            </li>
          </ol>
        </div>
      </section>

      <section className="split-page-reusable__section split-page-reusable__section--bonus">
        <h2>Bonus</h2>
        <p>
          Next to each component, write down what &quot;Props&quot; it might need
          to receive.
        </p>
        <div className="split-page-reusable__example" role="note">
          <span className="split-page-reusable__example-label">Format example</span>
          <p>
            <strong>Component:</strong> <code>&lt;DonutChart /&gt;</code>
            <br />
            <strong>Props needed:</strong> percentage value, color theme
          </p>
        </div>

        <div className="split-page-reusable__table-wrap" aria-label="Bonus worksheet table">
          <table className="split-page-reusable__table">
            <thead>
              <tr>
                <th scope="col">Component</th>
                <th scope="col">Props it might need</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="split-page-reusable__placeholder">
                    &lt;YourComponent /&gt;
                  </span>
                </td>
                <td>
                  <span className="split-page-reusable__placeholder">
                    e.g. title, items, onSelect
                  </span>
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="split-page-reusable__table-hint">
                  Add a row per component from your list above.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  )
}
