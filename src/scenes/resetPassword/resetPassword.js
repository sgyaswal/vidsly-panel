import { useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import "./resetpass.css";

const ResetPassword = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State to manage form input values
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const currentURL = window.location.href;

  const urlParts = currentURL.split("/");

  const uidb64 = urlParts[4];
  const token = urlParts[5];

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API call to reset password endpoint using fetch
      const response = await fetch(
        `http://127.0.0.1:8000/api/user/resetPassword/${uidb64}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            new_password: password,
            confirm_password: newPassword,
          }),
        }
      );

      if (!response.ok) {
        // Handle API error, e.g., show error message to the user
        const errorData = await response.json();
        console.error("Password reset failed:", errorData);
        setErrorMessage("Password reset failed. Please try again.");
        return;
      }

      // Handle successful response, e.g., show success message, redirect, etc.
      const responseData = await response.json();
      console.log("Password reset successful:", responseData);
    } catch (error) {
      console.error("Error during password reset:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className="page-content">
        <div className="form-v10-content">
          <form
            className="form-detail"
            action="#"
            method="post"
            id="myform"
            onSubmit={handleSubmit}
          >
            <div className="form-right">
              <h2>Reset Your Password</h2>
              {errorMessage && (
                <Typography color="error" variant="body2">
                  {errorMessage}
                </Typography>
              )}
              <div className="form-row">
                <input
                  type="password"
                  name="password"
                  className="password"
                  id="password"
                  placeholder="Enter Your New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <input
                  type="password"
                  name="newPassword"
                  className="newPassword"
                  id="newPassword"
                  placeholder="Re Enter Your New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-row-last">
                <button type="submit" className="register forgotpass">
                  Confirm
                </button>
              </div>

              <div className="form-checkbox">
                <label className="container">
                  <p>
                    <a href="/login" className="text">
                      Login Here
                    </a>
                    .
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

export default ResetPassword;
