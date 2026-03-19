// Ждём, когда загрузится страница
document.addEventListener('DOMContentLoaded', function () {

    // 1. ПЛАВНЫЙ СКРОЛЛ ДЛЯ ССЫЛОК
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Отменяем стандартный переход

            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Если просто # - ничего не делаем

            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. ОБРАБОТКА ФОРМЫ
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Не даём странице перезагрузиться

            // Получаем значения полей
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            // Проверяем, что поля не пустые
            if (name && email && message) {
                // Показываем сообщение об успехе
                alert('Спасибо, ' + name + '! Мы свяжемся с вами в ближайшее время.');
                this.reset(); // Очищаем форму
            } else {
                alert('Пожалуйста, заполните все поля');
            }
        });
    }

    // 3. ПРОСТАЯ АНИМАЦИЯ ПРИ СКРОЛЛЕ
    // Показываем карточки команды, когда они появляются в окне

    const members = document.querySelectorAll('.member');

    // Создаём наблюдатель
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Добавляем эффект появления
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 }); // Срабатывает, когда видно 20% элемента

    // Устанавливаем начальные стили и наблюдаем за каждым членом команды
    members.forEach(member => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(30px)';
        member.style.transition = 'all 0.6s ease';
        observer.observe(member);
    });

    // 4. МАЛЕНЬКАЯ ДЕТАЛЬ - ГОД В ФУТЕРЕ АВТОМАТИЧЕСКИ
    const footerYear = document.querySelector('.footer div:first-child');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.textContent = `© ${currentYear} kk.levo`;
    }
});