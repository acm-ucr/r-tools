"use client";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Landing from "@/components/home/Landing";
import { NAVIGATION } from "@/data/navigation";
import { COLORS } from "@/data/icons";
import { useState } from "react";
const tabs = () => {
  const tabArray = [];
  NAVIGATION.forEach((section) => {
    section.sub.forEach((card) => {
      tabArray.push({ ...card, show: false });
    });
  });
  return tabArray;
};
const Home = () => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState(tabs());

  const handleInput = (value) => {
    setResults(
      results.map((result) => ({
        ...result,
        show: result.name.toLowerCase().includes(value),
      }))
    );
  };

  return (
    <>
      <Landing />
      <div className="w-2/5 self-center">
        <Input
          button="SEARCH"
          placeholder="search"
          thick={true}
          value={value}
          setValue={setValue}
          onChange={handleInput}
          clear={true}
        />
      </div>
      <div className="w-10/12 self-center">
        {value === "" &&
          NAVIGATION.map((section, sectionIndex) => (
            <div className="py-3" key={sectionIndex}>
              <div className="text-rtools-blue-100 mb-2">{section.name}</div>
              <div className="gap-3 grid grid-cols-5">
                {section.sub.map((card, cardIndex) => (
                  <Card
                    key={cardIndex}
                    icon={card.icon}
                    description={card.description}
                    link={card.link}
                    color={
                      Object.keys(COLORS)[
                        cardIndex % Object.keys(COLORS).length
                      ]
                    }
                    name={card.name}
                    row={false}
                    hover="up"
                  />
                ))}
              </div>
            </div>
          ))}
        {value !== "" && (
          <div className="gap-3 grid grid-cols-5 mt-8">
            {results
              .filter((result) => result.show)
              .map((card, cardIndex) => (
                <Card
                  key={cardIndex}
                  icon={card.icon}
                  description={card.description}
                  link={card.link}
                  color={
                    Object.keys(COLORS)[cardIndex % Object.keys(COLORS).length]
                  }
                  name={card.name}
                  row={false}
                  hover="up"
                />
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
