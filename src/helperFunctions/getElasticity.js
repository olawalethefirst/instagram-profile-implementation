import getAccumulatedElasticityFactor from './getAccumulatedElasticityFactor';

const getElasticity = (tenthOfView, outboundOffset) => {
    'worklet';

    if (tenthOfView <= 0 || outboundOffset === 0) return 0;

    const signFactor = outboundOffset / Math.abs(outboundOffset);
    const loopSteps = Math.abs(outboundOffset) / tenthOfView;

    return getAccumulatedElasticityFactor(loopSteps) * tenthOfView * signFactor;
};

export default getElasticity;
