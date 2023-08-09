// redux
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { dispatch } from '../index';
import { PostProps, UserInterface } from '../../interfaces/interfaces';

// initial state
const initialState = {
    error: null,
    users: [],
    posts: [],
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // Has Error
        hasError(state, action) {
            state.error = action.payload;
        },
        // List Users
        listUsersSuccess(state, action) {
            state.users = action.payload;
        },
        // List Posts
        listPostsSuccess(state, action) {
            state.posts = action.payload;
        }
    }
});

export default usersSlice.reducer;

//--------------------------------------------//

export function listUsers(users: UserInterface[]) {
    return async () => {
        try {
            dispatch(usersSlice.actions.listUsersSuccess(users));
        } catch (error) {
            dispatch(usersSlice.actions.hasError(error));
        }
    };
}

export function listPosts(posts: PostProps[]) {
    return async () => {
        try {
            dispatch(usersSlice.actions.listPostsSuccess(posts));
        } catch (error) {
            dispatch(usersSlice.actions.hasError(error));
        }
    };
}