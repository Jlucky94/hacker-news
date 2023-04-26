import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected, PayloadAction} from "@reduxjs/toolkit";
import {AsyncConfigType} from "redux/store";
import {API, CommentType, ItemType, StoryType} from "api/api";

export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const appInitialState = {
    error: null as string | null,
    status: 'idle' as AppStatusType,
    storiesId: [] as number[],
    stories: {} as StoriesType,
    comments: {} as CommentsType,
    tempItem: {} as ItemType

}

export type StoriesType = {
    [storyId: string]: StoryType
}
export type CommentsType = {
    [commentId: string]: CommentType
}

export type InitialStateType = typeof appInitialState

const appSlice = createSlice({
    name: 'app',
    initialState: appInitialState,
    reducers: {
        setStoriesId: (state, action: PayloadAction<{ storiesIds: number[] }>) => {
            state.storiesId = action.payload.storiesIds
        },
        setItem: (state, action: PayloadAction<{ item: ItemType }>) => {
            state.tempItem = action.payload.item
        },
        setStory: (state) => {
            state.stories[state.tempItem.id] = state.tempItem as StoryType
        },
        setComment: (state) => {
            state.comments[state.tempItem.id] = state.tempItem as CommentType
        },

    },
    extraReducers: builder => {
        builder
            .addMatcher(isPending, state => {
                state.status = 'loading'
                state.error = null
            })
            .addMatcher(isFulfilled, (state) => {
                state.status = 'succeeded'
            })
            // .addMatcher(infoFulfilled, (state, action) => {
            //     state.infoMessage = action.payload.info.toLowerCase()
            // })
            .addMatcher(isRejected, (state, action) => {
                state.error = action.payload as string
                state.status = 'failed'
            })
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
export const getItemTC = createAsyncThunk<
    ItemType,
    { itemId: string },
    AsyncConfigType
>('app/getStory',
    async (data, thunkAPI) => {
        try {
            const item = await API.getItem(data.itemId) as ItemType
            thunkAPI.dispatch(appActions.setItem({item}))
            return item
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    })

export const {reducer: appReducer, actions: appActions} = appSlice