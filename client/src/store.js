import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


export const fetchProducts = createAsyncThunk(
    "postsdata/fetchPostsData",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
            console.log(response.data); 
            return response.data; 
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);






const initialState = {
    products: [],
    status: 'idle', 
    error: null,
};


const postSlice = createSlice({
    name: "postsdata",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || "Failed to fetch products";
            });
    },
});


const persistConfig = {
    key: "root",
    version: 1,
    storage, 
};

const rootReducer = combineReducers({
    postsdata: postSlice.reducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
});


export const persistor = persistStore(store);


export const { register } = postSlice.actions;
export default store;
