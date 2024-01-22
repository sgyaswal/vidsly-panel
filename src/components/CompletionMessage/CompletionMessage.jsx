import "./CompletionMessage.css";
import logo from "../../assets/flogo.jpeg";
import { useNavigate } from "react-router-dom";

const CompletionMessage = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    console.log("login clicked");
    navigate("/login");
  };
  return (
    <div className="message-container">
      <img src={logo} alt="GrowtX" className="logo" />
      <p className="message-text">All done! Thanks for your time.</p>
      <p className="message-text">
        Don't have an account?{" "}
        <a href="/login" onClick={handleSignup} className="text">
          Signup Here
        </a>
      </p>
    </div>
  );
};

export default CompletionMessage;
