

//   export const ServerFileIdentifier = () => {
//     if(process.env.NODE_ENV === 'production'){
//       //return "http://localhost:2020/"
//       return "http://192.168.50.57:2020/"
//     }
//     if(process.env.NODE_ENV === 'development'){
//       return "http://localhost:44316/"
//     } 
    
//     return "http://localhost:44316/"
//    }

export const SERVER_ADDRESS =
  process.env.REACT_APP_API_URL || "http://localhost:44316/api";

  export const SERVER_FileADDRESS =
  process.env.REACT_APP_API_URL || "http://localhost:44316/api";



// export const SERVER_ADDRESS =
//   process.env.REACT_APP_API_URL || "https://api.taminplus.com/api";

//   export const SERVER_FileADDRESS =
//   process.env.REACT_APP_API_URL || "https://api.taminplus.com/api";



  export const ServerFileIdentifier = () => {
    if(process.env.NODE_ENV === 'production'){
      return "https://api.taminplus.com/"
    }
    if(process.env.NODE_ENV === 'development'){
      return "http://localhost:44316/"
    } 
    
    return "https://api.taminplus.com/"
  }

