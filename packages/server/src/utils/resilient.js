const resilient = async (action, count) => {
  let i = 0;
  do {
    try {
      const result = await action(i);
      return result;
    } catch(exception) {
      console.log(exception);
    }
  } while (i++ < count);
  return null;
};

module.exports = {
  resilient,
};
