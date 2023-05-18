export default () => {
  return {
    database: {
      uri: +process.env.DB_URI,
      bcryptSalt: +process.env.SALT_WORK_FACTOR,
    },
  };
};
