import type { Work } from "../data/portfolio";

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function sortByStatus(works: Work[]) {
    // 已上线 > 开发中 > 已废弃
    return works.sort((a, b) => {
        if (a.status === "已上线" && b.status !== "已上线") {
            return -1;
        } else if (a.status !== "已上线" && b.status === "已上线") {
            return 1;
        } else {
            return 0;
        }
    });
}