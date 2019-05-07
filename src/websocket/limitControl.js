/**
 * 防爆控制
 * @param server
 * @param max
 */
const limitControl = (server, max) => {
  console.log("ws status count: " + server.connections.length + "/" + max);
  if (server.connections.length > max) {
    console.log("ws count overflow, starting force GC...");
    for (let i = 0; i < 10; i++) {
      server.connections[i].close();
    }
  }
};

module.exports = limitControl;
