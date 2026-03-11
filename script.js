const paths = {
    false: {
        title: "ПОДОЗРЕВАЕМЫЙ: АЛОН (ОХРАННИК)",
        items: [
            { name: "Пустой сейф-пакет", desc: "Найден в шкафчике. Серийный номер совпадает." },
            { name: "Логи камер", desc: "Камера №4 была отключена на 30 секунд. Доступ был только у Алона." },
            { name: "Долги", desc: "Выписка из банка: задолженность 200,000 шекелей." }
        ]
    },
    real: {
        title: "ПОДОЗРЕВАЕМЫЙ: ЭЛИ РАФАЭЛЬ (ИЛЛЮЗИОНИСТ)",
        items: [
            { name: "Стакан с налетом", desc: "Химический анализ выявил тальк и частицы латекса." },
            { name: "Подставка для стакана", desc: "Скрытый механизм поворота дна. Ручная работа." },
            { name: "Микро-царапины", desc: "Стекло обрезано на профессиональном ювелирном станке." }
        ]
    }
};

function showPath(type) {
    // Смена активной кнопки
    document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab-${type}`).classList.add('active');

    const data = paths[type];
    document.getElementById('path-title').innerText = data.title;
    
    const grid = document.getElementById('evidence-grid');
    grid.innerHTML = ''; // Очистка

    data.items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<h3>${item.name}</h3><p>${item.desc}</p>`;
        grid.appendChild(card);
    });
}

// По умолчанию показываем ложный след
showPath('false');
