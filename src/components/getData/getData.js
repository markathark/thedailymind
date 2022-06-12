const getData = (dataName, origin) => {
  const data = localStorage.getItem(dataName);
  if (data) {
    return JSON.parse(data);
  } else {
    return origin ? origin : [];
  }
};

export default getData;
