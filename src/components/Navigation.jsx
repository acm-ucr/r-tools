"use client";
import { useState } from "react";
import Link from "next/link";
import { NAVIGATION } from "@/data/navigation";
import { COLORS } from "@/data/icons";
import Logo from "../Assets/RToolsLogo.svg";
import Input from "@/components/Input";
import Card from "./Card";
import { MdKeyboardArrowDown } from "react-icons/md";

const Navigation = () => {
  const [expanded, setExpanded] = useState("");

  return (
    <div className="w-full h-[8vh] flex bg-rtools-blue-400 justify-between items-center px-3 fixed">
      <div className="flex items-center">
        <Link onClick={() => setSelected("")} className="mr-10" href="/">
          <img src={Logo.src} className="h-[4vh]" />
        </Link>
        <div className="flex gap-4">
          {NAVIGATION.map((navigation, index) => (
            <div
              key={index}
              className=""
              onMouseEnter={() => setExpanded(navigation.name)}
              onMouseLeave={() => setExpanded("")}
            >
              <div
                className={`${
                  expanded === navigation.name
                    ? "text-white"
                    : "text-rtools-blue-100"
                } hover:cursor-pointer flex items-center py-2`}
              >
                {navigation.name}
                <MdKeyboardArrowDown
                  className={`${
                    expanded === navigation.name && "rotate-180"
                  } duration-300`}
                />
              </div>
              {expanded === navigation.name && (
                <div className="flex flex-col gap-1 absolute bg-rtools-blue-300 p-2 rounded">
                  {navigation.sub.map((sub, subIndex) => (
                    <Card
                      key={subIndex}
                      row={true}
                      icon={sub.icon}
                      description={sub.description}
                      name={sub.name}
                      color={
                        Object.keys(COLORS)[
                          subIndex % Object.keys(COLORS).length
                        ]
                      }
                      link={navigation.link + "/" + sub.link}
                      hover="highlight"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Input button="SEARCH" placeholder="search" />
    </div>
  );
};

export default Navigation;
