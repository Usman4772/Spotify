//footer heart animation
const footerheart=document.querySelector(".footer-heart")
footerheart.addEventListener("click",animatefooterHeart)
function animatefooterHeart(){

    footerheart.classList.toggle("fa-solid")
    footerheart.classList.add("fa-bounce")
        setTimeout(()=>{
        footerheart.classList.remove("fa-bounce")
        return
        },700)
}


//playing song
const playBtn=document.querySelector(".player #play")
const AudioTag=document.querySelector("audio")
playBtn.addEventListener("click",playMusic)

function playMusic(){
if(AudioTag.currentTime===0 || AudioTag.paused){
    playBtn.classList.replace("fa-play","fa-pause")
    AudioTag.play()
}
else{
    playBtn.classList.replace("fa-pause","fa-play")
    AudioTag.pause()
}
}

//Handling Progress Bar
let myProgressBar=document.querySelector(".range")
let current_time=document.querySelector(".current-time ")
let total_duration=document.querySelector(".total-duration")
AudioTag.addEventListener("timeupdate",moveProgressar)
myProgressBar.addEventListener("change",updateCurrentTime)

function moveProgressar(){
    // updating progressBar 
    let progress=parseInt((AudioTag.currentTime / AudioTag.duration)*100)
    myProgressBar.value=progress
    
    //updating total duration
    let durationMin=Math.floor(AudioTag.duration /60)
    let durationSec=Math.floor(AudioTag.duration%60)
    if(durationSec<10){
        durationSec=`0${durationSec}`
    }
        if(AudioTag.duration){
    total_duration.textContent=`${durationMin}:${durationSec}`
    }

    //updating currentTime
    let currentTimeinMin=Math.floor(AudioTag.currentTime/60)
    let currentTimeinSec=Math.floor(AudioTag.currentTime%60
    )
    if(currentTimeinSec<10){
        currentTimeinSec=`0${currentTimeinSec}`
    }
    current_time.textContent=`${currentTimeinMin}:${currentTimeinSec}`
    }

function updateCurrentTime(){
    AudioTag.currentTime=(myProgressBar.value*
        AudioTag.duration)/100
}

//Hadnling Good Morning Message
const greeting=document.querySelector(".greeting-message")
let Message=""
let timeHr=new Date().getHours()
console.log(timeHr)
 if(timeHr===24 || timeHr<12 ){
    Message="Good Morning"
}else if(timeHr>=12 && timeHr<20){
    Message="Good Afternoon"
}
else if(timeHr>=20 && timeHr<24){
    Message="Good Night"
}
greeting.textContent=Message


//showing playlist Form
const libraryPlusBtn=document.querySelector(".plus")
const addPlaylistForm=document.querySelector(".createPlaylistForm")
const cancelLibraryForm=document.querySelector(".cancel-addPlaylist-div")
libraryPlusBtn.addEventListener("click",showPlaylistForm)
cancelLibraryForm.addEventListener("click",hidePlaylistForm)
function showPlaylistForm(){
    addPlaylistForm.style.display="grid"
}
function hidePlaylistForm(){
addPlaylistForm.style.display="none"
}


//Creating Playlist
const save=document.querySelector(".save")
save.addEventListener("click",createPlaylist)
const playlistNameinput=document.querySelector(".add-playlist-title")
const songcoverImg=document.querySelector(".library-playlist-image")
//Getting url
const imageInput = document.querySelector('.add-playlist-image');
let objectURL=""
imageInput.addEventListener('change', function() {
  const selectedImage = imageInput.files[0];
  if (selectedImage) {
    objectURL = URL.createObjectURL(selectedImage);
    console.log('Object URL:', objectURL);
  }
});

let createdPlaylist;
function createPlaylist(){
    let title=playlistNameinput.value
    let imgSrc=objectURL
    if(title==="" || imgSrc===""){
            alert("Please Enter Title and cover Picture First") 
            return 
            }
    let playList=document.createElement("div")
    playList.className="library-playlist"

    playList.innerHTML=
    `
    <img src="${imgSrc}" width="200px" class="library-playlist-image coverImg">
    <div class="library-playlist-title playlistTitle">${title}</div>
    `
    createdPlaylist=playList;
   let playListSection=document.querySelector(".library-playlist-section")
   playListSection.appendChild(playList)


//Creating Main playlist
const mainPlayListContainer=document.querySelector(".playlists-wrapper")
let mainPlaylist=document.createElement("div")
mainPlaylist.className="playlist"
mainPlaylist.innerHTML=`
<img src="${imgSrc}" width="200px" class="playlist-image coverImg">
    <div class="playlist-title playlistTitle">${title}</div>

    <span class="playlist-btn-container">    <i id="play" class="fa-solid fa-play playlist-playBtn" title="play" ></i></span>
`

const playlistPlayBtn=mainPlaylist.querySelector(".playlist-btn-container")
playlistPlayBtn.addEventListener("click",()=>{
    playlistPlayBtn.parentElement.click()
})
mainPlayListContainer.appendChild(mainPlaylist)

   cancelLibraryForm.click()
   playList.addEventListener("click",(e)=>{
    createClickedPlaylist(title,imgSrc,e)
})
mainPlaylist.addEventListener("click",(e)=>{
    createClickedPlaylist(title,imgSrc,e)
})
playlistNameinput.value=""
return
}

//Open playList on click

let parentSectionOfcilck=document.querySelector(".clicked-section")
let songUrl;
 let clickedPlaylist;
const songsForm=document.querySelector(".addSongForm")
const cancelSongForm=document.querySelector(".cancel-addSongs-div")

function createClickedPlaylist(title,src,e){

    let clickedSectionDiv=document.createElement("div")
    clickedSectionDiv.className="clicked-playlist-section"
    clickedSectionDiv.innerHTML=`
    <div class="back-arrow-div">
    <i class="fa-solid fa-arrow-left back-to-main-arrow"></i>
    </div>
    <div class="clicked-playlist-details">
        <img src="${src}" class="clicked-pImage">
        <div class="details-flex">
        <h1 class="clicked-playlist-title">${title}</h1>
        <h3 class="clicked-playlist-artists-name">Aleemrk, jokhay, Talha anjum, Talha younus</h3>
        <span class="totalSongs">50songs</span>
    </div>
    </div>
    <div class="addSongsBtn"> <h3>Add Songs</h3> </div>
    <nav class="clicked-nav">
        <li class="title"><span>#</span>Title</li>
        <li class="duration">Duration</li>
    </nav>
    <div class="songs-list"></div>`
    clickedPlaylist=clickedSectionDiv
    parentSectionOfcilck.appendChild(clickedSectionDiv)
showClickedPlaylist(e)
return
}

let songcounter=0;
const saveSongBtn=document.querySelector(".saveSong")
//Getting add song coverphoto url
const songCoverInput = document.querySelector('.add-song-image');

let songobjectURL=""
songCoverInput.addEventListener('change', function() {
    console.log("working")
  const selectedImage = songCoverInput.files[0];

  if (selectedImage) {
    songobjectURL = URL.createObjectURL(selectedImage);
    console.log('Object URL:', songobjectURL);

  }
});

let songList;
function showClickedPlaylist(e){
    songcounter=0;//to reset song counter for every playlist
    // clickedPlaylist.style.display="block"
    clickedPlaylist.classList.add("show")


//adding songs
const addSongBtn=clickedPlaylist.querySelector(".addSongsBtn")
songList=addSongBtn.nextElementSibling.nextElementSibling
addSongBtn.addEventListener("click",()=>{
    showSongsForm(songList)
})
//Back to main
   let goBackBtn= clickedPlaylist.querySelector(".back-arrow-div")
   goBackBtn.addEventListener("click",goBacktoMain)
   return
}

function goBacktoMain(){
    console.log(parentSectionOfcilck)
    clickedPlaylist.style.display="none"
        }
function showSongsForm(songList){
        songsForm.style.display="grid"
saveSongBtn.addEventListener("click",()=>{
    collectInputFromSongForm(songList)
})
        cancelSongForm.addEventListener('click',hideSongsForm)
}

function collectInputFromSongForm(songList){
    const songTitleinput=document.querySelector(".add-Song-title")
    const artistInput=document.querySelector(".addSongsArtistInput")
    const artistName=artistInput.value
    const songTitle=songTitleinput.value
    const songinput=document.querySelector(".add-mp3")
    const selectedFile=songinput.files[0]
    if(selectedFile && selectedFile.type=="audio/mpeg"){
    songUrl=URL.createObjectURL(selectedFile)
    }
     cancelSongForm.click()
    AddSong(songTitle,artistName,songList)
        songTitleinput.value=""
    artistInput.value=""
}

let CreatedsongElement;
let animateHeart;
const songsListSection=document.querySelector(".songs-list")
function AddSong(title,artist,songList,e){
    songcounter++;
    let song=document.createElement("div")
    song.className="song"
    song.innerHTML=`
    <div class="song-name-artist-flex">
    <li class="songindex">${songcounter}</li>
    <img src="${songobjectURL}" alt="" class="song-image">
<div class="song-name-artist">
    <h3 class="song-title">${title}</h3>
    <h4 class="song-artist">${artist}</h4>
</div>
 </div>
 <div class="fav-duration-flex">
<i class="fa-regular fa-heart add-song-heart heart"></i>
<span class="duration">3:26</span>
</div>`
CreatedsongElement=song;
//playing song on click
song.setAttribute("data-url", songUrl);
song.addEventListener("click",(e)=>{
// console.log(passedtitle,passedartist,passedimg)
playSong(e,title,artist,songobjectURL)
})
songList.appendChild(song)
const heart=document.querySelectorAll(".add-song-heart")
animateHeart=heart
for(let i=0;i<heart.length;i++){
heart[i].addEventListener("click",(e)=>{
heartAnimation(e)
})
}
return
}

function heartAnimation(e){
let target=e.target
target.classList.toggle("fa-solid")
target.classList.add("fa-bounce")
    setTimeout(()=>{
    target.classList.remove("fa-bounce")
    return
    },700)
}

function hideSongsForm(){
        songsForm.style.display="none"
}


let footerImg=document.getElementById("footer-cover")
let footerTitle=document.querySelector(".playing-song-name")
let footerArtist=document.getElementById("footerArtist")
let footerHeart=document.getElementById("footerHeart")
console.log(footerArtist)
function playSong(e,title,artist,songobjectURL){
    //getting mp3
    const clickedSong = e.currentTarget; 
    const playingsongUrl = clickedSong.getAttribute("data-url");
        AudioTag.src=playingsongUrl;


//changing footer
footerImg.src=songobjectURL
footerTitle.textContent=title
footerArtist.textContent=artist;
footerHeart.style.display="inline-block"


        playMusic()
}
