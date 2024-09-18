import React, { useState } from 'react'
import Logo from "../Assets/Logo.svg";
import { HiOutlineBars3 } from "react-icons/hi2";
import{
  Box,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";

const Navbar = () => {

  const [openMenu,setOpenMenu] = useState(false)
  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      text: "Institute",
      icon: <InfoIcon />,
    },
    {
      text: "Notices",
      icon: <CommentRoundedIcon />,
    },
    {
      text: "ContactUs",
      icon: <PhoneRoundedIcon />,
    },
  ];
  return (
    <nav>
      <div className="nav-logo-container">
      </div>
      <div className="navbar-links-container">
        <a href="">Home</a>
        <a href="">Institute</a>
        <a href="">Notice Board</a>
        <a href="">Contact Us</a>
        
        <button className="primary-button">Sign in</button>
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <list>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding >
              <ListItemButton>{item.icon}</ListItemButton>
              <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </list>
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
