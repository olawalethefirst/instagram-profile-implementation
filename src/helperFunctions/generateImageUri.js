import { dpr } from "../constants";

const generateImageUri = (rawUrl, size) => `${rawUrl}&w=${size}&dpr=${dpr}`;

export default generateImageUri;
