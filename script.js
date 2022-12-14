console.log("Welcome To Spotify");
let playid;
let audio_element = new Audio();
let masterplay = document.getElementById("masterplay");
let gif = document.querySelector('.gif>img')
let seekbar = document.querySelector('#footer input');
let songitem = Array.from(document.getElementsByClassName('songitem'));
let songs = [
   { songName: 'Ude Dil Befikre', filepath: '/songs/song-0.mp3', coverpath: './Images/coverImages/cover-1.jfif' },
   { songName: 'Toise Naina', filepath: '/songs/song-1.mp3', coverpath: './Images/coverImages/cover-2.jpg' },
   { songName: 'Mast Magan', filepath: '/songs/song-2.mp3', coverpath: './Images/coverImages/cover-3.jpg' },
   { songName: 'Channa Mereya', filepath: '/songs/song-3.mp3', coverpath: './Images/coverImages/cover-4.jfif' },
   { songName: 'Wajah Tum Ho', filepath: '/songs/song-4.mp3', coverpath: './Images/coverImages/cover-5.jfif' },
   { songName: 'Haye Dil', filepath: '/songs/song-5.mp3', coverpath: './Images/coverImages/cover-6.jfif' },
   { songName: 'Jab Tak', filepath: '/songs/song-6.mp3', coverpath: './Images/coverImages/cover-7.jpg' },
   { songName: 'Kya  ', filepath: '/songs/song-7.mp3', coverpath: './Images/coverImages/cover-8.jpg' }
]


// footer play button section
masterplay.addEventListener('click', (element) => {
   if (audio_element.src == "") {
      audio_element.src = songs[0].filepath;

      playid = document.getElementById('0').id;
      document.getElementById(`${playid}`).classList.remove('fa-circle-play');
      document.getElementById(`${playid}`).classList.add('fa-circle-pause');

      document.querySelector('#songname').textContent = songs[0].songName;
   }

   if (audio_element.currentTime <= 0 || audio_element.paused) {
      audio_element.play();
      masterplay.classList.remove('fa-circle-play');
      masterplay.classList.add('fa-circle-pause')
      gif.style.opacity = 1;
      document.getElementById(`${playid}`).classList.remove('fa-circle-play')
      document.getElementById(`${playid}`).classList.add('fa-circle-pause')


   }
   else {
      audio_element.pause();
      masterplay.classList.remove('fa-circle-pause');
      masterplay.classList.add('fa-circle-play');
      gif.style.opacity = 0;
      document.getElementById(`${playid}`).classList.remove('fa-circle-pause')
      document.getElementById(`${playid}`).classList.add('fa-circle-play')
   }
})
//SeekBar Section

audio_element.addEventListener('timeupdate', () => {
   let progress = parseInt((audio_element.currentTime / audio_element.duration) * 100);
   seekbar.value = progress;
})
seekbar.addEventListener('change', () => {
   audio_element.currentTime = (seekbar.value * audio_element.duration) / 100;

}) 
// BODY PLAY BUTTON SECTION

songitem.forEach((element, i) => {

   element.getElementsByTagName('img')[0].src = songs[i].coverpath;
   element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})

let playbutton = Array.from(document.querySelectorAll('.songitem i'));

playbutton.forEach((element, i) => {

   element.addEventListener('click', (e) => {

      makeAllPlay();
      if (audio_element.src == "")   // very First Song 
      {
         audio_element.src = songs[i].filepath;
         audio_element.play();
         audio_element.currentTime = 0;
         e.target.classList.remove('fa-circle-play');
         e.target.classList.add('fa-circle-pause');
         masterplay.classList.remove('fa-circle-play');
         masterplay.classList.add('fa-circle-pause');
         gif.style.opacity = 1;
         console.log("first");
          playid= e.target.id;
         document.querySelector('#songname').textContent = songs[i].songName;


      }
      else if (playid== e.target.id)    // Same Song Clicked
      {
         if (audio_element.paused) {

            audio_element.play();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            masterplay.classList.remove('fa-circle-play');
            masterplay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;

            playid = e.target.id;

         }
         else {
            audio_element.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterplay.classList.remove('fa-circle-pause');
            masterplay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
            playid = e.target.id;
         }
      }
      else   //Song Changed
      {
         audio_element.src = songs[i].filepath;
         audio_element.play();
         e.target.classList.remove('fa-circle-play');
         e.target.classList.add('fa-circle-pause');
         masterplay.classList.remove('fa-circle-play');
         masterplay.classList.add('fa-circle-pause');
         gif.style.opacity = 1;
         playid = e.target.id;
         document.querySelector('#songname').textContent = songs[i].songName;

        


      }

   })
})

let makeAllPlay = () => {
   playbutton.forEach((element) => {
      element.classList.remove('fa-circle-pause');
      element.classList.add('fa-circle-play');
   })
}


// Next Previous Button

document.getElementById('nextbutton').addEventListener('click', () => {
   let num = playid;
   num++
   if (num > 7) {
      num = 0;
       document.getElementById(`${num}`).classList.remove('fa-circle-play');
      document.getElementById(`${num}`).classList.add('fa-circle-pause');

      document.getElementById(`${7}`).classList.remove('fa-circle-pause');
      document.getElementById(`${7}`).classList.add('fa-circle-play');
      masterplay.classList.remove('fa-circle-play')
      masterplay.classList.add('fa-circle-pause')
      gif.style.opacity=1;
      playid=0;

      console.log(playid);

   }
   else {
      

      document.getElementById(`${num}`).classList.remove('fa-circle-play');
      document.getElementById(`${num}`).classList.add('fa-circle-pause');
      document.getElementById(`${num - 1}`).classList.remove('fa-circle-pause');
      document.getElementById(`${num - 1}`).classList.add('fa-circle-play')
      masterplay.classList.remove('fa-circle-play')
      masterplay.classList.add('fa-circle-pause')
      gif.style.opacity=1;
       playid++;

         
   }
   audio_element.src = songs[num].filepath;
   audio_element.play();
   document.querySelector('#songname').textContent = songs[num].songName;

})

//PREVIOUS BUTTON SECTION

document.querySelector('#previousbutton').addEventListener('click', () => {
   let num = playid;
   num--;
   if (num < 0) {
      num = 7;
      document.getElementById(`${num}`).classList.remove('fa-circle-play');
      document.getElementById(`${num}`).classList.add('fa-circle-pause');
      document.getElementById(`${0}`).classList.remove('fa-circle-pause');
      document.getElementById(`${0}`).classList.add('fa-circle-play');
      masterplay.classList.remove('fa-circle-play')
      masterplay.classList.add('fa-circle-pause')
      gif.style.opacity=1;
      playid=7;


   }
   else {
      document.getElementById(`${num}`).classList.remove('fa-circle-play');
      document.getElementById(`${num}`).classList.add('fa-circle-pause');
      document.getElementById(`${num + 1}`).classList.remove('fa-circle-pause');
      document.getElementById(`${num + 1}`).classList.add('fa-circle-play');
      masterplay.classList.remove('fa-circle-play')
      masterplay.classList.add('fa-circle-pause')
      gif.style.opacity=1;
       playid--;
   }

   audio_element.src = songs[num].filepath;
   audio_element.play();
   document.querySelector('#songname').textContent = songs[num].songName;
});

  







