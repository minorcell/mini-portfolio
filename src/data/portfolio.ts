/* 
this file is used to store the data of the works those show in the main page.
*/

// TODO: i18n，but now it's just Zh-CN

type Work = {
    name: string;
    status: '开发中' | '已上线' | '已废弃';
    path: string;
};


export const works: Work[] = [
    {
        name: "2048小游戏",
        status: "开发中",
        path: "/2048-game",
    },
    {
        name: "多功能画板",
        status: "开发中",
        path: "/paint-board",
    }
]