/*
  Personal Javascript

  I used the Fetch API request instead of an XMLHttpRequest. I got basic code for this from https://developers.google.com/web/updates/2015/03/introduction-to-fetch
*/

const nextBtn = document.getElementById("next-btn");

nextBtn.addEventListener('click', function(){
  //alert("next clicked");
  fetch('http://jservice.io/api/category?id=672')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        //const question = data[0].question;
        //const answer = data[0].answer;
        //console.log(question + ":" +answer);
        console.log(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
});
