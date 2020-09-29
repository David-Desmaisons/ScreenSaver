const resilient = async (action, count) => {
  let i = 0;
  do {
    try {
      const result = await action(i);
      return result;
    } catch {}
  } while (i++ < count);
  return null;
};

module.exports = {
  resilient,
};
