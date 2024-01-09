import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Routes, Route, useNavigate } from "react-router-dom";
// import jwtDecode from "jwt-decode";



const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = (e) => {
    console.log("Signup clicked");
    navigate('/signup');
  }

  return (
    <div>
      <div className="page-content">
        <div className="form-v10-content">
          <form className="form-detail" onSubmit={handleLogin} id="myform">
            <div className="form-right">
              <h2>Login Here</h2>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <div className="form-row">
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="street"
                  id="street"
                  placeholder="Enter email"
                  required
                />
              </div>
              {/* <div className="form-row">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="additional"
                  id="additional"
                  placeholder="Enter Password"
                  required
                />
              </div> */}

              <div className="form-row">
                <div style={{display:'flex'}} >
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="additional"
                  id="additional"
                  placeholder="Enter Password"
                  required
                />
                <div className="eye-icon" style={{marginTop:'5%'}} onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <RemoveRedEyeOutlinedIcon />
                  )}
                </div>
                </div>
              </div>

              <div className="form-checkbox-new">
                <label className="container">
                  <p>
                    <a href="/forgotpass" className="text-forgot-pass">
                      Forgot Password?
                    </a>
                    .
                  </p>
                </label>
              </div>

              <div className="form-row-last">
                <button type="submit" className="register forgotpass">
                  Login Here
                </button>
              </div>

              <div className="form-checkbox">
                <label className="container">
                  <p>
                    Don't have an account?{" "}
                    <a href="/signup" onClick={handleSignup} className="text">
                      Signup Here
                    </a>
                            </p>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
