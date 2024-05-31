document.addEventListener("DOMContentLoaded", async () => {
  const apiURL =
    "https://firestore.googleapis.com/v1/projects/users-ef716/databases/(default)/documents/user-profile/profile-details";

  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const doc = await response.json();
    const data = doc.fields;

    // profile container fetch
    document.getElementById("profile-pic").src =
      data.profilePicture.stringValue;
    document.getElementById("username").textContent = data.username.stringValue;
    document.getElementById("bio").textContent = data.bio.stringValue;
    document.getElementById("posts-count").textContent =
      data.postsCount.integerValue;
    document.getElementById("followers-count").textContent =
      data.followersCount.integerValue;
    document.getElementById("following-count").textContent =
      data.followingCount.integerValue;
    document.getElementById("name").textContent = data.nickname.stringValue;
    document.getElementById("name").classList.add("fw-600");
    document.getElementById("title").textContent = data.username.stringValue;

    // Story highlight fetch

    const storyHighlightsContainer =
      document.getElementById("story-highlights");
    const storyHighlights = data.storyHighlights.arrayValue.values;
    const storyWrapper = document.createElement("div");
    storyWrapper.className = "d-flex";

    storyHighlights.forEach((story) => {
      const storyDiv = document.createElement("div");
      storyDiv.className = "story-highlight";
      const storyImg = document.createElement("img");
      storyImg.src = story.mapValue.fields.image.stringValue;
      storyImg.alt = story.mapValue.fields.name.stringValue;
      const highlightName = document.createElement("span");
      highlightName.className = "highlight-name";
      highlightName.textContent = story.mapValue.fields.name.stringValue;
      highlightName.classList.add("fw-600");
      storyDiv.appendChild(storyImg);
      storyDiv.appendChild(highlightName);
      storyWrapper.appendChild(storyDiv);
    });
    storyHighlightsContainer.appendChild(storyWrapper);

    // Scroll functionality
    const scrollAmount = 300; // Number of pixels to scroll
    const scrollDuration = 400; // Duration in ms for smooth scrolling

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
    loadPosts(data.posts.arrayValue.values);
    showSection("posts");

    // Add event listeners for menu links
    document.getElementById("posts-link").addEventListener("click", (event) => {
      event.preventDefault();
      showSection("posts");
      loadPosts(data.posts.arrayValue.values);
    });

    document.getElementById("saved-link").addEventListener("click", (event) => {
      event.preventDefault();
      showSection("saved");
      loadSavedPosts(data.savedPost.arrayValue.values);
    });

    document
      .getElementById("tagged-link")
      .addEventListener("click", (event) => {
        event.preventDefault();
        showSection("tagged");
        loadTaggedPosts(data.taggedPost.arrayValue.values);
      });

    //   nav link to sub menu
    document
      .getElementById("posts-link-icon")
      .addEventListener("click", (event) => {
        event.preventDefault();
        showSectionIcon("posts");
        loadPosts(data.posts.arrayValue.values);
      });

    document
      .getElementById("saved-link-icon")
      .addEventListener("click", (event) => {
        event.preventDefault();
        showSectionIcon("saved");
        loadSavedPosts(data.savedPost.arrayValue.values);
      });

    document
      .getElementById("tagged-link-icon")
      .addEventListener("click", (event) => {
        event.preventDefault();
        showSectionIcon("tagged");
        loadTaggedPosts(data.taggedPost.arrayValue.values);
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
      postsContainer.innerHTML = ""; //

      posts.forEach((post) => {
        const colDiv = document.createElement("div");
        colDiv.classList.add("col-4", "mg-1", "post");

        const img = document.createElement("img");
        img.src = post.mapValue.fields.image.stringValue;
        img.alt = post.mapValue.fields.caption.stringValue;
        img.className = "img-fluid";

        const overlay = document.createElement("div");
        overlay.className = "overlay";
        const likes = document.createElement("div");
        likes.className = "likes";
        likes.innerHTML = `<i class="fas fa-heart"></i> ${post.mapValue.fields.likes.integerValue}`;
        const comments = document.createElement("div");
        comments.className = "comments";
        comments.innerHTML = `<i class="fas fa-comment"></i> ${post.mapValue.fields.comments.integerValue}`;
        overlay.appendChild(likes);
        overlay.appendChild(comments);
        colDiv.appendChild(img);
        colDiv.appendChild(overlay);

        colDiv.addEventListener("click", (event) => {
          event.preventDefault();

          try {
            openModal(post.mapValue.fields);
          } catch (error) {
            console.error("Error opening modal:", error);
          }
        });

        postsContainer.appendChild(colDiv);
      });
    }

    function loadSavedPosts(savedPosts) {
      const postsContainer = document.getElementById("posts-container");
      postsContainer.innerHTML = "";

      savedPosts.forEach((post) => {
        const colDiv = document.createElement("div");
        colDiv.classList.add("col-4", "mg-1", "post");

        const img = document.createElement("img");
        img.src = post.mapValue.fields.image.stringValue;
        img.alt = post.mapValue.fields.caption.stringValue;
        img.className = "img-fluid";

        const overlay = document.createElement("div");
        overlay.className = "overlay";
        const likes = document.createElement("div");
        likes.className = "likes";
        likes.innerHTML = `<i class="fas fa-heart"></i> ${post.mapValue.fields.likes.integerValue}`;
        const comments = document.createElement("div");
        comments.className = "comments";
        comments.innerHTML = `<i class="fas fa-comment"></i> ${post.mapValue.fields.comments.integerValue}`;
        overlay.appendChild(likes);
        overlay.appendChild(comments);
        colDiv.appendChild(img);
        colDiv.appendChild(overlay);

        colDiv.addEventListener("click", (event) => {
          event.preventDefault();
          try {
            openModal(post.mapValue.fields);
          } catch (error) {
            console.error("Error opening modal:", error);
          }
        });

        postsContainer.appendChild(colDiv);
      });
    }

    function loadTaggedPosts(taggedPosts) {
      const postsContainer = document.getElementById("posts-container");
      postsContainer.innerHTML = "";

      taggedPosts.forEach((post) => {
        const colDiv = document.createElement("div");
        colDiv.classList.add("col-4", "mg-1", "post");

        const img = document.createElement("img");
        img.src = post.mapValue.fields.image.stringValue;
        img.alt = post.mapValue.fields.caption.stringValue;
        img.className = "img-fluid";

        const overlay = document.createElement("div");
        overlay.className = "overlay";
        const likes = document.createElement("div");
        likes.className = "likes";
        likes.innerHTML = `<i class="fas fa-heart"></i> ${post.mapValue.fields.likes.integerValue}`;
        const comments = document.createElement("div");
        comments.className = "comments";
        comments.innerHTML = `<i class="fas fa-comment"></i> ${post.mapValue.fields.comments.integerValue}`;
        overlay.appendChild(likes);
        overlay.appendChild(comments);
        colDiv.appendChild(img);
        colDiv.appendChild(overlay);

        colDiv.addEventListener("click", (event) => {
          event.preventDefault();
          try {
            openModalTagged(post.mapValue.fields);
          } catch (error) {
            console.error("Error opening modal:", error);
          }
        });

        postsContainer.appendChild(colDiv);
      });
    }

    function openModal(post) {
      document.getElementById("modal-post-image").src = post.image.stringValue;
      document.getElementById("modal-profile-picture").src =
        data.profilePicture.stringValue;
      document.getElementById("modal-profile-picture-comments").src =
        data.profilePicture.stringValue;
      document.getElementById("modal-username").textContent =
        data.username.stringValue;
      document.getElementById("comment-section-username").textContent =
        data.username.stringValue;
      document.getElementById("modal-post-caption").textContent =
        post.caption.stringValue;
      document.getElementById("liked-by-username").textContent =
        data.username.stringValue;
      let count = post.likes.integerValue;
      const likeCountElement = document.getElementById("like-count");
      likeCountElement.textContent = count - 1;

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

      document.getElementById("post-date").textContent = post.date.stringValue;

      $("#postModal").modal("show");
    }

    function openModalSaved(post) {
      document.getElementById("modal-post-image").src = post.image.stringValue;
      document.getElementById("modal-profile-picture").src =
        data.profilePicture.stringValue;
      document.getElementById("modal-profile-picture-comments").src =
        data.profilePicture.stringValue;
      document.getElementById("modal-username").textContent =
        data.username.stringValue;
      document.getElementById("comment-section-username").textContent =
        data.username.stringValue;
      document.getElementById("modal-post-caption").textContent =
        post.caption.stringValue;
      document.getElementById("liked-by-username").textContent =
        data.username.stringValue;
      let count = post.likes.integerValue;
      const likeCountElement = document.getElementById("like-count");
      likeCountElement.textContent = count - 1;

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
      document.getElementById("post-date").textContent = post.date.stringValue;

      $("#postModal").modal("show");
    }

    function openModalTagged(post) {
      document.getElementById("modal-post-image").src = post.image.stringValue;
      document.getElementById("modal-profile-picture").src =
        post.profilePicture.stringValue;
      document.getElementById("modal-profile-picture-comments").src =
        post.profilePicture.stringValue;
      document.getElementById("modal-username").textContent =
        post.username.stringValue;
      document.getElementById("comment-section-username").textContent =
        post.username.stringValue;
      document.getElementById("modal-post-caption").textContent =
        post.caption.stringValue;
      document.getElementById("liked-by-username").textContent =
        data.username.stringValue;
      let count = post.likes.integerValue;
      const likeCountElement = document.getElementById("like-count");
      likeCountElement.textContent = count - 1;

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
      document.getElementById("post-date").textContent = post.date.stringValue;

      $("#postModal").modal("show");
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
});
