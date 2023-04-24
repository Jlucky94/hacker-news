import {AnyAction, configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "app/appSlice";

export const store = configureStore({
    reducer: {
        app: appReducer,
    },
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AsyncConfigType = {
    dispatch: ThunkAppDispatchType,
    rejectWithValue: string,
    state: AppRootStateType
}