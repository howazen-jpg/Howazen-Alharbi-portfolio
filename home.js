document.addEventListener('DOMContentLoaded', function () {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return; // إذا لم يجد الزر في الصفحة، لا يفعل شيئاً لتجنب الأخطاء

    // التحقق من تفضيل المستخدم المحفوظ مسبقاً
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'light') {
            themeToggleBtn.textContent = '🌙';
        }
    }

    // عند الضغط على الزر يتم تغيير الوضع وحفظه
    themeToggleBtn.addEventListener('click', function () {
        let currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.textContent = '☀️';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.textContent = '🌙';
        }
    });
});

const container = document.getElementById('interactiveBox');
const cube = document.querySelector('.cyber-cube');

if (container && cube) {
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // تحويل حركة الماوس إلى ميلان في المكعب
        cube.style.transform = `rotateX(${-y / 3}deg) rotateY(${x / 3}deg)`;
    });

    container.addEventListener('mouseleave', () => {
        cube.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
}