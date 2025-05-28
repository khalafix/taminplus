
import { getCookie, setCoockie, deleteCoockie } from 'helpers/Helpers';

 const  authCheck = () => {
    var result =  {
        isAuthenticated : false
    };
    if (getCookie("token")) {
        result.isAuthenticated = true;
    }
    return result;
 }

 export default authCheck;