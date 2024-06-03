import { fetchUserById, fetchExplore } from '../js/apifetch.js';


async function receiveExplore() {
    const data = await fetchExplore();
    const jsonData = [];
    for (const element of data) {
        const {
            id, src, type, userId, location, caption, likes, time, comments
        } = element;
        const user = await fetchUserById(userId);
        const dataObject = {
            id, src, type, userId, location, caption, likes, time, comments, user
        };
        jsonData.push(dataObject);
    }
    return jsonData;
}
let currentIndex = 0;


async function initPosts() {




    function navigatePost(direction) {
        const modalVideo = document.getElementById('modal-post-video');

        if (modalVideo) {
            modalVideo.pause();
            modalVideo.muted = true;
            modalVideo.currentTime = 0;
        }

        console.log("Posts here")
        currentIndex = (currentIndex + direction + posts.length) % posts.length;
        updateModalContent(currentIndex);
    }

    let arrowsIcon = document.getElementsByClassName("arrows-icon")


    console.log(arrowsIcon)
    for (let i = 0; i < arrowsIcon.length; i++) {
        arrowsIcon[i].addEventListener("click", () => {
            navigatePost(arrowsIcon[i].dataset.direction)
        })
    }



    const posts = await receiveExplore();
    console.log(posts);
    function openModal(src, type, username, profilePicture, location, caption, user, likes, time) {
        currentIndex = posts.findIndex(post => post.src === src);
        updateModalContent(currentIndex);
        $('#postModal').modal('show');
    }

    function updateModalContent(index) {
        const post = posts[index];
        const modalVideo = document.getElementById('modal-post-video');

        if (modalVideo) {
            modalVideo.pause();
            modalVideo.muted = false;
            modalVideo.currentTime = 0;
        }

        document.getElementById('modal-post-image').style.display = post.type === 'image' ? 'block' : 'none';
        document.getElementById('modal-post-video').style.display = post.type === 'video' ? 'block' : 'none';
        if (post.type === 'image') {
            document.getElementById('modal-post-image').src = post.src;
        } else {
            document.getElementById('modal-post-video-source').src = post.src;
            document.getElementById('modal-post-video').load();
            document.getElementById('modal-post-video').loop = true;
            document.getElementById('modal-post-video').play();
        }
        document.getElementById('modal-username').innerHTML = post.user.username + " &bull; <span style='color: blue;'>Follow</span>";
        document.getElementById('modal-profile-picture').src = post.user.profilePicture;
        document.getElementById('modal-profile-picture-comments').src = post.user.profilePicture;
        document.getElementById('modal-username2').innerText = post.user.username;

        document.getElementById('postlocation').innerText = getRandomLocation();
        document.getElementById('modal-post-caption').innerText = getRandomCaption();
        document.getElementById('modal-post-hashtag').innerText = getRandomHashtags();
        document.getElementById('liked-by-username').innerText = posts[(currentIndex + 1 + posts.length) % posts.length].user.username;
        let count = post.likes;
        const likeCountElement = document.getElementById("like-count");
        likeCountElement.innerText = count - 1;

        const likeButton = document.getElementById("modal-like-button");

        const newLikeButton = likeButton.cloneNode(true);
        likeButton.parentNode.replaceChild(newLikeButton, likeButton);

        newLikeButton.addEventListener("click", function () {
            this.classList.toggle("liked");
            this.classList.toggle("far");
            this.classList.toggle("fas");
            if (this.classList.contains("liked")) {
                count++;
            } else {
                count--;
            }
            likeCountElement.innerText = count - 1;
        });

        document.getElementById('post-date').innerText = post.time;

        const commentSection = document.getElementById("user-comments");
        commentSection.innerHTML = "";
        for (let i = 0; i < 2; i++) {
            let commentId = post.comments[i];
            const commentDiv = document.createElement("div");
            commentDiv.classList.add("my-2");
            const img = document.createElement("img");
            const commentedUsername = document.createElement("span");
            const comment = document.createElement("span");
            comment.classList.add("fs-14");
            commentedUsername.classList.add("fw-600", "fs-14", "mr-1");
            commentedUsername.style.fontWeight = "600";
            img.classList.add("profile-picture-size", "rounded-circle", "mr-3");

            const randomIndex = Math.floor(Math.random() * posts.length);
            commentedUsername.textContent = posts[randomIndex].user.username;
            img.src = posts[randomIndex].user.profilePicture;
            const usernameAnchorElement = document.createElement("a");
            usernameAnchorElement.href = "./userProfile.html";
            usernameAnchorElement.addEventListener("click", function (event) {
                localStorage.setItem("username", posts[randomIndex].user.username);
            });
            usernameAnchorElement.appendChild(commentedUsername);
            comment.textContent = getRandomComments();
            const commentReply = document.createElement("p");
            commentReply.classList.add('text-muted', 'fs-12', 'ml-5', 'pl-2');
            commentReply.textContent = "1w 2likes Reply"
            commentDiv.appendChild(img);
            commentDiv.appendChild(usernameAnchorElement);
            commentDiv.appendChild(comment);
            commentDiv.appendChild(commentReply);
            commentSection.appendChild(commentDiv);
        }

    }

    function navigatePost(direction) {
        const modalVideo = document.getElementById('modal-post-video');

        if (modalVideo) {
            modalVideo.pause();
            modalVideo.muted = true;
            modalVideo.currentTime = 0;
        }
        direction = Number(direction)
        console.log(direction);
        console.log(posts.length);
        console.log("Posts here")
        console.log(currentIndex);
        currentIndex = (currentIndex + direction + posts.length) % posts.length;
        console.log(currentIndex);
        updateModalContent(currentIndex);
    }


    $('#postModal').on('hidden.bs.modal', function () {
        const modalVideo = document.getElementById('modal-post-video');
        if (modalVideo) {
            modalVideo.pause();
            modalVideo.muted = true;
            modalVideo.currentTime = 0;
        }
    });

    function generateGridItems() {
        const gridContainer = document.getElementById('grid-container');
        gridContainer.innerHTML = '';

        posts.forEach(post => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');

            const imgContainerDiv = document.createElement('div');
            imgContainerDiv.classList.add('img_container');

            if (post.type === 'image') {
                const img = document.createElement('img');
                img.src = post.src;
                img.alt = post.username;
                img.classList.add('img-thumbnail');

                const afterDiv = document.createElement('div');
                afterDiv.classList.add('after');

                const likesDiv = document.createElement('div');
                likesDiv.classList.add('likes');

                const likesContent = `
                    <p><img src="../assets/explore/chat1.png" class="like-img" alt="Comments"> <span class="liketext"><b>${post.comments}</b></span></p>
                    <p><img src="../assets/explore/heart1.png" class="like-img" alt="Likes"> <span class="liketext"><b>${post.likes}</b></span></p>
                `;

                likesDiv.innerHTML = likesContent;
                afterDiv.appendChild(likesDiv);
                imgContainerDiv.appendChild(img);
                imgContainerDiv.appendChild(afterDiv);

                itemDiv.onclick = function () {
                    openModal(post.src, post.type, post.username, post.profilePicture, post.location, post.caption, post.user, post.likes, post.time);
                };
            } else if (post.type === 'video') {
                const video = document.createElement('video');
                video.src = post.src;
                video.classList.add('vida');
                video.loop = true;
                video.autoplay = true;
                video.muted = true;
                video.controls = true;

                const afterDiv = document.createElement('div');
                afterDiv.classList.add('after');

                const likesDiv = document.createElement('div');
                likesDiv.classList.add('vid_likes');

                const likesContent = `
                    <p><img src="../assets/explore/chat1.png" class="like-img" alt="Comments"> <span class="liketext"><b>${post.comments}</b></span></p>
                    <p><img src="../assets/explore/heart1.png" class="like-img" alt="Likes"> <span class="liketext"><b>${post.likes}</b></span></p>
                `;

                likesDiv.innerHTML = likesContent;
                afterDiv.appendChild(likesDiv);
                imgContainerDiv.appendChild(video);
                imgContainerDiv.appendChild(afterDiv);

                itemDiv.onclick = function () {
                    openModal(post.src, post.type, post.username, post.profilePicture, post.location, post.caption, post.user, post.likes, post.time);
                };
            }

            itemDiv.appendChild(imgContainerDiv);
            gridContainer.appendChild(itemDiv);
        });
    }

    generateGridItems();
}

initPosts();

function getRandomComments() {
    const comments = ["Beautiful picture! 😍",
        "Wow, stunning shot! 👌",
        "Love your feed! 💖",
        "Absolutely amazing! 😊",
        "Great capture! 🔥",
        "Incredible photo! 📸",
        "This is so inspiring! ✨",
        "You're so talented! 👏",
        "I'm obsessed with your content! 🙌",
        "You never disappoint! 💯",
        "Keep up the fantastic work! 💪",
        "I can't get enough of your posts! ❤️",
        "You always find the best angles! 📷",
        "Such a creative shot! 🌟",
        "This deserves to go viral! 🚀"];
    return comments[Math.floor(Math.random() * comments.length)];
}

function getRandomCaption() {
    const captions = [
        "Embark on a journey into the colors and richness of India! 🌈 Discover beauty within and see the world through your eyes. 🌍",
        "Explore the mysterious and ancient cities of India. 🏰 Awaken the traveler within and unearth treasures of history. 🗺️",
        "Venture into the tranquility and greenery. 🌿 A splendid journey to special places for nature lovers. 🌳",
        "Balance your life with spirituality. 🙏 A new journey through experiences of yoga and meditation. 🧘",
        "Get lost in the romance of India. 💑 Tales of love and adventure in Rajasthan. 💞",
        "Immerse yourself in the vibrant lanes of Indian markets. 🛍️ Enjoy local artists' designs and their stories. 🎨",
        "Get lost in the rays of the sun. 🌞 A journey to Himalayan beauty spots and sunrises. 🏔️",
        "A journey outside India with an Indian teenager. 🚀 Their first steps into a world journey. 🌏",
        "Experience the tranquility of riverside escapes. 🌊 Discover hidden gems and unwind in nature's embrace. 🌿",
        "Celebrate the vibrancy of Indian festivals. 🎉 Immerse in colors, music, and joyous traditions. 🌈",
        "Captivate your senses with Indian flavors. 🍲 A culinary journey through diverse tastes and spices. 🌶️",
        "Indulge in the charm of rural life. 🌾 Discover simplicity, community, and heartwarming experiences. 🏡",
        "Explore the magic of Indian art and craftsmanship. 🎨 Marvel at intricate designs and cultural expressions. ✨",
        "Experience the grandeur of ancient forts and palaces. 🏰 Dive into history and architectural wonders. 🏛️",
        "Discover the beauty of Indian landscapes. 🌄 From rolling hills to serene beaches, nature's wonders await. 🏖️",
        "Unleash the adventurer within. 🌍 Embark on thrilling experiences and global explorations. 🗺️",
        "Savor the sweetness of Indian desserts. 🍰 Dive into a world of flavors and culinary delights. 🍬",
        "Appreciate the grace of classical dance forms. 💃 Witness performances that embody culture and elegance. 🎭",
        "Explore the colors and patterns of Indian fashion. 👗 Embrace traditional attire and modern trends. 💄",
        "Connect with the warmth of Indian hospitality. 🤗 Experience traditions, kindness, and cultural richness. 🏠",
        "Marvel at the wonders of Indian wildlife. 🦁 Explore diverse ecosystems and encounter majestic creatures. 🐅",
    ];
    return captions[Math.floor(Math.random() * captions.length)];
}

function getRandomHashtags() {
    const hashtags = [
        "#TravelDiaries #FoodieLife #FitnessGoals #MotivationMonday #Fashionista",
        "#GamingCommunity #BookLoverReads #MovieBuffLife #TechGeeky #EntrepreneurLife",
        "#NaturePhotography #ArtisticSoul #MusicLoverVibes #PetLoverLife #SelfieTimeFun",
        "#ThrowbackThursdayVibes #WorkoutMotivation #HealthyLivingJourney #DIYProjectsInspiration #CookingAdventures",
        "#AdventureSeeker #Wanderlust #InspirationalQuotesDaily #LifeHacks #MindfulnessJourney",
        "#YogaJourney #PositiveVibesOnly #CommunityLove #AnimalRightsAdvocate #GreenLivingTips",
        "#SupportLocalBusinesses #OnlineLearning #FitnessJourney #TravelInspiration #ProductivityHacks",
        "#HomeDecorInspo #PlantParenting #FashionTrends #TechInnovations #MotivationalSpeakerLife",
        "#FilmEnthusiast #EnvironmentalActivist #ArtistOnInstagram #MusicFestivalLover #PetAdoptionAdvocate",
        "#ThrowbackMoments #GymLife #HealthyRecipesIdeas #CraftingIdeas #OutdoorAdventures",
        "#BeautyEnthusiast #MindsetMatters #RelationshipGoals #CoffeeLover #MorningRoutineInspiration",
        "#FoodPhotography #AdventureTime #DigitalNomadLife #EntrepreneurMindset #CreativityEveryday",
        "#HealthyHabits #TechAddict #MotivationForDays #DailyInspiration #MindsetShift",
        "#GymMotivation #FashionStyle #TechSavvyLife #MotivationalQuotes #LifeLessonsLearned",
        "#CreativeMinds #AdventureAwaits #Innovation #TechLife #FitnessFreak",
        "#FoodHeaven #ExploreMore #DigitalMarketing #InspireOthers #HealthyChoices",
        "#TechGadgets #MotivationNation #DailyHustle #HealthyEating #OutdoorLife",
        "#FashionDesign #TechNews #SelfImprovement #CookingTime #AdventureCalls",
        "#BeautyTrends #MindfulnessPractice #RelationshipBuilding #CoffeeTime #MorningVibes",
        "#FoodLover #OutdoorLifeStyle #EntrepreneurialSpirit #CreativityUnleashed #HealthyLivingTips",
        "#TechWorld #MotivationQuotes #DailyInspire #LifeGoals #CreativeJuicesFlowing",
        "#GymLifeStyle #FashionTrends #TechEnthusiast #MotivationEveryday #MindsetMattersMost",
        "#CreativeJourney #AdventureTravel #InnovativeThinking #TechObsessed #FitnessGoals",
        "#FoodJunkie #ExploreNature #DigitalNomadLife #EntrepreneurLifeStyle #CreativityAtWork",
        "#HealthyRecipesIdeas #TechInnovation #MotivationMondayVibes #DailyInspirationQuotes #LifeLessonsLearned",
        "#CreativeIdeas #AdventureSeeker #InnovationNation #TechLifeStyle #FitnessFreak",
        "#FoodieForLife #ExploreMorePlaces #DigitalMarketingTips #InspireOthersDaily #HealthyChoicesEveryDay",
        "#TechGadgetsLover #MotivationNation #DailyHustleQuotes #HealthyEatingHabits #OutdoorLifeStyle",
        "#FashionDesigners #TechNewsUpdate #SelfImprovementJourney #CookingTimeIsFun #AdventureIsOutThere",
        "#BeautyTrends #MindfulnessPracticeDaily #RelationshipBuildingGoals #CoffeeTimeIsHappyTime #MorningVibesDaily",
        "#FoodLoversUnite #OutdoorLifeLovers #EntrepreneurialSpirit #CreativityUnleashed #HealthyLivingTipsAndTricks"
    ];
    return hashtags[Math.floor(Math.random() * hashtags.length)];
}
function getRandomLocation() {
    const locations = [
        "Paris, France",
        "New York City, USA",
        "Tokyo, Japan",
        "London, UK",
        "Rome, Italy",
        "Sydney, Australia",
        "Rio de Janeiro, Brazil",
        "Cape Town, South Africa",
        "Moscow, Russia",
        "Dubai, UAE",
        "Toronto, Canada",
        "Mumbai, India",
        "Seoul, South Korea",
        "Berlin, Germany",
        "Mexico City, Mexico"
    ];
    return locations[Math.floor(Math.random() * locations.length)];
}

document.getElementById("searchBox").addEventListener("click",openSearchBox);
var Searchbox = false;
function openSearchBox() {
    var upsearchbox = document.getElementById("find");
    document.getElementById('grid-container').style.zIndex="-1"
    Searchbox = !Searchbox;
    if (Searchbox) {
        upsearchbox.classList.add("show-search");
    } else {
        upsearchbox.classList.remove("show-search");
        document.getElementById('grid-container').style.zIndex="0"
    }

}

document.addEventListener('DOMContentLoaded', () => {
    displayRecentSearches();

    const searchInput = document.getElementById('search-input');
    const clearIcon = document.getElementById('clear-input');

    searchInput.addEventListener('keypress', handleSearch);
    searchInput.addEventListener('input', () => {
        clearIcon.style.display = searchInput.value ? 'block' : 'none';
    });

    clearIcon.addEventListener('click', () => {
        searchInput.value = '';
        clearIcon.style.display = 'none';
    });
});

function handleSearch(event) {
    if (event.key === 'Enter') {
        const query = event.target.value;
        if (query) {
            saveSearch(query);
            displayRecentSearches();
            event.target.value = '';
            document.getElementById('clear-input').style.display = 'none';
        }
    }
}

function saveSearch(query) {
    let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    if (!recentSearches.includes(query)) {
        recentSearches.push(query);
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }
}

function displayRecentSearches() {
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    const recentSearchesContainer = document.getElementById('recent-searches');

    if (recentSearches.length === 0) {
        recentSearchesContainer.innerHTML = '<p>No recent searches.</p>';
    } else {
        recentSearchesContainer.innerHTML = recentSearches.map(search => `
              <p>${search} <i class="bi bi-x-circle remove-icon" onclick="removeSearch('${search}')"></i></p>
            `).join('');
    }
}

function clearSearches() {
    localStorage.removeItem('recentSearches');
    displayRecentSearches();
}

function removeSearch(search) {
    let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    recentSearches = recentSearches.filter(item => item !== search);
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    displayRecentSearches();
}
