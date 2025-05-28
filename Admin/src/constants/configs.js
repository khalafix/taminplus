export const SERVER_ADDRESS =
  process.env.REACT_APP_API_URL || "http://localhost:44316/api";

  export const MEDIA_SERVER_ADDRESS = "http://localhost:44316/";

  export const SERVER_FileADDRESS =
  process.env.REACT_APP_API_URL || "http://localhost:44316/api";



  export const ServerFileIdentifier = () => {
    if(process.env.NODE_ENV === 'production'){
      return "https://api.taminplus.com"
    }
    if(process.env.NODE_ENV === 'development'){
      return "http://localhost:44316/"
    } 
    return "http://localhost:44316/"
  }

