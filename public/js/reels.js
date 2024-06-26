const reelsVideos = document.getElementById("reelsVideos");

import {fetchReels} from '../js/apiFetch.js';

const videosData = await fetchReels();

function createVideoElement(data) {
  const videoElement = document.createElement("div");
  videoElement.classList.add("video");

  videoElement.innerHTML = `
    <video src="${data.videoSrc}"></video>
    <button class="top">
      <svg xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" viewBox="0 0 50 50">
        <path clip-rule="evenodd" d="M1.5 13.3c-.8 0-1.5.7-1.5 1.5v18.4c0 .8.7 1.5 1.5 1.5h8.7l12.9 12.9c.9.9 2.5.3 2.5-1v-9.8c0-.4-.2-.8-.4-1.1l-22-22c-.3-.3-.7-.4-1.1-.4h-.6zm46.8 31.4-5.5-5.5C44.9 36.6 48 31.4 48 24c0-11.4-7.2-17.4-7.2-17.4-.6-.6-1.6-.6-2.2 0L37.2 8c-.6.6-.6 1.6 0 2.2 0 0 5.7 5 5.7 13.8 0 5.4-2.1 9.3-3.8 11.6L35.5 32c1.1-1.7 2.3-4.4 2.3-8 0-6.8-4.1-10.3-4.1-10.3-.6-.6-1.6-.6-2.2 0l-1.4 1.4c-.6.6-.6 1.6 0 2.2 0 0 2.6 2 2.6 6.7 0 1.8-.4 3.2-.9 4.3L25.5 22V1.4c0-1.3-1.6-1.9-2.5-1L13.5 10 3.3-.3c-.6-.6-1.5-.6-2.1 0L-.2 1.1c-.6.6-.6 1.5 0 2.1L4 7.6l26.8 26.8 13.9 13.9c.6.6 1.5.6 2.1 0l1.4-1.4c.7-.6.7-1.6.1-2.2z" fill="white" fill-rule="evenodd"></path>
      </svg>
    </button>
    <div class="icons">
      <button class="heart" id="likeButton">
        <svg class="LikeButton" xmlns="http://www.w3.org/2000/svg" role="img" width="24px" height="24px" viewBox="0 0 24 24">
          <path  d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
        </svg>
        <small>${data.likes}</small>
      </button>
      <button class="comment">
        <svg fill="#000000" width="28px" height="28px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)" stroke="#000000" stroke-width="0.8"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.2881437,19.1950792 C8.38869181,19.1783212 8.49195996,19.1926955 8.58410926,19.2362761 C9.64260561,19.7368747 10.8021412,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,13.7069096 4.53528582,15.3318588 5.51454846,16.6849571 C5.62010923,16.830816 5.63909672,17.022166 5.5642591,17.1859256 L4.34581002,19.8521348 L8.2881437,19.1950792 Z M3.58219949,20.993197 C3.18698783,21.0590656 2.87870208,20.6565881 3.04523765,20.2921751 L4.53592782,17.0302482 C3.54143337,15.5576047 3,13.818993 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 C10.707529,21 9.4528641,20.727055 8.30053434,20.2068078 L3.58219949,20.993197 Z"></path> </g></svg>
        <small>${data.comments}</small>
      </button>
      <button class="share">
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
          <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5" x1="22" x2="9.218" y1="3" y2="10.083"></line>
          <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"></polygon>
        </svg>
      </button>
      <button class="saved">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon>
      </svg>
      </button>
      <button class="more">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
        <circle cx="12" cy="12" r="1.5"></circle>
        <circle cx="6" cy="12" r="1.5"></circle>
        <circle cx="18" cy="12" r="1.5"></circle>
      </svg>
      </button>
      <img src="${data.userImg}" alt="User profile image" />
    </div>
    <div class="user_profile">
      <div>
        <img src="${data.userImg}" alt="User profile image" />
        <h3><button>${data.username}&nbsp;&nbsp;•</button></h3>
        <button class="follow">Follow</button>
      </div>
      <p>${data.description}•</p>
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="white">
          <path d="M21.002 16.972V2.044a.999.999 0 0 0-.36-.769 1.012 1.012 0 0 0-.823-.214L6.816 3.479A1 1 0 0 0 6 4.462v10.864A3.75 3.75 0 1 0 9 19V9.56l9.003-1.675v5.442A3.75 3.75 0 1 0 21.005 17c0-.01-.003-.02-.003-.029Z"></path>
        </svg>
        ${data.song}</span>
    </div>
  `;

  return videoElement;
}

videosData.forEach((data) => {
  const videoElement = createVideoElement(data);
  reelsVideos.appendChild(videoElement);
});

reelsVideos.addEventListener(
  "mouseleave",
  (event) => {
    if (event.target.tagName === "VIDEO") {
      const video = event.target;
      video.loop = true;
      video.pause();
    }
  },
  true
);
reelsVideos.addEventListener(
  "mouseenter",
  (event) => {
    if (event.target.tagName === "VIDEO") {
      const video = event.target;
      video.loop = true;
      video.play();
    }
  },
  true
);

reelsVideos.addEventListener(
  "click",
  (event) => {
    if (event.target.tagName === "VIDEO") {
      const video = event.target;
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  },
  true
);
 const liked = `
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
 <path fill="red" d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
</svg>
 `;

 const removeLike = `
 <svg class="LikeButton" xmlns="http://www.w3.org/2000/svg" role="img" width="24px" height="24px" viewBox="0 0 24 24">
 <path  d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
</svg>
`;

let isLiked = false;

reelsVideos.addEventListener("click", (event) => {
  if (event.target.closest(".heart")) {
    const heartButton = event.target.closest(".heart");
    const svgElement = heartButton.querySelector("svg");

    if (!isLiked) {
      svgElement.innerHTML = liked.trim();
    } else {
      svgElement.innerHTML = removeLike.trim();
    }

    isLiked = !isLiked; // Toggle the like state
  }
});

//Mute Button
const firstSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="white">
    <path d="M16.636 7.028a1.5 1.5 0 10-2.395 1.807 5.365 5.365 0 011.103 3.17 5.378 5.378 0 01-1.105 3.176 1.5 1.5 0 102.395 1.806 8.396 8.396 0 001.71-4.981 8.39 8.39 0 00-1.708-4.978zm3.73-2.332A1.5 1.5 0 1018.04 6.59 8.823 8.823 0 0120 12.007a8.798 8.798 0 01-1.96 5.415 1.5 1.5 0 002.326 1.894 11.672 11.672 0 002.635-7.31 11.682 11.682 0 00-2.635-7.31zm-8.963-3.613a1.001 1.001 0 00-1.082.187L5.265 6H2a1 1 0 00-1 1v10.003a1 1 0 001 1h3.265l5.01 4.682.02.021a1 1 0 001.704-.814L12.005 2a1 1 0 00-.602-.917z"></path>
  </svg>
`;

const secondSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 50 50">
    <path clip-rule="evenodd" d="M1.5 13.3c-.8 0-1.5.7-1.5 1.5v18.4c0 .8.7 1.5 1.5 1.5h8.7l12.9 12.9c.9.9 2.5.3 2.5-1v-9.8c0-.4-.2-.8-.4-1.1l-22-22c-.3-.3-.7-.4-1.1-.4h-.6zm46.8 31.4-5.5-5.5C44.9 36.6 48 31.4 48 24c0-11.4-7.2-17.4-7.2-17.4-.6-.6-1.6-.6-2.2 0L37.2 8c-.6.6-.6 1.6 0 2.2 0 0 5.7 5 5.7 13.8 0 5.4-2.1 9.3-3.8 11.6L35.5 32c1.1-1.7 2.3-4.4 2.3-8 0-6.8-4.1-10.3-4.1-10.3-.6-.6-1.6-.6-2.2 0l-1.4 1.4c-.6.6-.6 1.6 0 2.2 0 0 2.6 2 2.6 6.7 0 1.8-.4 3.2-.9 4.3L25.5 22V1.4c0-1.3-1.6-1.9-2.5-1L13.5 10 3.3-.3c-.6-.6-1.5-.6-2.1 0L-.2 1.1c-.6.6-.6 1.5 0 2.1L4 7.6l26.8 26.8 13.9 13.9c.6.6 1.5.6 2.1 0l1.4-1.4c.7-.6.7-1.6.1-2.2z" fill="white" fill-rule="evenodd"></path>
  </svg>
`;

reelsVideos.addEventListener("click", (event) => {
  const audioButtons = document.querySelectorAll(".top");
  audioButtons.forEach((audioButton, index) => {
      const svgElement = audioButton.querySelector("svg");
      const videoElements = document.querySelectorAll("video");
      
      if (svgElement) {
          const currentSVG = svgElement.innerHTML.trim();
          const videoToMute = videoElements[index];
          
          if (currentSVG === firstSVG.trim()) {
              svgElement.innerHTML = secondSVG.trim();
              if (videoToMute) {
                  videoToMute.muted = true;
              }
          } else {
              svgElement.innerHTML = firstSVG.trim();
              if (videoToMute) {
                  videoToMute.muted = false;
              }
          }
      }
  });
});



