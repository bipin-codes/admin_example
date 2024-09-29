import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IComment } from './types';
import { RootState } from 'app/store';

const initialState: Array<IComment> = [
    {
        username: 'Test',
        created: Date.now().toString(),
        content: 'Cool blog',
        id: '1',
        reference_blog: 'gtest',
        published: true,
    },
    {
        username: 'XMD',
        created: Date.now().toString(),
        content: 'Yo Good Morning blog',
        id: '2',
        reference_blog: 'third',
        published: false,
    },
    {
        username: 'something is great',
        created: Date.now().toString(),
        content: 'Yo Good Morning blog',
        id: '3',
        reference_blog: 'third',
        published: true,
    },
    {
        username: 'yes it is really great',
        created: Date.now().toString(),
        content: 'Yo Good Morning blog',
        id: '4',
        reference_blog: 'third',
        published: true,
    },
];

export const commentSlice = createSlice({
    initialState,
    name: 'comments',
    reducers: {
        unpublish: (state, action: PayloadAction<IComment>) => {
            const index = state.findIndex((x) => x.id === action.payload.id);
            if (index !== -1) {
                state[index].published = !state[index].published;
            }
        },
    },
});

export const { unpublish } = commentSlice.actions;

export const allComments = (state: RootState) => state.comments;

export default commentSlice.reducer;
