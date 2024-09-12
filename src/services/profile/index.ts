import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileProgressItem {
    title: string;
    status: boolean;
}

interface ProfileProgressState {
    items: ProfileProgressItem[];
    total: number;
    completed: number;
}

const initialState: ProfileProgressState = {
    items: [],
    total: 0,
    completed: 0,
};

const profileProgressSlice = createSlice({
    name: 'profileProgress',
    initialState,
    reducers: {
        setProfileProgressItems: (state, action: PayloadAction<ProfileProgressItem[]>) => {
            state.items = action.payload;
            state.total = action.payload.length;
            state.completed = action.payload.filter(item => item.status).length;
        },
        updateProfileProgressItem: (state, action: PayloadAction<{ title: string; status: boolean }>) => {
            const item = state.items.find(item => item.title === action.payload.title);
            if (item) {
                item.status = action.payload.status;
                state.completed = state.items.filter(item => item.status).length;
            }
        },
    },
});

export const { setProfileProgressItems, updateProfileProgressItem } = profileProgressSlice.actions;
export default profileProgressSlice.reducer;