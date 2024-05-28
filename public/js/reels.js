const video = document.querySelectorAll(".container .reels_videos video");

for (let i = 0; i < video.length; i++) {
  video[i].addEventListener("mouseenter", () => {
    video[i].currentTime = 0;
    video[i].loop = true;
    video[i].play();
  });
  // video[i].addEventListener("mouseleave", () =>{
  //     video[i].pause();
  // });
  video[i].addEventListener("click", () => {
    if (video[i].paused) {
      video[i].play();
    } else {
      video[i].pause();
    }
  });
  
}
