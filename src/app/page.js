"use client";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Landing from "@/components/home/Landing";
import { NAVIGATION, ALL_CARDS } from "@/data/navigation";
import { COLORS } from "@/data/colors";
import { useState } from "react";

const Home = () => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState(ALL_CARDS);

  const handleInput = (value) => {
    setResults(
      results.map((result) => ({
        ...result,
        show: result.name.toLowerCase().includes(value.toLowerCase()),
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
        <div className="pt-8" />
        {value !== "" &&
          (results.filter((result) => result.show).length > 0 ? (
            <div className="gap-3 grid grid-cols-5">
              {results
                .filter((result) => result.show)
                .map((card, cardIndex) => (
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
          ) : (
            <div className="flex justify-center">No results found</div>
          ))}
      </div>
    </>
  );
};

export default Home;
