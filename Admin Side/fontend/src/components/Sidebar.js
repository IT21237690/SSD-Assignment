import React, { useEffect, useState } from "react";
import "./module.sidebar.css";
import { SidebarData } from "./SidebarData";
import { Nav, ListGroup } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const [activeIndex, SetActiveIndex] = useState(null);
  useEffect(() => {
    const index = SidebarData.findIndex((item) => pathname.includes(item.link));
    SetActiveIndex(index);
  }, [pathname]);
  const routeTo = (path) => {
    navigate(path);
  };
  return (
    <Nav>
      <ListGroup as="ul">
        {SidebarData.map((item, index) => {
          return (
            <ListGroup.Item
              as="li"
              action
              className="sidebarItem"
              key={index}
              onClick={() => routeTo(item.link)}
              active={index === activeIndex}
              
            >
              {item.title}
            </ListGroup.Item>

            // <Nav.Link key={index} onClick={() => routeTo(item.link)} active={index === activeIndex}>
            //   {item.title}
            // </Nav.Link>
          );
        })}
      </ListGroup>
    </Nav>
  );
}

export default Sidebar;
