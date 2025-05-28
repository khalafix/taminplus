import cookie from "js-cookie";

const acceptLanguages = ["en", "fa"];
const defaultLocale = acceptLanguages[1];

const getLocale = (value) => {
  try {
    const cookieLocale = cookie.get("locale");
    let locale = defaultLocale;
    if (cookieLocale) {
      locale = acceptLanguages.includes(cookieLocale)
        ? cookieLocale
        : defaultLocale;
    } else {
      const systemLocale = value || defaultLocale;
      locale = acceptLanguages.includes(systemLocale)
        ? systemLocale
        : defaultLocale;
      cookie.set("locale", locale, { expires: 365 });
    }
    return locale;
  } catch (error) {
    console.error(error);
    return defaultLocale;
  }
};

export default getLocale;
