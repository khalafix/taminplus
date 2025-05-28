import * as types from '../types';

const initialState = {
    items: [],
    footerItems: null,
    socialNetwork : null
}

const reducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case "GET_MENU_ITEMS":
            return {
                ...state,
                items: action.payload
            };
        case "GET_FOOTER_ITEMS":
            return {
                ...state,
                footerItems: action.payload
            };
        case "GET_SOCIAL_NETWORKSs":
            return {
                ...state,
                socialNetwork: action.payload
            };
        default:
            return state;
    }
};

export default reducer;