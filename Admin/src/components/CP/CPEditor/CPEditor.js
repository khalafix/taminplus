import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Form } from "antd";
import { SERVER_ADDRESS, MEDIA_SERVER_ADDRESS } from "constants/configs";
import {fontsImports} from '../../../assets/fonts/Vazirmatn-font-face'
const { Item } = Form;
const vazirCssUrl = process.env.PUBLIC_URL + '/vazirfont/Vazirmatn-font-face.css';

const CPEditor = ({ name, initialValue, label, value }) => {
  const handleImageUpload = (blobInfo) =>
    new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", `${SERVER_ADDRESS}/media/upload`);
      xhr.setRequestHeader(
        "authorization",
        `bearer ` + localStorage.getItem("s-token")
      );

      xhr.onload = function () {
        if (xhr.status !== 200) {
          reject("HTTP Error: " + xhr.status);
          return;
        }

        if (!xhr.responseText) {
          reject("Invalid JSON: " + xhr.responseText);
          return;
        }

        resolve(xhr.responseText);
      };

      xhr.onerror = () => {
        reject(xhr.responseText);
      };

      let formData = new FormData();
      formData.append("file", blobInfo.blob(), blobInfo.filename());

      xhr.send(formData);
    });

  return (
    <Item
      label={label}
      name={name}
      value={value}
      initialValue={initialValue}
      trigger={"onEditorChange"}
    >
      <Editor
        initialValue={initialValue}
        tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
        init={{
          height: 500,
          font_formats: "Vazirmatn=vazirmatn",
          images_upload_handler: handleImageUpload,
          menubar: true,
          directionality: "rtl",
          language: 'fa',
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
            "help",
            "wordcount",
            "directionality",
          ],
          toolbar:
            "redo undo | blocks | image | rtl ltr | " +
            "bold italic forecolor | alignright aligncenter " +
            "alignleft alignjustify | bullist numlist indent outdent | " +
            "removeformat ",
          content_style: `${fontsImports} body { font-family: vazirmatn; }`,
          content_css:{vazirCssUrl},
        }}
      />
    </Item>
  );
};

export default CPEditor;
