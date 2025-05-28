import * as types from '../types';

const initialState = {
    posts: [],
    sideBarInfos: null,
    selectedCategory: null
}

const reducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case types.GET_INITIAL_POSTS:
            return {
                ...state,
                posts: action.payload
            };
        case types.GET_ARTICLE_SIDEBAR_INFOS:
            return {
                ...state,
                sideBarInfos: action.payload
            };
        case types.CHOOSE_ARTICLE_CATEGORY:
            return {
                ...state,
                selectedCategory: action.payload
            };
        default:
            return state;
    }
};

export default reducer;
