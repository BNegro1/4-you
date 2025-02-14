const healthyFoods = ['zanahoria', 'manzana', 'brocoli'];
const unhealthyFoods = ['donut', 'chocolate', 'palomitas'];
let score = 0;
const hamster = document.getElementById('hamster');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const resetButton = document.getElementById('resetButton');

document.querySelectorAll('.food-item').forEach(item => {
    item.addEventListener('click', handleClick);
});

resetButton.addEventListener('click', resetGame);

function handleClick(e) {
    const food = e.target.closest('.food-item').dataset.food;
    if (healthyFoods.includes(food)) {
        score += 10;
        showFeedback(`¡Buen trabajo! 🥕 +10 puntos`, '#C8E6C9');
        hamster.classList.add('dropped'); // Animación de rebote
        setTimeout(() => hamster.classList.remove('dropped'), 500);
    } else {
        score -= 5;
        showFeedback(`¡Oh no! Eso no es saludable 🚨 -5 puntos`, '#FFCDD2');
        hamster.classList.add('shake');
        setTimeout(() => hamster.classList.remove('shake'), 500);
    }
    scoreEl.textContent = score;

    // Mensaje secreto 50 pts (cambiar)
    if (score >= 50) {
        feedbackEl.textContent = '¡Has desbloqueado el núcleo de la realidad!';
        feedbackEl.style.backgroundColor = '#C8E6C9';
        setTimeout(() => {
            feedbackEl.style.backgroundColor = 'transparent';
        }, 2000);
    }
}

function showFeedback(text, color) {
    feedbackEl.textContent = text;
    feedbackEl.style.backgroundColor = color;
    setTimeout(() => {
        feedbackEl.style.backgroundColor = 'transparent';
    }, 1000);
}

function resetGame() {
    score = 0;
    scoreEl.textContent = score;
    feedbackEl.textContent = '¡Juego reiniciado! Ayuda al hamster de nuevo.';
}