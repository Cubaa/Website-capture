class App {
  constructor() {
    this.websites = [];
    this.submitBtn = document.querySelector(".button-action button");
    this.input = document.querySelector(".input-action input");
    this.list = document.querySelector(".website-list ul");
    this.targetWebsite = "";
    this.websiteName = "";
    this.localStorage = window.localStorage;
    this.submitBtn.addEventListener("click", (e) => this.addWebsite(e));
    this.loadDataFromLocalStorage();
  }

  renderWebsitesList() {
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
  }
  addWebsite(e) {
    e.preventDefault();
    console.log(e);
    this.targetWebsite = this.input.value;
    console.log(this.targetWebsite);
    if (this.targetWebsite === "") return;
    this.list.innerHTML = "";

    this.websites.push(this.targetWebsite);
    this.renderWebsitesList();

    this.localStorage.setItem("websiteNames", JSON.stringify(this.websites));
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

  loadDataFromLocalStorage() {
    this.websites = JSON.parse(this.localStorage.getItem("websiteNames"));
    this.renderWebsitesList();
  }
}

const app = new App();
