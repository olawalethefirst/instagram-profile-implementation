const getCurrentFactor = (i) => {
    'worklet';

    if (i < 0) return 0;
    if (i > 9) return 0.05;
    return (0.5 - 0.05 * i).toFixed(2) - 0;
};

export default getCurrentFactor