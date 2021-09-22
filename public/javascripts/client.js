class App {
  constructor() {
    App.websites = [];
    this.submitBtn = document.querySelector(".button-action button");
    this.input = document.querySelector(".input-action input");
    this.list = document.querySelector(".websites-list ul");
    this.targetWebsite = "";
    this.websiteName = "";
    this.localStorage = window.localStorage;
    this.submitBtn.addEventListener("click", (e) => this.addWebsite(e));
    this.loadDataFromLocalStorage();
  }

  renderWebsitesList() {
    if (this.localStorage.length !== 0 || App.websites.length !== 0) {
      const removeAllbtn = document.createElement("button");
      removeAllbtn.innerText = "Remove all elements";
      removeAllbtn.classList.add("removeAllBtn");
      removeAllbtn.onclick = this.removeAllElements.bind(this.list);
      this.list.appendChild(removeAllbtn);
    }
    App.websites.map((website) => {
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

    this.targetWebsite = this.input.value;

    if (this.targetWebsite === "") {
      this.input.style.border = "1px solid #FF0000";
      return;
    } else this.input.style.border = "1px solid #000";
    this.list.innerHTML = "";

    App.websites.push(this.targetWebsite);
    this.renderWebsitesList();

    this.localStorage.setItem("websiteNames", JSON.stringify(App.websites));
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
    if (this.localStorage["websiteNames"]) {
      let data = JSON.parse(this.localStorage.getItem("websiteNames"));
      if (data === null) App.websites = [];
      else App.websites = data;
      this.renderWebsitesList();
    }
  }

  removeAllElements() {
    this.innerHTML = "";
    App.websites.length = 0;
    window.localStorage.setItem("websiteNames", []);
  }
}

const app = new App();
