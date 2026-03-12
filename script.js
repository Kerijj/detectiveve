let cluesCollected = 0;
let unlockedMap = false;

const data = {
    suspects: {
        alon: "Охранник. Долги по кредитам. В момент кражи 'вышел покурить'.",
        wife: "Жена Леви. Знала код сейфа. Недавно застраховала бриллианты на огромную сумму.",
        eli: "Мастер-ювелир и иллюзионист. Умеет подменять предметы за доли секунды."
    },
    locations: {
        office: { 
            title: "Кабинет", 
            body: "Сейф чист. На столе странная подставка для стакана.",
            clue: "Улика: Обнаружен механизм двойного дна." 
        },
        workshop: { 
            title: "Мастерская", 
            body: "В углу найдены обрезки стекла и серая краска.",
            clue: "Улика: Кто-то создавал копии пуговиц из стекла." 
        },
        airport: { 
            title: "Аэропорт", 
            body: "Эли Рафаэль проходит контроль в сером пиджаке.",
            clue: "Улика: Пуговицы светятся как алмазы в УФ-лучах." 
        }
    }
};

function openSuspect(id) {
    document.getElementById('overlay-title').innerText = "ДОСЬЕ";
    document.getElementById('overlay-body').innerText = data.suspects[id];
    document.getElementById('clue-action-zone').innerHTML = "";
    document.getElementById('overlay').classList.remove('hidden');
    
    // После просмотра досье открываем карту
    if (!unlockedMap) {
        unlockedMap = true;
        document.querySelectorAll('.map-square').forEach(el => el.classList.remove('locked'));
        document.querySelectorAll('.map-square').forEach(el => el.classList.add('active'));
    }
}

function openLoc(id) {
    if (!unlockedMap) return;
    const loc = data.locations[id];
    document.getElementById('overlay-title').innerText = loc.title;
    document.getElementById('overlay-body').innerText = loc.body;
    
    // Кнопка сбора улики
    document.getElementById('clue-action-zone').innerHTML = `
        <button onclick="collectClue('${id}')" style="background:green; color:white; padding:10px; margin-top:10px;">
            ИЗЪЯТЬ УЛИКУ
        </button>`;
    
    document.getElementById('overlay').classList.remove('hidden');
}

function collectClue(id) {
    const btn = document.getElementById(`btn-${id}`);
    if (!btn.disabled) {
        cluesCollected++;
        btn.disabled = true;
        btn.style.background = "#004400";
        document.getElementById('clue-count').innerText = cluesCollected;
        alert("Улика добавлена в дело!");
        closeOverlay();
        
        if (cluesCollected >= 3) {
            document.getElementById('final-btn').classList.remove('hidden');
        }
    }
}

function closeOverlay() {
    document.getElementById('overlay').classList.add('hidden');
}

function goToVerdict() {
    document.getElementById('scene-1').classList.remove('active');
    document.getElementById('scene-2').classList.add('active');
}

function checkWinner(suspect) {
    if (suspect === 'eli') {
        alert("ПОБЕДА! Вы доказали, что Эли использовал подставку для подмены и спрятал камни в пуговицах!");
    } else {
        alert("ОШИБКА. Настоящий вор (Эли) покинул страну. Ваше расследование зашло в тупик.");
    }
    location.reload();
}
