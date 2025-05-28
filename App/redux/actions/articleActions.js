import * as types from 'redux/types';


export const getSideBarData = (model) => {
    return {
        type : types.GET_ARTICLE_SIDEBAR_INFOS, 
        payload : model
    }
}

export const getInitialPosts = (model) => {
    return {
        type : types.GET_INITIAL_POSTS, 
        payload : model
    }
}