function bfs(graph, start, end) {
    let queue = [{ path: [start] }];
    let visited = new Set();

    while (queue.length > 0) {
      let { path } = queue.shift();
      let node = path[path.length - 1];

      if (node === end) {
        return path;
      }

      if (!visited.has(node)) {
        visited.add(node);
        for (let neighbor of graph[node]) {
          let newPath = [...path];
          newPath.push(neighbor);
          queue.push({ path: newPath });
        }
      }
    }
    return null;
  }

  let graph = {
    Igbokoda: ["Igodan"],
    Igodan: ["Igbokoda", "Main Campus"],
    "Main Campus": ["Igodan", "Ayeka"],
    Ayeka: ["Main Campus", "Opa market"],
    "Opa market": ["Ayeka", "New Garage"],
    "New garage": ["Opa market"],
  };

  function calculateShortestPath() {
    let from = document.getElementById("from").value.trim();
    let to = document.getElementById("to").value.trim();
    let pathBox = document.getElementById("path");

    if (!(from in graph) || !(to in graph)) {
      pathBox.innerHTML = "<p>Path not found</p>";
      return;
    }

    console.time("Time");
    let path = bfs(graph, from, to);
    console.timeEnd("Time");

    if (path === null) {
      pathBox.innerHTML = "<p>Path not found</p>";
    } else {
      pathBox.innerHTML = "<p>Shortest Path: " + path.join(" => ") + "</p>";
    }
  }