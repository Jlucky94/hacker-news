import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AsyncConfigType} from "app/store";
import {API, StoryType} from "api/api";

export type StoriesType = {
    [storyId: string]: StoryType
}
export const appInitialState = {
    storiesId: [] as number[],
    stories: {} as StoriesType

}
export type InitialStateType = typeof appInitialState

const appSlice = createSlice({
    name: 'app',
    initialState: appInitialState,
    reducers: {
        setStoriesId: (state, action: PayloadAction<{ storiesIds: number[] }>) => {
            state.storiesId = action.payload.storiesIds
        },
        setStory: (state, action: PayloadAction<{ story: StoryType }>) => {
            state.stories[action.payload.story.id] = action.payload.story
        },
    }
})

export const getStoriesIdsTC = createAsyncThunk<
    number[],
    void,
    AsyncConfigType
>('app/getStoriesIds',
    async (_, thunkAPI) => {
        try {
            const storiesIds = await API.getStoryIds()
            thunkAPI.dispatch(appActions.setStoriesId({storiesIds}))
            return storiesIds
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    })
export const getStoryTC = createAsyncThunk<
    StoryType,
    { storyId: string },
    AsyncConfigType
>('app/getStory',
    async (data, thunkAPI) => {
        try {
            const story = await API.getStory(data.storyId)
            thunkAPI.dispatch(appActions.setStory({story}))
            return story
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    })

export const {reducer: appReducer, actions: appActions} = appSlice