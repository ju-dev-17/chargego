function useRandomPrices() {
  const generatePrices = (minPrice, maxPrice) => {
    return (Math.random() * (maxPrice - minPrice) + minPrice).toFixed(2);
  };

  return generatePrices;
}

export default useRandomPrices;
