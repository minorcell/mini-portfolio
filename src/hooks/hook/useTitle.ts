import { ref, watch } from "vue";

/**
 * custom Hook：useTitle
 * @param title - title
 * @param isCoverOrigin - isCoverOrigin, default true
 */
export function useTitle(title: string, isCoverOrigin: boolean = true) {
    // set new title
    const setTitle = (newTitle: string) => {
        document.title = newTitle;
    };

    // watch title
    watch(
        () => title,
        (newTitle) => {
            if (isCoverOrigin) {
                setTitle(newTitle);
            } else {
                setTitle(`Mini-PortFolio | ${newTitle}`);
            }
        },
        { immediate: true }
    );
}