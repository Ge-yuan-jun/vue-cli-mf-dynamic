const contentExpose = {
  url: "http://localhost:8081/remoteEntry.js",
  scope: "content",
  module: "./routes"
}

const layoutExpose = {
  url: "http://localhost:8082/remoteEntry.js",
  scope: "layout",
  module: "./routes"
}

export {
  contentExpose,
  layoutExpose
}