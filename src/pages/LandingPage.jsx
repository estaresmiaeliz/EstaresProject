import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="gg-landing">
           {/* 🌸 Floating flower visuals */}
      <img src="/images/flower1.png" alt="flower" className="floating-flower f1" />
      <img src="/images/flower2.png" alt="flower" className="floating-flower f2" />
      <img src="/images/flower3.png" alt="flower" className="floating-flower f3" />
      <img src="/images/flower4.png" alt="flower" className="floating-flower f4" />
      <img src="/images/flower5.png" alt="flower" className="floating-flower f5" />

      {/* 🌸 Background overlay for full page */}
      <div className="background"></div>

      <div className="hero">
        {/* Left side — image + title */}
        <div className="hero-left">
          <img src="/images/hero-left.jpg" alt="hero" className="hero-img" />
          <div className="card-cta">
            <h1>Garden Gatherings</h1>
            <p className="subtitle">
              Bring the beauty of nature to your hands.
Explore our curated collection of blooms — from romantic roses to rare orchids.
Pick, personalize, and design your bouquet with love..🌹
            </p>
            <Link to="/selection">
              <button className="btn-primary">Start Blooming</button>
            </Link>
          </div>
        </div>

        {/* Right side — info section with background image on h2 */}
        <div className="hero-right">
          <div className="info">
            <h2 className="title-with-bg">The Bloom Boutique</h2>
            <p>
             Welcome to The Bloom Boutique, your cozy floral haven where petals meet personality.
Browse our garden of fresh flowers, seasonal picks, and delicate add-ons.
Whether you’re designing a bouquet for yourself or a loved one, every bloom tells a story — let’s make yours unforgettable.🌺

            </p>
            <p className="note">🌸 Start your floral journey — one petal at a time.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
