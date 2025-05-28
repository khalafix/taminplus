
import {combineReducers} from 'redux';
import shoppingCard from '../reducers/shoppingCardReducer';
import navbar from '../reducers/navbarReducer';
import blog from '../reducers/articleReducer';





const rootReducer = combineReducers({
    shoppingCard , 
    navbar,
    blog
});

export default rootReducer;