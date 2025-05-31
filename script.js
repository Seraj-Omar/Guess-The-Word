let gameName="Guess The Word"
document.title=gameName
document.querySelector("h1").innerHTML=gameName
document.querySelector("footer").innerHTML=`${gameName} Game Created By SerajOmar 2025 &copy;`

let numberOfAttempts=5
let numberOfLetters=6;
let currentAttemp=1
let numberOfHints=2

let wordToGuess=""
const words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Nigger", "School"];
wordToGuess=words[Math.floor(Math.random()*words.length)].toLowerCase()
let message = document.querySelector(".message");

document.querySelector(".hint span").innerHTML=numberOfHints;
const hintButton = document.querySelector(".hint");
hintButton.addEventListener("click", getHint)
console.log(wordToGuess)

function generate(){
    const inputs=document.querySelector(".inputs")
    for(let i=1;i<=numberOfAttempts;i++){

        const attempt=document.createElement("div")
        attempt.classList.add(`try-${i}`)
        attempt.innerHTML=`<span>Try ${i}</span>`

        if(i!==1)
            attempt.classList.add("disabled")

        for(let j=1;j<=numberOfLetters;j++){
            const input=document.createElement("input")
            input.type="text"
            input.id=`guess-${i}-letter-${j}`
            input.setAttribute("maxlength","1")
            attempt.appendChild(input)
        }
        inputs.appendChild(attempt)
    }
    inputs.children[0].children[1].focus()

    const disabledInputs=document.querySelectorAll(".disabled input")
    disabledInputs.forEach((input)=>(input.disabled=true))

    const allInputs=document.querySelectorAll("input")

    allInputs.forEach((input,index)=>{

        input.addEventListener("input",function(){
            this.value=this.value.toUpperCase()
            const nextInput = allInputs[index+1]
            if(nextInput)nextInput.focus()
        })

        input.addEventListener("keydown",function(event){
            const currIndex=Array.from(allInputs).indexOf(event.target)

            if((event.key==="ArrowRight")&&(currIndex+1<allInputs.length))
                allInputs[currIndex+1].focus()

            if((event.key==="ArrowLeft")&&(currIndex-1>=0))
                allInputs[currIndex-1].focus()
        })
    })
}

const guessButton=document.querySelector(".check")
const getHintButton=document.querySelector(".hint")
guessButton.addEventListener("click",handleGuess)

function handleGuess(){
    let correctGuess=true
    for (let i = 1; i <= numberOfLetters; i++) {
        const input=document.querySelector(`#guess-${currentAttemp}-letter-${i}`)
        const guess=input.value.toLowerCase()
        const letter=wordToGuess[i-1]

        if(letter===guess)
            input.classList.add("in-place")
        else if(wordToGuess.includes(guess)){
            input.classList.add("not-in-place")
            correctGuess=false;
        }
        else{
            input.classList.add("no")
            correctGuess=false;
        }
    }
    if(correctGuess){
        message.innerHTML=`You Won The Word Is <span>${wordToGuess}</span>`
        document.querySelector("#Winner").play();
        if(numberOfHints==2){
            message.innerHTML=`<p>Congratulations! You guessed the word <span>${wordToGuess}</span> without using any hints!</p>`;
        }

        let allAttempts=document.querySelectorAll(".inputs > div")
        allAttempts.forEach((attempt)=>attempt.classList.add("disabled"))
        guessButton.disabled=true;
        getHintButton.disabled = true;
    }
    else{
        document.querySelector(`.try-${currentAttemp}`).classList.add("disabled")
        const curr=document.querySelectorAll(`.try-${currentAttemp} input`)
        curr.forEach((input)=>(input.disabled=true))
        
        currentAttemp++;
        
        const nextA=document.querySelectorAll(`.try-${currentAttemp} input`)
        nextA.forEach((input)=>(input.disabled=false))

        let el=document.querySelector(`.try-${currentAttemp}`)
        if(el){
            document.querySelector(`.try-${currentAttemp}`).classList.remove("disabled")
            el.children[1].focus()
        }
        else{
            document.querySelector("#Loser").play();
            message.innerHTML=`You Lost The Word Was <span>${wordToGuess}</span>`
            guessButton.disabled=true;
            getHintButton.disabled = true;
        }
    }
}

function getHint(){
    if(numberOfHints>0){
        numberOfHints--;
        document.querySelector(".hint span").innerHTML=numberOfHints;
    }
    if(numberOfHints===0){
        getHintButton.disabled=true;
    }
    const enabled=document.querySelectorAll("input:not([disabled])")
    const empty= Array.from(enabled).filter(input => input.value === "");
    if(empty.length > 0){

        const randomIndex = Math.floor(Math.random() * empty.length);
        const randomInput = empty[randomIndex];
        const letterIndex = Array.from(enabled).indexOf(randomInput);

        if(letterIndex!==-1){
            randomInput.value = wordToGuess[letterIndex].toUpperCase();
        }
    }
    else{
        message.innerHTML="No room available for hints!";
        numberOfHints++;
    }
}

function backspace(event) {
    if (event.key === "Backspace") {
      const inputs = document.querySelectorAll("input:not([disabled])");
      const currentIndex = Array.from(inputs).indexOf(document.activeElement);
      if (currentIndex > 0) {
        const currentInput = inputs[currentIndex];
        const prevInput = inputs[currentIndex - 1];
        currentInput.value = "";
        prevInput.value = "";
        prevInput.focus();
      }
    }
  }
  
document.addEventListener("keydown", backspace);

window.onload=function(){
    generate()
}