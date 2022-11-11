const socket = io();




const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();


// hide the voice id div
document.getElementById('voice').style.display = 'none';

document.getElementById('yellow summer wednesdays...')


const chatForm = document.getElementById('chat-form');

socket.on('message', message => {
  console.log(message);
});

function run() {
  console.log('run');

}

// event listener for document loaded
// * google search and parser functions
window.addEventListener("DOMContentLoaded", (event) => {
  // Split text into spans
  let typeSplit = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span"
  });
  function createScrollTrigger(triggerElement, timeline) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      }
    });
    // Play tl when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 60%",
      onEnter: () => timeline.play()
    });
  }

  gsap.set("[text-split]", { opacity: 1 });


};









const parser = (query) => {
  const parsedQuery = query.replace(/ /g, '%');
  console.log(parsedQuery, 'parsedQuery');
  return parsedQuery;
}



// TODO: ! write a function that picks the best link available. Or waits for the next command

    //** Voice command picks it.


    ** /


//



const fillForm = (query, callback) => {

  // get element by class gsc-input/
  // get the input element with the name search
  const input = document.querySelector('input[name="search"]')
  console.log(input);

  input.focus();
  input.value = 'dream'
  input.focus();


  document.getElementsByClassName('gsc-search-button gsc-search-button-v2')[0].click();

  const links = document.getElementsByClassName('gs-title')

  console.log(links, 'links')

  let linksArr = [];

  setTimeout(() => {

    for (var i = 0; i < links.length; i++) {
      if (links[i].nodeName === 'A') {
        linksArr.push(links[i]);
      }

    }

    console.log(linksArr, 'linksArr');

    var setLink = linksArr[0].href;

    window.location = setLink;

  }, 1000);


}


// ! turn off voice recognition


socket.on('on', message => {
  recognition.start();
  document.getElementById('voice').style.display = 'block';
  fillForm('dream on');


  recognition.onresult = function (event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    console.log(transcript);



    socket.emit('transcript', transcript);
  };
  console.log('ON')

})


// ! turn oFF voice recognition

socket.on('off', message => {

  recognition.stop();
  document.getElementById('voice').style.display = 'none';
  console.log('OFF');

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




