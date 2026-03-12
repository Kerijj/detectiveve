const locationData = {
    office: {
        title: "КАБИНЕТ ЛЕВИ",
        desc: "На столе стоит пустой стакан и подставка. Сейф открыт без повреждений. Обнаружен микроскопический след талька на ручке двери.",
        clue: "Факт: Сейф открыт родным кодом."
    },
    security: {
        title: "ПОСТ ОХРАНЫ",
        desc: "В журналах стерто время между 08:40 и 08:42. У Алона в шкафчике найден рекламный буклет шоу иллюзионистов.",
        clue: "Факт: Камеры отключены вручную."
    },
    workshop: {
        title: "МАСТЕРСКАЯ ПЕТАХ-ТИКВА",
        desc: "В мусорном баке найдены обрезки высококачественного стекла и банка с серой матовой краской.",
        clue: "Факт: Кто-то создавал имитацию камней."
    },
    airport: {
        title: "ТЕРМИНАЛ 3",
        desc: "Среди пассажиров на рейс в Брюссель замечен человек, чей рост совпадает с фигурой на видео. Он одет в серый костюм с необычными пуговицами.",
        clue: "Факт: Преступник уже на пути к выходу."
    }
};

let visitedLocations = new Set();

function openLocation(id) {
    const data = locationData[id];
    document.getElementById('loc-title').innerText = data.title;
    document.getElementById('loc-desc').innerText = data.desc;
    document.getElementById('loc-clues').innerHTML = `<p><strong>Улика:</strong> ${data.clue}</p>`;
    
    document.getElementById('location-details').classList.remove('hidden');
    
    // Помечаем как посещенное
    visitedLocations.add(id);
    if (visitedLocations.size === 4) {
        document.getElementById('final-decision-btn').classList.remove('hidden');
    }
}

function closeDetails() {
    document.getElementById('location-details').classList.add('hidden');
}

function showSuspect(id) {
    let bio = "";
    if(id === 'wife') bio = "Сара Леви. Знала код сейфа. Хотела отомстить мужу за долги.";
    if(id === 'alon') bio = "Алон. Был на посту. Испытывает финансовые трудности.";
    if(id === 'eli') bio = "Эли Рафаэль. Мастер иллюзий. Обладает техникой подмены предметов.";
    alert(bio);
}

// Функции confront и nextScene остаются из предыдущих версий
