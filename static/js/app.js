const username = "admin";

function renderPost(post) {
  const template = document
    .getElementById("post-template")
    .content.cloneNode(true);
  template.querySelector(".username").innerText = post.username;
  template.querySelector(".message").innerText = post.message;
  document.getElementById("feed").appendChild(template);
}

function submitPost() {
  const message = document.getElementById("postInput").value;
  try {
    const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            message: message,
        }),
    });
    if (response.ok) {
        renderPost({ username: username, message: message})
        document.getElementById("postInput").value = ""; 
    }

  }
  catch (error) {
    console.error("Error Submitting Post: ", error)
  }
}

window.onload = async () => {
    try {
        const reponse = await fetch("/api/posts")
        const posts = await response.json();;
        posts.forEach((post) =>renderPost(post));
    } catch (error) {
        console.error("error fetching posts...", error);
    }
    
};

