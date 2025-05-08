
import {
    ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, CLEAR_CART
} from '../actions/cartActions';

const initialState = { items: [], totalQuantity: 0, totalAmount: 0 };

export default function cartReducer(state = initialState, action) {
    let items;
    switch (action.type) {
        case ADD_TO_CART:
            const prod = action.payload;
            const exists = state.items.find(i => i.id === prod.id);
            items = exists
                ? state.items.map(i => i.id === prod.id ? { ...i, quantity: i.quantity + 1 } : i)
                : [...state.items, { ...prod, quantity: 1 }];
            break;
        case REMOVE_FROM_CART:
            items = state.items.filter(i => i.id !== action.payload);
            break;
        case UPDATE_QUANTITY:
            const { id, qty } = action.payload;
            items = qty > 0
                ? state.items.map(i =>
                    i.id === id ? { ...i, quantity: qty } : i
                )
                : state.items.filter(i => i.id !== id);
            break;
        case CLEAR_CART:
            return initialState;
        default:
            return state;
    }
    const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return { items, totalQuantity, totalAmount };
}
