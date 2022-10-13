const mapArrayWithUpdate = (array, updateIndex, newData) => {
  return array.map((data, index) => (index === updateIndex ? newData : data));
};

export default mapArrayWithUpdate;
