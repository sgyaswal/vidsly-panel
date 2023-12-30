import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? localStorage.getItem("authTokens")
      : null
  );
  const [loading, setLoading] = useState(true);

  


  const loginUser = async (email, password) => {
    try {
      let response = await fetch("http://127.0.0.1:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      let data = await response.json();
      console.log("xxxx",data)

      if (data.status === 200) {
      //   Swal.fire({
      //     icon: 'success',
      //     title: "Login Sucessfully",
      //     showConfirmButton: false,
      //     timer: 2000
      // })
        setAuthTokens(data);
        setUser(data.access);
        localStorage.setItem("authTokens", JSON.stringify(data));
        var segments = window.location.href.split('/');
    segments.pop(); // Remove the last segment
    window.location.href = segments.join('/'); 
        
       
      } else {
        // Handle unsuccessful login 
        console.error("Login failed");
        Swal.fire({
          icon: 'error',
          title: "Invalid Email / Password",
          showConfirmButton: false,
          timer: 2000
      })
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    var segments = window.location.href.split('/');
    segments.pop(); // Remove the last segment
    window.location.href = segments.join('/') + "/login"; 
  };

  const contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  // useEffect(() => {
  //   if (authTokens) {
  //     navigate("/");
  //   } else {
  //     setLoading(false);
  //   }
  // }, [authTokens, navigate]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
