console.log("HELLO");

const submitBtn = document.querySelector(".button-action button");
const input = document.querySelector(".input-action input");
const ul = document.querySelector(".website-list ul");

const websites = [];

async function goSite(e) {
  try {
    const targetWebsite = e.target.parentElement.dataset.website;
    const res = await fetch(
      `https://recruitment-task-website.herokuapp.com/${targetWebsite}`
    );

    window.location.href = `https://recruitment-task-website.herokuapp.com/${targetWebsite}`;
  } catch (err) {
    console.log(err);
  }
}

const addWebsite = (e) => {
  e.preventDefault();

  const targetWebsite = input.value;
  if (targetWebsite === "") return;
  ul.innerHTML = "";
  console.log(targetWebsite);
  websites.push(targetWebsite);
  console.log("klik - add website");

  websites.map((website) => {
    const li = document.createElement("li");
    li.setAttribute("data-website", website);
    li.classList.add("list-item");
    const a = document.createElement("a");
    const button = document.createElement("button");
    button.innerText = "Go site";
    button.onclick = goSite;
    a.innerText = website;
    li.appendChild(a);
    li.appendChild(button);
    ul.appendChild(li);
  });

  input.value = "";
};

submitBtn.addEventListener("click", (e) => addWebsite(e));
