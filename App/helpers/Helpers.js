import fetch from 'node-fetch';
import jwt_decode from "jwt-decode";

export function webpConverter(content) {
  content = content.replace(/.webp/gi, ".png");
  return content;
}


export async function getBase64ForImage(src) {
  const res = await fetch(encodeURI(src))
  const contentType = res.headers.get('content-type')
  const buffer = await res.buffer()
  return `data:${contentType};base64,${buffer.toString('base64')}`
}

export const setCoockie = (name, value, domain) => {
  var d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  var expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export const deleteCoockie = (name, value) => {
  var d = new Date();
  d.setFullYear(1990);
  var expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export const getCookie = (cname) => {

  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document?.cookie);
  var ca = decodedCookie?.split(';');
  for (var i = 0; i < ca?.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


export const getUrl = (url) => {
  if (url) {
    let res = (url).replace(/ /g, '-');
    return res;
  }
  else {
    return ""
  }
}

export const removeDash = (title) => {

  if (title) {
    const res = (title).replace(/\-/g, ' ');
    return res;
  }
  else {
    return ""
  }
}


export const getUserid = () => {
  if (getCookie('token')) {
    var decoded = jwt_decode(getCookie("token"));
    return decoded.userId
  }
  return "";
}