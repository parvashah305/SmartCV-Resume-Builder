import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2024 SmartCV. All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    textAlign: 'center',
    padding: '10px 0',
    backgroundColor: '#333',
    color: '#fff',
    // position: 'fixed',
    width: '100%',
    bottom: '0',
  },
};

export default Footer;