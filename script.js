// Функция запускается при загрузке страницы
window.onload = function() {
    nextScene(1); // Гарантируем, что первая сцена активна
    document.getElementById('modal').classList.add('hidden'); // Скрываем модалку
};

function nextScene(num) {
    // Скрываем абсолютно все сцены
    const scenes = document.querySelectorAll('.scene');
    scenes.forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });

    // Показываем нужную
    const target = document.getElementById(`scene-${num}`);
    if (target) {
        target.classList.add('active');
        target.style.display = 'block';
    }
}

function finalVerdict() {
    const modal = document.getElementById('modal');
    modal.classList.remove('hidden');
    // ... остальная логика вердикта как была раньше
}
