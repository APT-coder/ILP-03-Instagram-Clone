import { fetchUsers, fetchPosts, fetchComments } from "../js/apiFetch.js";

async function receiveUserData() {
  const data = await fetchUsers();
  const jsonData = [];
  for (const element of data) {
    const {
      id,
      username,
      fullName,
      profilePicture,
      bio,
      followers,
      following,
      posts,
      storyHighlights,
      savedPosts,
      taggedPosts,
    } = element;
    const dataObject = {
      id,
      username,
      fullName,
      profilePicture,
      bio,
      followers,
      following,
      posts,
      storyHighlights,
      savedPosts,
      taggedPosts,
    };
    jsonData.push(dataObject);
  }
  return jsonData;
}

async function recievePostData() {
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
    };
    jsonData.push(dataObject);
  }
  return jsonData;
}

async function recieveCommentData() {
  const data = await fetchComments();
  const jsonData = [];
  for (const element of data) {
    const { id, postId, userId, text, timestamp } = element;
    const dataObject = { id, postId, userId, text, timestamp };
    jsonData.push(dataObject);
  }
  return jsonData;
}

let userDetails = await receiveUserData();
let postDetails = await recievePostData();
let commentDetails = await recieveCommentData();
const username = localStorage.getItem("username");
const result = findUserByUsername(username);

function findUserByUsername(username) {
  for (let i = 0; i < userDetails.length; i++) {
    if (userDetails[i].username === username) {
      return i;
    }
  }
  return null;
}

// // profile container fetch
document.getElementById("profile-pic").src = userDetails[result].profilePicture;
document.getElementById("username").textContent = userDetails[result].username;
document.getElementById("bio").textContent = userDetails[result].bio;
document.getElementById("posts-count").textContent =
  userDetails[result].posts.length;
document.getElementById("followers-count").textContent =
  userDetails[result].followers.length;
document.getElementById("following-count").textContent =
  userDetails[result].following.length;
document.getElementById("name").textContent = userDetails[result].fullName;
document.getElementById("name").classList.add("fw-600");
document.getElementById("title").textContent = userDetails[result].username;

// Story highlight fetch

const storyHighlightsContainer = document.getElementById("story-highlights");
const storyHighlights = userDetails[result].storyHighlights;
const storyWrapper = document.createElement("div");
storyWrapper.className = "d-flex";

storyHighlights.forEach((story) => {
  const storyDiv = document.createElement("div");
  storyDiv.className = "story-highlight";
  const storyImg = document.createElement("img");
  storyImg.src = story.image;
  storyImg.alt = story.name;
  const highlightName = document.createElement("span");
  highlightName.className = "highlight-name";
  highlightName.textContent = story.name;
  highlightName.classList.add("fw-600");
  storyDiv.appendChild(storyImg);
  storyDiv.appendChild(highlightName);
  storyWrapper.appendChild(storyDiv);
});
storyHighlightsContainer.appendChild(storyWrapper);

// Scroll functionality
const scrollAmount = 300;
const scrollDuration = 400;

function smoothScroll(element, amount, duration) {
  const start = element.scrollLeft;
  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    element.scrollLeft = start + amount * progress;
    if (elapsedTime < duration) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}

document
  .querySelector(".carousel-control-prev")
  .addEventListener("click", () => {
    smoothScroll(storyHighlightsContainer, -scrollAmount, scrollDuration);
  });

document
  .querySelector(".carousel-control-next")
  .addEventListener("click", () => {
    smoothScroll(storyHighlightsContainer, scrollAmount, scrollDuration);
  });

// Load posts on initial page load
loadPosts(postDetails);
showSection("posts");

// Add event listeners for menu links
document.getElementById("posts-link").addEventListener("click", (event) => {
  event.preventDefault();
  showSection("posts");
  loadPosts(postDetails);
});

document.getElementById("saved-link").addEventListener("click", (event) => {
  event.preventDefault();
  showSection("saved");
  loadSavedPosts(userDetails[result].savedPosts);
});

document.getElementById("tagged-link").addEventListener("click", (event) => {
  event.preventDefault();
  showSection("tagged");
  loadTaggedPosts(userDetails[result].taggedPosts);
});

//   nav link to sub menu
document
  .getElementById("posts-link-icon")
  .addEventListener("click", (event) => {
    event.preventDefault();
    showSectionIcon("posts");
    loadPosts(postDetails);
  });

document
  .getElementById("saved-link-icon")
  .addEventListener("click", (event) => {
    event.preventDefault();
    showSectionIcon("saved");
    loadSavedPosts(userDetails[result].savedPosts);
  });

document
  .getElementById("tagged-link-icon")
  .addEventListener("click", (event) => {
    event.preventDefault();
    showSectionIcon("tagged");
    loadTaggedPosts(userDetails[result].taggedPosts);
  });

function showSection(section) {
  const sections = ["posts", "saved", "tagged"];
  sections.forEach((s) => {
    document.getElementById(`${s}-link`).classList.remove("active");
  });

  document.getElementById(`${section}-link`).classList.add("active");
}

function showSectionIcon(section) {
  const sections = ["posts", "saved", "tagged"];
  sections.forEach((s) => {
    document.getElementById(`${s}-link-icon`).classList.remove("active");
  });

  document.getElementById(`${section}-link-icon`).classList.add("active");
}

function loadPosts(posts) {
  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = "";

  posts.forEach((post) => {
    for(let i=0; i<userDetails[result].posts.length; i++){
      if (userDetails[result].posts[i] === post.id) {
        const colDiv = document.createElement("div");
        colDiv.classList.add("col-4", "post");
  
        const img = document.createElement("img");
        img.src = post.imageUrl;
        img.alt = post.caption;
        img.className = "img-fluid";
        const overlay = document.createElement("div");
        overlay.className = "overlay";
        const likes = document.createElement("div");
        likes.className = "likes";
        likes.innerHTML = `<i class="fas fa-heart"></i> ${post.likes.length}`;
        const comments = document.createElement("div");
        comments.className = "comments";
        comments.innerHTML = `<i class="fas fa-comment"></i> ${post.comments.length}`;
        overlay.appendChild(likes);
        overlay.appendChild(comments);
        colDiv.appendChild(img);
        colDiv.appendChild(overlay);
        postsContainer.appendChild(colDiv);
        console.log(post.id);
        colDiv.addEventListener("click", (event) => {
          event.preventDefault();
          try {
            openModal(post);
          } catch (error) {
            console.error("Error opening modal:", error);
          }
        });
      }
    }
   
  });
}

function loadSavedPosts(savedPosts) {
  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = "";

  for (let i = 0; i < savedPosts.length; i++) {
    for (let j = 0; j < postDetails.length; j++) {
      if (savedPosts[i] == postDetails[j].id) {
        const colDiv = document.createElement("div");
        colDiv.classList.add("col-4", "mg-1", "post");

        const img = document.createElement("img");
        img.src = postDetails[j].imageUrl;
        img.alt = postDetails[j].caption;
        img.className = "img-fluid";

        const overlay = document.createElement("div");
        overlay.className = "overlay";
        const likes = document.createElement("div");
        likes.className = "likes";
        likes.innerHTML = `<i class="fas fa-heart"></i> ${postDetails[j].likes.length}`;
        const comments = document.createElement("div");
        comments.className = "comments";
        comments.innerHTML = `<i class="fas fa-comment"></i> ${postDetails[j].comments.length}`;
        overlay.appendChild(likes);
        overlay.appendChild(comments);
        colDiv.appendChild(img);
        colDiv.appendChild(overlay);

        colDiv.addEventListener("click", (event) => {
          event.preventDefault();
          try {
            openModalSaved(postDetails[j]);
          } catch (error) {
            console.error("Error opening modal:", error);
          }
        });

        postsContainer.appendChild(colDiv);
      }
    }
  }
}

function loadTaggedPosts(taggedPosts) {
  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = "";

  for (let i = 0; i < taggedPosts.length; i++) {
    for (let j = 0; j < postDetails.length; j++) {
      if (taggedPosts[i] == postDetails[j].id) {
        const colDiv = document.createElement("div");
        colDiv.classList.add("col-4", "mg-1", "post");

        const img = document.createElement("img");
        img.src = postDetails[j].imageUrl;
        img.alt = postDetails[j].caption;
        img.className = "img-fluid";

        const overlay = document.createElement("div");
        overlay.className = "overlay";
        const likes = document.createElement("div");
        likes.className = "likes";
        likes.innerHTML = `<i class="fas fa-heart"></i> ${postDetails[j].likes.length}`;
        const comments = document.createElement("div");
        comments.className = "comments";
        comments.innerHTML = `<i class="fas fa-comment"></i> ${postDetails[j].comments.length}`;
        overlay.appendChild(likes);
        overlay.appendChild(comments);
        colDiv.appendChild(img);
        colDiv.appendChild(overlay);

        colDiv.addEventListener("click", (event) => {
          event.preventDefault();
          try {
            openModalTagged(postDetails[j]);
          } catch (error) {
            console.error("Error opening modal:", error);
          }
        });

        postsContainer.appendChild(colDiv);
      }
    }
  }
}

function openModal(post) {
  const postElement = document.getElementById("modal-post-image");
  postElement.src = post.imageUrl;

  if (postElement.height > postElement.width) {
    postElement.style.width = "70%";
  }
  document.getElementById("modal-profile-picture").src =
    userDetails[result].profilePicture;
  document.getElementById("modal-profile-picture-comments").src =
    userDetails[result].profilePicture;
  document.getElementById("modal-username").textContent =
    userDetails[result].username;
  document.getElementById("comment-section-username").textContent =
    userDetails[result].username;
  document.getElementById("modal-post-caption").textContent = post.caption;
  document.getElementById("liked-by-username").textContent =
    userDetails[result].username;
  let count = post.likes.length + 1;
  const likeCountElement = document.getElementById("like-count");
  likeCountElement.textContent = count;

  const likeButton = document.getElementById("modal-like-button");

  // Remove previous event listeners
  const newLikeButton = likeButton.cloneNode(true);
  likeButton.parentNode.replaceChild(newLikeButton, likeButton);

  // Add new event listener
  newLikeButton.addEventListener("click", function () {
    this.classList.toggle("liked");
    this.classList.toggle("far");
    this.classList.toggle("fas");
    if (this.classList.contains("liked")) {
      count++;
    } else {
      count--;
    }
    likeCountElement.textContent = count;
  });

  document.getElementById("post-date").textContent = post.timestamp;

  const hashTags = document.getElementById("hashTags");
  hashTags.innerHTML = "";

  for (let i = 0; i < post.tags.length; i++) {
    const tagSpan = document.createElement("span");
    tagSpan.classList.add("mr-1", "text-primary");
    console.log(post.tags[i]);
    tagSpan.textContent = post.tags[i];
    hashTags.appendChild(tagSpan);
  }

  const commentSection = document.getElementById("user-comments");
  commentSection.innerHTML = "";
  for (let i = 0; i < post.comments.length; i++) {
    let commentId = post.comments[i];
    let commentedUserId = commentDetails[i].userId;
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("my-2");
    const img = document.createElement("img");
    const commentedUsername = document.createElement("a");

    commentedUsername.href = "./userProfile.html";
    commentedUsername.addEventListener("click", function () {
      localStorage.setItem("username", userDetails[commentedUserId].username);
    });

    const comment = document.createElement("span");
    comment.classList.add("fs-14");
    commentedUsername.classList.add("fw-600", "fs-14", "mr-1");
    img.classList.add("profile-picture-size", "rounded-circle", "mr-3");
    img.src = userDetails[commentedUserId].profilePicture;
    commentedUsername.textContent = userDetails[commentedUserId].username;
    comment.textContent = commentDetails[commentId].text;
    const commentReply = document.createElement("p");
    commentReply.classList.add("text-muted", "fs-12", "ml-5", "pl-2");
    commentReply.textContent = "1w Reply";
    commentDiv.appendChild(img);
    commentDiv.appendChild(commentedUsername);
    commentDiv.appendChild(comment);
    commentDiv.appendChild(commentReply);
    commentSection.appendChild(commentDiv);
  }

  $("#postModal").modal("show");
}

function openModalSaved(post) {
  const postElement = document.getElementById("modal-post-image");
  postElement.src = post.imageUrl;

  if (postElement.height > postElement.width) {
    postElement.style.width = "70%";
  }
  document.getElementById("modal-profile-picture").src =
    userDetails[post.userId - 1].profilePicture;
  document.getElementById("modal-profile-picture-comments").src =
    userDetails[post.userId - 1].profilePicture;
  document.getElementById("modal-username").textContent =
    userDetails[post.userId - 1].username;
  document.getElementById("comment-section-username").textContent =
    userDetails[post.userId - 1].username;
  document.getElementById("modal-post-caption").textContent = post.caption;
  document.getElementById("liked-by-username").textContent = "thezahidx";
  let count = post.likes.length;
  const likeCountElement = document.getElementById("like-count");
  likeCountElement.textContent = count;

  const likeButton = document.getElementById("modal-like-button");

  // Remove previous event listeners
  const newLikeButton = likeButton.cloneNode(true);
  likeButton.parentNode.replaceChild(newLikeButton, likeButton);

  // Add new event listener
  newLikeButton.addEventListener("click", function () {
    this.classList.toggle("liked");
    this.classList.toggle("far");
    this.classList.toggle("fas");
    if (this.classList.contains("liked")) {
      count++;
    } else {
      count--;
    }
    likeCountElement.textContent = count;
  });
  document.getElementById("post-date").textContent = post.timestamp;
  const hashTags = document.getElementById("hashTags");
  hashTags.innerHTML = "";

  for (let i = 0; i < post.tags.length; i++) {
    const tagSpan = document.createElement("span");
    tagSpan.classList.add("mr-1", "text-primary");
    console.log(post.tags[i]);
    tagSpan.textContent = post.tags[i];
    hashTags.appendChild(tagSpan);
  }

  const commentSection = document.getElementById("user-comments");
  commentSection.innerHTML = "";
  for (let i = 0; i < post.comments.length; i++) {
    let commentId = post.comments[i];
    let commentedUserId = commentDetails[i].userId;
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("my-2");
    const img = document.createElement("img");
    const commentedUsername = document.createElement("span");
    const comment = document.createElement("span");
    comment.classList.add("fs-14");
    commentedUsername.classList.add("fw-600", "fs-14", "mr-1");
    img.classList.add("profile-picture-size", "rounded-circle", "mr-3");
    img.src = userDetails[commentedUserId].profilePicture;
    commentedUsername.textContent = userDetails[commentedUserId].username;
    // console.log(commentDetails[commentId].text);
    // comment.textContent = commentDetails[commentId].text;
    commentDiv.appendChild(img);
    commentDiv.appendChild(commentedUsername);
    commentDiv.appendChild(comment);
    commentSection.appendChild(commentDiv);
  }

  $("#postModal").modal("show");
}

function openModalTagged(post) {
  document.getElementById("modal-post-image").src = post.imageUrl;
  document.getElementById("modal-profile-picture").src =
    userDetails[post.userId - 1].profilePicture;
  document.getElementById("modal-profile-picture-comments").src =
    userDetails[post.userId - 1].profilePicture;
  document.getElementById("modal-username").textContent =
    userDetails[post.userId - 1].username;
  document.getElementById("comment-section-username").textContent =
    userDetails[post.userId - 1].username;
  document.getElementById("modal-post-caption").textContent =
    post.caption.stringValue;
  document.getElementById("liked-by-username").textContent = "thezahidx";
  let count = post.likes.length;
  const likeCountElement = document.getElementById("like-count");
  likeCountElement.textContent = count;

  const likeButton = document.getElementById("modal-like-button");

  // Remove previous event listeners
  const newLikeButton = likeButton.cloneNode(true);
  likeButton.parentNode.replaceChild(newLikeButton, likeButton);

  // Add new event listener
  newLikeButton.addEventListener("click", function () {
    this.classList.toggle("liked");
    this.classList.toggle("far");
    this.classList.toggle("fas");
    if (this.classList.contains("liked")) {
      count++;
    } else {
      count--;
    }
    likeCountElement.textContent = count - 1;
  });
  document.getElementById("post-date").textContent = post.timestamp;

  const hashTags = document.getElementById("hashTags");
  hashTags.innerHTML = "";

  for (let i = 0; i < post.tags.length; i++) {
    const tagSpan = document.createElement("span");
    tagSpan.classList.add("mr-1", "text-primary");
    console.log(post.tags[i]);
    tagSpan.textContent = post.tags[i];
    hashTags.appendChild(tagSpan);
  }

  const commentSection = document.getElementById("user-comments");
  commentSection.innerHTML = "";
  for (let i = 0; i < post.comments.length; i++) {
    let commentId = post.comments[i];
    let commentedUserId = commentDetails[i].userId;
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("my-2");
    const img = document.createElement("img");
    const commentedUsername = document.createElement("a");
    commentedUsername.href = "./userProfile.html";
    commentedUsername.addEventListener("click", function () {
      localStorage.setItem("username", userDetails[commentedUserId].username);
    });
    const comment = document.createElement("span");
    comment.classList.add("fs-14");
    commentedUsername.classList.add("fw-600", "fs-14", "mr-1");
    img.classList.add("profile-picture-size", "rounded-circle", "mr-3");
    img.src = userDetails[commentedUserId].profilePicture;
    commentedUsername.textContent = userDetails[commentedUserId].username;
    // console.log(commentDetails[commentId].text);
    // comment.textContent = commentDetails[commentId].text;
    commentDiv.appendChild(img);
    commentDiv.appendChild(commentedUsername);
    commentDiv.appendChild(comment);
    commentSection.appendChild(commentDiv);
  }

  $("#postModal").modal("show");
}

// followers fetching

const followersListContainer = document.getElementById("followers-list");
followersListContainer.innerHTML = "";
for (let i = 0; i < userDetails[result].followers.length; i++) {
  for (let j = 0; j < userDetails.length; j++) {
    if (userDetails[result].followers[i] == userDetails[j].id) {
      const usernameAnchorElement = document.createElement("a");
      usernameAnchorElement.href = "./userProfile.html";
      usernameAnchorElement.addEventListener("click", function (event) {
        // event.preventDefault(); // Prevent the default anchor behavior
        localStorage.setItem("username", userDetails[j].username);
      });
      const followersList = document.createElement("div");
      followersList.classList.add(
        "d-flex",
        "justify-content-between",
        "align-items-center",
        "my-2"
      );
      const followersProfilePic = document.createElement("img");
      followersProfilePic.classList.add(
        "profile-picture-size",
        "rounded-circle",
        "mr-3"
      );
      followersProfilePic.src = userDetails[j].profilePicture;
      followersProfilePic.alt = userDetails[j].fullName;
      const usernameElement = document.createElement("p");
      usernameElement.textContent = userDetails[j].username;
      usernameAnchorElement.appendChild(usernameElement);
      usernameElement.classList.add("mb-1", "fw-600");
      const fullNameElement = document.createElement("p");
      fullNameElement.textContent = userDetails[j].fullName;
      fullNameElement.classList.add("mb-1", "text-muted");
      const imageDiv = document.createElement("div");
      imageDiv.appendChild(followersProfilePic);
      const nameDiv = document.createElement("div");
      nameDiv.appendChild(usernameAnchorElement);
      nameDiv.appendChild(fullNameElement);
      const userDiv = document.createElement("div");
      userDiv.appendChild(imageDiv);
      userDiv.appendChild(nameDiv);
      userDiv.classList.add("d-flex");
      const buttonDiv = document.createElement("div");
      const button = document.createElement("button");
      button.innerText = "Remove";
      button.classList.add("btn", "btn-custom");
      buttonDiv.appendChild(button);
      followersList.appendChild(userDiv);
      followersList.appendChild(buttonDiv);
      followersListContainer.appendChild(followersList);
    }
  }
}

// following fetching

const followingListContainer = document.getElementById("following-list");
followingListContainer.innerHTML = "";
for (let i = 0; i < userDetails[result].following.length; i++) {
  for (let j = 0; j < userDetails.length; j++) {
    if (userDetails[result].following[i] == userDetails[j].id) {
      const usernameAnchorElement = document.createElement("a");
      usernameAnchorElement.href = "./userProfile.html";
      usernameAnchorElement.addEventListener("click", function (event) {
        // event.preventDefault(); // Prevent the default anchor behavior
        localStorage.setItem("username", userDetails[j].username);
      });
      const followingList = document.createElement("div");
      followingList.classList.add(
        "d-flex",
        "justify-content-between",
        "align-items-center",
        "my-2"
      );
      const followingProfilePic = document.createElement("img");
      followingProfilePic.classList.add(
        "profile-picture-size",
        "rounded-circle",
        "mr-3"
      );
      followingProfilePic.src = userDetails[j].profilePicture;
      followingProfilePic.alt = userDetails[j].fullName;
      const usernameElement = document.createElement("p");
      usernameElement.textContent = userDetails[j].username;
      usernameAnchorElement.appendChild(usernameElement);
      usernameElement.classList.add("mb-1", "fw-600");
      const fullNameElement = document.createElement("p");
      fullNameElement.textContent = userDetails[j].fullName;
      fullNameElement.classList.add("mb-1", "text-muted");
      const imageDiv = document.createElement("div");
      imageDiv.appendChild(followingProfilePic);
      const nameDiv = document.createElement("div");
      nameDiv.appendChild(usernameAnchorElement);
      nameDiv.appendChild(fullNameElement);
      const userDiv = document.createElement("div");
      userDiv.appendChild(imageDiv);
      userDiv.appendChild(nameDiv);
      userDiv.classList.add("d-flex");
      const buttonDiv = document.createElement("div");
      const button = document.createElement("button");
      button.innerText = "Remove";
      button.classList.add("btn", "btn-custom");
      buttonDiv.appendChild(button);
      followingList.appendChild(userDiv);
      followingList.appendChild(buttonDiv);
      followingListContainer.appendChild(followingList);
    }
  }
}

// following modal

document.getElementById("following-modal-profile-picture").src =
  userDetails[result].profilePicture;
document.getElementById("following-modal-username").textContent =
  userDetails[result].username;
