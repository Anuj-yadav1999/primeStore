export const initialState = {
    searchString : '',
    cart: [],
    user: null
}

export const cartTotal = (cart) => cart?.reduce((amount, item) => parseFloat(item.price) + amount, 0);

function reducer( state = initialState , action){
    //console.log(action.item);
    switch(action.type){
        case 'UPDATE_SEARCH_STRING':
            return {
                ...state,
                searchString: action.item
            }
        case 'ADD_TO_CART':
            console.log('ADD_TO_CART--> ',action.item);
            return {
                ...state,
                cart: [...state.cart, action.item]
            }
        case 'EMPTY_CART':
            return {
                ...state,
                cart: []
            }
        case 'REMOVE_FROM_CART':
            console.log("Remove-from-cart-->",action.id);
            let newCart = [...state.cart];
            const index = state.cart.findIndex((cartItem) => cartItem.id === action.id);    
            if(index >= 0){
                newCart.splice(index, 1);
            }
            return{
                ...state,
                cart: newCart
            }
        default:
            return state;
    }
}

export default reducer;