import { useNavigate } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  let navigate = useNavigate();
  function onClickGithub() {
    navigate("https://github.com/luuu-xu/toock");
  }
  return (
    <div className="footer">
      <p>Created with React and Firebse, by luuu-xu.</p>
      <img 
        src="https://pnggrid.com/wp-content/uploads/2022/03/Github-Logo-Transparent.png" 
        alt="Github" 
        onClick={onClickGithub}
      />
    </div>
  );
}

export default Footer;