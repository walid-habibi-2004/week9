import './IdentifyComponentsSampleUI.css'

export default function IdentifyComponentsSampleUI() {
  return (
    <article className="identify-components-sample-ui">
      <h1>Identify Components in a Sample UI</h1>

      <section className="identify-components-sample-ui__section">
        <h2>Objective</h2>
        <p>
          Train your brain to stop seeing &quot;pages&quot; and start seeing
          &quot;components.&quot;
        </p>
      </section>

      <section className="identify-components-sample-ui__section">
        <h2>Instructions</h2>
        <p>
          Go to YouTube. Take a screenshot of the homepage. Open it in Paint or
          any image editor and draw colored boxes over the UI.
        </p>
        <ul className="identify-components-sample-ui__list identify-components-sample-ui__list--layout">
          <li>
            Draw a <span className="legend legend--red">RED</span> box around the
            major layout regions (Header, Sidebar, Video Grid).
          </li>
        </ul>
        <ul className="identify-components-sample-ui__list identify-components-sample-ui__list--components">
          <li>
            Draw a <span className="legend legend--blue">BLUE</span> box around
            reusable child components (The Video Thumbnail card, the Search Bar,
            the Subscribe button).
          </li>
        </ul>
      </section>

      <section className="identify-components-sample-ui__section identify-components-sample-ui__section--takeaway">
        <h2>Takeaway</h2>
        <p>
          Notice how the VideoThumbnail component is just copy-pasted 20 times
          with different &quot;Props&quot; (different image, different title).
        </p>
      </section>
    </article>
  )
}
