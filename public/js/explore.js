const posts = [
    {
        src: '../assets/explore/ex3.jpeg',
        type: 'image',
        username: 'user1',
        profilePicture: '../assets/explore/logo.png',
        location: 'Random Location 1',
        caption: 'Caption goes here...',
        user: 'user1',
        likes: 100,
        time: '1 hour ago',
        comments: 3
    },
    {
        src: '../assets/explore/padosi.jfif',
        type: 'image',
        username: 'user2',
        profilePicture: '../assets/explore/logo.png',
        location: 'Random Location 2',
        caption: 'Caption goes here...',
        user: 'user2',
        likes: 150,
        time: '2 hours ago',
        comments: 5
    },
    {
        src: '../assets/explore/video1.mp4',
        type: 'video',
        username: 'user3',
        profilePicture: '../assets/explore/logo.png',
        location: 'Random Location 3',
        caption: 'Caption goes here...',
        user: 'user3',
        likes: 200,
        time: '3 hours ago',
        comments: 8
    },
    {
        src: '../assets/explore/meet.jpg',
        type: 'image',
        username: 'user4',
        profilePicture: '../assets/explore/logo.png',
        location: 'Random Location 4',
        caption: 'Caption goes here...',
        user: 'user4',
        likes: 50,
        time: '4 hours ago',
        comments: 2
    },
    {
        src: '../assets/explore/vido.mp4',
        type: 'video',
        username: 'user5',
        profilePicture: '../assets/explore/logo.png',
        location: 'Random Location 5',
        caption: 'Caption goes here...',
        user: 'user5',
        likes: 250,
        time: '5 hours ago',
        comments: 10
    },
    {
        src: '../assets/explore/minato.jfif',
        type: 'image',
        username: 'user6',
        profilePicture: 'assets/logo.png',
        location: 'Random Location 6',
        caption: 'Caption goes here...',
        user: 'user6',
        likes: 75,
        time: '6 hours ago',
        comments: 4
    },
    {
        src: '../assets/explore/sims.png',
        type: 'image',
        username: 'user7',
        profilePicture: '../assets/explore/logo.png',
        location: 'Random Location 7',
        caption: 'Caption goes here...',
        user: 'user7',
        likes: 120,
        time: '7 hours ago',
        comments: 6
    },
    {
        src: '../assets/explore/unf.jfif',
        type: 'image',
        username: 'user8',
        profilePicture: '../assets/explore/logo.png',
        location: 'Random Location 8',
        caption: 'Caption goes here...',
        user: 'user8',
        likes: 90,
        time: '8 hours ago',
        comments: 5
    },
    {
        src: '../assets/explore/ex6.jpg',
        type: 'image',
        username: 'user9',
        profilePicture: '../assets/explore/logo.png',
        location: 'Random Location 9',
        caption: 'Caption goes here...',
        user: 'user9',
        likes: 60,
        time: '9 hours ago',
        comments: 3
    },
    {
        src: '../assets/explore/chill.jfif',
        type: 'image',
        username: 'user10',
        profilePicture: '../assets/explore/logo.png',
        location: 'Random Location 10',
        caption: 'Caption goes here...',
        user: 'user10',
        likes: 180,
        time: '10 hours ago',
        comments: 7
    }
];


let currentIndex = 0;

function openModal(src, type, username, profilePicture, location, caption, user, likes, time) {
    currentIndex = posts.findIndex(post => post.src === src);
    updateModalContent(currentIndex);
    $('#postModal').modal('show');
}

function updateModalContent(index) {
    const post = posts[index];
    document.getElementById('modal-post-image').style.display = post.type === 'image' ? 'block' : 'none';
    document.getElementById('modal-post-video').style.display = post.type === 'video' ? 'block' : 'none';
    if (post.type === 'image') {
        document.getElementById('modal-post-image').src = post.src;
    } else {
        document.getElementById('modal-post-video-source').src = post.src;
        document.getElementById('modal-post-video').load();
        document.getElementById('modal-post-video').loop=true;
        document.getElementById('modal-post-video').play();
    }
    document.getElementById('modal-username').innerText = post.username;
    document.getElementById('modal-profile-picture').src = post.profilePicture;
    document.getElementById('modal-profile-picture-comments').src = post.profilePicture;
    document.getElementById('postlocation').innerText = post.location;
    document.getElementById('modal-post-caption').innerText = post.caption;
    document.getElementById('liked-by-username').innerText = post.user;
    document.getElementById('like-count').innerText = post.likes;
    document.getElementById('post-date').innerText = post.time;
}

function navigatePost(direction) {
    currentIndex = (currentIndex + direction + posts.length) % posts.length;
    updateModalContent(currentIndex);
}