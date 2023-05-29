function useFuelStationApiById(data) {
  const getDataById = (id) => {
    return data.elements.find((element) => element.id === id);
  };

  return getDataById;
}

export default useFuelStationApiById;
