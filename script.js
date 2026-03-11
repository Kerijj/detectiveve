let currentChoice = "";

function nextScene(num) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    document.getElementById(`scene-${num}`).classList.add('active');
}

function revealClue(id) {
    document.getElementById('clue-detail-1').classList.remove('hidden');
}

function goPath(choice) {
    currentChoice = choice;
    const title = document.getElementById('suspect-title');
    const card = document.getElementById('suspect-card');
    
    if (choice === 'alon') {
        title.innerText = "ДОПРОС: АЛОН (ОХРАННИК)";
        card.innerHTML = `
            <p>Он нервничает. У него нашли пустые пакеты. Камеры были выключены в его смену.</p>
            <blockquote>"Я просто хотел покурить, клянусь!"</blockquote>
        `;
    } else {
        title.innerText = "ДОПРОС: ЭЛИ РАФАЭЛЬ (ИЛЛЮЗИОНИСТ)";
        card.innerHTML = `
            <p>Он спокоен. Пьет чай. На его рубашке странные серые пуговицы. В его гараже найден ювелирный станок.</p>
            <blockquote>"Мир — это большая сцена, детектив. А вы — лишь зритель в первом ряду."</blockquote>
        `;
    }
    nextScene(3);
}

function finalVerdict() {
    const modal = document.getElementById('modal');
    const title = document.getElementById('result-title');
    const text = document.getElementById('result-text');
    
    modal.classList.remove('hidden');
    
    if (currentChoice === 'eli') {
        title.innerText = "ДЕЛО РАСКРЫТО!";
        title.style.color = "#00ff00";
        text.innerText = "Вы заметили серые пуговицы. Это были крашеные алмазы! Эли Рафаэль признает поражение, но обещает вернуться с новым трюком.";
    } else {
        title.innerText = "ОШИБКА СЛЕДСТВИЯ";
        title.style.color = "#ff0000";
        text.innerText = "Алон был лишь мелким воришкой. Пока вы допрашивали его, Эли Рафаэль сел на рейс до Антверпена. Камни потеряны навсегда.";
    }
}
