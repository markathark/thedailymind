const getData = (dataName, origin) => {
  const data = localStorage.getItem(dataName);
  if (data) {
    return JSON.parse(data);
  } else if (origin === undefined) {
    return [];
  } else return origin;
};

export default getData;
