const getData = (dataName, zero) => {
  const data = localStorage.getItem(dataName);
  if (data) {
    return JSON.parse(data);
  } else {
    return zero ? 0 : [];
  }
};

export default getData;
