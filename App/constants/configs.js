// configs.js

const isProd = process.env.NODE_ENV === "production";

export const SERVER_ADDRESS = isProd
  ? "https://api.taminplus.com/api"
  : "http://localhost:44316/api";

export const SERVER_FileADDRESS = isProd
  ? "https://api.taminplus.com/api"
  : "http://localhost:44316/api";

export const ServerFileIdentifier = () => {
  return isProd ? "https://api.taminplus.com/" : "http://localhost:44316/";
};

// `yarn build:dev`  => بیلد پروژه در حالت دولوپ
// `yarn dev`        => اجرای دولوپ

// `yarn build:prod` => بیلد پروژه در حالت پروداکشن
// `yarn start`      =>  اجرای پروداکشن
