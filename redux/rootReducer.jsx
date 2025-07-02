// store/rootReducer.js
import { combineReducers } from 'redux';
import userSlice from './slices/userSlice'
import cartSlice from './slices/productsSlice'
import sortSlice from './slices/sortProduct'
import filterSlice from './slices/filterSlice';

const rootReducer = combineReducers({
    user : userSlice,
    cart: cartSlice,
    sort: sortSlice,
    filter: filterSlice,
});

export default rootReducer;
