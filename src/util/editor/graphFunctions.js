class GraphFunctions {
  static currentID = 0;

  /**
   * Add a vertex to the graph with a randomly generated id and the value of the input box.
   * @param {Object} data graph data
   * @param {function} setData function to modifu graph data
   * @param {int} size the size of the vertex
   */
  static addVertex = (data, setData, size) => {
    event.preventDefault();
    const id = this.currentID++;
    setData({
      ...data,
      input: "",
      vertices: {
        ...data.vertices,
        [id]: {
          value: data.input,
          radius: 25,
          x: Math.random() * (size - 100) + 50,
          y: Math.random() * (size - 100) + 50,
          color: "white",
        },
      },
    });
  };

  /**
   * Delete a vertex specified by id from the graph.
   * @param {Object} data graph data
   * @param {function} setData function to modifu graph data
   * @param {string} id the id of the vertex to delete
   */
  static deleteVertex = (data, setData, id) => {
    if (!id) return;
    const newVertices = { ...data.vertices };
    delete newVertices[id];
    const newEdges = {};
    Object.entries(data.edges).forEach(([edge, d]) => {
      if (edge !== id) {
        newEdges[edge] = d.filter((e) => e.to !== id);
      }
    });
    setData({
      ...data,
      vertices: newVertices,
      edges: newEdges,
      selectedVertex: null,
    });
  };

  /**
   * Add an edge to the graph from the vertex with id from to the vertex with id to.
   * @param {Object} data graph data
   * @param {function} setData function to modifu graph data
   * @param {string} from the id of the vertec that the edge comes out of
   * @param {string} to the id of the vertex that edge goes into
   * @param {('white'|'pink'|'teal'|'purple'|'orange'|'yellow')} color the color of the edge
   * @param {int} weight the weight of the edge
   */
  static addEdge = (data, setData, from, to, color = "whtie", weight = 1) => {
    if (data.edges[from]?.some((e) => e.to === to)) return;
    if (from === to) return;
    setData({
      ...data,
      selectedVertex: to,
      edges: {
        ...data.edges,
        [from]: data.edges[from]
          ? [...data.edges[from], { to: to, color: color, weight: weight }]
          : [{ to: to, color: color, weight: weight }],
      },
    });
    return;
  };
  /**
   * Delete all the vertices and edges from the graph.
   * @param {Object} data graph data
   * @param {function} setData function to modifu graph datao
   */
  static clear = (data, setData) => {
    setData({ ...data, vertices: {}, edges: {} });
  };

  /**
   * Delete an edge to the graph from the vertex with id from to the vertex with id to.
   * @param {Object} data graph data
   * @param {function} setData function to modifu graph data
   * @param {string} from the id of the vertec that the edge comes out of
   * @param {string} to the id of the vertex that edge goes into
   */
  static deleteEdge = (data, setData, from, to) => {
    setData({
      ...data,
      edges: {
        ...data.edges,
        [from]: data.edges[from].filter((e) => e.to !== to),
      },
    });
  };

  /**
   * Reset all the colors of the vertices and edges to white.
   * @param {Object} data graph data
   * @param {function} setData function to modifu graph data
   */
  static resetColor = (data, setData) => {
    const newVertices = {};
    Object.entries(data.vertices).forEach(([key, vertex]) => {
      newVertices[key] = { ...vertex, color: "white" };
    });
    const newEdges = {};
    Object.entries(data.edges).forEach(([key, edge]) => {
      newEdges[key] = edge.map((e) => ({ ...e, color: "white" }));
    });
    setData({ ...data, vertices: newVertices, edges: newEdges });
  };

  /**
   * Download the graph as an svg.
   */
  static downloadSVG = () => {
    const svg = document
      .getElementById("graphsvg")
      .outerHTML.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const element = document.createElement("a");
    element.download = "w3c.svg";
    element.href = window.URL.createObjectURL(blob);
    element.click();
    element.remove();
  };

  /**
   * Download the graph as a PNG.
   */
  static downloadPNG = () => {
    const svg = document
      .getElementById("graphsvg")
      .outerHTML.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    const DOMURL = window.URL || window.webkitURL || window;
    const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = DOMURL.createObjectURL(svgBlob);
    const svgImage = document.createElement("img");
    document.body.appendChild(svgImage);
    svgImage.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = svgImage.clientWidth;
      canvas.height = svgImage.clientHeight;
      const canvasCtx = canvas.getContext("2d");
      canvasCtx.drawImage(svgImage, 0, 0, canvas.width, canvas.height);
      const imgData = canvas.toDataURL("image/png");
      const element = document.createElement("a");
      element.download = "w3c.png";
      element.href = imgData;
      element.click();
      element.remove();
      canvas.remove();
      svgImage.remove();
    };
    svgImage.src = svgUrl;
  };

  /**
   * Import graph data from a JSON file.
   * @param {Object} e file input component event
   * @param {Object} data graph data
   * @param {function} setData function to modifu graph data
   * @param {boolean} editable if the graph is editable or used in algorithm pages
   */
  static importJSON = async (e, data, setData, editable = true) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      if (editable)
        setData({
          selectedVertex: null,
          selectedEdge: null,
          selectedColor: null,
          input: "",
          tool: "cursor",
          directed: JSON.parse(e.target.result).directed,
          weighted: JSON.parse(e.target.result).weighted,
          vertices: JSON.parse(e.target.result).vertices,
          edges: JSON.parse(e.target.result).edges,
        });
      else {
        const newVertices = {};
        const newEdges = {};
        Object.entries(JSON.parse(e.target.result).vertices).forEach(
          ([key, vertex]) => {
            newVertices[key] = { ...vertex, color: "white" };
          }
        );
        Object.entries(JSON.parse(e.target.result).edges).forEach(
          ([key, edge]) => {
            newEdges[key] = edge.map((e) => ({ ...e, color: "white" }));
          }
        );
        setData({
          selectedVertex: null,
          selectedEdge: null,
          selectedColor: null,
          input: "",
          tool: "cursor",
          directed: JSON.parse(e.target.result).directed,
          weighted: JSON.parse(e.target.result).weighted,
          vertices: newVertices,
          edges: newEdges,
          tool: "cursor",
        });
      }
    };
  };

  /**
   * Download the graph data as a JSON file.
   * @param {Object} data graph data
   */
  static downLoadJSON = (data) => {
    const json = JSON.stringify({
      vertices: data.vertices,
      edges: data.edges,
      directed: data.directed,
      weighted: data.weighted,
    });
    const blob = new Blob([json], { type: "application/json" });
    const element = document.createElement("a");
    element.download = "data.json";
    element.href = window.URL.createObjectURL(blob);
    element.click();
    element.remove();
  };

  /**
   * Set the color of the vertex specified by vertexID to color.
   * @param {Object} data graph data
   * @param {function} setData function to modifu graph data
   * @param {string} vertexID the vertex to color
   * @param {('white'|'pink'|'teal'|'purple'|'orange'|'yellow')} color the color to set the vertex to
   */
  static setVertexColor = (data, setData, vertexID, color) => {
    setData({
      ...data,
      vertices: {
        ...data.vertices,
        [vertexID]: { ...data.vertices[vertexID], color: color },
      },
    });
  };

  /**
   * Set the color of the edge comeing out of from and going into to to color.
   * @param {Object} data graph data
   * @param {function} setData function to modifu graph data
   * @param {string} from the vertex that the edge comes out of
   * @param {string} to the vertex that the edge goes into
   * @param {('white'|'pink'|'teal'|'purple'|'orange'|'yellow')} color the color to set the edge to
   */
  static setEdgeColor = (data, setData, from, to, color) => {
    setData({
      ...data,
      edges: {
        ...data.edges,
        [from]: data.edges[from].map((e) =>
          e.to === to ? { ...e, color: color } : e
        ),
      },
    });
  };

  /**
   * Return the modified graph so that if there is at least an edge from vertex1
   * to vertex2 then change it to an one way edge from the vertex with a smaller id to the bigger
   * @param {Object} data graph data
   * @return {Object} an object with oneWay undirected graph
   */
  static getOneWayUndirectedEdge = (data) => {
    if (!data.vertices || !data.edges) return {};
    const result = {};
    Object.keys(data.vertices).forEach((vertex) => {
      result[vertex] = [];
    });
    Object.entries(data.edges).forEach(([vertex1, edges]) => {
      edges.forEach((vertex2) => {
        const from = vertex1 < vertex2.to ? vertex1 : vertex2.to;
        const to = vertex1 < vertex2.to ? vertex2.to : vertex1;
        if (!result[from].some((e) => e.to === to))
          result[from].push({ ...vertex2, to: to });
      });
    });
    return result;
  };

  /**
   * Return the modified graph so that if there is at least an edge from vertex1 to vertex2 then change it to a two way edge
   * @param {Object} data graph data
   * @return {Object} an object with oneWay undirected graph
   */
  static getTwoWayUndirectedEdge = (data) => {
    if (!data.vertices || !data.edges) return {};
    const result = {};
    Object.keys(data.vertices).forEach((vertex) => {
      result[vertex] = [];
    });
    Object.entries(data.edges).forEach(([vertex1, edges]) => {
      edges.forEach((vertex2) => {
        if (!result[vertex1].some((e) => e.to === vertex2.to)) {
          result[vertex1].push({ ...vertex2, to: vertex2.to });
          result[vertex2.to].push({ ...vertex2, to: vertex1 });
        }
      });
    });
    return result;
  };

  /**
   * Return an adjacency matrix of the graph.
   * @param {Object} data graph data
   * @param {Object} undirectedEdge  a map of vertex ids to a list of edges that come out of that vertex and go into that vertex.
   * @param {boolean} directed if the graph is directed
   * @param {boolean} weighted if the graph is weighted
   * @return {Array.Array<int>} an adjacency matrix of the graph.
   */
  static getAdjacencyMatrix = (data, undirectedEdge, directed, weighted) => {
    if (
      Object.keys(data.vertices).length === 0 ||
      Object.keys(data.edges).length === 0
    )
      return [];
    const matrix = [];
    const header = [" "];
    Object.keys(data.vertices).forEach((vertex) => {
      header.push(data.vertices[vertex].value);
    });
    matrix.push(header);
    Object.keys(data.vertices).forEach((from) => {
      const row = [data.vertices[from].value];
      Object.keys(data.vertices).forEach((to) => {
        const edge = directed
          ? data.edges[from]?.find((e) => e.to === to)
          : undirectedEdge.twoWay[from]?.find((e) => e.to === to);
        row.push(edge ? (weighted ? edge.weight || 0 : 1) : Infinity);
      });
      matrix.push(row);
    });
    return matrix;
  };

  /**
   * Set the weight of the edge comeing out of from and going into to to the number key pressed.
   * @param {Object} data graph data
   * @param {function} setData function to modifu graph data
   * @param {string} from the vertex that the edge comes out of
   * @param {string} to the vertex that the edge goes into
   * @param {int} weight the wieght to set the edge to
   * @return {void}
   */
  static setEdgeWeight = (data, setData, from, to, weight) => {
    setData({
      ...data,
      edges: {
        ...data.edges,
        [from]: data.edges[from].map((edge) => {
          if (edge.to === to) {
            return { ...edge, weight: weight };
          }
          return edge;
        }),
      },
    });
  };

  /**
   * Set the selected edge to the edge specified by edge.
   * @param {Object} data graph data
   * @param {function} setData function to modifu graph data
   * @param {Object} edge the edge to set as selected
   * @return {void}
   */
  static setSelectedEdge = (data, setData, edge) => {
    setData({
      ...data,
      selectedVertex: null,
      selectedEdge:
        data.selectedEdge &&
        data.selectedEdge.to === edge.to &&
        data.selectedEdge.from === edge.from
          ? null
          : edge,
    });
  };
  /**
   * Set the selected vertex to the vertex specified by vertex.
   * @param {Object} data graph data
   * @param {function} setData function to modifu graph data
   * @param {string} vertex the vertex to set as selected
   * @return {void}
   */
  static setSelectedVertex = (data, setData, vertex) => {
    setData({
      ...data,
      selectedEdge: null,
      selectedVertex: data.selectedVertex === vertex ? null : vertex,
    });
  };
}

export default GraphFunctions;
export const {
  addVertex,
  deleteVertex,
  addEdge,
  deleteEdge,
  clear,
  resetColor,
  downLoadJSON,
  downloadPNG,
  downloadSVG,
  importJSON,
  setEdgeColor,
  setEdgeWeight,
  setVertexColor,
  getOneWayUndirectedEdge,
  getTwoWayUndirectedEdge,
  getAdjacencyMatrix,
  setSelectedVertex,
  setSelectedEdge,
} = GraphFunctions;
