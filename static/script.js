// static/script.js

document.addEventListener("DOMContentLoaded", function () {
    updatePostContainer();
});

function showPostForm() {
    const modal = document.getElementById("postModal");
    modal.style.display = "block";
}

function closePostModal() {
    const modal = document.getElementById("postModal");
    modal.style.display = "none";
}

async function submitPost() {
    const imageInput = document.getElementById("imageInput");
    const captionInput = document.getElementById("captionInput");

    const imageUrl = imageInput.files.length > 0 ? URL.createObjectURL(imageInput.files[0]) : null;
    const caption = captionInput.value;

    if (caption.trim() !== "") {
        const response = await fetch('posts.json');
        const data = await response.json();
        const posts = data.posts;

        const newPost = {
            id: posts.length + 1,
            imageUrl: imageUrl,
            caption: caption,
            likes: 0,
            dislikes: 0
        };

        posts.unshift(newPost);

        await fetch('https://api.github.com/repos/finlayhlannon/Blinkr/contents/posts.json', {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer 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',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Add new post',
                content: btoa(JSON.stringify({ posts: posts })),
                sha: data.sha,
            }),
        });

        updatePostContainer();
        closePostModal();
    } else {
        alert("Please enter a caption before posting.");
    }
}

function updatePostContainer() {
    const postContainer = document.getElementById("post-container");

    fetch('posts.json')
        .then(response => response.json())
        .then(data => {
            const posts = data.posts;

            postContainer.innerHTML = "";

            posts.forEach(post => {
                const postElement = document.createElement("div");
                postElement.className = "post";

                if (post.imageUrl) {
                    const imgElement = document.createElement("img");
                    imgElement.src = post.imageUrl;
                    imgElement.alt = "Post Image";
                    postElement.appendChild(imgElement);
                }

                const captionElement = document.createElement("p");
                captionElement.className = "post-caption";
                captionElement.textContent = post.caption;
                postElement.appendChild(captionElement);

                const interactionButtonsElement = document.createElement("div");
                interactionButtonsElement.className = "interaction-buttons";

                const likeButtonElement = document.createElement("button");
                likeButtonElement.className = "like-button";
                likeButtonElement.textContent = "Like";
                likeButtonElement.dataset.postId = post.id;
                interactionButtonsElement.appendChild(likeButtonElement);

                const likeCountElement = document.createElement("span");
                likeCountElement.className = "like-count";
                likeCountElement.textContent = post.likes;
                interactionButtonsElement.appendChild(likeCountElement);

                const dislikeButtonElement = document.createElement("button");
                dislikeButtonElement.className = "dislike-button";
                dislikeButtonElement.textContent = "Dislike";
                dislikeButtonElement.dataset.postId = post.id;
                interactionButtonsElement.appendChild(dislikeButtonElement);

                const dislikeCountElement = document.createElement("span");
                dislikeCountElement.className = "dislike-count";
                dislikeCountElement.textContent = post.dislikes;
                interactionButtonsElement.appendChild(dislikeCountElement);

                postElement.appendChild(interactionButtonsElement);

                postContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error('Error fetching or updating posts:', error);
        });
}

window.onclick = function (event) {
    const modal = document.getElementById("postModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
