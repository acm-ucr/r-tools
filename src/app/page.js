"use client";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Landing from "@/components/home/Landing";
import { NAVIGATION } from "@/data/navigation";
import { COLORS } from "@/data/icons";

const Home = () => {
  return (
    <>
      <Landing />
      <div className="w-2/5 self-center">
        <Input button="SEARCH" placeholder="search" thick={true} />
      </div>
      <div className="w-10/12 self-center">
        {NAVIGATION.map((section, sectionIndex) => (
          <div className="py-3" key={sectionIndex}>
            <div className="text-rtools-blue-100 mb-2">{section.name}</div>
            <div className="gap-3 grid grid-cols-5">
              {section.sub.map((card, cardIndex) => (
                <Card
                  key={cardIndex}
                  icon={card.icon}
                  description={card.description}
                  link={section.link + "/" + card.link}
                  color={
                    Object.keys(COLORS)[cardIndex % Object.keys(COLORS).length]
                  }
                  name={card.name}
                  row={false}
                  hover="up"
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
