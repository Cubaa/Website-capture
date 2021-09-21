console.log("HELLO");

class App {
  constructor() {
    this.websites = [];
    this.submitBtn = document.querySelector(".button-action button");
    this.input = document.querySelector(".input-action input");
    this.list = document.querySelector(".website-list ul");
    this.targetWebsite = "";
    this.websiteName = "";
    this.submitBtn.addEventListener("click", (e) => this.addWebsite(e));
  }

  addWebsite(e) {
    e.preventDefault();
    console.log(e);
    this.targetWebsite = this.input.value;
    console.log(this.targetWebsite);
    if (this.targetWebsite === "") return;
    this.list.innerHTML = "";

    this.websites.push(this.targetWebsite);

    this.websites.map((website) => {
      const li = document.createElement("li");
      li.setAttribute("data-website", website);
      li.classList.add("list-item");
      const a = document.createElement("a");
      const button = document.createElement("button");
      button.innerText = "Go site";
      button.onclick = this.goSite;
      a.innerText = website;
      li.appendChild(a);
      li.appendChild(button);
      this.list.appendChild(li);
    });

    this.input.value = "";
  }

  async goSite(e) {
    try {
      this.websiteName = e.target.parentElement.dataset.website;
      const res = await fetch(
        `https://recruitment-task-website.herokuapp.com/${this.websiteName}`
      );

      window.location.href = `https://recruitment-task-website.herokuapp.com/${this.websiteName}`;
    } catch (err) {
      console.log(err);
    }
  }
}

const app = new App();
