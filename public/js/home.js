import {
  fetchStories,
  fetchUserById,
  fetchUsers,
  updateVisitedStatus,
  updateUserFollowing,
} from "../js/apiFetch.js";

//const usermail = localStorage.getItem("usermail");
const usermail = "thulasi.k@gmail.com";
const userData = await fetchUsers();
let user = userData.find((user) => user.email === usermail);
const username = user.username;

async function receiveStories() {
  const data = await fetchStories();
  const jsonData = [];
  for (const element of data) {
    const {
      id,
      userId,
      imageUrl,
      views,
      isVideo,
      canReply,
      canShare,
      visited,
    } = element;
    const profilePicUrl = await fetchUserById(userId);
    const dataObject = {
      id,
      userId,
      imageUrl,
      views,
      isVideo,
      canReply,
      canShare,
      visited,
      profilePicUrl,
    };
    jsonData.push(dataObject);
  }
  return jsonData;
}

async function receiveSuggestions() {
  const followingIds = Array.isArray(user.following) ? user.following : [];
  const filteredUsers = userData.filter(
    (user) => user.username !== username && !followingIds.includes(user.id)
  );
  return filteredUsers;
}

async function updateFollowing(userId, followUserId) {
  const success = await updateUserFollowing(userId, followUserId);
}

let storyFull = await receiveStories();
let profileSuggestions = await receiveSuggestions();

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
const sideBarLinks = document.querySelector(".link");
const topNavbarLogo = document.querySelector(".top-navbar-logo");
const topNavbarArrayDown = document.querySelector(".top-navbar-array-down");
const topNavbarList = document.querySelector(".top-navbar-list");
const profileSidebarImage = document.querySelector(".profile-sidebar-image");

let CurrentIndex = 0;
let intervalId;
let isPaused = false;
let visitedStories = [];

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
  visitedStories.push(storyFull[CurrentIndex]);
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
      const video = document.createElement("iframe");
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
    storyNewTwo.classList.add(".left-story-dp", "story-transition-enter-left");
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
    storyNew.classList.add(".left-story-dp", "story-transition-enter-left");
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

  if (!storyFull[CurrentIndex].canShare) {
    document.querySelector(".share-icon").style.visibility = "hidden";
  } else {
    document.querySelector(".share-icon").style.visibility = "visible";
  }
  if (!storyFull[CurrentIndex].canReply) {
    document.querySelector(".story-reply-form").style.visibility = "hidden";
  } else {
    document.querySelector(".story-reply-form").style.visibility = "visible";
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
    storyNewRight.classList.add(
      ".left-story-dp",
      "story-transition-enter-left"
    );
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
    storyNewRightTwo.classList.add(
      ".left-story-dp",
      "story-transition-enter-left"
    );
  }
};

const nextStory = () => {
  if (CurrentIndex < storyFull.length - 1) {
    CurrentIndex += 1;
    const currentStoryElement = currentStoryBox.querySelector("img, iframe");
    currentStoryElement.classList.add("story-transition-exit-left");
    currentStoryElement.addEventListener(
      "animationend",
      () => {
        const newCurrentStoryElement =
          currentStoryBox.querySelector("img, iframe");
        newCurrentStoryElement.classList.add(".story-transition-enter-left");
        currentStoryElement.classList.remove("story-transition-exit-left");
        const leftStoryElement = leftStoryBox.querySelector("img, iframe");
        if (leftStoryElement)
          leftStoryElement.classList.add("story-transition-enter-right");
        const rightStoryElement = rightStoryBox.querySelector("img, iframe");
        if (rightStoryElement)
          rightStoryElement.classList.add("story-transition-enter-right");

        updateStoryView();
        resetLikeIcon();
        resetPauseIcon();
        updateProgressBar();
      },
      { once: true }
    );
  }
};

const prevStory = () => {
  if (CurrentIndex > 0) {
    CurrentIndex -= 1;
    const currentStoryElement = currentStoryBox.querySelector("img, iframe");
    currentStoryElement.classList.add("story-transition-exit");
    currentStoryElement.addEventListener(
      "animationend",
      () => {
        const newCurrentStoryElement =
          currentStoryBox.querySelector("img, iframe");
        newCurrentStoryElement.classList.add("story-transition-enter");
        currentStoryElement.classList.remove("story-transition-exit");
        const leftStoryElement = leftStoryBox.querySelector("img, iframe");
        if (leftStoryElement)
          leftStoryElement.classList.add("story-transition-enter");
        const rightStoryElement = rightStoryBox.querySelector("img, iframe");
        if (rightStoryElement)
          rightStoryElement.classList.add("story-transition-enter");

        updateStoryView();
        resetLikeIcon();
        resetPauseIcon();
        updateProgressBar();
      },
      { once: true }
    );
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

topNavbarLogo.addEventListener("click", () => {
  if (
    topNavbarArrayDown.style.display === "none" ||
    topNavbarArrayDown.style.display === ""
  ) {
    topNavbarArrayDown.style.display = "flex";
    topNavbarList.style.display = "block";
  } else {
    topNavbarArrayDown.style.display = "none";
    topNavbarList.style.display = "none";
  }
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
  updateProgressBar();
});

document
  .getElementById("logged-in-dp")
  .setAttribute("src", user.profilePicture);
document.getElementById("logged-in-username").innerHTML = user.username;
document.getElementById("logged-in-fullname").innerHTML = user.fullName;
profileSidebarImage.setAttribute("src", user.profilePicture);

const profileContainer = document.querySelector(".profile-container");
profileSuggestions.forEach((item) => {
  const profileFlex = document.createElement("div");
  profileFlex.classList.add("profile-flex");

  const profile = document.createElement("div");
  profile.classList.add("profile");

  const suggestionsDP = document.createElement("img");
  suggestionsDP.setAttribute("src", item.profilePicture);
  suggestionsDP.setAttribute("alt", "Profile Picture");

  const profileInfo = document.createElement("div");
  profileInfo.classList.add("profile-info");

  const username = document.createElement("strong");
  username.textContent = item.username;

  const profileInfoName = document.createElement("span");
  profileInfoName.classList.add("profile-info-name");
  profileInfoName.textContent = "Suggested for you";

  profileInfo.appendChild(username);
  profileInfo.appendChild(profileInfoName);

  profile.appendChild(suggestionsDP);
  profile.appendChild(profileInfo);

  const switchBtn = document.createElement("div");
  switchBtn.classList.add("switch");
  switchBtn.textContent = "Follow";

  switchBtn.addEventListener("click", () => {
    if (updateFollowing(user.id, item.id)) {
      switchBtn.textContent = "Following";
    }
  });

  profileFlex.appendChild(profile);
  profileFlex.appendChild(switchBtn);

  profileContainer.appendChild(profileFlex);
});

sideBarLinks.addEventListener("click", () => {
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
  processVisitedStories();
});

async function processVisitedStories() {
  for (const elements of visitedStories) {
    try {
      const setVisited = await updateVisitedStatus(elements.id);
    } catch (error) {
      console.error(error);
    }
  }
}
