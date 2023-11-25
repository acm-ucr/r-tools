export const VERTICES = {
  0: {
    color: "white",
    value: "A",
    id: "0",
    radius: 25,
    x: 131,
    y: 233,
  },
  1: {
    value: "B",
    color: "teal",
    id: "1",
    radius: 25,
    x: 486,
    y: 358,
  },
  3: {
    value: "C",
    color: "white",
    id: "3",
    radius: 25,
    x: 178,
    y: 111,
  },
};

export const EDGES = {
  1: [
    { to: 0, color: "white" },
    { to: 3, color: "purple" },
  ],
  0: [
    { to: 1, color: "white" },
    { to: 3, color: "white" },
  ],
  3: [{ to: 1, color: "white" }],
};
