const fs = require('fs');
const SpotifyWebApi = require('spotify-web-api-node');


const token = "BQC4YOIRsKED2SeS_WUVyra-EtlziroxrPcD-Cwjrz3PcbvOA73jdftzz_o7AKXFUmf4mkMiOrEmkc1WX1TrPvoDL_2csBTZ4cnM58LI5wUDlFHcMbzFrjYIvO6KlDRvc1nD3mcV7arlqmYdzXUzCGGZ4045rPtmP-YcWbh4Y5W4NxlJ3M8lh_-zXrO42ArD1laV-m12pAvqlyG1Y-q2XnPgaMefCQqLp5JV7qDxKT3tueFIuALHeG3RcTXMp2rTHwU5vkHgi2k6YgW4DM8fRL55GxlUJq8FjolI9D8e-7aNqyq3XYN2lQzsyC8JukcA"
const refresh_token = 'AQCED4UFHRXmTJkSFWolllYoIkdm1hnoKa2Qcu1KUUhSFWhTVy6dD_49-K--OtJRZyxcR4636xHG6JKQyfzlF3KYXlng6bojl5ZDz-CUGa1-p1CVjQxSOYOScJIhyA3DOoY'
const spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken(token);

function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    console.log(me.body);
  }
  )().catch(e => {
    console.error(e);
  }
  )
}



spotifyApi.getMySavedTracks({
  limit : 2,
  offset: 1
})
.then(function(data) {
  console.log('Done!');
  console.log(data.body.items[0].track.name);
}, function(err) {
  console.log('Something went wrong!', err);
});