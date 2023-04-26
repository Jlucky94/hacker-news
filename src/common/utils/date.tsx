import {format} from "date-fns";


export const getDate = (date:number) =>format(date * 1000, 'dd.MM.yyyy')
export const getTime =(date:number) => format(date * 1000, 'HH:mm:ss')