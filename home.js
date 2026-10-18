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