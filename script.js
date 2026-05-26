// ===== GAME STATE =====
let turn = "X";
let isgameover = false;
let gameMode = null; // 'pvp' or 'ai'
let difficulty = 'medium'; // 'easy', 'medium', 'hard'
let scores = { X: 0, O: 0, draw: 0 };

// ===== AUDIO =====
const playMoveSound = () => {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {}
};

const playWinSound = () => {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [523, 659, 784];
        
        notes.forEach((freq, idx) => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = freq;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
            }, idx * 150);
        });
    } catch (e) {}
};

// ===== WINNING COMBINATIONS =====
const WINS = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
];

// ===== UTILITY FUNCTIONS =====
const getBoard = () => {
    return Array.from(document.querySelectorAll('.boxtext')).map(el => el.innerText || '');
};

const changeTurn = () => turn === "X" ? "O" : "X";

const getEmptyBoxes = () => {
    const board = getBoard();
    return board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
};

const checkWin = (board) => {
    for (let win of WINS) {
        if (board[win[0]] && board[win[0]] === board[win[1]] && board[win[1]] === board[win[2]]) {
            return { winner: board[win[0]], line: win };
        }
    }
    return null;
};

const isBoardFull = () => getEmptyBoxes().length === 0;

const updateUI = () => {
    if (isgameover) return;
    const statusEl = document.querySelector('.info');
    statusEl.innerText = `Turn for ${turn}`;
};

const resetGame = () => {
    turn = "X";
    isgameover = false;
    document.querySelectorAll('.boxtext').forEach(el => el.innerText = '');
    document.querySelectorAll('.box').forEach(box => box.classList.remove('disabled'));
    document.querySelector(".line").style.width = "0vw";
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
    updateUI();
};

const endGame = (result) => {
    isgameover = true;
    document.querySelectorAll('.box').forEach(box => box.classList.add('disabled'));
    
    if (result.winner) {
        document.querySelector('.info').innerText = `🎉 Player ${result.winner} Won!`;
        scores[result.winner]++;
        playWinSound();
        
        // Draw winning line
        const line = result.line;
        document.querySelector(".line").style.transform = `translate(${line[3]}vw, ${line[4]}vw) rotate(${line[5]}deg)`;
        document.querySelector(".line").style.width = "20vw";
        document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "150px";
    } else {
        document.querySelector('.info').innerText = "🤝 It's a Draw!";
        scores.draw++;
        playWinSound();
    }
    
    updateScoreboard();
};

const updateScoreboard = () => {
    document.querySelector('#scoreX').innerText = scores.X;
    document.querySelector('#scoreO').innerText = scores.O;
    document.querySelector('#scoreDraw').innerText = scores.draw;
};

// ===== AI LOGIC =====
const getAIMove = (board) => {
    const empty = getEmptyBoxes();
    
    if (empty.length === 0) return null;
    
    if (difficulty === 'easy') {
        return empty[Math.floor(Math.random() * empty.length)];
    }
    
    // Check if AI can win
    for (let pos of empty) {
        const testBoard = [...board];
        testBoard[pos] = 'O';
        if (checkWin(testBoard)?.winner === 'O') return pos;
    }
    
    // Check if player can win and block
    for (let pos of empty) {
        const testBoard = [...board];
        testBoard[pos] = 'X';
        if (checkWin(testBoard)?.winner === 'X') return pos;
    }
    
    // Take center if available
    if (empty.includes(4)) return 4;
    
    // Take corners
    const corners = [0, 2, 6, 8].filter(pos => empty.includes(pos));
    if (difficulty === 'hard' && corners.length > 0) return corners[0];
    if (difficulty === 'medium' && corners.length > 0 && Math.random() > 0.5) return corners[0];
    
    // Take random
    return empty[Math.floor(Math.random() * empty.length)];
};

const makeAIMove = async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    if (isgameover) return;
    
    const board = getBoard();
    const pos = getAIMove(board);
    
    if (pos !== null) {
        const boxtext = document.querySelectorAll('.boxtext')[pos];
        const box = document.querySelectorAll('.box')[pos];
        
        if (boxtext.innerText === '') {
            boxtext.innerText = 'O';
            box.classList.add('disabled');
            playMoveSound();
            
            const updatedBoard = getBoard();
            const result = checkWin(updatedBoard);
            
            if (result) {
                endGame(result);
            } else if (isBoardFull()) {
                endGame({ winner: null });
            } else {
                turn = 'X';
                updateUI();
                document.querySelectorAll('.box').forEach(b => b.classList.remove('disabled'));
            }
        }
    }
};

// ===== EVENT LISTENERS =====
document.querySelectorAll('.box').forEach((box, idx) => {
    box.addEventListener('click', () => {
        if (isgameover || box.classList.contains('disabled')) return;
        
        const boxtext = box.querySelector('.boxtext');
        if (boxtext.innerText !== '') return;
        
        boxtext.innerText = turn;
        box.classList.add('disabled');
        playMoveSound();
        
        const board = getBoard();
        const result = checkWin(board);
        
        if (result) {
            endGame(result);
        } else if (isBoardFull()) {
            endGame({ winner: null });
        } else {
            turn = changeTurn();
            updateUI();
            
            // AI move if in AI mode
            if (gameMode === 'ai' && turn === 'O' && !isgameover) {
                document.querySelectorAll('.box').forEach(b => b.classList.add('disabled'));
                makeAIMove().then(() => {
                    document.querySelectorAll('.box').forEach(b => b.classList.remove('disabled'));
                });
            }
        }
    });
});

// ===== GAME MODE SELECTION =====
document.getElementById('pvpBtn').addEventListener('click', () => {
    gameMode = 'pvp';
    startGame();
});

document.getElementById('aiBtn').addEventListener('click', () => {
    const diff = prompt('Select difficulty:\n1. Easy\n2. Medium\n3. Hard', '2');
    if (diff) {
        const diffMap = { '1': 'easy', '2': 'medium', '3': 'hard' };
        difficulty = diffMap[diff] || 'medium';
        gameMode = 'ai';
        startGame();
    }
});

const startGame = () => {
    document.getElementById('gameModeScreen').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'flex';
    
    if (gameMode === 'ai') {
        document.getElementById('diffDisplay').textContent = `Difficulty: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`;
        document.getElementById('diffDisplay').style.display = 'inline';
    } else {
        document.getElementById('diffDisplay').style.display = 'none';
    }
    
    resetGame();
};

const backToMenu = () => {
    document.getElementById('gameContainer').style.display = 'none';
    document.getElementById('gameModeScreen').style.display = 'flex';
    resetGame();
};

// ===== BUTTONS =====
document.getElementById('reset').addEventListener('click', resetGame);
document.getElementById('backBtn').addEventListener('click', backToMenu);

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerText = '☀️ Light Mode';
}

themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.innerText = '🌙 Dark Mode';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerText = '☀️ Light Mode';
    }
});

console.log('🎮 Welcome to Ultimate Tic Tac Toe Pro!');

