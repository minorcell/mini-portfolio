import { ref, watch } from "vue";

/**
 * custom Hook：useTitle
 * @param title - title
 * @param isCoverOrigin - isCoverOrigin, default true
 */
export function useTitle(title: string, isCoverOrigin: boolean = true) {
    // save original title
    const originalTitle = ref(document.title);

    // set new title  
    const setTitle = (newTitle: string) => {
        document.title = newTitle;
    };

    // reset title
    const resetTitle = () => {
        document.title = originalTitle.value;
    };

    // watch title
    watch(
        () => title,
        (newTitle) => {
            if (isCoverOrigin) {
                setTitle(newTitle);
            } else {
                setTitle(`${originalTitle.value} - ${newTitle}`);
            }
        },
        { immediate: true }
    );

    return {
        resetTitle,
    };
}