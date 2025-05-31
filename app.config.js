import "dotenv/config";

export default ({ config }) => {
  return {
    ...config,
    extra: {
      GOOGLE_WEB_CLIENT_ID: process.env.GOOGLE_WEB_CLIENT_ID,
      // tambahkan variabel env lain di sini
    },
  };
};
