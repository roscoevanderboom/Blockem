// 
// TICTACTOE Supercharged!!

// General Functions
const newEl = (tag, id = '', cl = '', par = document.body) => {
    el = document.createElement(tag);
    el.id = id;
    el.className = cl;
    par.appendChild(el);
    return el;
};

const log = (x => console.log(x));

// HTML Elements

let wrapper = document.querySelector('#wrapper');
let bigsq = wrapper.querySelectorAll('.big');
let p1score = document.querySelector('#p1score');
let p2score = document.querySelector('#p2score');
let pl1 = document.querySelector('#pl1');
let pl2 = document.querySelector('#pl2');
let resetBtn = document.querySelector('#reset');
let counter = document.querySelector('#counter');
let clockDisplay = document.querySelector('#clock');

// Game Variables
let moves = 0;


var timer;

function move() {
    var time = counter.value;
    var players = document.querySelectorAll('.player');
    timer = setInterval(countDown, 1000);

    function countDown() {
        var winner;
        if (time == 0) {
            clearInterval(timer);
            players.forEach((val) => {
                if (val.classList.contains('w3-red') === false) {
                    winner = val.innerHTML;
                    bigsq.forEach((val => val.classList.add(op)));
                }
            })
            clockDisplay.innerHTML = `Congratulations ${winner}!!`;
        } else {
            time--;
            clockDisplay.innerHTML = time;
        }
    }
    return timer;
}

function stop() {
    clearInterval(timer);
    time = counter.value;
    clockDisplay.innerHTML = time;
}

counter.addEventListener('click', stop);


function play() {
    // Identify element calling the function
    let x = event.target;
    let parent = x.parentElement.classList;

    // Stop current timer process
    stop();

    // Check if small square has been played in
    if (x.classList.contains('p1') || x.classList.contains('p2')) {
        alert('This square has been played. Please play in another square');
        return;
    }

    // Check if big square is available

    if (parent.contains('w3-opacity-max')) {
        alert('You may not play in this box. Please play in the open box');
        return;
    }

    // Check to see whose turn is it and increment the counter ( moves )
    // Also add classes to player headings

    if (moves % 2 === 0) {
        moves = moves + 1;
        newEl('i', '', 'p1 fas fa-cat flexCenter', x);
        pl1.classList.remove('w3-red');
        pl2.classList.add('w3-red');
    } else {
        moves = moves + 1;
        newEl('i', '', 'p2 fas fa-dog flexCenter', x);
        pl1.classList.add('w3-red');
        pl2.classList.remove('w3-red');
    }

    // Create opacity in big squares

    zone(x.id);
    move();
};

// create small squares

bigsq.forEach((val) => {
    for (i = 1; i < 10; i++) {
        el = newEl('div', val.id + i, 'w3-border w3-border-black small', val);
    }
    val.classList.add('grid');
});

let smlsq = wrapper.querySelectorAll('.small');

let op = 'w3-opacity-max';

function reset() {
    stop();
    moves = 0;
    smlsq.forEach(val => val.innerHTML = '');
    pl1.classList.add('w3-red');
    pl2.classList.remove('w3-red');
    bigsq.forEach((val => val.classList.remove(op)));
}

resetBtn.addEventListener('click', reset);

smlsq.forEach(val => val.addEventListener('click', play));

function zone(id) {
    let n = id.slice(2);

    bigsq.forEach((val => val.classList.add(op)));
    for (i = 0; i < bigsq.length; i++) {
        if (bigsq[n - 1].classList.contains(op)) {
            bigsq[n - 1].classList.remove(op);
        }
    }
}