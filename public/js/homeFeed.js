import { fetchPosts, fetchUserById, fetchCommentsByPostId, addCommentToPost } from "../js/apiFetch.js";

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
      tags
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
    const {
      id,
      postId,
      userId,
      text,
      timestamp
    } = element;
    const commentUser = await fetchUserById(userId)
    const dataObject = {
      id,
      postId,
      userId,
      text,
      timestamp,
      commentUser
    };
    jsonData.push(dataObject);
  }
  return jsonData;
}

const storyFull = [
  {
    thumbUrl: "https://www.sosyncd.com/wp-content/uploads/2022/06/62-2.png",
    imageUrl:
      "https://images.pexels.com/photos/4873585/pexels-photo-4873585.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    thumbUrl: "https://www.sosyncd.com/wp-content/uploads/2022/06/62-2.png",
    imageUrl: "https://www.sosyncd.com/wp-content/uploads/2022/06/62-2.png",
  },
  {
    thumbUrl: "https://www.sosyncd.com/wp-content/uploads/2022/06/62-2.png",
    imageUrl:
      "https://images.pexels.com/photos/4873585/pexels-photo-4873585.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    thumbUrl: "https://www.sosyncd.com/wp-content/uploads/2022/06/62-2.png",
    imageUrl:
      "https://images.pexels.com/photos/3808904/pexels-photo-3808904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    thumbUrl: "https://www.sosyncd.com/wp-content/uploads/2022/06/62-2.png",
    imageUrl:
      "https://images.pexels.com/photos/7260648/pexels-photo-7260648.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    thumbUrl: "https://www.sosyncd.com/wp-content/uploads/2022/06/62-2.png",
    imageUrl:
      "https://images.pexels.com/photos/4018813/pexels-photo-4018813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    thumbUrl: "https://www.sosyncd.com/wp-content/uploads/2022/06/62-2.png",
    imageUrl:
      "https://images.pexels.com/photos/4018813/pexels-photo-4018813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    thumbUrl: "https://www.sosyncd.com/wp-content/uploads/2022/06/62-2.png",
    imageUrl:
      "https://images.pexels.com/photos/4018812/pexels-photo-4018812.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    thumbUrl: "https://www.sosyncd.com/wp-content/uploads/2022/06/62-2.png",
    imageUrl:
      "https://images.pexels.com/photos/4018812/pexels-photo-4018812.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    thumbUrl: "https://www.sosyncd.com/wp-content/uploads/2022/06/62-2.png",
    imageUrl: "https://www.sosyncd.com/wp-content/uploads/2022/06/62-2.png",
  },
  {
    thumbUrl: "https://www.sosyncd.com/wp-content/uploads/2022/06/62-2.png",
    imageUrl:
      "https://images.pexels.com/photos/4873585/pexels-photo-4873585.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];
const storyContainer = document.querySelector(".story-container");
const storyPostContainer = document.querySelector(".story-post-container");

const storyView = document.querySelector(".story-full");
const storyImage = document.querySelector(".story-image-class");
const storyFullIcons = document.querySelector(".in-story-icon");
const closeBtn = document.querySelector(".story-full .close-btn");
const leftArrow = document.querySelector(".story-full .left-arrow");
const rightArrow = document.querySelector(".story-full .right-arrow");

let CurrentIndex = 0;
let intervalId;
const startInterval = () => {
  intervalId = setInterval(nextStory, 5000);
};
const pauseInterval = () => {
  clearInterval(intervalId);
};

storyFull.forEach((elements, i) => {
  const story = document.createElement("div");
  story.classList.add("story");

  const gradBorder = document.createElement("div");
  gradBorder.classList.add("gradient-border");

  const storyDP = document.createElement("img");
  storyDP.setAttribute("src", elements.thumbUrl);

  const username = document.createElement("p");
  username.textContent = "Username";

  story.appendChild(gradBorder);
  gradBorder.appendChild(storyDP);
  story.appendChild(username);

  storyContainer.appendChild(story);

  story.addEventListener("click", () => {
    CurrentIndex = i;
    storyView.classList.add("active");
    storyImage.setAttribute("src", elements.imageUrl);

    startInterval();
  });
});

closeBtn.addEventListener("click", () => {
  storyView.classList.remove("active");
});

leftArrow.addEventListener("click", () => {
  if (CurrentIndex > 0) {
    CurrentIndex -= 1;
    storyImage.setAttribute("src", storyFull[CurrentIndex].imageUrl);
  }
});
const nextStory = () => {
  if (CurrentIndex < storyFull.length - 1) {
    CurrentIndex += 1;
    storyImage.setAttribute("src", storyFull[CurrentIndex].imageUrl);
  }
};

rightArrow.addEventListener("click", () => {
  nextStory();
});
storyImage.addEventListener("click",()=>{
    pauseInterval()
})
//---------suggestion box--------//
const following=(element)=>{
  if(element.textContent.trim()==="Follow")
   {
     element.textContent="Following";
   }
   else if(element.textContent.trim()==="Following")
    {
      document.getElementById('suggest-card').style.display='block';
      document.getElementById('overlay').style.display = 'block';
    }
}

function cancel(){
  document.getElementById('suggest-card').style.display='none';
  document.getElementById('overlay').style.display = 'none';
}

const unfollow = () => {
  const unfollowButton  = document.querySelector(".suggest-follow");
   console.log(unfollowButton.textContent.trim());
  if (unfollowButton.textContent.trim()=="Following") {
    unfollowButton.textContent = "Follow";
  }
  document.getElementById('suggest-card').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

//-----------------
const suggestionFull = [
  {
    username: "username1",
    followedBy: "followed By 1",
    imgUrl: "https://www.sosyncd.com/wp-content/uploads/2022/06/62-2.png",
  },
  {
    username: "username2",
    followedBy: "followed By 2",
    imgUrl: "https://www.sosyncd.com/wp-content/uploads/2022/06/62-2.png",
  },
  {
    username: "username3",
    followedBy: "followed By 3",
    imgUrl: "https://www.sosyncd.com/wp-content/uploads/2022/06/62-2.png",
  },
  {
    username: "username4",
    followedBy: "followed By 4",
    imgUrl: "https://www.sosyncd.com/wp-content/uploads/2022/06/62-2.png",
  },
];

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
  img1.setAttribute("src", elements.imgUrl);
  img1.style.height = "5rem";
  img1.style.width = "5rem";

  const detailName = document.createElement("p");
  detailName.classList.add("detail-name");
  detailName.textContent = elements.username;

  const detailBy = document.createElement("p");
  detailBy.classList.add("detail-by");
  detailBy.textContent = elements.followedBy;

  const img2 = document.createElement("img");
  img2.setAttribute("src", elements.imgUrl);
  img2.style.height = "1.25rem";
  img2.style.width = "1.25rem";

  const followButton = document.createElement("div");
  followButton.classList.add("suggest-follow");
  followButton.textContent = "Follow";
  followButton.addEventListener("click", () => following(followButton));

  details.appendChild(img1);
  details.appendChild(detailName);
  details.appendChild(detailBy);
  details.appendChild(img2);

  suggestionCard.appendChild(suggestCross);
  suggestionCard.appendChild(details);

  suggestDiv.appendChild(suggestionCard);
  suggestDiv.appendChild(document.createElement("hr"));
  suggestDiv.appendChild(followButton);

  suggestionContainer.forEach(container => container.appendChild(suggestDiv));
});
//----------------------
const createExtraOptionCard = () => {
document.getElementById('overlay').style.display = 'block';
const extraOption = document.createElement('div');
extraOption.classList.add('extraOption');

const options = [
  { class: 'divRed', text: 'Report' },
  { class: 'divRed', text: 'Unfollow' },
  { class: 'divElement', text: 'Add to favourites' },
  { class: 'divElement', text: 'Go to post' },
  { class: 'divElement', text: 'Share to...' },
  { class: 'divElement', text: 'Copy link' },
  { class: 'divElement', text: 'Embed' },
  { class: 'divElement', text: 'About this account' },
  { class: 'divElement', text: 'Cancel' }
];

options.forEach(option => {
  const optionDiv = document.createElement('div');
  optionDiv.classList.add(option.class);
  optionDiv.textContent = option.text;
  extraOption.appendChild(optionDiv);

  if (option.text !== 'Cancel') {
    const hr = document.createElement('hr');
    extraOption.appendChild(hr);
  }
  else {
    optionDiv.addEventListener('click', () => {
      extraOption.remove(); 
      document.getElementById('overlay').style.display = 'none';
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
  commentClose.style.cursor="pointer";
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
  commentIntroImg.style.cursor="pointer";
  commentIntroProfile.appendChild(commentIntroImg);

  const commentIntroName = document.createElement("div");
  commentIntroName.classList.add("commentIntroName");
  commentIntroName.textContent = element.user.username;
  commentIntroName.style.cursor="pointer";
  commentIntroProfile.appendChild(commentIntroName);

  const commentIntroIcon = document.createElement("i");
  commentIntroIcon.classList.add("fas", "fa-ellipsis-h", "dots");
  commentIntroIcon.setAttribute("title", "More Options");
  commentIntroIcon.style.paddingTop='1.4375rem';
  commentIntroIcon.style.marginRight='5%';
  commentIntroIcon.style.cursor="pointer";

  commentIntroIcon.addEventListener("click", () => {

    const existingCard = document.querySelector('.extraOption');
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
  heartIcon.classList.add("bi", "bi-heart", "comment-icon",'thicker-icon');
  heartIcon.setAttribute("id", "heart-icon");
  heartIcon.setAttribute("title", "Like");
  
  let numLikes = parseInt(element.likes);
  heartIcon.addEventListener('click', function() {
    if (heartIcon.classList.contains('bi-heart')) {
      heartIcon.classList.remove('bi-heart');
      heartIcon.classList.add('bi-heart-fill');
      heartIcon.style.color = 'rgba(193,42,42,1)';
      heartIcon.setAttribute("title", "Unlike");
      element.numLikes += 1;
    } 
    
    else {
      heartIcon.classList.remove('bi-heart-fill');
      heartIcon.classList.add('bi-heart');
      heartIcon.style.color = '';
      heartIcon.setAttribute("title", "Like");
      element.numLikes -= 1;
    }
  
    likes.textContent = `${element.numLikes} likes`;
  });

  const chatIcon = document.createElement("i");
  chatIcon.classList.add("bi", "bi-chat", "comment-icon",'thicker-icon');
  chatIcon.style.transform = "scaleX(-1)";
  chatIcon.setAttribute("title", "Comment");

  const sendIcon = document.createElement("i");
  sendIcon.classList.add("bi", "bi-send", "comment-icon",'thicker-icon');
  sendIcon.setAttribute("title", "Share Post");

  sendIcon.addEventListener('click', () => {
    const existingSharePost = document.querySelector('.sharePost');
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
  bookmarkIcon.classList.add("bi", "bi-bookmark", "comment-icon",'thicker-icon');
  bookmarkIcon.setAttribute("id", "bookmark-icon");
  bookmarkIcon.setAttribute("title", "Save");
  bookmarkIcon.addEventListener('click', function() {
    if (bookmarkIcon.classList.contains('bi-bookmark')) {
      bookmarkIcon.classList.remove('bi-bookmark');
      bookmarkIcon.classList.add('bi-bookmark-fill');
      bookmarkIcon.style.color = 'rgb(0,0,0)';
      bookmarkIcon.setAttribute("title", "Remove");
    } else {
      bookmarkIcon.classList.remove('bi-bookmark-fill');
      bookmarkIcon.classList.add('bi-bookmark');
      bookmarkIcon.style.color = '';
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
  commentDetails.style.marginLeft="20px";

  const commentAdd = document.createElement("div");
  commentAdd.classList.add('commentAdd');

  const commentAddFirst = document.createElement("div");
  commentAddFirst.classList.add('commentAddFirst');

  const smileyIcon = document.createElement("i");
  smileyIcon.classList.add("fa-regular", "fa-face-smile", "fa-xs");
  smileyIcon.setAttribute("title", "Emoji");
  smileyIcon.style.color = "black";
  smileyIcon.style.padding = "0.9375rem";
  smileyIcon.style.fontSize = "1.4375rem";
  smileyIcon.style.cursor="pointer";

  const inputField = document.createElement('input');
  inputField.type = 'text';
  inputField.placeholder = 'Add a comment...';
  inputField.style.fontSize="0.875rem";

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Post';

  submitButton.style.backgroundColor = '';
  submitButton.style.color = '';

inputField.addEventListener('input', function() {
  if (inputField.value.trim().length > 0) {
    submitButton.style.backgroundColor = '#1ca6ec';
    submitButton.style.color = 'white';
  } else {
    submitButton.style.backgroundColor = '';
    submitButton.style.color = '';
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
        
        const commentContainer = document.createElement('div');
        commentContainer.className = 'commentPageComment';
        
        const commentMoreDetails = document.createElement('div');
        commentMoreDetails.className = 'commentMoreDetails';
  
        const commentPageProfile = document.createElement('div');
        commentPageProfile.className = 'commentPageProfile';
  
        const profileImage = document.createElement('img');
        profileImage.setAttribute("src", element.commentUser.profilePicture); 
  
        commentPageProfile.appendChild(profileImage);
  
        const commentMoreInfo = document.createElement('div');
        commentMoreInfo.className = 'commentMoreInfo';
  
        const commentOwner = document.createElement('div');
        commentOwner.className = 'commentOwner';
  
        const commentOwnerParagraph = document.createElement('p');
        const commentOwnerSpan = document.createElement('span');
        commentOwnerSpan.textContent = element.commentUser.username;
        commentOwnerParagraph.appendChild(commentOwnerSpan);
        commentOwnerParagraph.appendChild(document.createTextNode(` ${element.text}`));
  
        commentOwner.appendChild(commentOwnerParagraph);
  
        const commentInfo = document.createElement('div');
        commentInfo.className = 'commentInfo';
  
        const commentDay = document.createElement('div');
        commentDay.className = 'commentDay';
        commentDay.textContent = "1d";
  
        const commentLikeNo = document.createElement('div');
        commentLikeNo.className = 'commentLikeNo';
        commentLikeNo.textContent = "2 likes";
  
        const commentReply = document.createElement('div');
        commentReply.className = 'reply';
        commentReply.textContent = "Reply";
  
        const postOptions = document.createElement("i");
        postOptions.classList.add("fas", "fa-ellipsis-h", "dots");
        postOptions.setAttribute("title","More Options");
        postOptions.style.cursor="pointer";
  
      //  postOptions.addEventListener("click", () => {
  
      //  const existingCard = document.querySelector('.commentOption');
      //  if (existingCard) {
      //    existingCard.remove();
      // }
  
  
      // const commentOptionCard = createCommentOptionCard();
      // document.body.appendChild(commentOptionCard);
      // });
        commentInfo.appendChild(commentDay);
        commentInfo.appendChild(commentLikeNo);
        commentInfo.appendChild(commentReply);
        commentInfo.appendChild(postOptions);

        // const viewReplies = document.createElement('div');
        // viewReplies.className = 'viewReplies';
        // const lineIcon=document.createElement("i");
        // lineIcon.classList.add("bi" ,"bi-dash-lg");
        // viewReplies.appendChild(lineIcon);
        // viewReplies.textContent = ' View replies (12)';

        const viewReplies = document.createElement('div');
        viewReplies.className = 'viewReplies';

        const lineIcon = document.createElement('i');
        lineIcon.classList.add('bi', 'bi-dash-lg');

        viewReplies.appendChild(lineIcon);

        // Create a text node and append it to the 'viewReplies' element
        const textNode = document.createTextNode(' View replies (12)');
        viewReplies.appendChild(textNode);


        commentMoreInfo.appendChild(commentOwner);
        commentMoreInfo.appendChild(commentInfo);
        commentMoreInfo.appendChild(viewReplies);
        
        commentMoreDetails.appendChild(commentPageProfile);
        commentMoreDetails.appendChild(commentMoreInfo);

        const commentLikeIcon = document.createElement('div');
        commentLikeIcon.className = 'commentLikeIcon';
  
        const likeIcon = document.createElement('i');
        likeIcon.classList.add("bi", "bi-heart", "post-icon");
        likeIcon.setAttribute("id", "heart-icon");
        likeIcon.setAttribute("title", "Like");
        let numLikes = 2;
        likeIcon.addEventListener('click', function () {
            if (likeIcon.classList.contains('bi-heart')) {
                likeIcon.classList.remove('bi-heart');
                likeIcon.classList.add('bi-heart-fill');
                likeIcon.style.color = 'rgba(193,42,42,1)';
                likeIcon.setAttribute("title", "Unlike");
                numLikes += 1;
            } else {
                likeIcon.classList.remove('bi-heart-fill');
                likeIcon.classList.add('bi-heart');
                likeIcon.style.color = '';
                likeIcon.setAttribute("title", "Like");
                numLikes -= 1;
            }
            commentLikeNo.textContent = numLikes +" likes";
        });
  
        commentLikeIcon.appendChild(likeIcon);
  
        commentContainer.appendChild(commentMoreDetails);
        commentContainer.appendChild(commentLikeIcon);
  
        commentPageContent.appendChild(commentContainer);
    });
  })();}
// ---------------------
const createSharePostCard = () => {
document.getElementById('overlay').style.display = 'block';
const sharePost = document.createElement('div');
sharePost.classList.add('sharePost');

const closeButton = document.createElement('i');
closeButton.classList.add('bi', 'bi-x-lg', 'thicker-icon');
closeButton.addEventListener('click', () => {
  sharePost.remove(); 
  document.getElementById('overlay').style.display = 'none';
});
sharePost.appendChild(closeButton);

const shareTitle = document.createElement('div');
shareTitle.classList.add('shareTitle');
shareTitle.textContent = 'Share';
sharePost.appendChild(shareTitle);
 
const hr = document.createElement('hr');
sharePost.appendChild(hr);

const toContainer = document.createElement('div');
toContainer.classList.add('to');

const toLabel = document.createElement('p');
toLabel.textContent = 'To:';
toContainer.appendChild(toLabel);

const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Search...';
toContainer.appendChild(searchInput);

sharePost.appendChild(toContainer);
const hr1 = document.createElement('hr');
sharePost.appendChild(hr1);

const chooseAccount = document.createElement('div');
chooseAccount.classList.add('chooseAccount');
// Add options for choosing accounts if needed
// chooseAccount.appendChild(option1);
// chooseAccount.appendChild(option2);
sharePost.appendChild(chooseAccount);

chooseAccount.addEventListener('click', () => {
  sendButton.style.opacity = '1'; 
});

const hr2 = document.createElement('hr');
sharePost.appendChild(hr2);

const shareSend = document.createElement('div');
shareSend.classList.add('share-send');

const sendButton = document.createElement('button');
sendButton.type = 'button';
sendButton.textContent = 'Send';

sendButton.addEventListener('click', () => {
  if(sendButton.style.opacity=='1'){
    document.getElementById('overlay').style.display = 'none';
    
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
postOptions.setAttribute("title","More Options");
postOptions.style.cursor="pointer";

postOptions.addEventListener("click", () => {

  const existingCard = document.querySelector('.extraOption');
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
postImg.setAttribute("src",element.imageUrl);

postContent.appendChild(postImg);

// Post Icons
const postIcons = document.createElement("div");
postIcons.classList.add("post-icons");

const leftIcons = document.createElement("div");
leftIcons.classList.add("left-icons");

const heartIcon = document.createElement("i");
heartIcon.classList.add("bi", "bi-heart", "post-icon",'thicker-icon');
heartIcon.setAttribute("id", "heart-icon");
heartIcon.setAttribute("title", "Like"); 
let numLikes = parseInt(element.likes);
console.log(typeof(numLikes));
heartIcon.addEventListener('click', function() {
if (heartIcon.classList.contains('bi-heart')) {
  heartIcon.classList.remove('bi-heart');
  heartIcon.classList.add('bi-heart-fill');
  heartIcon.style.color = 'rgba(193,42,42,1)';
  heartIcon.setAttribute("title", "Unlike");
  numLikes += 1;
} else {
  heartIcon.classList.remove('bi-heart-fill');
  heartIcon.classList.add('bi-heart');
  heartIcon.style.color = ''; 
  heartIcon.setAttribute("title", "Like");
  numLikes -= 1; 
}
likes.textContent = `${numLikes} likes`;
});


const chatIcon = document.createElement("i");
chatIcon.classList.add("bi", "bi-chat", "post-icon",'thicker-icon');
chatIcon.style.transform = "scaleX(-1)";
chatIcon.setAttribute("title", "Comment");

chatIcon.addEventListener('click', function() {
  getCommentPage(element);
});

const sendIcon = document.createElement("i");
sendIcon.classList.add("bi", "bi-send", "post-icon",'thicker-icon');
sendIcon.setAttribute("title", "Share Post");

sendIcon.addEventListener('click', () => {
  const existingSharePost = document.querySelector('.sharePost');
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
bookmarkIcon.classList.add("bi", "bi-bookmark", "post-icon",'thicker-icon');
bookmarkIcon.setAttribute("id","bookmark-icon");
bookmarkIcon.setAttribute("title", "Save");
bookmarkIcon.addEventListener('click', function() {
  if (bookmarkIcon.classList.contains('bi-bookmark')) {
    bookmarkIcon.classList.remove('bi-bookmark');
    bookmarkIcon.classList.add('bi-bookmark-fill');
    bookmarkIcon.style.color = 'rgb(0,0,0)'; 
    bookmarkIcon.setAttribute("title", "Remove");
  } else {
    bookmarkIcon.classList.remove('bi-bookmark-fill');
    bookmarkIcon.classList.add('bi-bookmark');
    bookmarkIcon.style.color = ''; 
    bookmarkIcon.setAttribute("title", "Save");
  }
});

leftEnd.appendChild(bookmarkIcon);

postIcons.appendChild(leftIcons);
postIcons.appendChild(leftEnd);

// Post Likes
const likes = document.createElement("p");
likes.classList.add("likes");
likes.textContent = element.likes+" likes";

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
commentsLink.addEventListener('click', function() {
  getCommentPage(element);
});

// Post Add Comment Section
const commentSmiley = document.createElement("div");
commentSmiley.classList.add("comment-smiley");


const addComment = document.createElement('input');
addComment.classList.add("addComment");
addComment.type = 'text';
addComment.placeholder = 'Add a comment...';


const smileyIcon = document.createElement("i");
smileyIcon.classList.add("fa-regular", "fa-face-smile", "fa-xs");
smileyIcon.style.color = "#878c94";
smileyIcon.style.paddingTop = "1.063rem";
smileyIcon.setAttribute("title", "Emoji");
smileyIcon.style.cursor="pointer";

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