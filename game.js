let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newgame-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
turnO = true;
let count = 0;

const winningAray = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.classList.add("o")
      turnO = false;
    } else {
      box.innerText = "X";
      box.classList.add("x")
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      showDraw();
    }
  });
});

const showDraw = () => {
  msg.innerText = "Sorry the match has drawn";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("o", "x");
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations the winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let winner of winningAray) {
    pos1 = boxes[winner[0]].innerText;
    pos2 = boxes[winner[1]].innerText;
    pos3 = boxes[winner[2]].innerText;
    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        // console.log(`Congratulations ${pos1} is the Winner`)
        showWinner(pos1);
        return true;
      }
    }
  }
};

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
