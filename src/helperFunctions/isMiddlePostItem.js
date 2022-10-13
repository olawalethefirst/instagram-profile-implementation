const isMiddlePostItem = (index) => {
  return (index + 2) % 3 === 0;
};

export default isMiddlePostItem;
