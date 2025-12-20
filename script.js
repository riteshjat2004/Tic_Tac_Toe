console.log("Welcome to Tic Tac Toe")
let music = new Audio("music.mp3")
let turn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")

let turnx = "X"

const changeTurn = ()=>{
    return turnx ==="X"?"0": "X"
}

const chechWin =()=>{
    
}

// Game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element=>{
    let boxtext = document.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(boxtext.innerText === ''){
            boxtext.innerText= turnx;
            changeTurn();
            turn.play();
            checkWin();
            document.getElementsByClassName("turn")[0].innerText = "Turn for" + turn;
        }
    })
})