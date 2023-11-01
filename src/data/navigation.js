import { BsBarChartFill } from "react-icons/bs";
export const NAVIGATION = [
  {
    name: "ALGORITHM",
    link: "algorithm",
    sub: [
      {
        icon: <BsBarChartFill />,
        name: "Selection Sort",
        link: "algorithm/selection-sort",
        description: "visualize selection sort",
      },
      {
        icon: <BsBarChartFill />,
        name: "Bubble Sort",
        link: "algorithm/bubble-sort",
        description: "visualize selection sort",
      },
      {
        icon: <BsBarChartFill />,
        name: "Merge Sort",
        link: "algorithm/merge-sort",
        description: "visualize selection sort",
      },
      {
        icon: <BsBarChartFill />,
        name: "Quick Sort",
        link: "algorithm/quick-sort",
        description: "visualize selection sort",
      },
      {
        icon: <BsBarChartFill />,
        name: "Insertion Sort",
        link: "algorithm/insertion-sort",
        description: "visualize selection sort",
      },
      {
        icon: <BsBarChartFill />,
        name: "Shell Sort",
        link: "algorithm/shell-sort",
        description: "visualize selection sort",
      },
      {
        icon: <BsBarChartFill />,
        name: "Bucket Sort",
        link: "algorithm/bucket-sort",
        description: "visualize selection sort",
      },
      {
        icon: <BsBarChartFill />,
        name: "Heaps",
        link: "algorithm/heaps",
        description: "visualize selection sort",
      },
      {
        icon: <BsBarChartFill />,
        name: "AVL Trees",
        link: "algorithm/avl-trees",
        description: "visualize selection sort",
      },
    ],
  },
  {
    name: "MATH",
    link: "math",
    sub: [
      {
        icon: <BsBarChartFill />,
        name: "Boolean Simplifier",
        link: "math/boolean-simplifier",
        description: "visualize selection sort",
      },
      {
        icon: <BsBarChartFill />,
        name: "Truth Tables",
        link: "math/truth-tables",
        description: "visualize selection sort",
      },
    ],
  },
  {
    name: "EDITOR",
    link: "editor",
    sub: [
      {
        icon: <BsBarChartFill />,
        name: "Undirected Graph",
        link: "editor/undirected-graph",
        description: "visualize selection sort",
      },
      {
        icon: <BsBarChartFill />,
        name: "Directed Graph",
        link: "editor/directed-graph",
        description: "visualize selection sort",
      },
      {
        icon: <BsBarChartFill />,
        name: "State Machine",
        link: "editor/state-machine",
        description: "visualize selection sort",
      },
    ],
  },
  {
    name: "CHEAT SHEET",
    link: "cheat-sheet",
    sub: [
      {
        icon: <BsBarChartFill />,
        name: "Github",
        link: "cheat-sheet/github",
        description: "visualize selection sort",
      },
      {
        icon: <BsBarChartFill />,
        name: "Pre-req Acyclic Graph",
        link: "cheat-sheet/pre-req",
        description: "visualize selection sort",
      },
    ],
  },
  {
    name: "WEB DEV",
    link: "web-dev",
    sub: [
      {
        icon: <BsBarChartFill />,
        name: "Tailwind",
        link: "web-dev/tailwind",
        description: "visualize selection sort",
      },
      {
        icon: <BsBarChartFill />,
        name: "Next.js",
        link: "web-dev/nextjs",
        description: "visualize selection sort",
      },
    ],
  },
];

export const ALL_CARDS = () => {
  const tabArray = [];
  NAVIGATION.forEach((section) => {
    section.sub.forEach((card) => {
      tabArray.push({ ...card, show: false });
    });
  });
  return tabArray;
};
