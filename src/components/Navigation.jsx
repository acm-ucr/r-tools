"use client";
import { useState } from "react";
import Link from "next/link";
import { NAVIGATION, ALL_CARDS } from "@/data/navigation";
import { COLORS } from "@/data/icons";
import Logo from "../Assets/RToolsLogo.svg";
import Input from "@/components/Input";
import Card from "./Card";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useMemo } from "react";

const Navigation = () => {
  const [expanded, setExpanded] = useState("");
  const results = useMemo(ALL_CARDS);
  const [value, setValue] = useState("");

  return (
    <div className="w-full h-[8vh] flex bg-rtools-blue-400 justify-between items-center px-3 fixed z-10">
      <div className="flex items-center">
        <Link onClick={() => setSelected("")} className="mr-10" href="/">
          <img src={Logo.src} className="h-[4vh]" alt="logo" />
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
                <div className="z-20 overflow-y-scroll absolute bg-rtools-blue-300 p-2 rounded max-h-[80vh] drop-shadow-2xl">
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
                      link={sub.link}
                      hover="highlight"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        <Input placeholder="search" value={value} setValue={setValue} />
        {value !== "" && (
          <div className="overflow-y-scroll absolute bg-rtools-blue-300 p-2 rounded max-h-[80vh] mt-2 drop-shadow-2xl">
            {results.filter((card) => card.name.toLowerCase().includes(value))
              .length > 0 ? (
              results
                .filter((card) => card.name.toLowerCase().includes(value))
                .map((sub, subIndex) => (
                  <Card
                    key={subIndex}
                    row={true}
                    icon={sub.icon}
                    description={sub.description}
                    name={sub.name}
                    color={
                      Object.keys(COLORS)[subIndex % Object.keys(COLORS).length]
                    }
                    link={sub.link}
                    hover="highlight"
                  />
                ))
            ) : (
              <div className="flex justify-center">No results found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
