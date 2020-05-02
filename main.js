/*
  Personal Javascript

  I used the Fetch API request instead of an XMLHttpRequest. I got basic code for this from https://developers.google.com/web/updates/2015/03/introduction-to-fetch
*/

const startBtn = document.getElementById("startbtn");
var desiredQuestionCount = 0;
var currentQuestionCount = 0;
var numCorrect = 0;

const endBtn = document.getElementById("endbtn");
const againBtn = document.getElementById("againbtn");
let corrBtn = "";
let incBtn1 = "";
let incBtn2 = "";
let incBtn3 = "";

//Extracts how many questions user wants
function getPlays(form){
  desiredQuestionCount = form.desiredq.value;
  form.desiredq.value = "";
  //console.log(desiredQuestionCount);
}

//Sets up first question
startBtn.addEventListener('click', function(){
  document.getElementById("pregame").style.display = "none"; //Gets rid of start screen
  document.getElementById("score").innerHTML = numCorrect + "/" + currentQuestionCount + " correct";
  setUpClue();
  document.getElementById("inprogress").style.display = "block"; //Adds in progress screen
});

function setUpClue(){
  if(currentQuestionCount==desiredQuestionCount){
    endGame();
    return;
  }

  fetch('https://opentdb.com/api.php?amount=1&category=11&difficulty=medium&type=multiple')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      response.json().then(function(data) {
        //Data gathering
        const question = data.results[0].question;
        const corrAns = data.results[0].correct_answer;
        const incorrAns1 = data.results[0].incorrect_answers[0];
        const incorrAns2 = data.results[0].incorrect_answers[1];
        const incorrAns3 = data.results[0].incorrect_answers[2];
        console.log("question: "+question+" XX correct: "+corrAns+" XX in1: "+incorrAns1+" XX in2: "+incorrAns2+" XX in3: "+incorrAns3);

        //Display
        document.getElementById("question").innerHTML = (currentQuestionCount+1)+". "+question;
        randomizeAnswers(corrAns,incorrAns1,incorrAns2,incorrAns3);
        document.getElementById("answers").style.display = "block";

        corrBtn.addEventListener('click', function(){
          numCorrect++;
          currentQuestionCount++;
          document.getElementById("score").innerHTML = numCorrect + "/" + currentQuestionCount + " correct";
          setUpClue();
        });

        incBtn1.addEventListener('click', function(){
          currentQuestionCount++;
          document.getElementById("score").innerHTML = numCorrect + "/" + currentQuestionCount + " correct";
          setUpClue();
        });
        incBtn2.addEventListener('click', function(){
          currentQuestionCount++;
          document.getElementById("score").innerHTML = numCorrect + "/" + currentQuestionCount + " correct";
          setUpClue();
        });
        incBtn3.addEventListener('click', function(){
          currentQuestionCount++;
          document.getElementById("score").innerHTML = numCorrect + "/" + currentQuestionCount + " correct";
          setUpClue();
        });

      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

function randomizeAnswers(cAns, iAns1, iAns2, iAns3){
  var randNum = Math.floor(Math.random()*Math.floor(4));
  if(randNum == 0){
    document.getElementById("answers").innerHTML = '<button id="correctbtn">'+cAns+'</button><button id="inc1btn">'+iAns1+'</button><button id="inc2btn">'+iAns2+'</button><button id="inc3btn">'+iAns3+'</button>';
  }
  else if(randNum == 1){
    document.getElementById("answers").innerHTML = '<button id="inc1btn">'+iAns1+'</button><button id="correctbtn">'+cAns+'</button><button id="inc2btn">'+iAns2+'</button><button id="inc3btn">'+iAns3+'</button>';
  }
  else if(randNum == 2){
    document.getElementById("answers").innerHTML = '<button id="inc1btn">'+iAns1+'</button><button id="inc2btn">'+iAns2+'</button><button id="correctbtn">'+cAns+'</button><button id="inc3btn">'+iAns3+'</button>';
  }
  else{
    document.getElementById("answers").innerHTML = '<button id="inc1btn">'+iAns1+'</button><button id="inc2btn">'+iAns2+'</button><button id="inc3btn">'+iAns3+'</button><button id="correctbtn">'+cAns+'</button>';
  }
  corrBtn = document.getElementById("correctbtn");
  incBtn1 = document.getElementById("inc1btn");
  incBtn2 = document.getElementById("inc2btn");
  incBtn3 = document.getElementById("inc3btn");
}

//Game over
function endGame(){
  //Handles grammar of end message
  var q = "";
  if(numCorrect==1){
    q="question";
  }
  else {
    q="questions";
  }

  //Customizes end message to score
  var perCorrect = numCorrect/currentQuestionCount;
  var endMessage = "";
  if(perCorrect>=0.75){
    endMessage = "Wow! You know your stuff!";
  }
  else if(perCorrect>=0.5){
    endMessage = "Not bad!";
  }
  else{
    endMessage = "Better luck next time.";
  }

  var fullMessage = "You answered "+numCorrect+" out of "+currentQuestionCount+" " + q + " correctly. "+ endMessage;

  document.getElementById("inprogress").style.display = "none";
  document.getElementById("gameover").style.display = "block";
  document.getElementById("gameover").innerHTML = fullMessage;

  desiredQuestionCount = 0;
  currentQuestionCount = 0;
  numCorrect = 0;
  document.getElementById("playagain").style.display = "block";

  againBtn.addEventListener('click', function(){
    document.getElementById("gameover").style.display = "none";
    document.getElementById("playagain").style.display = "none";
    document.getElementById("pregame").style.display = "block";
  }); // end play again event listener
}
