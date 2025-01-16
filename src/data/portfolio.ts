/* 
this file is used to store the data of the works those show in the main page.
*/
import { sortByStatus } from "../utils/tools";

export type Work = {
    name: string;
    status: '开发中' | '已上线' | '已废弃';
    path: string;
};


export const works: Work[] = sortByStatus([
    {
        name: "2048小游戏",
        status: "已上线",
        path: "/2048-game",
    },
    {
        name: "多功能画板",
        status: "开发中",
        path: "/paint-board",
    },
    {
        name: "图片转换",
        status: "已上线",
        path: "/image-convert",
    },
    {
        name: "i18n国际化",
        status: "开发中",
        path: "/i18n",
    }
])
