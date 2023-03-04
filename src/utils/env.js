const envFile = require('../../.env.json');
export const env = { ...process.env, ...envFile };

const devList = ['dev', 'develop', 'local', 'development'];

export const isDevelopment = devList.includes(process.env.NODE_ENV.toLowerCase());
// export const isDevelopment = false;
console.log(process.env);
