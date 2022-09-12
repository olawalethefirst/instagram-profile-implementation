const getAccumulatedElasticityFactor = (steps) => {
    'worklet';
    if (steps <= 0) return 0;

    const stepsCeil = Math.ceil(steps);

    return new Array(stepsCeil)
        .fill()
        .map((_, i) => (i < 9 ? (0.5 - 0.05 * i).toFixed(2) - 0 : 0.05))
        .reduce((prev, cur, i) => {
            return i + 1 === stepsCeil && stepsCeil > steps
                ? prev + cur * (1 - (stepsCeil - steps))
                : prev + cur;
        }, 0);
};

export default getAccumulatedElasticityFactor;
