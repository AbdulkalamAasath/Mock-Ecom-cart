import React, { useEffect, useState } from 'react';

const Products = () => {
  const [Data, setData] = useState([]);
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (e, itemId) => {
    const value = e.target.value;
    setQuantities((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/user/api/products', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

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

  const handelchange = async (e, item) => {
    e.preventDefault();

    const qty = quantities[item._id] || 1;

    const data = {
      productId: item._id,
      quantity: qty,
    };

    try {
      const response = await fetch('http://localhost:4000/user/api/cart', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        console.log(json.message || json.error || 'Error updating data');
        return;
      }

      window.alert('✅ Product added to cart successfully!');
      setQuantities((prev) => ({ ...prev, [item._id]: '' }));
    } catch (error) {
      console.error('Error during add to cart:', error);
    }
  };

  return (
    <div style={pageContainer}>
      <h1 style={pageTitle}>🛍️ Product Catalog</h1>

      {!Data || Data.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No products available.</p>
      ) : (
        <div style={gridContainer}>
          {Data.map((item) => (
            <div key={item._id} style={cardStyle}>
              <h3 style={productName}>{item.Name || 'Unnamed Product'}</h3>
              <p style={productId}>Product ID: {item.id || '-'}</p>
              <p style={productPrice}>₹{item.price || '-'}</p>

              <form onSubmit={(e) => handelchange(e, item)} style={formStyle}>
                <input
                  type="number"
                  min="1"
                  value={quantities[item._id] || ''}
                  onChange={(e) => handleQuantityChange(e, item._id)}
                  placeholder="Qty"
                  style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>
                  Add to Cart
                </button>
              </form>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer style={footerStyle}>
        <p style={footerText}>
          © {new Date().getFullYear()} <strong>Mock E-Com Cart</strong> | Crafted with ❤️ by Abdul kalam Aasath J
        </p>
      </footer>
    </div>
  );
};

/* ---------- STYLES ---------- */

const pageContainer = {
  padding: '30px',
  fontFamily: 'Poppins, sans-serif',
  backgroundColor: '#f9fafc',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const pageTitle = {
  textAlign: 'center',
  color: '#222',
  marginBottom: '30px',
  fontSize: '32px',
  fontWeight: '700',
};

const gridContainer = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '40px',
  marginBottom: '50px',
};

const cardStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '15px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  textAlign: 'center',
  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  cursor: 'pointer',
};

cardStyle[':hover'] = {
  transform: 'translateY(-4px)',
  boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
};

const productName = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#333',
  marginBottom: '10px',
};

const productId = {
  color: '#777',
  fontSize: '14px',
  marginBottom: '5px',
};

const productPrice = {
  color: '#00897b',
  fontWeight: 'bold',
  fontSize: '17px',
  marginBottom: '15px',
};

const formStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  marginTop: '10px',
};

const inputStyle = {
  width: '60px',
  padding: '5px 8px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  textAlign: 'center',
  fontSize: '14px',
};

const buttonStyle = {
  backgroundColor: '#0056d2',
  color: '#fff',
  fontWeight: '600',
  border: 'none',
  borderRadius: '8px',
  padding: '8px 14px',
  cursor: 'pointer',
  transition: 'background 0.3s',
};

const footerStyle = {
  backgroundColor: '#0056d2',
  color: '#fff',
  padding: '15px 0',
  textAlign: 'center',
  borderRadius: '10px',
};

const footerText = {
  fontSize: '14px',
  margin: 0,
  color: '#ddd',
};

export default Products;
