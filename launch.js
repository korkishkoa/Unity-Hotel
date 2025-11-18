// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Сайт завантажено');

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    const body = document.body;

    // Функція відкриття меню
    function openMenu() {
        if (hamburger && navMenu && navOverlay) {
            hamburger.classList.add('active');
            navMenu.classList.add('active');
            navOverlay.classList.add('active');
            body.classList.add('no-scroll');
        }
    }

    // Функція закриття меню
    function closeMenu() {
        if (hamburger && navMenu && navOverlay) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            body.classList.remove('no-scroll');
        }
    }

    // Клік по гамбургеру
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            if (navMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Клік по оверлею (закриття меню)
    if (navOverlay) {
        navOverlay.addEventListener('click', function() {
            closeMenu();
        });
    }

    // Клік по посиланнях в меню
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    // Закрити меню при ресайзі на десктоп
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });


    // --- Ініціалізація інших функцій (з файлу launch.js) ---

    // 1. Фільтрація номерів
    function initializeRoomFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const roomCards = document.querySelectorAll('.room-card');

        if (filterButtons.length > 0 && roomCards.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    const filterValue = button.textContent.toLowerCase();

                    roomCards.forEach(card => {
                        if (filterValue === 'всі') {
                            card.style.display = 'block';
                        } else {
                            const roomType = card.querySelector('h3').textContent.toLowerCase();
                            if (roomType.includes(filterValue)) {
                                card.style.display = 'block';
                            } else {
                                card.style.display = 'none';
                            }
                        }
                    });
                });
            });
        }
    }

    // 2. Кнопка "Улюблене"
    function initializeFavoriteButtons() {
        const favoriteButtons = document.querySelectorAll('.favorite-btn');

        if (favoriteButtons.length > 0) {
            favoriteButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const icon = button.querySelector('i');
                    if (icon) {
                        icon.classList.toggle('far');
                        icon.classList.toggle('fas');
                        icon.style.color = icon.classList.contains('fas') ? '#ff4757' : '';
                    }
                });
            });
        }
    }

    // 3. Плавна прокрутка
    function initializeSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initializeRoomFilters();
    initializeFavoriteButtons();
    initializeSmoothScrolling();
});