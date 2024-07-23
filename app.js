let curr_player = "X"
let clickcount = 0;

let head2 = document.querySelector(".Heading2");
let winmsg = document.querySelector(".msg");
let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset-btn");

// winningPossibilities
const winningPossibilities = [[0,1,2],[3,4,5],[6,7,8],    // rows
                              [0,3,6],[1,4,7],[2,5,8],    // columns
                              [0,4,8],[2,4,6]];           // diagonals


const RemoveClicksAfterWin = () => {
    for(let box of boxes)
    {
        box.removeEventListener("click",add_content); 

        // Or we can also use disable propert to remove any type of user interation with elements  

        // box.disabled = true   
    }
}
const checkWinner = () => {
        for(let arr of winningPossibilities)
        {
           let pos1 = boxes[arr[0]].innerText;
           let pos2 = boxes[arr[1]].innerText;
           let pos3 = boxes[arr[2]].innerText;

           if(pos1 != "" && pos2 != "" && pos3 != "")
           {
               if(pos1 == pos2 && pos2 == pos3)
               {
                  winmsg.innerText = `Congratulations ${pos1} is the Winner !`;
                  boxes[arr[0]].style.backgroundColor = '#90e0ef';
                  boxes[arr[1]].style.backgroundColor = '#90e0ef';
                  boxes[arr[2]].style.backgroundColor = '#90e0ef';
                  winmsg.classList.remove("hide");
                  head2.classList.add("hide");
                  RemoveClicksAfterWin();
               }
           }
        }
}

const add_content = (e) => {
       clickcount++
       e.target.innerText = curr_player;

       if(curr_player == "X")
       {
         curr_player = "O";
       }
       else{
        curr_player = "X"
       }

       if(clickcount == 9)    // check for tie
       {
        winmsg.innerText = "Match Tied";
        winmsg.classList.remove("hide");
        head2.classList.add("hide");
       }

       checkWinner();         // Check for win

       head2.innerText = `Player ${curr_player} Turn`;
}

for(const box of boxes)                                   // Listens for any event in boxes
{
    box.addEventListener("click", add_content,{once: true});
}

reset.addEventListener("click", () => {                   // listen for click event on reset button
         clickcount = 0;
         curr_player = "X";
         for(let box of boxes)
         {
            box.innerText = "";
            box.style.backgroundColor ='#f4a261';
            box.addEventListener("click", add_content,{once: true});
         }
         winmsg.classList.add("hide");
         head2.innerText = `Player ${curr_player} Turn`;
         head2.classList.remove("hide");
})

