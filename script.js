//modal window
document.querySelector('.input__name--0').value = '';
document.querySelector('.input__name--1').value = '';

const playerName0 = document.getElementById('name--0');
const playerName1 = document.getElementById('name--1');

const btnBegin = document.querySelector('.btn--begin');
const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
console.log(btnBegin);

    btnBegin.addEventListener('click', function() {

        const PlayerNameInput0 = document.querySelector('.input__name--0').value;
        const PlayerNameInput1 = document.querySelector('.input__name--1').value;

        console.log(PlayerNameInput0,PlayerNameInput1);

        if(PlayerNameInput0 === '')
        {
            document.querySelector('.input__name--0').style.backgroundColor = 'red';
            document.querySelector('.input__name--0').style.border = 'red';
            document.querySelector('.input__name--0').placeholder = 'ВВЕДИТЕ ИМЯ!';
        }
        else document.querySelector('.input__name--0').style.backgroundColor = 'white';

        if(PlayerNameInput1 === '')
        {
            document.querySelector('.input__name--1').style.backgroundColor = 'red';
            document.querySelector('.input__name--1').style.border = 'red';
            document.querySelector('.input__name--1').placeholder = 'ВВЕДИТЕ ИМЯ!';

        }
        else document.querySelector('.input__name--1').style.backgroundColor = 'white';

        if(PlayerNameInput0 !== '' && PlayerNameInput1 !== '')
        {
            modalWindow.classList.add('hidden');
            overlay.classList.add('hidden');
            playerName0.textContent = PlayerNameInput0;
            playerName1.textContent = PlayerNameInput1;
        }
});


//присваиваем в переменнные счёта для первого и второго игрока id dom-елементов
const score0Elem = document.getElementById('score--0');
const score1Elem = document.getElementById('score--1');
//присваиваем в переменную diceElem селектор .dice
const diceElem = document.querySelector('.dice');
//присваиваем в переменные btn.. соответствующие селекторы
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//присваиваем в переменные текущих очков id dom-элементов
const current0ELem = document.getElementById('current--0');
const current1ELem = document.getElementById('current--1');
//присваиваем в переменные игроков соответствующие селекторы
const player0Elem = document.querySelector('.player--0');
const player1Elem = document.querySelector('.player--1');

const move0Elem = document.querySelector('.move--0');
const move1Elem = document.querySelector('.move--1');
//скрываем кубик,добавляя класс hidden
diceElem.classList.add('hidden');
//устанавливаем значение очков каждого игрока 0
score0Elem.textContent = 0;
score1Elem.textContent = 0;

//массив для очков
let totalScores = [0, 0];
//текущие очки равны 0
let currentScore = 0;
//активный игрок,первоначально устанавливем в 0 (Первый игрок)
let activePlayer = 0;
//закончена ли игра или нет (true - не закончена)
let isPlaying = true;
//функция для смены активного игрока
const switchActivePlayer = function() {
    currentScore = 0;

    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;

    player0Elem.classList.toggle('player--active');
    player1Elem.classList.toggle('player--active');

    move0Elem.classList.toggle('hidden');
    move1Elem.classList.toggle('hidden');
}

const inItGame = function() {
    isPlaying = true;
    currentScore = 0;
    activePlayer = 0;
    totalScores = [0, 0];

    score0Elem.textContent = 0;
    score1Elem.textContent = 0;
    current0ELem.textContent = 0;
    current1ELem.textContent = 0;

    diceElem.classList.add('hidden');
    player0Elem.classList.add('player--active');
    if(player1Elem.classList.contains('player--active')) player1Elem.classList.remove('player--active');
    player0Elem.classList.remove('player--winner');
    player1Elem.classList.remove('player--winner');

    move0Elem.classList.remove('hidden');
    move1Elem.classList.add('hidden');
    btnNew.style.backgroundImage = 'none';
}
//слушатель события по клику (бросок)
btnRoll.addEventListener('click', function() {

    if(isPlaying) {
        const diceNumber = Math.trunc(Math.random() * 6) + 1;
        diceElem.classList.remove('hidden');
        diceElem.src = `images/dice${diceNumber}.png`;

        if(diceNumber !== 1) {
            currentScore += diceNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            switchActivePlayer();
        }
    }
});
//слушатель события по клику (оставить)
btnHold.addEventListener('click', function() {
    if(isPlaying) {

        totalScores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = totalScores[activePlayer];

        if(totalScores[activePlayer] >= 100) {
            isPlaying = false;
            diceElem.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            btnNew.style.backgroundImage = 'linear-gradient(to right, #e2b810 0%, #ec3b05 100%)';
        }
        else switchActivePlayer();
    }
});

btnNew.addEventListener('click',inItGame);