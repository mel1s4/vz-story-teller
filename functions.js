

document.addEventListener("click", (e) =>  {
  if (e.target.hasAttribute("data-vzst-add")) {
    const title = document.getElementById("vzst-posts-title").value;
    if (title === "") {
      return;
    }
    const example = document.querySelector(".vzst-post-item:first-child");
    const clone = example.cloneNode(true);
    const id = document.getElementById("vzst-posts").value;
    clone.querySelector(".vzst-post-title").innerText = title;
    clone.querySelector(".post_id").value = id;
    const list = document.getElementById("vzst-post-list");
    list.appendChild(clone);
    // remove from the select
    const postTitle = document.getElementById("vzst-posts-title");
    if (id !== "new") {
      const select = document.getElementById("vzst-posts");
      const option = select.querySelector(`option[value="${id}"]`);
      if (option) {
        option.remove();
      }
      postTitle.removeAttribute("disabled");
    }
    postTitle.value = "";
  }
  if (e.target.hasAttribute("data-vzst-remove")) {
    const item = e.target.closest(".vzst-post-item");
    if (item) {
      item.remove();
    }
  }
  if (e.target.hasAttribute("data-vzst-up")) {
    const item = e.target.closest(".vzst-post-item");
    if (item) {
      const prev = item.previousElementSibling;
      const pPrev = prev ? prev.previousElementSibling : null;
      if (pPrev) {
        item.parentNode.insertBefore(item, prev);
      }
    }
  }
  if (e.target.hasAttribute("data-vzst-down")) {
    const item = e.target.closest(".vzst-post-item");
    if (item) {
      const next = item.nextElementSibling;
      if (next) {
        item.parentNode.insertBefore(next, item);
      }
    }
  }



});

document.getElementById("vzst-posts").addEventListener("change", (e) => {
  const postTitle = document.getElementById("vzst-posts-title");
  if (e.target.value === "new") {
    // enable the input field
    postTitle.removeAttribute("disabled");
    postTitle.value = "";
  } else {
    // disable the input field
    postTitle.setAttribute("disabled", "disabled");
    const post = document.querySelector(`option[value="${e.target.value}"]`);
    postTitle.value = post.innerText.replace(/\s+/g, " "); 
  }
});