import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
    state: () => ({
        isDark: false, // 默认亮模式
    }),
    actions: {
        toggleTheme() {
            this.isDark = !this.isDark;
            const htmlClassList = document.documentElement.classList;
            if (this.isDark) {
                htmlClassList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                htmlClassList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        },
        initializeTheme() {
            const savedTheme: string | null = localStorage.getItem('theme');
            const isSystemDark: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (savedTheme === 'dark') {
                this.isDark = true;
                document.documentElement.classList.add('dark');
            } else if (isSystemDark) {
                this.isDark = true;
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        },
    },
});
