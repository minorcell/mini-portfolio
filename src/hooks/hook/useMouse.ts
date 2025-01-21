import { reactive, onMounted, onUnmounted } from 'vue';

export function useMouse() {
    const position = reactive({ x: 0, y: 0 });

    const updateMouse = (e: MouseEvent) => {
        position.x = e.pageX;
        position.y = e.pageY;
    };

    onMounted(() => {
        document.addEventListener('mousemove', updateMouse);
    });

    onUnmounted(() => {
        document.removeEventListener('mousemove', updateMouse);
    });

    return position;
}
