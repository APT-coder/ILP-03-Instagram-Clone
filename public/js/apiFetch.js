const API_URL = 'https://second-majestic-fennel.glitch.me/'; // Replace with your actual API endpoint

// Fetch all users
export async function fetchUsers() {
  try {
    const response = await fetch(`${API_URL}/users`);
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
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
    console.error('Error fetching posts:', error);
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
    console.error('Error fetching comments:', error);
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

// Fetch all likes
export async function fetchLikes() {
  try {
    const response = await fetch(`${API_URL}/likes`);
    const likes = await response.json();
    return likes;
  } catch (error) {
    console.error('Error fetching likes:', error);
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
    console.error('Error fetching stories:', error);
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
    console.error('Error fetching reels:', error);
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

// Fetch all messages
export async function fetchMessages() {
  try {
    const response = await fetch(`${API_URL}/messages`);
    const messages = await response.json();
    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
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
