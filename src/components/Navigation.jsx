"use client";
import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { navigation } from "@/data/navigation";
// import { icons } from "@/data/icons";
import RToolsLogo from "../Assets/RToolsLogo.svg";

const Navigation = () => {
  const [selected, setSelected] = useState("");
  return (
    <Navbar
      collapseOnSelect
      expand="md"
      fixed="top"
      className="w-full m-0 md:h-[8vh] p-0 flex px-3 py-0 font-playfair !bg-black/50 justify-between items-center backdrop-blur-md"
    >
      <Navbar.Brand className="p-0">
        <Link
          onClick={() => setSelected("")}
          eventkey="1"
          className="p-0 no-underline flex items-center gap-2"
          href="/"
        >
          <img src={RToolsLogo} className="w-8 md:w-14" />
          <div className="flex flex-col items-start"></div>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle
        className="list-unstyled !text-transparent border-0"
        aria-controls="basic-navbar-nav"
      >
        <FaBars className=" text-white text-xl" />
      </Navbar.Toggle>
      <Navbar.Collapse className="items-center md:justify-end justify-center">
        <Nav className="mb-2 w-12/12 no-underline text-2xl flex items-center">
          {navigation.map((item, index) => (
            <Nav.Link
              as={Link}
              key={index}
              href={item.link}
              onClick={() => setSelected(item.name)}
              className={`hover:cursor-pointer mb-0 py-1 px-4 no-underline !text-white text-2xl whitespace-nowrap !font-medium hover:!text-white duration-300 ${
                selected === item.name && "!bg-white/10"
              }`}
            >
              {item.name}
            </Nav.Link>
          ))}
          <Nav.Link
            href="/join"
            as={Link}
            className="m-2 py-1 px-4 no-underline !text-white !bg-red-200 text-2xl whitespace-nowrap !font-medium hover:!bg-blue-200 duration-300"
          >
            Join
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
