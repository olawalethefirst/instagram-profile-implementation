const formatOpacitySequence = (sequence, n) => {
    if (n <= 0) return sequence;
    return sequence.slice(-n).concat(sequence.slice(0, sequence.length - n));
};

export default formatOpacitySequence;
