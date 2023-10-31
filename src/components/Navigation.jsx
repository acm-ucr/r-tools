"use client";
import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { navigation } from "@/data/navigation";
import { COLORS } from "@/data/icons";
import Logo from "../Assets/RToolsLogo.svg";
import Input from "@/components/Input";
import NavDropdown from "react-bootstrap/NavDropdown";
import Icon from "@/components/Icon";

const Navigation = () => {
  const [selected, setSelected] = useState("");
  const getCurrentColor = (index) => {
    const colorsLength = Object.keys(COLORS).length;
    if (index >= colorsLength) {
      return Object.keys(COLORS)[index - colorsLength];
    } else {
      return Object.keys(COLORS)[index];
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand="md"
      fixed="top"
      className="w-full m-0 md:h-[13vh] p-0 flex py-0 bg-rtools-blue-400 items-center"
    >
      <Navbar.Brand className="p-0">
        <Link
          onClick={() => setSelected("")}
          eventkey="1"
          className="p-0 no-underline flex items-center gap-2 "
          href="/"
        >
          <img src={Logo} className="w-8 md:w-14" />
          <div className="flex flex-col items-start "></div>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle
        className="list-unstyled !text-transparent border-0 "
        aria-controls="basic-navbar-nav"
      ></Navbar.Toggle>
      <Navbar.Collapse className="items-center md:justify-between justify-center">
        <Nav className="mb-2 w-full no-underline text-lg flex items-center justify-between ">
          {navigation.map((item, index) => (
            <NavDropdown
              title={item.name}
              key={index}
              id={`nav-dropdown-${index}`}
              className={`hover:cursor-pointer mb-0 no-underline whitespace-nowrap !font-medium hover:!text-white duration-300 ${
                selected === item.name && "!bg-white/10"
              }`}
            >
              {item.sub.map((subItem, subItemIndex) => (
                <NavDropdown.Item key={subItemIndex}>
                  <div className="flex flex-row bg-rtools-blue-100 ">
                    <div className="flex flex-col justify-center ">
                      <Icon
                        icon={subItem.icon}
                        color={getCurrentColor(subItemIndex)}
                      />
                    </div>
                    <div className="flex flex-col ml-2">
                      <p className="m-0 text-white">{subItem.name}</p>
                      <p className="m-0 text-xs text-rtools-blue-300">
                        {subItem.description}
                      </p>
                    </div>
                  </div>
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          ))}
          <Input button="SEARCH" placeholder="search" />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
