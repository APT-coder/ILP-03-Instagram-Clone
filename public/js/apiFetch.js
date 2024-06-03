const API_URL = "https://second-majestic-fennel.glitch.me/";
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Fetch all users
export async function fetchUsers() {
  try {
    const response = await fetch(`${API_URL}/users`);
    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

// Fetch a single user by ID
export async function fetchUserById(userId) {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
  }
}

// Fetch all posts
export async function fetchPosts() {
  try {
    const response = await fetch(`${API_URL}/posts`);
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

// Fetch a single post by ID
export async function fetchPostById(postId) {
  try {
    const response = await fetch(`${API_URL}/posts/${postId}`);
    const post = await response.json();
    return post;
  } catch (error) {
    console.error(`Error fetching post with ID ${postId}:`, error);
  }
}

// Fetch all comments
export async function fetchComments() {
  try {
    const response = await fetch(`${API_URL}/comments`);
    const comments = await response.json();
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
}

// Fetch a single comment by ID
export async function fetchCommentById(commentId) {
  try {
    const response = await fetch(`${API_URL}/comments/${commentId}`);
    const comment = await response.json();
    return comment;
  } catch (error) {
    console.error(`Error fetching comment with ID ${commentId}:`, error);
  }
}

export async function fetchCommentsByPostId(postId) {
  try {
    const response = await fetch(`${API_URL}/comments?postId=${postId}`);
    const comments = await response.json();
    return comments;
  } catch (error) {
    console.error(`Error fetching comments for post with ID ${postId}:`, error);
  }
}

// Fetch all likes
export async function fetchLikes() {
  try {
    const response = await fetch(`${API_URL}/likes`);
    const likes = await response.json();
    return likes;
  } catch (error) {
    console.error("Error fetching likes:", error);
  }
}

// Fetch a single like by ID
export async function fetchLikeById(likeId) {
  try {
    const response = await fetch(`${API_URL}/likes/${likeId}`);
    const like = await response.json();
    return like;
  } catch (error) {
    console.error(`Error fetching like with ID ${likeId}:`, error);
  }
}

// Fetch all stories
export async function fetchStories() {
  try {
    const response = await fetch(`${API_URL}/stories`);
    const stories = await response.json();
    return stories;
  } catch (error) {
    console.error("Error fetching stories:", error);
  }
}

// Fetch a single story by ID
export async function fetchStoryById(storyId) {
  try {
    const response = await fetch(`${API_URL}/stories/${storyId}`);
    const story = await response.json();
    return story;
  } catch (error) {
    console.error(`Error fetching story with ID ${storyId}:`, error);
  }
}

// Fetch all reels
export async function fetchReels() {
  try {
    const response = await fetch(`${API_URL}/reels`);
    const reels = await response.json();
    return reels;
  } catch (error) {
    console.error("Error fetching reels:", error);
  }
}

// Fetch a single reel by ID
export async function fetchReelById(reelId) {
  try {
    const response = await fetch(`${API_URL}/reels/${reelId}`);
    const reel = await response.json();
    return reel;
  } catch (error) {
    console.error(`Error fetching reel with ID ${reelId}:`, error);
  }
}

export async function fetchExplore() {
  try {
    const response = await fetch(`${API_URL}/explore`);
    const explore = await response.json();
    return explore;
  } catch (error) {
    console.error("Error fetching explore:", error);
  }
}

// Fetch all messages
export async function fetchMessages() {
  try {
    const response = await fetch(`${API_URL}/messages`);
    const messages = await response.json();
    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
}

// Fetch a single message by ID
export async function fetchMessageById(messageId) {
  try {
    const response = await fetch(`${API_URL}/messages/${messageId}`);
    const message = await response.json();
    return message;
  } catch (error) {
    console.error(`Error fetching message with ID ${messageId}:`, error);
  }
}

export async function updateVisitedStatus(storyId) {
  try {
    const response = await fetch(`${API_URL}/stories/${storyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ visited: true }),
    });

    if (!response.ok) {
      throw new Error("Failed to update visited status");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating visited status:", error);
    throw error;
  }
}

export async function updateUserFollowing(userId, followUserId) {
  try {
    const userResponse = await fetch(`${API_URL}/users/${userId}`);

    if (!userResponse.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData = await userResponse.json();
    if (!userData.following.includes(followUserId)) {
      userData.following.push(followUserId);
    }
    const updateResponse = await fetch(`${API_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ following: userData.following }),
    });

    if (!updateResponse.ok) {
      throw new Error("Failed to update following list");
    }

    const data = await updateResponse.json();
    return data;
  } catch (error) {
    console.error("Error updating following list:", error);
    throw error;
  }
}

export async function addCommentToPost(postId, userId, text) {
  try {
    const commentsResponse = await fetch(`${API_URL}/comments`);

    if (!commentsResponse.ok) {
      throw new Error("Failed to fetch comments");
    }

    let commentsData = await commentsResponse.json();

    const newCommentId = commentsData.length
      ? commentsData[commentsData.length - 1].id + 1
      : 1;

    const timestamp = new Date().toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const newComment = {
      id: newCommentId,
      postId: postId,
      userId: userId,
      text: text,
      timestamp: timestamp,
    };

    commentsData.push(newComment);
    const updateResponse = await fetch(`${API_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    });

    if (!updateResponse.ok) {
      throw new Error("Failed to update comments list");
    }

    return commentsData;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
}
