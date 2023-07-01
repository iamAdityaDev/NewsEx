import React from "react";
import './navbar.css';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const open_kar=()=>{
  let nav_cat=document.getElementById("navbar_categories_id")
  nav_cat.style.position = 'absolute';
  nav_cat.style.top = '00px';
}
const close_kar=()=>{
  let nav_cat=document.getElementById("navbar_categories_id")
  nav_cat.style.position = 'absolute';
  nav_cat.style.top = '-600px';
}
function Navbar() {
  return (
    <div className="nav">
      <p className="name_nav">NewsEx</p>
      <div className="navbar_categories" id="navbar_categories_id">
      <Link to="/entertainment" className="nav_com entertainment">Entertainment</Link>
      <Link to="/general" className="nav_com general">General</Link>
      <Link to="/business" className="nav_com business">Business</Link>
      <Link to="/health" className="nav_com health">Health</Link>
      <Link to="/science" className="nav_com science">Science</Link>
      <Link to="/technology" className="nav_com technology">Technology</Link>
      <Link to="/sports" className="nav_com sports">Sports</Link>
      <button onClick={close_kar} id="close"><CloseIcon className="close_icon"/></button>
      </div>
    <button onClick={open_kar} className="open_categor"><MenuIcon className="menu"/></button>
    </div>
  );
}

export default Navbar;