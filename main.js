/*
  Personal Javascript

  I used the Fetch API request instead of an XMLHttpRequest. I got basic code for this from https://developers.google.com/web/updates/2015/03/introduction-to-fetch
*/
const startBtn = document.getElementById("startbtn");
const nextBtn = document.getElementById("nextbtn");
let answer = "";
let value = "";

startBtn.addEventListener('click', function(){
  document.getElementById("start").style.display = "none";
  document.getElementById("inprogress").style.display = "block";

});

nextBtn.addEventListener('click', function(){
  document.getElementById("answer").innerHTML = "<button id='answerbtn'>Reveal Answer</button>"

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
        const question = data[0].question;
        answer = data[0].answer;
        document.getElementById("category").innerHTML = category;
        document.getElementById("question").innerHTML = "For " + value + " points, " + question + ".";
        document.getElementById("answer").style.display = "block";
        document.getElementById("answerbtn").addEventListener('click', function(){
          document.getElementById("answer").innerHTML = answer;
        });
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
});
