const downLoadFile = (result) => {
    if (result) {
        const url = window.URL.createObjectURL(new Blob([result.data]));
        const link = document.createElement("a");
        link.href = url;
  
        let filename = "template.xlsx";
        const headerval = result.headers["content-disposition"];
        if (headerval != null) {
          filename = headerval
            .split(";")[1]
            .split("=")[1]
            .replace('"', "")
            .replace('"', "");
          filename = decodeURI(filename);
        }
  
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
      }
}