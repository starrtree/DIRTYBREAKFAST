import ScrollFrameCanvas from './components/ScrollFrameCanvas';
import { useMediaQuery } from './hooks/useMediaQuery';
import { siteConfig } from './config/siteConfig';

const favorites = ['Chicken & Waffle Stack', 'Dirty Grits Bowl', 'Syrup-Glazed Biscuit Sliders'];

export default function App() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const frameConfig = isMobile ? siteConfig.frames.mobile : siteConfig.frames.desktop;

  return (
    <main>
      <nav className="top-nav">
        <span className="logo">DirTy Breakfast</span>
        <div>
          <a href="#menu">Menu</a>
          <a href="#hours">Hours</a>
          <a href="#order">Order</a>
        </div>
      </nav>

      <ScrollFrameCanvas
        reducedMotion={reducedMotion}
        config={{ ...frameConfig, extension: siteConfig.frames.extension, filePrefix: siteConfig.frames.filePrefix, zeroPad: siteConfig.frames.zeroPad, preloadCount: siteConfig.frames.preloadCount }}
      />

      <section id="menu" className="section cards">
        <h2>SWEET. SAVORY. DIRTY.</h2>
        <p>Mess level: high. Flavor level: legendary.</p>
        <div className="card-grid">
          {['All Day Breakfast', 'Late Night Plates', 'Dirty Sides'].map((cat) => (
            <article key={cat} className="card">
              <h3>{cat}</h3>
              <p>Bold seasoning, fried textures, and sauce-stacked comfort food classics.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section favorites">
        <h2>DIRTY FAVORITES</h2>
        <ul>{favorites.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section id="hours" className="section cta-block">
        <h2>PULL UP</h2>
        <p>Downtown Cincinnati · Mon–Sun · Brunch + Late Night</p>
      </section>

      <section id="order" className="section cta-block hot">
        <h2>ORDER ONLINE</h2>
        <p>Fast pickup. Saucy delivery. Napkins optional, appetite required.</p>
        <button className="btn btn-primary">START ORDER</button>
      </section>

      <footer className="footer">© {new Date().getFullYear()} DirTy Breakfast</footer>
    </main>
  );
}
