const socket = io();






const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();




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



const chatForm = document.getElementById('chat-form');

socket.on('message', message => {
  console.log(message);
});

function run() {
  console.log('run');

}

socket.on('run', message => {
  recognition.start();
  run();

});













// Message submit
chatForm.addEventListener('submit', e => {
  e.preventDefault();


  // Get message text
  const msg = e.target.elements.msg.value;



  // Emit message to server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});


const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
  socket.emit('message', 'Hello World');
});



var commands = {
  log: function (param) {
      console.log(param);
  }
};
