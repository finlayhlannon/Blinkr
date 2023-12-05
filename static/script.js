// static/script.js

// Sample data structure to store posts
let posts = [];

document.addEventListener("DOMContentLoaded", function () {
    updatePostContainer();
});

// Function to show the post creation modal
function showPostForm() {
    const modal = document.getElementById("postModal");
    modal.style.display = "block";
}

// Function to close the post creation modal
function closePostModal() {
    const modal = document.getElementById("postModal");
    modal.style.display = "none";
}

// Function to handle post submission
function submitPost() {
    const imageInput = document.getElementById("imageInput");
    const captionInput = document.getElementById("captionInput");

    const imageUrl = imageInput.files.length > 0 ? URL.createObjectURL(imageInput.files[0]) : null;
    const caption = captionInput.value;

    if (caption.trim() !== "") {
        const newPost = { id: posts.length + 1, imageUrl, caption };
        posts.unshift(newPost);
        updatePostContainer();
        closePostModal();
    } else {
        alert("Please enter a caption before posting.");
    }
}

// Function to update the post container on the page
function updatePostContainer() {
    const postContainer = document.getElementById("post-container");
    // Clear existing posts
    postContainer.innerHTML = "";
    // Render the updated posts
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

        postContainer.appendChild(postElement);
    });
}

// Close the modal if the user clicks outside of it
window.onclick = function (event) {
    const modal = document.getElementById("postModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
