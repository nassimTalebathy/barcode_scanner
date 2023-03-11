module.exports = ({ config }) => {
  const { android, web, ios, ...restOfConfig } = config;
  const extra = { firebaseConfigJsonFile: process.env.FIREBASE_CONFIG_JSON || './.env.firebaseConfig.json' };
  extra.firebaseConfigJson = require(extra.firebaseConfigJsonFile);
  return {
    ...restOfConfig,
    android: { ...android, ...extra },
    web: { ...web, ...extra },
    ios: { ...ios, ...extra },
  };
};
