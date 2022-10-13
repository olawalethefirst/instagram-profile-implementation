import getCurrentFactor from "./getCurrentElasticFactor";

const getInversedElasticity = (elasticityArg) => {
  "worklet";

  let elasticity = elasticityArg;
  if (elasticity < 0) return 0;

  let inversedElasticity = 0;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; elasticity; i++) {
    const currentFactor = getCurrentFactor(i);
    if (i < 9 && elasticity >= currentFactor) {
      inversedElasticity += 1;
      elasticity -= currentFactor;
    } else {
      inversedElasticity += elasticity / currentFactor;
      elasticity = 0;
    }
  }

  return inversedElasticity;
};

export default getInversedElasticity;
