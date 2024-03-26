import { BsBarChartFill } from "react-icons/bs";
import { FaSortAmountUp } from "react-icons/fa";
import { TbChartBubbleFilled } from "react-icons/tb";
import { FaCodeMerge } from "react-icons/fa6";
import { VscInsert } from "react-icons/vsc";
import { GiSewedShell } from "react-icons/gi";
import { FaBucket } from "react-icons/fa6";
import { CgListTree } from "react-icons/cg";
import { BiMath } from "react-icons/bi";
import { PiTable } from "react-icons/pi";
import { PiGraph } from "react-icons/pi";
import { RiNodeTree } from "react-icons/ri";

const DEV = [
  {
    name: "ALGORITHM",
    link: "/algorithm",
    sub: [
      {
        icon: <BsBarChartFill />,
        name: "Selection Sort",
        link: "/algorithm/selection-sort",
        description: "visualize selection sort",
        release: true,
      },
      {
        icon: <TbChartBubbleFilled />,
        name: "Bubble Sort",
        link: "/algorithm/bubble-sort",
        description: "visualize bubble sort",
        release: true,
      },
      {
        icon: <FaCodeMerge />,
        name: "Merge Sort",
        link: "/algorithm/merge-sort",
        description: "visualize merge sort",
        release: true,
      },
      {
        icon: <FaSortAmountUp />,
        name: "Quick Sort",
        link: "/algorithm/quick-sort",
        description: "visualize quick sort",
      },
      {
        icon: <VscInsert />,
        name: "Insertion Sort",
        link: "/algorithm/insertion-sort",
        description: "visualize insertion sort",
        release: true,
      },
      {
        icon: <GiSewedShell />,
        name: "Shell Sort",
        link: "/algorithm/shell-sort",
        description: "visualize shell sort",
      },
      {
        icon: <FaBucket />,
        name: "Bucket Sort",
        link: "/algorithm/bucket-sort",
        description: "visualize bucket sort",
        release: true,
      },
      {
        icon: <CgListTree />,
        name: "Heap Sort",
        link: "/algorithm/heaps",
        description: "visualize heap sort",
        release: true,
      },
      {
        icon: <BsBarChartFill />,
        name: "Bogo Sort",
        link: "/algorithm/bogo-sort",
        description: "O(∞) sorting algorithm",
        release: true,
      },
    ],
  },
  {
    name: "MATH",
    link: "/math",
    sub: [
      {
        icon: <BiMath />,
        name: "Boolean Simplifier",
        link: "/math/boolean-simplifier",
        description: "boolean algebra calculator",
        release: true,
      },
      {
        icon: <PiTable />,
        name: "Truth Tables",
        link: "/math/truth-tables",
        description: "build truth tables for boolean expressions",
        release: true,
      },
    ],
  },
  {
    name: "GRAPH",
    link: "/graph",
    sub: [
      {
        icon: <PiGraph />,
        name: "Editor",
        link: "/graph/editor",
        description: "draw graphs",
        release: true,
      },
      {
        icon: <PiGraph />,
        name: "Dijkstra",
        link: "/graph/dijkstra",
        description: "run Dijkstra on graphs",
        release: true,
      },
      {
        icon: <PiGraph />,
        name: "Floyd Warshall",
        link: "/graph/floyd-warshall",
        description: "run Floyd Warshall on graphs",
        release: true,
      },
      {
        icon: <PiGraph />,
        name: "Breadth First Search",
        link: "/graph/bfs",
        description: "run BFS on graphs",
        release: true,
      },
      {
        icon: <PiGraph />,
        name: "Depth First Search",
        link: "/graph/dfs",
        description: "run DFS on graphs",
        release: true,
      },
      {
        icon: <PiGraph />,
        name: "Bellman Ford",
        link: "/graph/bellman-ford",
        description: "run Bellman Ford on graphs",
        release: true,
      },
      {
        icon: <RiNodeTree />,
        name: "Prim's",
        link: "/graph/prims",
        description: "Minimum Spanning Tree",
        release: true,
      },
      {
        icon: <RiNodeTree />,
        name: "Kruskals",
        link: "/graph/kruskals",
        description: "run Kruskals on graphs",
        release: true,
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

export const NAVIGATION =
  process.env.NEXT_PUBLIC_PROD === "dev"
    ? DEV
    : DEV.filter((section, index) => {
        const filteredSub = section.sub.filter((tab) => tab.release);
        DEV[index].sub = filteredSub;
        return filteredSub.length > 0;
      });
