
const talk = document.getElementById('talk');
const stop = document.getElementById('end');


// ! create an event listener will listen for a get request from the server or some
// ! of message that will trigger the bot to start listening for voice commands


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();


talk.addEventListener('click', () => {
  recognition.start();
  console.log('activated');

  // get voice message
  recognition.onresult = function (event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    console.log(transcript);
    sendMessage(transcript);
  }


  // stop voice recognition
  stop.addEventListener('click', () => {
    recognition.stop();
    console.log('stopped');
  }
  )

});



recognition.onstart = function () {
  console.log('voice is activated, you can to microphone');
}



// on keyboard button press send message
document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    // focus the current window
    window.focus();
    console.log('clicked');


  }
}
)
