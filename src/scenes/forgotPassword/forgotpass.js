// ForgotPass.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import Swal from "sweetalert2";

const ForgotPass = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/api/user/forgotPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: "Password reset link sent successfully!",
                    showConfirmButton: false,
                    timer: 3000,
                    toast: true
                })
                navigate("/login"); // Redirect to login page after sending the reset link
            } else {
                const data = await response.json();
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error("Error during forgot password:", error.message);
            alert("An error occurred during forgot password");
        }
    };

    return (
        <div>
            <div className="page-content">
                <div className="form-v10-content">
                    <form className="form-detail" onSubmit={handleForgotPassword} id="myform">
                        <div className="form-right">
                            <h2>Forgot Password</h2>
                            <div className="form-row">
                                <input
                                    type="text"
                                    name="username"
                                    className="street"
                                    id="street"
                                    placeholder="Enter Your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-row-last">
                                <button type="submit" className="register forgotpass">
                                    Send
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

export default ForgotPass;
