import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();

 

  const tabs = [
    { name: 'Products', path: '/Products' },
    { name: 'Cart', path: '/Items/qty/total' },
  ];

  return (
    <nav
      style={{
        backgroundColor: '#007bff',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        margin: '10px auto 20px',
        maxWidth: '900px',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <div style={{ fontSize: '20px', fontWeight: '600', color: 'white' }}>
        Mock E-Com Cart
      </div>

  
      <div style={{ display: 'flex', gap: '15px' }}>
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            style={({ isActive }) => ({
              backgroundColor: isActive ? '#fff' : 'transparent',
              color: isActive ? '#007bff' : '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'all 0.3s ease',
            })}
          >
            {tab.name}
          </NavLink>
        ))}
      </div>

    </nav>
  );
};

export default Navbar;
