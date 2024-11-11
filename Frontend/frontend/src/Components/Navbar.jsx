// import React, { useState } from 'react';
// import Login from './Login';

// function Navbar() {
//   const [showModal, setShowModal] = useState(false);

//   const handleLoginClick = () => {
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <nav style={styles.navbar}>
//       <h2 style={styles.brand}>SmartCV</h2>
//       <button onClick={handleLoginClick} style={styles.loginButton}>Login</button>

//       {showModal && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <button onClick={closeModal} style={styles.closeButton}>X</button>
//             <Login closeModal={closeModal} /> 
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// const styles = {
//   navbar: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '10px 20px',
//     backgroundColor: '#333',
//     color: '#fff',
//   },
//   brand: {
//     fontSize: '24px',
//     fontWeight: 'bold',
//   },
//   loginButton: {
//     padding: '10px 20px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//   },
//   modalOverlay: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     width: '400px',
//     backgroundColor: '#fff',
//     padding: '20px',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//     position: 'relative',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: '10px',
//     right: '10px',
//     backgroundColor: 'transparent',
//     border: 'none',
//     fontSize: '18px',
//     cursor: 'pointer',
//     color: "black",
//   },
// };

// export default Navbar;


import React, { useState } from 'react';
import Login from './Login';
import { useAuth } from '../Context/AuthProvider';
import Logout from './Logout';

function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const handleLogout = () => {
    setAuthUser(null); // Set authUser to null when logging out
    localStorage.removeItem('Users'); // Remove token if stored
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.brand}>SmartCV</h2>
      {authUser ? (
        <Logout/>
      ) : (
        <button onClick={handleLoginClick} style={styles.loginButton}>Login</button>
      )}

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button onClick={closeModal} style={styles.closeButton}>X</button>
            <Login closeModal={closeModal} />
          </div>
        </div>
      )}
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
  },
  brand: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  loginButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '400px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: "black",
  },
};

export default Navbar;