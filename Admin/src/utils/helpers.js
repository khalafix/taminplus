import { notification } from "antd";
import cookie from "cookie";

export const getLang = (locale) => {
  try {
    return require(`../lang/${locale}.json`);
  } catch (error) {
    return require("../lang/en.json");
  }
};

export const removeEmptyValueObject = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === "object" && obj[key].length !== 0) {
      removeEmptyValueObject(obj[key]);
    }
    // recurse
    else if (
      obj[key] == null ||
      obj[key] === "" ||
      obj[key].length === 0 ||
      obj[key] === undefined ||
      obj[key] === "undefined"
    )
      delete obj[key]; // delete
  });
  return obj;
};

// used in edit table
export const mapArrayOfObjectsWithComma = (inputArray, objName) => {
  const tempArray = [];
  inputArray.map((obj) => tempArray.push(obj[objName].toString()));
  return tempArray;
};

export const mapGroup = (groups) => {
  const groupName = [];

  const getGroupName = (item) => {
    groupName.push(item?.groupName);
    item?.ringToneGroupDto && getGroupName(item.ringToneGroupDto);
  };
  getGroupName(groups);
  // eslint-disable-next-line  no-useless-escape
  return groupName.toString().replace(/\,/g, ">");
};

export const ConvertVendorTypes = (data) => {
  data?.map((item) => {
    item.value = item.id;
    item.text = item.title;
  });
  return data;
};
export const ConvertProductsForSelect = (data) => {
  data?.map((item) => {
    item.value = item.id;
    item.text = item.productName;
  });
  return data;
};

export const ConvertForSelect = (data) => {
  data?.map((item) => {
    item.value = item.id;
    item.text = item.id;
  });
  return data;
};

export const ConvertTypesForSelect = (data) => {
  data?.map((item) => {
    item.value = item.id;
    item.text = item.title;
  });
  return data;
};

export const Notifications = (
  type,
  title,
  description,
  config = { placement: "topRight" }
) => {
  notification[type]({
    message: title,
    description,
    ...config,
  });
};

export const CheckResolutionImage = async (width, height, file) => {
  try {
    let h = 0;
    let w = 0;
    await getInfoImage(file).then((x) => {
      h = x.height;
      w = x.width;
    });

    if (w <= width && h <= height) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};

const imageDimensions = (file) =>
  new Promise((resolve, reject) => {
    const img = new Image();

    // the following handler will fire after the successful loading of the image
    img.onload = () => {
      const { naturalWidth: width, naturalHeight: height } = img;
      resolve({ width, height });
    };

    // and this handler will fire if there was an error with the image (like if it's not really an image or a corrupted one)
    img.onerror = () => {
      reject(new Error("There was some problem with the image."));
    };

    img.src = URL.createObjectURL(file);
  });

const getInfoImage = async (file) => {
  try {
    const dimensions = await imageDimensions(file);
    return dimensions;
  } catch (error) {
    console.error(error);
  }
};

export const dynamicSort = (property) => {
  let sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    const result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};

export function parseCookies(cookies) {
  if (typeof document !== "undefined") {
    return cookie.parse(cookies || document?.cookie);
  }
}

export const downloadFile = (response) => {
  let filename = "";
  const headers = response.headers;
  const contentDisposition = headers["content-disposition"];
  if (contentDisposition && contentDisposition.indexOf("attachment") !== -1) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(contentDisposition);
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, "");
    }
  }
  const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.setAttribute("download", filename); // any other extension
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const dataURItoBlob = (dataURI) => {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], { type: mimeString });
  return blob;
};

export const downloadWithLinkFile = (url, callBack) => {
  const link = document.createElement("a");
  link.href = url;
  document.body.appendChild(link);
  link.setAttribute("download", "file"); // any other extension
  link.setAttribute("target", "_blank");
  link.click();
  link.remove();
  if(callBack){
    callBack();
  }
};

export const checkBetweenDates = (fromDate, toDate, range) => {
  const day1 = new Date(fromDate);
  const day2 = new Date(toDate);
  const diffCount = Math.round((day2 - day1) / 24 / 60 / 60 / 1000);
  if (diffCount <= range && diffCount >= 1) {
    return true;
  } else {
    return false;
  }
};


export const convertToEnglish = (str) => {
  
  let persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  let  arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
  if (typeof str === 'string') {
    for (var i = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  
  return str;
}

export const checkPermissions = (permissions) => {
  /// list permissionsUser
  const permissionsUser = [
    ...["DEFAULT"],
    ...(parseCookies()?.permissions?.split(",") || []),
  ];

  if (permissionsUser?.filter((x) => permissions?.includes(x)).length !== 0) {
    return true;
  } else {
    return false;
  }
};

export const checkRegexNumber_String = (type, value) => {
  const regexNumber = /^[0-9\b]+$/;
  const regexString = /^[\u0600-\u06FFa-z\s]+$/;
  if (type === "string") {
    return regexString.test(value);
  } else if (type === "number") {
    return regexNumber.test(value);
  }
};

export const convertObjectToUrlEncoded = (obj) => {
  var str = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
      str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
    }
  }
  return str.join("&");
};

export const boxIntersect = (box1, box2) => {
  return (
    Math.max(box1.x, box2.x) < Math.min(box1.x + box1.w, box2.x + box2.w) &&
    Math.max(box1.y, box2.y) < Math.min(box1.y + box1.h, box2.y + box2.h)
  );
};

export const bfs = (items, newItem) => {
  const q = [newItem];
  const newLayouts = [newItem];
  const visited = {};
  while (q.length) {
    for (let size = q.length; size > 0; --size) {
      const it = q.shift();
      for (let item of items) {
        if (boxIntersect(item, it) && !visited[item.i]) {
          visited[item.i] = true;
          const pushedItem = { ...item, y: it.y + it.h };
          q.push(pushedItem);
          newLayouts.push(pushedItem);
        }
      }
    }
  }
  for (let item of items) {
    if (!visited[item.i]) {
      newLayouts.push(item);
    }
  }
  return newLayouts;
};

export const generateLayout = (items) => {
  return items.map(({ id, type, option }, i) => {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: Math.round(Math.random() * 5) * 2,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: id,
      type,
      option,
    };
  });
};

export const ConvertIndexTemplateData = (data) => {
  return data?.map((item) => ({
    option: {
      ...item,
    },
    type: item.defaultShowType,
    w: 2,
    h: 1,
  }));
};

export const ConvertFeatureToDataSelect = (data) => {
  data?.map((item) => {
    item.value = item.id;
    item.text = item.title;
  });
  return data;
};
export const ConvertCertificatesToSelect = (data) => {
  data?.map((item) => {
    item.value = item.value;
    item.text = `${item.parentTitle} ${item.text} `;
  });
  return data;
};

export const ConvertDataTags = (data) => {
  data?.map((item) => {
    item.text = item.tagName;
    item.value = item.tagName;
  });
  return data;
};
