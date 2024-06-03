import {
  fetchStories,
  fetchUserById,
  fetchUsers,
  fetchCommentsByPostId,
  fetchPosts,
  updateVisitedStatus,
  updateUserFollowing,
  addCommentToPost,
} from "../js/apiFetch.js";

const usermail = localStorage.getItem("usermail");
//const usermail = "thulasi.k@gmail.com";
const userData = await fetchUsers();
let user = userData.find((user) => user.email === usermail);
const username = user.username;
localStorage.setItem("loginUsername", username);

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

async function getUserById(userId){
  const user = await fetchUserById(userId);
  return user;
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
const shareIcon = document.querySelector(".share-icon");
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

const updateStoryView = async () => {
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
  currentStory.visited = true;
  try {
    await updateVisitedStatus(currentStory.id);
  } catch (error) {
    console.error(`Error updating visited status for story ${currentStory.id}:`, error);
  }
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

// shareIcon.addEventListener('click', () => {
//   const existingSharePost = document.querySelector('.sharePost');
//   if (existingSharePost) {
//     existingSharePost.remove();
//   }

//   const sharePostCard = createSharePostCard();
//   document.body.appendChild(sharePostCard);
// });

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
});

async function receivePosts() {
  const data = await fetchPosts();
  const jsonData = [];
  for (const element of data) {
    const {
      id,
      userId,
      imageUrl,
      caption,
      location,
      timestamp,
      likes,
      comments,
      tags,
    } = element;
    const user = await fetchUserById(userId);
    const dataObject = {
      id,
      userId,
      imageUrl,
      caption,
      location,
      timestamp,
      likes,
      comments,
      tags,
      user,
    };
    jsonData.push(dataObject);
  }
  return jsonData;
}

async function receiveComments(postId) {
  const data = await fetchCommentsByPostId(postId);
  const jsonData = [];
  for (const element of data) {
    const { id, postId, userId, text, timestamp } = element;
    const commentUser = await fetchUserById(userId);
    const dataObject = {
      id,
      postId,
      userId,
      text,
      timestamp,
      commentUser,
    };
    jsonData.push(dataObject);
  }
  return jsonData;
}

async function addComment(postId, userId, text) {
  const newComment = await addCommentToPost(postId, userId, text);
}

const following = (element) => {
  if (element.textContent.trim() === "Follow") {
    element.textContent = "Following";
  } else if (element.textContent.trim() === "Following") {
    document.getElementById("suggest-card").style.display = "block";
    document.getElementById("overlay").style.display = "block";
  }
};

function cancel() {
  document.getElementById("suggest-card").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

const unfollow = () => {
  const unfollowButton = document.querySelector(".suggest-follow");
  console.log(unfollowButton.textContent.trim());
  if (unfollowButton.textContent.trim() == "Following") {
    unfollowButton.textContent = "Follow";
  }
  document.getElementById("suggest-card").style.display = "none";
  document.getElementById("overlay").style.display = "none";
};

//-----------------
const suggestionFull = await receiveSuggestions();

const suggestionContainer = document.querySelectorAll(".suggestion");
let currentFollowButton = null;

suggestionFull.forEach((elements) => {
  const suggestDiv = document.createElement("div");
  suggestDiv.classList.add("suggest");

  const suggestionCard = document.createElement("div");
  suggestionCard.classList.add("suggestion-card");

  const suggestCross = document.createElement("div");
  suggestCross.classList.add("suggest-cross");
  suggestCross.innerHTML = '<i class="bi bi-x-lg"></i>';
  suggestCross.addEventListener("click", () => {
    suggestDiv.remove();
  });

  const details = document.createElement("div");
  details.classList.add("details");

  const img1 = document.createElement("img");
  img1.setAttribute("src", elements.profilePicture);
  img1.style.height = "5rem";
  img1.style.width = "5rem";

  const detailName = document.createElement("p");
  detailName.classList.add("detail-name");
  detailName.textContent = elements.username;

  let followUserDetails;
  elements.followers.forEach((element)=> {
    followUserDetails = userData.find((followUserDetails) => followUserDetails.id === element);
  });

  const followedBy=document.createElement("p");
  followedBy.classList.add("detail-by");
  followedBy.textContent="Followed by";
  const detailBy = document.createElement("p");
  detailBy.classList.add("detail-by");
  detailBy.textContent = followUserDetails.username;

  const img2 = document.createElement("img");
  img2.setAttribute("src", followUserDetails.profilePicture);
  img2.style.height = "1.25rem";
  img2.style.width = "1.25rem";

  const followButton = document.createElement("div");
  followButton.classList.add("suggest-follow");
  followButton.textContent = "Follow";
  followButton.addEventListener("click", () => {
    following(followButton);
    updateFollowing(user.id, elements.id);
  });

  details.appendChild(img1);
  details.appendChild(detailName);
  details.appendChild(followedBy);
  details.appendChild(detailBy);
  details.appendChild(img2);

  suggestionCard.appendChild(suggestCross);
  suggestionCard.appendChild(details);

  suggestDiv.appendChild(suggestionCard);
  suggestDiv.appendChild(document.createElement("hr"));
  suggestDiv.appendChild(followButton);

  suggestionContainer.forEach((container) => container.appendChild(suggestDiv));
});
//----------------------
const createExtraOptionCard = () => {
  document.getElementById("overlay").style.display = "block";
  const extraOption = document.createElement("div");
  extraOption.classList.add("extraOption");

  const options = [
    { class: "divRed", text: "Report" },
    { class: "divRed", text: "Unfollow" },
    { class: "divElement", text: "Add to favourites" },
    { class: "divElement", text: "Go to post" },
    { class: "divElement", text: "Share to..." },
    { class: "divElement", text: "Copy link" },
    { class: "divElement", text: "Embed" },
    { class: "divElement", text: "About this account" },
    { class: "divElement", text: "Cancel" },
  ];

  options.forEach((option) => {
    const optionDiv = document.createElement("div");
    optionDiv.classList.add(option.class);
    optionDiv.textContent = option.text;
    extraOption.appendChild(optionDiv);

    if (option.text !== "Cancel") {
      const hr = document.createElement("hr");
      extraOption.appendChild(hr);
    } else {
      optionDiv.addEventListener("click", () => {
        extraOption.remove();
        document.getElementById("overlay").style.display = "none";
      });
    }
    if (option.text === "Share to...") {
      optionDiv.addEventListener("click", () => {
        extraOption.remove();
        document.getElementById("shareTo").style.display = "block";
      });
    }
  });

  return extraOption;
};

//----------------------

function getCommentPage(element) {
  const commentPage = document.createElement("div");
  commentPage.classList.add("commentPage");

  const commentClose = document.createElement("div");
  commentClose.classList.add("commentClose");
  commentClose.style.cursor = "pointer";
  commentClose.innerHTML = '<i class="bi bi-x-lg"></i>';
  commentClose.addEventListener("click", () => {
    commentPage.remove();
  });

  const postComments = document.createElement("div");
  postComments.classList.add("postComments");

  const postContent = document.createElement("div");
  postContent.classList.add("postContent");

  const postContentImg = document.createElement("img");
  postContentImg.setAttribute("src", element.imageUrl);
  postContent.appendChild(postContentImg);

  const commentContent = document.createElement("div");
  commentContent.classList.add("commentContent");

  const commentIntro = document.createElement("div");
  commentIntro.classList.add("commentIntro");

  const commentIntroProfile = document.createElement("div");
  commentIntroProfile.classList.add("commentIntroProfile");

  const commentIntroImg = document.createElement("img");
  commentIntroImg.setAttribute("src", element.user.profilePicture);
  commentIntroImg.style.cursor = "pointer";
  commentIntroProfile.appendChild(commentIntroImg);

  const commentIntroName = document.createElement("div");
  commentIntroName.classList.add("commentIntroName");
  commentIntroName.textContent = element.user.username;
  commentIntroName.style.cursor = "pointer";
  commentIntroProfile.appendChild(commentIntroName);

  const commentIntroIcon = document.createElement("i");
  commentIntroIcon.classList.add("fas", "fa-ellipsis-h", "dots");
  commentIntroIcon.setAttribute("title", "More Options");
  commentIntroIcon.style.paddingTop = "1.4375rem";
  commentIntroIcon.style.marginRight = "5%";
  commentIntroIcon.style.cursor = "pointer";

  commentIntroIcon.addEventListener("click", () => {
    const existingCard = document.querySelector(".extraOption");
    if (existingCard) {
      existingCard.remove();
    }

    const extraOptionCard = createExtraOptionCard();
    document.body.appendChild(extraOptionCard);
  });

  commentIntro.appendChild(commentIntroProfile);
  commentIntro.appendChild(commentIntroIcon);

  const commentPageContent = document.createElement("div");
  commentPageContent.classList.add("commentPageContent");

  const commentDetails = document.createElement("div");
  commentDetails.classList.add("commentDetails");

  const commentIcons = document.createElement("div");
  commentIcons.classList.add("commentIcons");

  const commentIconsLeft = document.createElement("div");
  commentIconsLeft.classList.add("commentIconsLeft");
  const commentIconsRight = document.createElement("div");
  commentIconsRight.classList.add("commentIconsRight");

  const heartIcon = document.createElement("i");
  heartIcon.classList.add("bi", "bi-heart", "comment-icon", "thicker-icon");
  heartIcon.setAttribute("id", "heart-icon");
  heartIcon.setAttribute("title", "Like");

  let numLikes = parseInt(element.likes);
  heartIcon.addEventListener("click", function () {
    if (heartIcon.classList.contains("bi-heart")) {
      heartIcon.classList.remove("bi-heart");
      heartIcon.classList.add("bi-heart-fill");
      heartIcon.style.color = "rgba(193,42,42,1)";
      heartIcon.setAttribute("title", "Unlike");
      element.numLikes += 1;
    } else {
      heartIcon.classList.remove("bi-heart-fill");
      heartIcon.classList.add("bi-heart");
      heartIcon.style.color = "";
      heartIcon.setAttribute("title", "Like");
      element.numLikes -= 1;
    }

    likes.textContent = `${element.numLikes} likes`;
  });

  const chatIcon = document.createElement("i");
  chatIcon.classList.add("bi", "bi-chat", "comment-icon", "thicker-icon");
  chatIcon.style.transform = "scaleX(-1)";
  chatIcon.setAttribute("title", "Comment");

  const sendIcon = document.createElement("i");
  sendIcon.classList.add("bi", "bi-send", "comment-icon", "thicker-icon");
  sendIcon.setAttribute("title", "Share Post");

  sendIcon.addEventListener("click", () => {
    const existingSharePost = document.querySelector(".sharePost");
    if (existingSharePost) {
      existingSharePost.remove();
    }

    const sharePostCard = createSharePostCard();
    document.body.appendChild(sharePostCard);
  });

  commentIconsLeft.appendChild(heartIcon);
  commentIconsLeft.appendChild(chatIcon);
  commentIconsLeft.appendChild(sendIcon);

  const bookmarkIcon = document.createElement("i");
  bookmarkIcon.classList.add(
    "bi",
    "bi-bookmark",
    "comment-icon",
    "thicker-icon"
  );
  bookmarkIcon.setAttribute("id", "bookmark-icon");
  bookmarkIcon.setAttribute("title", "Save");
  bookmarkIcon.addEventListener("click", function () {
    if (bookmarkIcon.classList.contains("bi-bookmark")) {
      bookmarkIcon.classList.remove("bi-bookmark");
      bookmarkIcon.classList.add("bi-bookmark-fill");
      bookmarkIcon.style.color = "rgb(0,0,0)";
      bookmarkIcon.setAttribute("title", "Remove");
    } else {
      bookmarkIcon.classList.remove("bi-bookmark-fill");
      bookmarkIcon.classList.add("bi-bookmark");
      bookmarkIcon.style.color = "";
      bookmarkIcon.setAttribute("title", "Save");
    }
  });

  commentIconsRight.appendChild(bookmarkIcon);

  commentIcons.appendChild(commentIconsLeft);
  commentIcons.appendChild(commentIconsRight);

  const likes = document.createElement("div");
  likes.classList.add("likeNo");
  likes.textContent = element.likes;

  const postTime = document.createElement("p");
  postTime.classList.add("postTime");
  postTime.textContent = "3 days ago";

  commentDetails.appendChild(commentIcons);
  commentDetails.appendChild(likes);
  commentDetails.appendChild(postTime);
  commentDetails.style.marginLeft = "20px";

  const commentAdd = document.createElement("div");
  commentAdd.classList.add("commentAdd");

  const commentAddFirst = document.createElement("div");
  commentAddFirst.classList.add("commentAddFirst");

  const smileyIcon = document.createElement("i");
  smileyIcon.classList.add("fa-regular", "fa-face-smile", "fa-xs");
  smileyIcon.setAttribute("title", "Emoji");
  smileyIcon.style.color = "black";
  smileyIcon.style.padding = "0.9375rem";
  smileyIcon.style.fontSize = "1.4375rem";
  smileyIcon.style.cursor = "pointer";

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.placeholder = "Add a comment...";
  inputField.style.fontSize = "0.875rem";

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Post";
  submitButton.addEventListener("click", function () {
    const addNewComment = addComment(element.id, user.id, inputField.value);
    inputField.value = "";
  });

  submitButton.style.backgroundColor = "";
  submitButton.style.color = "";

  inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      // Prevent the default action (form submission)
      event.preventDefault();

      // Trigger the click event on the submit button
      submitButton.click();
    }
  });

  inputField.addEventListener("input", function () {
    if (inputField.value.trim().length > 0) {
      submitButton.style.backgroundColor = "#1ca6ec";
      submitButton.style.color = "white";
    } else {
      submitButton.style.backgroundColor = "";
      submitButton.style.color = "";
    }
  });

  commentAddFirst.appendChild(smileyIcon);
  commentAddFirst.appendChild(inputField);
  commentAdd.appendChild(commentAddFirst);
  commentAdd.appendChild(submitButton);

  commentContent.appendChild(commentIntro);
  commentContent.appendChild(commentPageContent);
  commentContent.appendChild(commentDetails);
  commentContent.appendChild(commentAdd);

  postComments.appendChild(postContent);
  postComments.appendChild(commentContent);

  commentPage.appendChild(commentClose);
  commentPage.appendChild(postComments);

  document.body.appendChild(commentPage);
  (async () => {
    let commentFull = await receiveComments(element.id);

    commentFull.forEach((element) => {
      const commentContainer = document.createElement("div");
      commentContainer.className = "commentPageComment";

      const commentMoreDetails = document.createElement("div");
      commentMoreDetails.className = "commentMoreDetails";

      const commentPageProfile = document.createElement("div");
      commentPageProfile.className = "commentPageProfile";

      const profileImage = document.createElement("img");
      profileImage.setAttribute("src", element.commentUser.profilePicture);

      commentPageProfile.appendChild(profileImage);

      const commentMoreInfo = document.createElement("div");
      commentMoreInfo.className = "commentMoreInfo";

      const commentOwner = document.createElement("div");
      commentOwner.className = "commentOwner";

      const commentOwnerParagraph = document.createElement("p");
      const commentOwnerSpan = document.createElement("span");
      commentOwnerSpan.textContent = element.commentUser.username;
      commentOwnerParagraph.appendChild(commentOwnerSpan);
      commentOwnerParagraph.appendChild(
        document.createTextNode(` ${element.text}`)
      );

      commentOwner.appendChild(commentOwnerParagraph);

      const commentInfo = document.createElement("div");
      commentInfo.className = "commentInfo";

      const commentDay = document.createElement("div");
      commentDay.className = "commentDay";
      commentDay.textContent = "1d";

      const commentLikeNo = document.createElement("div");
      commentLikeNo.className = "commentLikeNo";
      commentLikeNo.textContent = "2 likes";

      const commentReply = document.createElement("div");
      commentReply.className = "reply";
      commentReply.textContent = "Reply";

      const postOptions = document.createElement("i");
      postOptions.classList.add("fas", "fa-ellipsis-h", "dots");
      postOptions.setAttribute("title", "More Options");
      postOptions.style.cursor = "pointer";

      commentInfo.appendChild(commentDay);
      commentInfo.appendChild(commentLikeNo);
      commentInfo.appendChild(commentReply);
      commentInfo.appendChild(postOptions);

      const viewReplies = document.createElement("div");
      viewReplies.className = "viewReplies";

      const lineIcon = document.createElement("i");
      lineIcon.classList.add("bi", "bi-dash-lg");

      viewReplies.appendChild(lineIcon);
      const textNode = document.createTextNode(" View replies (12)");
      viewReplies.appendChild(textNode);

      commentMoreInfo.appendChild(commentOwner);
      commentMoreInfo.appendChild(commentInfo);
      commentMoreInfo.appendChild(viewReplies);

      commentMoreDetails.appendChild(commentPageProfile);
      commentMoreDetails.appendChild(commentMoreInfo);

      const commentLikeIcon = document.createElement("div");
      commentLikeIcon.className = "commentLikeIcon";

      const likeIcon = document.createElement("i");
      likeIcon.classList.add("bi", "bi-heart", "post-icon");
      likeIcon.setAttribute("id", "heart-icon");
      likeIcon.setAttribute("title", "Like");
      let numLikes = 2;
      likeIcon.addEventListener("click", function () {
        if (likeIcon.classList.contains("bi-heart")) {
          likeIcon.classList.remove("bi-heart");
          likeIcon.classList.add("bi-heart-fill");
          likeIcon.style.color = "rgba(193,42,42,1)";
          likeIcon.setAttribute("title", "Unlike");
          numLikes += 1;
        } else {
          likeIcon.classList.remove("bi-heart-fill");
          likeIcon.classList.add("bi-heart");
          likeIcon.style.color = "";
          likeIcon.setAttribute("title", "Like");
          numLikes -= 1;
        }
        commentLikeNo.textContent = numLikes + " likes";
      });

      commentLikeIcon.appendChild(likeIcon);

      commentContainer.appendChild(commentMoreDetails);
      commentContainer.appendChild(commentLikeIcon);

      commentPageContent.appendChild(commentContainer);
    });
  })();
}
// ---------------------
const createSharePostCard = () => {
  document.getElementById("overlay").style.display = "block";
  const sharePost = document.createElement("div");
  sharePost.classList.add("sharePost");

  const closeButton = document.createElement("i");
  closeButton.classList.add("bi", "bi-x-lg", "thicker-icon");
  closeButton.addEventListener("click", () => {
    sharePost.remove();
    document.getElementById("overlay").style.display = "none";
  });
  sharePost.appendChild(closeButton);

  const shareTitle = document.createElement("div");
  shareTitle.classList.add("shareTitle");
  shareTitle.textContent = "Share";
  sharePost.appendChild(shareTitle);

  const hr = document.createElement("hr");
  sharePost.appendChild(hr);

  const toContainer = document.createElement("div");
  toContainer.classList.add("to");

  const toLabel = document.createElement("p");
  toLabel.textContent = "To:";
  toContainer.appendChild(toLabel);

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search...";
  toContainer.appendChild(searchInput);

  sharePost.appendChild(toContainer);
  const hr1 = document.createElement("hr");
  sharePost.appendChild(hr1);

  const chooseAccount = document.createElement("div");
  chooseAccount.classList.add("chooseAccount");
  sharePost.appendChild(chooseAccount);

  chooseAccount.addEventListener("click", () => {
    sendButton.style.opacity = "1";
  });

  const hr2 = document.createElement("hr");
  sharePost.appendChild(hr2);

  const shareSend = document.createElement("div");
  shareSend.classList.add("share-send");

  const sendButton = document.createElement("button");
  sendButton.type = "button";
  sendButton.textContent = "Send";

  sendButton.addEventListener("click", () => {
    if (sendButton.style.opacity == "1") {
      document.getElementById("overlay").style.display = "none";

      sharePost.remove();
    }
  });

  shareSend.appendChild(sendButton);
  sharePost.appendChild(shareSend);

  return sharePost;
};

//------------------

let postFull = await receivePosts();

const postContainer = document.querySelector(".post-container");

postFull.forEach((element) => {
  const postDiv = document.createElement("div");
  postDiv.classList.add("post");

  // Post Header
  const postHeader = document.createElement("div");
  postHeader.classList.add("post-header");

  const postDetail = document.createElement("div");
  postDetail.classList.add("post-detail");

  const profileImg = document.createElement("img");
  profileImg.setAttribute("src", element.user.profilePicture);

  const username = document.createElement("p");
  username.textContent = element.user.username;

  const postTime = document.createElement("ul");
  const postTimeItem = document.createElement("li");
  postTimeItem.textContent = element.timestamp;
  postTime.appendChild(postTimeItem);

  postDetail.appendChild(profileImg);
  postDetail.appendChild(username);
  postDetail.appendChild(postTime);

  const postOptions = document.createElement("i");
  postOptions.classList.add("fas", "fa-ellipsis-h", "dots");
  postOptions.setAttribute("title", "More Options");
  postOptions.style.cursor = "pointer";

  postOptions.addEventListener("click", () => {
    const existingCard = document.querySelector(".extraOption");
    if (existingCard) {
      existingCard.remove();
    }

    const extraOptionCard = createExtraOptionCard();
    document.body.appendChild(extraOptionCard);
  });

  postHeader.appendChild(postDetail);
  postHeader.appendChild(postOptions);

  // Post Content
  const postContent = document.createElement("div");
  postContent.classList.add("post-content");

  const postImg = document.createElement("img");
  postImg.setAttribute("src", element.imageUrl);

  postContent.appendChild(postImg);

  // Post Icons
  const postIcons = document.createElement("div");
  postIcons.classList.add("post-icons");

  const leftIcons = document.createElement("div");
  leftIcons.classList.add("left-icons");

  const heartIcon = document.createElement("i");
  heartIcon.classList.add("bi", "bi-heart", "post-icon", "thicker-icon");
  heartIcon.setAttribute("id", "heart-icon");
  heartIcon.setAttribute("title", "Like");
  let numLikes = parseInt(element.likes);
  console.log(typeof numLikes);
  heartIcon.addEventListener("click", function () {
    if (heartIcon.classList.contains("bi-heart")) {
      heartIcon.classList.remove("bi-heart");
      heartIcon.classList.add("bi-heart-fill");
      heartIcon.style.color = "rgba(193,42,42,1)";
      heartIcon.setAttribute("title", "Unlike");
      numLikes += 1;
    } else {
      heartIcon.classList.remove("bi-heart-fill");
      heartIcon.classList.add("bi-heart");
      heartIcon.style.color = "";
      heartIcon.setAttribute("title", "Like");
      numLikes -= 1;
    }
    likes.textContent = `${numLikes} likes`;
  });

  const chatIcon = document.createElement("i");
  chatIcon.classList.add("bi", "bi-chat", "post-icon", "thicker-icon");
  chatIcon.style.transform = "scaleX(-1)";
  chatIcon.setAttribute("title", "Comment");

  chatIcon.addEventListener("click", function () {
    getCommentPage(element);
  });

  const sendIcon = document.createElement("i");
  sendIcon.classList.add("bi", "bi-send", "post-icon", "thicker-icon");
  sendIcon.setAttribute("title", "Share Post");

  sendIcon.addEventListener("click", () => {
    const existingSharePost = document.querySelector(".sharePost");
    if (existingSharePost) {
      existingSharePost.remove();
    }

    const sharePostCard = createSharePostCard();
    document.body.appendChild(sharePostCard);
  });

  leftIcons.appendChild(heartIcon);
  leftIcons.appendChild(chatIcon);
  leftIcons.appendChild(sendIcon);

  const leftEnd = document.createElement("div");
  leftEnd.classList.add("left-end");

  const bookmarkIcon = document.createElement("i");
  bookmarkIcon.classList.add("bi", "bi-bookmark", "post-icon", "thicker-icon");
  bookmarkIcon.setAttribute("id", "bookmark-icon");
  bookmarkIcon.setAttribute("title", "Save");
  bookmarkIcon.addEventListener("click", function () {
    if (bookmarkIcon.classList.contains("bi-bookmark")) {
      bookmarkIcon.classList.remove("bi-bookmark");
      bookmarkIcon.classList.add("bi-bookmark-fill");
      bookmarkIcon.style.color = "rgb(0,0,0)";
      bookmarkIcon.setAttribute("title", "Remove");
    } else {
      bookmarkIcon.classList.remove("bi-bookmark-fill");
      bookmarkIcon.classList.add("bi-bookmark");
      bookmarkIcon.style.color = "";
      bookmarkIcon.setAttribute("title", "Save");
    }
  });

  leftEnd.appendChild(bookmarkIcon);

  postIcons.appendChild(leftIcons);
  postIcons.appendChild(leftEnd);

  // Post Likes
  const likes = document.createElement("p");
  likes.classList.add("likes");
  likes.textContent = element.likes + " likes";

  // Post Caption
  const caption = document.createElement("p");
  caption.classList.add("caption");

  const captionUser = document.createElement("span");
  captionUser.textContent = element.user.username;

  const captionText = document.createTextNode(` ${element.caption}`);

  caption.appendChild(captionUser);
  caption.appendChild(captionText);

  // Post Translation
  const translation = document.createElement("p");
  translation.classList.add("translation");
  translation.textContent = "See translation";

  // Post Comments Link
  const commentsLink = document.createElement("a");
  commentsLink.classList.add("comments");
  commentsLink.setAttribute("href", "#");
  commentsLink.textContent = "View all comments";
  commentsLink.addEventListener("click", function () {
    getCommentPage(element);
  });

  // Post Add Comment Section
  const commentSmiley = document.createElement("div");
  commentSmiley.classList.add("comment-smiley");

  const addComment = document.createElement("input");
  addComment.classList.add("addComment");
  addComment.type = "text";
  addComment.placeholder = "Add a comment...";

  const smileyIcon = document.createElement("i");
  smileyIcon.classList.add("fa-regular", "fa-face-smile", "fa-xs");
  smileyIcon.style.color = "#878c94";
  smileyIcon.style.paddingTop = "1.063rem";
  smileyIcon.setAttribute("title", "Emoji");
  smileyIcon.style.cursor = "pointer";

  commentSmiley.appendChild(addComment);
  commentSmiley.appendChild(smileyIcon);

  const hr = document.createElement("hr");

  // Append everything to the postDiv
  postDiv.appendChild(postHeader);
  postDiv.appendChild(postContent);
  postDiv.appendChild(postIcons);
  postDiv.appendChild(likes);
  postDiv.appendChild(caption);
  postDiv.appendChild(translation);
  postDiv.appendChild(commentsLink);
  postDiv.appendChild(commentSmiley);
  postDiv.appendChild(hr);

  // Append postDiv to postContainer
  postContainer.appendChild(postDiv);
});
