const format = (json) => {
  let buffer = [];

  Object.keys(json).forEach((key) => {
    buffer.push(json[key]);
  });

  buffer.map((item) => {
    Object.keys(item).map((key) => {
      const newProp = key.split(' ')[1];
      item[newProp] = item[key];
      delete item[key];
    });
  });

  return buffer[0];
};

export default format;
