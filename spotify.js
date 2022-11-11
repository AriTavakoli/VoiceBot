

console.log('working');

const token = 'BQCU9iCx-GMPSaSu4hCH2a8QonOsYRHyQEnHKTN3zlCYBKbVKzbm2ojnyBHLePJeTMVZKcuAEdaivh01azEzYQtvK7wfdH7Mx6Vt0J2UNFgiNo81vePYygy9E8C0ZiFjTjELYBJb_GHPhijhqJHq-vmB9Ct2RR9qVkEB5vcKxjPw_FxmYwODbAhvsMZXAv9MaOc';

document.addEventListener('DOMContentLoaded', () => {

  window.onSpotifyWebPlaybackSDKReady = () => {

    const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); },
      volume: 0.5
    });


    var devId = ''

    player.addListener('ready', ({ device_id }) => {
      devId = device_id;
      console.log('Ready with Device ID', device_id);
    });

    player.addListener('initialization_error', ({ message }) => {
      console.error(message);
    });

    player.addListener('authentication_error', ({ message }) => {
      console.error(message);
    });

    player.addListener('account_error', ({ message }) => {
      console.error(message);
    });

    player.connect().then(success => {
      if (success) {
        console.log('The Web Playback SDK successfully connected to Spotify!');
      }
    })

    btn.addEventListener('click', () => {

      /// play the song
      player.togglePlay();

      console.log('playing');



    });

    document.getElementById('pause').addEventListener('click', () => {
      player.pause().then(() => {
        console.log('Paused!');
      });
    });


  };

  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    let element = document.getElementById('embed-iframe');
    let options = {
      width: '80%',
      height: '200',
      uri: 'spotify:episode:5ynMeufgyxMYCMsfUPWX1L'
    };


    let callback = (EmbedController) => {


    };
    IFrameAPI.createController(element, options, callback);
  };



})

const search = (query) => {
  const parsedQuery = parser(query);
  const url = `https://api.spotify.com/v1/search?q=${parsedQuery}&type=track&limit=1`;
  axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      songUri = res.data.tracks.items[0].uri;
      console.log(res.data.tracks.items[0].uri);
      // play a track using the Web Playback SDK

    })
    .catch((err) => {
      console.log(err);
    });
};



