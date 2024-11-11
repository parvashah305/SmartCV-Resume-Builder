import React from "react";
import { useAuth } from "../Context/AuthProvider";
import { toast } from "react-toastify";

function Logout() {
  const [authUser, setAuthUser] = useAuth();
  const handleLogout = () => {
    try {
      setAuthUser({
        ...authUser,
        user: null,
      });
      localStorage.removeItem("Users");
      toast.success("Logout successfully");

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.error("Error: " + error);
      setTimeout(() => {}, 2000);
    }
  };
  return (
    <div>
      <button
        onClick={handleLogout} style={styles.logoutButton}
      >
        Logout
      </button>
    </div>
  );
}

const styles={
    logoutButton: {
        padding: '10px 20px',
        backgroundColor: '#FF0000',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      },
}

export default Logout;