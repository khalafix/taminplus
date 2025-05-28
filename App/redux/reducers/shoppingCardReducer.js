import * as types from '../types';



const initialState = {
    items: [],
    count: 0,
    products:[]
}

const reducer = (
    state = initialState,
    actions
) => {
    switch (actions.type) {
        case types.SHOPPING_CARD_REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter(q => q.id !== actions.payload.id)
                //  items: state.items.filter(q => q.index !== actions.payload.index)
            };
        case types.SHOPPING_CARD_ADD_ITEM:
            return {
                ...state,
                items: actions.payload
            };
        case types.SHOPPING_CARD_Remove_ITEMCOUNT:
            return {
                ...state,
                items: actions.payload
            };
        case types.SHOPPING_CARD_GETALL:
            return {
                ...state,
                items: actions.payload,
                products:actions.payload
            };
        case types.SHOPPING_CARD_GETCount:
            return {
                ...state,
                count: actions.payload
            };
        case types.SHOPPING_CARD_CLEAR:

            return {
                ...state,
                items: new Array(0).fill()
            };
        default:
            return state;
    }
};

export default reducer;
