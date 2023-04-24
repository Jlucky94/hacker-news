import axios from "axios";

export const baseUrl = "https://hacker-news.firebaseio.com/v0/"
export const newStoriesUrl = baseUrl + "newstories.json"
export const storyUrl = baseUrl + "item/"


export const API = {
    getStoryIds: () => {
        return axios.get<number[]>(newStoriesUrl).then(response => {
            return response.data
        })
    },
    getStory: (storyId: string) => {
        return axios.get<StoryType>(storyUrl + storyId + ".json").then(response => {
            return response.data
        })
    }
}

export type StoryType = {
    by: string;
    descendants: number;
    id: number;
    score: number;
    time: number;
    title: string;
    type: string;
    url: string;
}
