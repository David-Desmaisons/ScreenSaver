function delay(timeInMs) {
  return new Promise((resolve) => setTimeout(resolve, timeInMs));
}

module.exports = {
  delay,
};
