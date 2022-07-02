const apiTable = async () => {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const data = await response.json();
  // console.log(data);
  return data;
};

export default apiTable;
