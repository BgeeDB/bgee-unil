const random = () => {
  const crypto = window.crypto || window.msCrypto;
  const array = new Uint32Array(1);
  return crypto.getRandomValues(array)[0]; // Compliant for security-sensitive use cases
};

export default random;
