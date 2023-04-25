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
    getItem: (item: string) => {
        return axios.get<{ item: string }, AxiosResponse<StoryType | CommentType>>(storyUrl + item + ".json").then(response => {
            return response.data
        })
    }
}


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
}
export type CommentType = {
    by: string;
    id: number;
    kids?: number[];
    parent: number;
    text: string;
    time: number;
    type: string;
}