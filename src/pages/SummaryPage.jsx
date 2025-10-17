import { useEffect, useState } from "react";
import "./SummaryPage.css";

export default function SummaryPage() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Retrieve and parse data from localStorage
    const storedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    const storedTotal = localStorage.getItem("totalCost") || 0;
    
    // Ensure the total is parsed as a number for display consistency
    setItems(storedItems);
    setTotal(Number(storedTotal));
  }, []);

  return (
    <div className="summary-page">
      <h1>TOTAL COST FOR THE EVENT</h1>
      {/* FIX: Use toFixed(2) to ensure clean currency display */}
      <h2>${total.toFixed(2)}</h2>

      <table className="summary-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Unit Cost</th>
            <th>Quantity</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item, index) => {
                // FIX: Ensure unit and qty are treated as numbers for calculation
                const unitCost = Number(item.unit || 0);
                const quantity = Number(item.qty || 0);
                const itemTotal = unitCost * quantity;

                return (
              <tr key={index}>
                <td>{item.name}</td>
                <td>${unitCost.toFixed(2)}</td>
                <td>{quantity}</td>
                {/* FIX: Use calculated itemTotal */}
                <td>${itemTotal.toFixed(2)}</td>
              </tr>
                );
            })
          ) : (
            <tr>
              <td colSpan="4">No selections found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
