import gtxLogo from "../../assets/flogo.jpeg";
import "./Loader.css"

const Loader = ()=>{
    return <div className="loader-container">
        <img src={gtxLogo} alt="gtx-logo" className="loader-logo"/>
        <div className="loader-line"></div>
    </div>
}

export default Loader;