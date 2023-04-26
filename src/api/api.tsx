import axios, {AxiosResponse} from "axios";

export const baseUrl = "https://hacker-news.firebaseio.com/v0/"
export const newStoriesUrl = baseUrl + "newstories.json"
export const storyUrl = baseUrl + "item/"


export const API = {
    getStoryIds: () => {
        return axios.get<number[]>(newStoriesUrl).then(response => {
            return response.data
        })
    },
    getItem: (itemId: string) => {
        return axios.get<{ itemId: string }, AxiosResponse<ItemType>>(storyUrl + itemId + ".json").then(response => {
            return response.data
        })
    }
}

export type ItemType = StoryType | CommentType

export type StoryType = {
    by: string;
    descendants: number;
    id: number;
    kids?: number[];
    score: number;
    time: number;
    title: string;
    type: string;
    url: string;
    deleted?: boolean
}
export type CommentType = {
    by: string;
    id: number;
    kids?: number[];
    parent: number;
    text: string;
    time: number;
    type: string;
    deleted?: boolean
}