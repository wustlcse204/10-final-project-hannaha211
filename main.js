/*
  Personal Javascript

  I used the Fetch API request instead of an XMLHttpRequest. I got basic code for this from https://developers.google.com/web/updates/2015/03/introduction-to-fetch
*/
const startBtn = document.getElementById("startbtn");
var correctBtn = document.getElementById("rightbtn");
var wrongBtn = document.getElementById("wrongbtn");
const endBtn = document.getElementById("endbtn");
const againBtn = document.getElementById("againbtn");
let answer = "";
let value = "";
let currentscore = 0;
let questioncount = 0;

startBtn.addEventListener('click', function(){
  document.getElementById("pregame").style.display = "none";
  document.getElementById("inprogress").style.display = "block";
  setUpClue();
});

endBtn.addEventListener('click', function(){
  console.log("end pressed");
  //Handles grammar of end message
  var q = "";
  if(questioncount==1){
    q="question";
  }
  else {
    q="questions";
  }
  var endMessage = "";

  //Customizes end message to score
  if(currentscore<=0){
    endMessage = "Oof! Better luck next time!";
  }
  else if(currentscore<10000){
    endMessage = "Not bad!";
  }
  else{
    endMessage = "Wow! You should go on the real show!";
  }

  document.getElementById("inprogress").style.display = "none";
  document.getElementById("gameover").style.display = "block";
  document.getElementById("gameover").innerHTML = "After " + questioncount + " "+q+", you scored " + currentscore + " points! " + endMessage;

  document.getElementById("playagain").style.display = "block";

  againBtn.addEventListener('click', function(){
    currentscore = 0;
    questioncount = 0;
    document.getElementById("gameover").style.display = "none";
    document.getElementById("playagain").style.display = "none";
    document.getElementById("pregame").style.display = "block";
  }); // end play again event listener
}); //end end listener

function setUpClue(){
  document.getElementById("response").innerHTML = "";
  document.getElementById("answer").innerHTML = "<button id='answerbtn'>Reveal Answer</button>";

  fetch('http://jservice.io/api/random')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      response.json().then(function(data) {
        const category = data[0].category.title;
        value = data[0].value;
        console.log("value: "+value);
        const question = data[0].question;
        console.log("question: "+question);
        answer = data[0].answer;
        document.getElementById("category").innerHTML = category;
        document.getElementById("question").innerHTML = "For " + value + " points, " + question + ".";
        document.getElementById("answer").style.display = "block";
        document.getElementById("score").innerHTML = currentscore;

        document.getElementById("answerbtn").addEventListener('click', function(){
          document.getElementById("answer").innerHTML = answer;
          document.getElementById("response").innerHTML = "<button id=rightbtn>I was correct!</button><button id=wrongbtn>I was wrong!</button>"
          correctBtn = document.getElementById("rightbtn");
          wrongBtn = document.getElementById("wrongbtn");

          correctBtn.addEventListener('click', function(){
            console.log("correct hit");
            questioncount++;
            currentscore+=value;
            document.getElementById("score").innerHTML = currentscore + " points";
            setUpClue();
          });

          wrongBtn.addEventListener('click', function(){
            questioncount++;
            console.log("wrong pressed");
            currentscore=currentscore-value;
            document.getElementById("score").innerHTML = currentscore + " points";
            setUpClue();
          });

        });//end reveal answer addEventListener


      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}
