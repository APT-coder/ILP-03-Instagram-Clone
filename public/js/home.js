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
  // storyImage.addEventListener("click",()=>{
  //     pauseInterval()
  // })
  