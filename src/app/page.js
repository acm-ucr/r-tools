"use client";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Landing from "@/components/home/Landing";
import { navigation } from "@/data/navigation";
import { COLORS } from "@/data/icons";

const Home = () => {
  const getCurrentColor = (index) => {
    const colorsLength = Object.keys(COLORS).length;
    if (index >= colorsLength) {
      return Object.keys(COLORS)[index - colorsLength];
    } else {
      return Object.keys(COLORS)[index];
    }
  };
  return (
    <>
      <Landing />
      <div className="px-5 w-full flex-col">
        <div className="flex justify-center">
          <div className="w-7/12">
            <Input button="SEARCH" placeholder="search" />
          </div>
        </div>
        <div className="p-2"></div>
        {navigation.map((section, sectionIndex) => (
          <div className="py-3" key={sectionIndex}>
            <div className="text-rtools-blue-100">{section.name}</div>
            <div className="p-1"></div>

            <div className="gap-3 grid grid-cols-5">
              {section.sub.map((card, cardIndex) => (
                <Card
                  key={cardIndex}
                  icon={card.icon}
                  description={card.description}
                  link={card.link}
                  color={getCurrentColor(cardIndex)}
                  name={card.name}
                  row={false}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
