import type { Work } from "../data/portfolio";

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function sortByStatus(works: Work[]) {
    // finished > developing
    return works.sort((a, b) => {
        if (a.status === b.status) {
            return 0;
        }
        return a.status === "finished" ? -1 : 1;
    });
}