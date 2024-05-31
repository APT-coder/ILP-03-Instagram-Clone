import { fetchStories, fetchUserById } from "../js/apiFetch.js";

async function receiveData ()  {
  const data = await fetchStories();
  const jsonData = []; // Array to store data objects
  for (const element of data) {
    const { userId, imageUrl, views, isVideo } = element; // Destructure the properties from the element
    const profilePicUrl = await fetchUserById(userId); // Wait for the profile picture URL
    const dataObject = { userId, imageUrl, views, isVideo, profilePicUrl }; // Create data object with extracted properties
    jsonData.push(dataObject); // Push data object to array
  }
  return jsonData; // Return the JSON data
};
let storyFull = await receiveData();

const profileSuggestions = [
  {
    profileSuggestionsDP:
      "https://www.sosyncd.com/wp-content/uploads/2022/06/62-2.png",
    profileSuggestionsUsername: "Thulasi",
  },
  {
    profileSuggestionsDP:
      "https://www.sosyncd.com/wp-content/uploads/2022/06/62-2.png",
    profileSuggestionsUsername: "Ashwin",
  },
  {
    profileSuggestionsDP:
      "https://www.sosyncd.com/wp-content/uploads/2022/06/62-2.png",
    profileSuggestionsUsername: "Hrishi",
  },
  {
    profileSuggestionsDP:
      "https://www.sosyncd.com/wp-content/uploads/2022/06/62-2.png",
    profileSuggestionsUsername: "Betsy",
  },
  {
    profileSuggestionsDP:
      "https://www.sosyncd.com/wp-content/uploads/2022/06/62-2.png",
    profileSuggestionsUsername: "Dhanu",
  },
  {
    profileSuggestionsDP:
      "https://www.sosyncd.com/wp-content/uploads/2022/06/62-2.png",
    profileSuggestionsUsername: "Ashok",
  },
  {
    profileSuggestionsDP:
      "https://www.sosyncd.com/wp-content/uploads/2022/06/62-2.png",
    profileSuggestionsUsername: "Arjun",
  },
];

const storyContainer = document.querySelector(".story-container");
const storyView = document.querySelector(".story-full");
const storyViewDp = document.querySelector(".story-view-dp");
const storyViewUsername = document.querySelector(".story-username");
const leftStoryBox = document.querySelector(".left-story");
const leftStoryBoxTwo = document.querySelector(".left-story-two");
const currentStoryBox = document.querySelector(".current-story");
const rightStoryBox = document.querySelector(".right-story");
const rightStoryBoxTwo = document.querySelector(".right-story-two");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const likeIcon = document.querySelector(".like-icon");
const pauseIcon = document.querySelector(".pause-icon");
const closeBtn = document.querySelector(".story-full .close-btn");
// const profileFlex = document.querySelector(".profile-flex");
// const profile = document.querySelector(".profile");
// const profileInfo = document.querySelector(".profile-info");

let CurrentIndex = 0;
let intervalId;
let isPaused = false;

const resetLikeIcon = () => {
  likeIcon.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 custom-svg-size like-icon"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/></svg>';
};

const resetPauseIcon = () => {
  pauseIcon.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="size-6 custom-svg-size pause-icon"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5"/></svg>';
};

const startInterval = () => {
  intervalId = setInterval(nextStory, 5000);
};

const pauseInterval = () => {
  clearInterval(intervalId);
};

const updateProgressBar = () => {
  progressBar.style.transition = "none";
  progressBar.style.width = "0%";
  setTimeout(startProgressBar, 100); // Start progress bar after resetting
};

const stopProgressBar = () => {
  progressBar.style.transition = "none";
  progressBar.style.width = "0%";
};

const startProgressBar = () => {
  progressBar.style.transition = "width 5s linear";
  progressBar.style.width = "100%";
};

const createLeftStoryDP = (leftIndex, position) => {
  const story = document.createElement("div");
  story.classList.add("story-overlay");
  let gradBorder;
  if (position) {
    gradBorder = document.createElement("div");
    gradBorder.classList.add("gradient-border");
  } else {
    gradBorder = document.createElement("div");
    gradBorder.classList.add("gradient-border-grey");
  }
  const storyDP = document.createElement("img");
  storyDP.setAttribute(
    "src",
    storyFull[leftIndex].profilePicUrl.profilePicture
  );

  const username = document.createElement("p");
  username.innerHTML = storyFull[leftIndex].profilePicUrl.username;

  story.appendChild(gradBorder);
  gradBorder.appendChild(storyDP);
  story.appendChild(username);

  return story;
};

const updateStoryView = () => {
  // Clear previous contents
  leftStoryBox.innerHTML = "";
  currentStoryBox.innerHTML = "";
  rightStoryBox.innerHTML = "";
  leftStoryBoxTwo.innerHTML = "";
  rightStoryBoxTwo.innerHTML = "";
  // Set left story
  const leftStoryTwo = storyFull[CurrentIndex - 2];
  const leftStoryIndexTwo = CurrentIndex - 2;
  if (leftStoryTwo) {
    if (leftStoryTwo.isVideo) {
      const video = document.createElement("video");
      video.setAttribute("src", leftStoryTwo.imageUrl);
      video.setAttribute("controls", "controls");
      leftStoryBoxTwo.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.setAttribute("src", leftStoryTwo.imageUrl);
      leftStoryBoxTwo.appendChild(img);
    }
    const storyNewTwo = createLeftStoryDP(leftStoryIndexTwo, 0);
    leftStoryBoxTwo.appendChild(storyNewTwo);
    storyNewTwo.classList.add(".left-story-dp");
  }

  const leftStory = storyFull[CurrentIndex - 1];
  const leftStoryIndex = CurrentIndex - 1;
  if (leftStory) {
    if (leftStory.isVideo) {
      const video = document.createElement("iframe");
      video.setAttribute("src", leftStory.imageUrl);
      video.setAttribute("controls", "controls");
      leftStoryBox.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.setAttribute("src", leftStory.imageUrl);
      leftStoryBox.appendChild(img);
    }
    const storyNew = createLeftStoryDP(leftStoryIndex, 0);
    leftStoryBox.appendChild(storyNew);
    storyNew.classList.add(".left-story-dp");
  }

  // Set current story
  const currentStory = storyFull[CurrentIndex];
  storyViewDp.setAttribute("src", currentStory.profilePicUrl.profilePicture);
  storyViewUsername.textContent = currentStory.profilePicUrl.username;
  if (currentStory.isVideo) {
    const video = document.createElement("iframe");
    video.classList.add("story-video-class");
    video.setAttribute("src", currentStory.imageUrl);
    video.setAttribute("allow", "autoplay");
    currentStoryBox.appendChild(video);
    
  } else {
    const img = document.createElement("img");
    img.classList.add("story-image-class");
    img.setAttribute("src", currentStory.imageUrl);
    currentStoryBox.appendChild(img);
  }

  // Set right story
  if (CurrentIndex < storyFull.length - 1) {
    const rightStory = storyFull[CurrentIndex + 1];
    const rightStoryIndex = CurrentIndex + 1;
    if (rightStory.isVideo) {
      const video = document.createElement("iframe");
      video.setAttribute("src", rightStory.imageUrl);
      video.setAttribute("controls", "controls");
      rightStoryBox.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.setAttribute("src", rightStory.imageUrl);
      rightStoryBox.appendChild(img);
    }
    const storyNewRight = createLeftStoryDP(rightStoryIndex, 1);
    rightStoryBox.appendChild(storyNewRight);
    storyNewRight.classList.add(".left-story-dp");
  }
  if (CurrentIndex < storyFull.length - 1) {
    const rightStoryTwo = storyFull[CurrentIndex + 2];
    const rightStoryIndexTwo = CurrentIndex + 2;
    if (rightStoryTwo.isVideo) {
      const video = document.createElement("iframe");
      video.setAttribute("src", rightStoryTwo.imageUrl);
      video.setAttribute("controls", "controls");
      rightStoryBoxTwo.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.setAttribute("src", rightStoryTwo.imageUrl);
      rightStoryBoxTwo.appendChild(img);
    }
    const storyNewRightTwo = createLeftStoryDP(rightStoryIndexTwo, 1);
    rightStoryBoxTwo.appendChild(storyNewRightTwo);
    storyNewRightTwo.classList.add(".left-story-dp");
  }
};

const nextStory = () => {
  if (CurrentIndex < storyFull.length - 1) {
    CurrentIndex += 1;

    updateStoryView();
    resetLikeIcon();
    resetPauseIcon();
    updateProgressBar();
  }
};

const prevStory = () => {
  if (CurrentIndex > 0) {
    CurrentIndex -= 1;
    updateStoryView();
    resetLikeIcon();
    resetPauseIcon();
    updateProgressBar();
  }
};

leftArrow.addEventListener("click", prevStory);
rightArrow.addEventListener("click", nextStory);

likeIcon.addEventListener("click", () => {
  if (likeIcon.getAttribute("fill") !== "none") {
    likeIcon.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 custom-svg-size like-icon"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/></svg>';
    likeIcon.setAttribute("fill", "none");
  } else {
    likeIcon.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" fill="#ff3d47" viewBox="0 0 512 512"><path fill="#ff3d47" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>';
    likeIcon.setAttribute("fill", "#ff3d47");
  }
});

pauseIcon.addEventListener("click", () => {
  if (isPaused) {
    resetPauseIcon();
    startInterval();
    updateProgressBar();
  } else {
    pauseIcon.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="24"><path fill="#ffffff" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>';
    pauseInterval();
    stopProgressBar();
  }
  isPaused = !isPaused;
});

const myStory = document.querySelector(".my-story");
const storyDP = document.querySelector(".story-view-dp");
myStory.addEventListener("click", () => {
  CurrentIndex = 0;
  storyView.classList.add("active");
  storyDP.setAttribute("src", storyFull[0].profilePicUrl.profilePicture);
  document.querySelector(".story-username").textContent =
    storyFull[0].profilePicUrl.username;
  startInterval();
  updateStoryView();
  updateProgressBar(); // Start progress bar for the first story
});


const profileContainer = document.querySelector(".profile-container"); 
profileSuggestions.forEach((item) => {
  // Create the outer container
  const profileFlex = document.createElement("div");
  profileFlex.classList.add("profile-flex");

  // Create the profile section
  const profile = document.createElement("div");
  profile.classList.add("profile");

  // Create and set the profile picture
  const suggestionsDP = document.createElement("img");
  suggestionsDP.setAttribute("src", item.profileSuggestionsDP);
  suggestionsDP.setAttribute("alt", "Profile Picture");

  // Create the profile info section
  const profileInfo = document.createElement("div");
  profileInfo.classList.add("profile-info");

  // Create and set the username
  const username = document.createElement("strong");
  username.textContent = item.profileSuggestionsUsername;

  // Create and set the name
  const profileInfoName = document.createElement("span");
  profileInfoName.classList.add("profile-info-name");
  profileInfoName.textContent = "Suggested for you";

  // Append elements to profileInfo
  profileInfo.appendChild(username);
  profileInfo.appendChild(profileInfoName);

  // Append elements to profile
  profile.appendChild(suggestionsDP);
  profile.appendChild(profileInfo);

  // Create the switch button
  const switchBtn = document.createElement("div");
  switchBtn.classList.add("switch");
  switchBtn.textContent = "Follow";

  // Append profile and switch button to profileFlex
  profileFlex.appendChild(profile);
  profileFlex.appendChild(switchBtn);

  // Append profileFlex to the container
  profileContainer.appendChild(profileFlex);
});



storyFull.forEach((elements, i) => {
  const story = document.createElement("div");
  story.classList.add("story");

  let gradBorder = document.createElement("div");
  if (elements.visited) {
    gradBorder.classList.add("gradient-border-grey");
  } else {
    gradBorder.classList.add("gradient-border");
  }
  const storyDP = document.createElement("img");
  storyDP.setAttribute("src", elements.profilePicUrl.profilePicture);

  const username = document.createElement("p");
  username.innerHTML = elements.profilePicUrl.username;

  story.appendChild(gradBorder);
  gradBorder.appendChild(storyDP);
  story.appendChild(username);

  storyContainer.appendChild(story);

  story.addEventListener("click", () => {
    CurrentIndex = i;
    storyView.classList.add("active");
    updateStoryView();
    startProgressBar();
    startInterval();

    gradBorder.classList.remove("gradient-border");
  });
});

closeBtn.addEventListener("click", () => {
  storyView.classList.remove("active");
  pauseInterval();
});
