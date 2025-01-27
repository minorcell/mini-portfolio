/* 
this file is used to store the data of the works those show in the main page.
*/
import { sortByStatus } from "../utils/tools";

export type Work = {
    name: string;
    status: 'developing' | 'finished';
    path: string;
};


export const works: Work[] = sortByStatus([
    {
        name: "2048小游戏",
        status: "finished",
        path: "/2048-game",
    },
    {
        name: "多功能画板",
        status: "developing",
        path: "/paint-board",
    },
    {
        name: "图片转换",
        status: "finished",
        path: "/image-convert",
    },
    {
        name: "二维码生成",
        status: "finished",
        path: "/qrcode",
    }
])
