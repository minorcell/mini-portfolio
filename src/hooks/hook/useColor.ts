export function useColor() {
    const cellColors: Record<number, string> = {
        0: "#CDC1B4",      // 空
        2: "#EEE4DA",      // 2
        4: "#EDE0C8",      // 4
        8: "#F2B179",      // 8
        16: "#F59563",     // 16
        32: "#F67C5F",     // 32
        64: "#F65E3B",     // 64
        128: "#EDCF72",    // 128
        256: "#EDCC61",    // 256
        512: "#EDC850",    // 512
        1024: "#EDC53F",   // 1024
        2048: "#EDC22E"    // 2048
    };

    const getColor = (value: number): string => {
        return cellColors.hasOwnProperty(value) ? cellColors[value] : cellColors[0];
    };

    return {
        getColor
    };
}
