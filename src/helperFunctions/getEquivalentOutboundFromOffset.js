import getInversedElasticity from './getInversedElasticity';

const getEquivalentOutboundFromOffset = (tenthOfView, offset) => {
    'worklet';

    if (offset === 0) return 0;

    const elasticity = offset / tenthOfView;

    return tenthOfView * getInversedElasticity(elasticity);
};

export default getEquivalentOutboundFromOffset;
