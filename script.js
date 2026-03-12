const locs = {
    office: {
        title: "1. КАБИНЕТ ЛЕВИ",
        text: "Сейф открыт без следов взлома. На столе стоит подставка для стакана с необычным механизмом. <br><br><b>ФАКТ:</b> Кто-то знал код и использовал механическую подмену.",
        next: "security"
    },
    security: {
        title: "2. ПОСТ ОХРАНЫ",
        text: "Алон нервничает. В логах камер пропуск в 2 минуты. В мусоре найден билет на магическое шоу Эли Рафаэля.<br><br><b>ФАКТ:</b> Охранник либо в доле, либо его отвлекли трюком.",
        next: "workshop"
    },
    workshop: {
        title: "3. МАСТЕРСКАЯ ЭЛИ",
        text: "Внутри пахнет тальком. На верстаке — стеклянные заготовки, идентичные бриллиантам Леви по форме.<br><br><b>ФАКТ:</b> Здесь готовили фальшивки.",
        next: "airport"
    },
    airport: {
        title: "4. АЭРОПОРТ",
        text: "Вы видите Эли Рафаэля. На его сером пиджаке 15 пуговиц. Они светятся под УФ-фонариком как алмазы.<br><br><b>ФАКТ:</b> Камни замаскированы под одежду.",
        next: "finish"
    }
};

let currentOrder = ['office', 'security', 'workshop', 'airport'];
let step = 0;

function startInvestigation() {
    nextScene(2);
    unlockNext();
}

function unlockNext() {
    const id = currentOrder[step];
    const el = document.getElementById(`loc-${id}`);
    if (el) {
        el.classList.remove('locked');
        el.classList.add('active-loc');
    }
}

function playLocation(id) {
    const data = locs[id];
    document.getElementById('event-title').innerText = data.title;
    document.getElementById('event-body').innerHTML = data.text;
    document.getElementById('event-window').classList.remove('hidden');
    
    document.getElementById(`loc-${id}`).classList.add('visited');
}

function closeEvent() {
    document.getElementById('event-window').classList.add('hidden');
    if (step < currentOrder.length - 1) {
        step++;
        unlockNext();
    } else {
        document.getElementById('final-btn').classList.remove('hidden');
    }
}

function nextScene(num) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    document.getElementById(`scene-${num}`).classList.add('active');
}

function confront(name) {
    const m = document.getElementById('modal');
    m.classList.remove('hidden');
    const t = document.getElementById('res-title');
    const d = document.getElementById('res-text');

    if (name === 'eli') {
        t.innerText = "ПОБЕДА!";
        d.innerText = "Вы разоблачили Эли! Его мастерство иллюзии не помогло против вашей логики. Пуговицы оказались алмазами.";
    } else {
        t.innerText = "ПРОВАЛ";
        d.innerText = "Вы выбрали не того. Эли Рафаэль уже в небе над Атлантикой, а в вашем деле — жирная точка неудачи.";
    }
}
