export const env = require('../../.env.json');

const devList = ['dev', 'develop', 'local', 'development'];

export const API_KEYS = env.API_KEYS;

export const isDevelopment = devList.includes(process.env.NODE_ENV.toLowerCase());
// export const isDevelopment = false
console.log(process.env);
