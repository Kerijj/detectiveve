// Состояние следствия
let inventory = [];
let discoveredSecrets = 0;
let currentSuspect = "";

window.onload = function() {
    nextScene(1);
    updateInventory();
};

function nextScene(num) {
    document.querySelectorAll('.scene').forEach(s => s.style.display = 'none');
    const target = document.getElementById(`scene-${num}`);
    if (target) target.style.display = 'block';
}

// Добавление улики в инвентарь
function collectClue(clueId, name) {
    if (!inventory.includes(name)) {
        inventory.push(name);
        updateInventory();
        alert(`Найдена улика: ${name}`);
    }
}

function updateInventory() {
    const invDiv = document.getElementById('inventory-list') || createInventoryUI();
    invDiv.innerHTML = inventory.map(item => `<span class="badge">${item}</span>`).join(' ');
}

function createInventoryUI() {
    const div = document.createElement('div');
    div.id = 'inventory-list';
    div.style = "position:fixed; bottom:10px; left:10px; background:rgba(0,0,0,0.8); padding:10px; border:1px solid gold; font-size:12px;";
    document.body.appendChild(div);
    return div;
}

// ЛОКАЦИИ И УЛИКИ
function inspectObject(obj) {
    let msg = "";
    switch(obj) {
        case 'trash':
            msg = "В мусоре найден чек из аптеки на покупку талька и театрального грима.";
            collectClue('talc', 'Чек на тальк');
            break;
        case 'safe':
            msg = "Сейф не взломан. Код вводили вручную. Кто его знал, кроме Леви и его жены?";
            collectClue('code', 'Чистый взлом');
            break;
        case 'camera':
            msg = "Запись прерывается на 30 секунд. В этот момент в кадре виден край серого пиджака.";
            collectClue('video', 'Серый пиджак');
            break;
    }
    document.getElementById('location-log').innerText = msg;
}

// ПЕРЕХОД К ПОДОЗРЕВАЕМЫМ
function interview(name) {
    currentSuspect = name;
    nextScene(4); // Сцена допроса
    const talk = document.getElementById('interrogation-zone');
    
    if(name === 'wife') {
        talk.innerHTML = `
            <h3>Сара Леви (Жена)</h3>
            <p>"Мой муж слишком доверчив. Я говорила ему нанять частную охрану, а не этих сопляков."</p>
            <p>Вы заметили: На её руке кольцо с бриллиантом, который кажется слишком новым.</p>
            <button onclick="confront('wife')">Предъявить обвинение</button>
        `;
    } else if(name === 'alon') {
        talk.innerHTML = `
            <h3>Алон (Охранник)</h3>
            <p>"Я просто курил! Пакеты в шкафчике? Я нашел их в коридоре и хотел забрать домой как сувенир!"</p>
            <button onclick="confront('alon')">Предъявить обвинение</button>
        `;
    } else {
        talk.innerHTML = `
            <h3>Эли Рафаэль (Мастер)</h3>
            <p>"Красота — это иллюзия, детектив. Вы ищете камни, а я ищу совершенство."</p>
            <p>Вы заметили: Он постоянно теребит пуговицу на рубашке.</p>
            <button onclick="confront('eli')">Предъявить обвинение</button>
        `;
    }
}

// ФИНАЛ
function confront(name) {
    const modal = document.getElementById('modal');
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    
    const resT = document.getElementById('result-title');
    const resD = document.getElementById('result-text');

    if(name === 'eli' && inventory.includes('Чек на тальк') && inventory.includes('Серый пиджак')) {
        resT.innerText = "ГЕНИАЛЬНО!";
        resD.innerText = "Вы сопоставили тальк для рук фокусника и серый пиджак с видео. Эли признался: камни были пуговицами. Вы — легенда сыска!";
    } else if(name === 'wife') {
        resT.innerText = "СЕМЕЙНЫЙ СКАНДАЛ";
        resD.innerText = "Сара знала код, но она лишь хотела подставить любовницу мужа. Камни она не брала. Настоящий вор скрылся.";
    } else {
        resT.innerText = "ФАТАЛЬНАЯ ОШИБКА";
        resD.innerText = "Алон — просто неудачник. Пока вы возились с ним, настоящий преступник покинул страну.";
    }
}
