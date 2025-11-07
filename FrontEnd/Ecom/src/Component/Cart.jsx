import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [Data, setData] = useState([]);
  const [CData, setCData] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [cartIds, setCartids] = useState([]);

  // Fetch Cart Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/user/api/cart');
        if (!response.ok) {
          console.log('Response not OK');
          return;
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

 
  useEffect(() => {
    if (!Data || Data.length === 0) {
      setGrandTotal(0);
      return;
    }
    const total = Data.reduce((sum, item) => sum + Number(item.total || 0), 0);
    setCartids(Data.map(item => item._id));
    setGrandTotal(total);
  }, [Data]);

  const handleRemove = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/user/api/cart/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setData(prevData => prevData.filter(item => item._id !== id));
        window.alert('Product removed!');
      } else {
        console.error('Failed to remove item');
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };


  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/user/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartIds }),
      });

      let json;
      try {
        json = await response.json();
      } catch {
        json = [];
      }

      if (!response.ok) {
        console.log(json.message || json.error || 'Error updating data');
        return;
      }

      window.alert('Checkout success!');
      setCData(json.receipt);
      setGrandTotal(json.grandTotal);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Poppins, sans-serif' }}>
      {CData.length === 0 ? (
        <>
          <h1 style={{ textAlign: 'center', color: '#333' }}>Your Cart</h1>
          {!Data || Data.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No records found.</p>
          ) : (
            <div style={listContainer}>
              {Data.map(item => (
                <div key={item._id} style={listItem} className="cart-item">
                  <div>
                    <h3 style={productName}>{item.Name || 'Unnamed Product'}</h3>
                    <p style={productId}>Product ID: {item.pid || '-'}</p>
                    <p style={productPrice}>Qty: {item.qyt || '-'}</p>
                    <p style={productPrice}>Total: ₹{item.total || '-'}</p>
                  </div>
                  <button style={removeBtn} onClick={() => handleRemove(item._id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {Data && Data.length > 0 && (
            <div style={totalContainer}>
              <h2 style={{ color: '#333' }}>Grand Total: ₹{grandTotal}</h2>
              <button style={checkoutBtn} onClick={handleCheckout}>Check out</button>
            </div>
          )}
        </>
      ) : (
        <>
        
          <div style={billContainer} className="print-bill">
            <h1 style={billTitle}>Receipt</h1>

            <div style={billHeader}>
              <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Time:</strong> {new Date().toLocaleTimeString()}</p>
            </div>

            <div style={billUserInfo}>
                <p><strong>Customer Name:</strong> Abdul Kalam Aasath J</p>
                <p><strong>Email:</strong> abdulkalam123aasath@gmail.com</p>
            </div>

            <table style={billTable}>
              <thead>
                <tr>
                  <th style={thLeft}>Product</th>
                  <th style={thRight}>Price (₹)</th>
                </tr>
              </thead>
              <tbody>
                {CData.map(item => (
                  <tr key={item._id}>
                    <td style={tdLeft}>
                      {item.name || 'Unnamed Product'} <br />
                      <span style={{ fontSize: '12px', color: '#777' }}>
                        Qty: {item.qyt || '-'} | ID: {item.pid || '-'}
                      </span>
                    </td>
                    <td style={tdRight}>{item.total || '-'}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td style={tdLeftTotal}>Grand Total</td>
                  <td style={tdRightTotal}>₹{grandTotal}</td>
                </tr>
              </tfoot>
            </table>
            <div style={billFooter}>
              <p>Thank you for shopping with us!</p>
              <button style={printBtn} onClick={() => window.print()}>
                Print / Save Bill
              </button>
            </div>
          </div>
        </>
      )}

      <Style />
    </div>
  );
};

// 🌟 Styles
const listContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  marginTop: '20px',
};

const listItem = {
  backgroundColor: '#fff',
  padding: '15px 20px',
  borderRadius: '10px',
  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const productName = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#333',
  marginBottom: '5px',
};

const productId = {
  color: '#777',
  marginBottom: '5px',
};

const productPrice = {
  color: '#009688',
  fontWeight: 'bold',
  marginBottom: '5px',
};

const removeBtn = {
  backgroundColor: '#e53935',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  padding: '8px 14px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'background 0.2s ease',
};

const checkoutBtn = {
  background: 'linear-gradient(135deg, #00b09b, #96c93d)',
  color: '#fff',
  border: 'none',
  borderRadius: '12px',
  padding: '12px 24px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const printBtn = {
  ...checkoutBtn,
  background: 'linear-gradient(135deg, #2196f3, #21cbf3)',
  marginTop: '20px',
};

const totalContainer = {
  marginTop: '40px',
  textAlign: 'center',
  backgroundColor: '#f9f9f9',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

// 🧾 Bill Styles
const billContainer = {
  maxWidth: '700px',
  margin: '30px auto',
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
};

const billTitle = {
  textAlign: 'center',
  marginBottom: '20px',
  color: '#333',
  fontWeight: '700',
};

const billHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '14px',
  marginBottom: '15px',
  color: '#555',
};

const billTable = {
  width: '100%',
  borderCollapse: 'collapse',
};

const thLeft = {
  textAlign: 'left',
  padding: '10px',
  borderBottom: '2px solid #00b09b',
  color: '#333',
};

const thRight = {
  textAlign: 'right',
  padding: '10px',
  borderBottom: '2px solid #00b09b',
  color: '#333',
};

const tdLeft = {
  textAlign: 'left',
  padding: '10px',
  borderBottom: '1px solid #eee',
};

const tdRight = {
  textAlign: 'right',
  padding: '10px',
  borderBottom: '1px solid #eee',
  fontWeight: '600',
  color: '#009688',
};

const tdLeftTotal = {
  textAlign: 'left',
  padding: '10px',
  fontWeight: 'bold',
  borderTop: '2px solid #00b09b',
  fontSize: '16px',
};

const tdRightTotal = {
  textAlign: 'right',
  padding: '10px',
  fontWeight: 'bold',
  borderTop: '2px solid #00b09b',
  color: '#00796b',
  fontSize: '16px',
};

const billFooter = {
  textAlign: 'center',
  marginTop: '25px',
  color: '#555',
  fontStyle: 'italic',
};

const billUserInfo = {
  marginBottom: '15px',
  fontSize: '14px',
  color: '#444',
  borderTop: '1px solid #ddd',
  borderBottom: '1px solid #ddd',
  padding: '10px 0',
};

const styles = `
@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
  }

  button {
    width: 100%;
    margin-top: 10px;
  }

  table th, table td {
    font-size: 14px;
  }

  h1 {
    font-size: 22px;
  }

  div {
    padding: 10px !important;
  }
}

/* 🖨️ Print Styles */
@media print {
  button {
    display: none !important;
  }
  body {
    background: white;
    color: black;
    font-size: 14px;
  }
  div {
    box-shadow: none !important;
    background: white !important;
  }
  .print-bill {
    border: 1px solid #000;
    padding: 20px;
  }
  h1, h3 {
    color: black !important;
  }
}
`;

const Style = () => <style>{styles}</style>;

export default Cart;
