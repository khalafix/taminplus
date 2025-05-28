import baseRequest from "../baseRequest";


export const goldiranServices = {

  getProvince: async () => {
     //datatype=1,parentId=0 => استانھا لیست

    const result = await baseRequest(null, "/Goldiran/GetBasicData/"+1+"/"+0, "get", true);
    
    return result;
  },
  getCities: async (parentId) => {
    // شھر لیست
    // datatype=2,parentId=1 = استان  

    const result = await baseRequest(null, "/Goldiran/GetBasicData/"+2+"/"+parentId, "get", true);
    return result;
  },

  getRegions: async (parentId) => {
    // منطقه لیست
    // datatype=9,parentId=17 - شهر
    const result = await baseRequest(null, "/Goldiran/GetBasicData/"+9+"/"+parentId, "get", true);
    return result;
  },
  getParishes : async (cityId ,regionId , term ) => {
    // محله لیست
    // cityId = شهر , regionId = منطقه 
    // if(term){
    //   const result = await baseRequest(null, "/Goldiran/GetParishList/"+cityId+"/"+regionId +"/"+term, "get", false);
    //   return result;
    // }
    // else{
    //   const result = await baseRequest(null, "/Goldiran/GetParishList/"+cityId+"/"+regionId , "get", false);
    //   return result;
    // }
    const result = await baseRequest(null, "/Goldiran/GetParishList/"+cityId+"/"+regionId +"/"+term, "get", true);
    return result;
  },
};
