import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Importing the separate CSS file as requested
import "./ProductSelection.css";

// Define the Seasonal Flower Bundles data structure for easy mapping and calculation
const bundles = [
    { key: 'spring', name: "🌼 Spring Harmony", price: 50 },
    { key: 'summer', name: "🌷 Summer Glow", price: 60 },
    { key: 'autumn', name: "🍂 Autumn Charm", price: 25 },
    { key: 'winter', name: "❄️ Winter Elegance", price: 70 },
];

export default function ProductSelection() {
  const [rooms, setRooms] = useState([
    { name: "🌹 Romantic Roses (Capacity:15)", price: 1500, img: "/images/choice1.jpg", qty: 0 },
    { name: "🌻 Sunny Sunflowers (Capacity:200)", price: 5500, img: "/images/choice2.jpg", qty: 0 },
    { name: "🌸 Pastel Peonies (Capacity:5)", price: 800, img: "/images/choice3.jpg", qty: 0 },
  ]);

  const [addons, setAddons] = useState([
    { name: "🎀 Luxury Wrapping Paper", price: 200, img: "/images/select1.webp", qty: 0 },
    { name: "🕯 Scented Candles", price: 35, img: "/images/select2.webp", qty: 0 },
    { name: "🍫 Chocolate Box", price: 45, img: "/images/select3.jpg", qty: 0 },
    { name: "💌 Personalized Message Card", price: 80, img: "/images/select4.jpg", qty: 0 },
    { name: "🌱 Mini Potted Plant", price: 80, img: "/images/select5.webp", qty: 0 },
  ]);

  // State for bundle quantities
  const [mealsQty, setMealsQty] = useState({ spring: 0, summer: 0, autumn: 0, winter: 0 });
  
  // 'people' state is kept but unused in the total calculation (Placeholder for potential future use)
  const [people, setPeople] = useState(0); 

  // Update helper
  const update = (arr, setArr, idx, delta) => {
    const copy = [...arr];
    // Ensure quantity doesn't go below zero
    copy[idx].qty = Math.max(0, copy[idx].qty + delta);
    setArr(copy);
  };

  // Calculate subtotal for rooms/addons
  const subtotal = rooms.reduce((s, r) => s + r.qty * r.price, 0) + 
                   addons.reduce((s, a) => s + a.qty * a.price, 0);

  // Recalculate mealsTotal (bundles total) using the correct bundle keys and prices
  const mealsTotal = bundles.reduce((total, bundle) => {
      return total + mealsQty[bundle.key] * bundle.price;
  }, 0);
  
  const total = subtotal + mealsTotal;

  // Update handleShowDetails to filter out zero-quantity items and include bundles individually
  const handleShowDetails = () => {
    // 1. Get selected Rooms and format them for SummaryPage
    const selectedRooms = rooms
        .filter(r => r.qty > 0)
        .map(r => ({ name: r.name, unit: r.price, qty: r.qty }));

    // 2. Get selected Addons and format them for SummaryPage
    const selectedAddons = addons
        .filter(a => a.qty > 0)
        .map(a => ({ name: a.name, unit: a.price, qty: a.qty }));

    // 3. Get selected Bundles and format them for SummaryPage
    const selectedBundles = bundles
        .filter(b => mealsQty[b.key] > 0)
        .map(b => ({
            name: b.name,
            unit: b.price, // Unit cost for SummaryPage
            qty: mealsQty[b.key], // Quantity for SummaryPage
        }));

    // Combine all selected items
    const selectedItems = [
        ...selectedRooms, 
        ...selectedAddons, 
        ...selectedBundles
    ];

    // Save only non-zero items and the calculated grand total
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    localStorage.setItem("totalCost", total);
  };

  return (
    <div className="gg-selection">
     {/* 🌸 Floating flower visuals */}
      <img src="/images/flower1.png" alt="flower" className="floating-flower f1" />
      <img src="/images/flower2.png" alt="flower" className="floating-flower f2" />
      <img src="/images/flower3.png" alt="flower" className="floating-flower f3" />
      <img src="/images/flower4.png" alt="flower" className="floating-flower f4" />
      <img src="/images/flower5.png" alt="flower" className="floating-flower f5" />

      {/* 🌸 Top Bar */}
      <nav className="topbar">
        <div className="logo">Garden Gatherings</div>
        <div className="nav-right">
          <button className="btn-purple">Garden Setting</button>
          <button className="btn-purple">Extra Decorations</button>
          <button className="btn-purple">Flower Bundles</button>
          <Link to="/summary">
            <button className="show-btn" onClick={handleShowDetails}>
              Show Details
            </button>
          </Link>
        </div>
      </nav>

      {/* 🌿 Venue Selection */}
      <section className="rooms">
        <h3>Flower Collection</h3>
        <div className="room-row">
          {rooms.map((r, i) => (
            <div className="room-card" key={i}>
              <img className="room-img" src={r.img} alt={r.name} />
              <div className="room-info">
                <div className="room-name">{r.name}</div>
                <div className="room-price">${r.price}</div>
                <div className="room-controls">
                  <button onClick={() => update(rooms, setRooms, i, -1)}>-</button>
                  <div className="qty">{r.qty}</div>
                  <button onClick={() => update(rooms, setRooms, i, 1)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="total-bar">Bloom Total: ${subtotal}</div>
      </section>

      <div className="section-divider"></div>

      {/* 🌷 Add-ons Section */}
      <section className="addons">
        <h3>Floral Add-ons & Gift Wraps</h3>
        <div className="addons-grid">
          {addons.map((a, i) => (
            <div className="addon-card" key={i}>
              <img className="addon-img" src={a.img} alt={a.name} />
              <div className="addon-info">
                <div>{a.name} - ${a.price}</div>
                <div className="addon-controls">
                  <button onClick={() => update(addons, setAddons, i, -1)}>-</button>
                  <div className="qty">{a.qty}</div>
                  <button onClick={() => update(addons, setAddons, i, 1)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider"></div>

      {/* 🌼 Meals Section (Seasonal Flower Bundles) */}
      <section className="meals">
        <h3>Seasonal Flower Bundles</h3>
        <div className="meals-row">
          <div className="meals-left">
            <label>Number of Bundles to Order (Placeholder)</label>
            <input
              type="number"
              min="0"
              value={people}
              onChange={(e) => setPeople(Number(e.target.value))}
            />
          </div>
          <div className="meals-right">
            {bundles.map((bundle, i) => (
              <div className="meal-line" key={i}>
                <div>
                  {bundle.name} - ${bundle.price}
                </div>
                <div>
                  <input
                    type="number"
                    min="0"
                    // Use the bundle's key for value lookup
                    value={mealsQty[bundle.key]}
                    // Update state using the bundle's key
                    onChange={(e) =>
                      setMealsQty({ ...mealsQty, [bundle.key]: Number(e.target.value) })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="total-bar">Bundles Total: ${mealsTotal}</div>
      </section>

      {/* 🌻 Grand Total */}
      <footer className="grand-total">
        <div>Total Bloom Basket Cost</div>
        <div className="grand-figure">${total}</div>
      </footer>
    </div>
  );
}