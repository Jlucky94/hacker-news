import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AsyncConfigType} from "app/store";
import {API} from "api/api";

export const appInitialState = {
    storiesId: [] as number[],

}
export type InitialStateType = typeof appInitialState

const appSlice = createSlice({
    name: 'app',
    initialState: appInitialState,
    reducers: {
        setStoriesId: (state, action: PayloadAction<number[]>) => {
            state.storiesId = action.payload
        }
    }
})

export const getStoriesIdsTC = createAsyncThunk<
    number[],
    void,
    AsyncConfigType
>('app/getStoriesIds',
    async (_, thunkAPI) => {
        try {
            const response = await API.getStoryIds()
            thunkAPI.dispatch(appActions.setStoriesId(response))
            return response
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    })

export const {reducer: appReducer, actions: appActions} = appSlice