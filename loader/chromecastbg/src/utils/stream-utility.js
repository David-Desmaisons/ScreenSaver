const es = require("event-stream");

function getSerializerStream() {
  let first = true;
  return es.through(
    function write(data) {
      const value = `${first ? "[" : ","}\n${JSON.stringify(data, null, 2)}`;
      first = false;
      this.emit("data", value);
    },
    function end() {
      this.emit("data", "\n]");
      this.emit("end");
    }
  );
}

module.exports = {
  getSerializerStream,
};
