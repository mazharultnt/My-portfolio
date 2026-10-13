// Menu, skill tabs, project filter and contact form check.

// ---------- Mobile menu ----------
var menuButton = document.getElementById("menu-button");
var mainNav = document.getElementById("main-nav");

menuButton.addEventListener("click", function () {
  var isOpen = mainNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

// Close the menu after a link is clicked
mainNav.addEventListener("click", function (event) {
  if (event.target.tagName === "A") {
    mainNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

// ---------- Skills ----------
var skillTabs = document.getElementById("skill-tabs");
var skillList = document.getElementById("skill-list");

function showSkills(groupName) {
  var buttons = skillTabs.querySelectorAll(".tab");
  buttons.forEach(function (button) {
    button.classList.toggle("active", button.textContent === groupName);
  });

  skillList.innerHTML = skillGroups[groupName]
    .map(function (skill) {
      return "<li>" + skill.name + "<small>" + skill.note + "</small></li>";
    })
    .join("");
}

Object.keys(skillGroups).forEach(function (groupName) {
  var button = document.createElement("button");
  button.type = "button";
  button.className = "tab";
  button.textContent = groupName;
  button.addEventListener("click", function () {
    showSkills(groupName);
  });
  skillTabs.appendChild(button);
});
showSkills("Languages");

// ---------- Projects ----------
var filterBox = document.getElementById("project-filters");
var projectGrid = document.getElementById("project-grid");

function showProjects(type) {
  var buttons = filterBox.querySelectorAll(".tab");
  buttons.forEach(function (button) {
    button.classList.toggle("active", button.textContent === type);
  });

  var list = projectList.filter(function (project) {
    return type === "All" || project.type === type;
  });

  projectGrid.innerHTML = list
    .map(function (project) {
      return (
        '<article class="project-card">' +
        '<div class="project-image"><img src="' + project.image + '" alt="' + project.title + '" onerror="this.style.display=\'none\'"></div>' +
        '<div class="project-body">' +
        "<h3>" + project.title + "</h3>" +
        '<p class="project-tech">' + project.tech + "</p>" +
        "<p>" + project.text + "</p>" +
        '<div class="project-links">' +
        '<a class="btn btn-small" href="' + project.live + '" target="_blank" rel="noopener">Live demo</a>' +
        '<a class="btn btn-small btn-outline" href="' + project.code + '" target="_blank" rel="noopener">GitHub</a>' +
        "</div>" +
        "</div>" +
        "</article>"
      );
    })
    .join("");
}

var filterTypes = ["All"];
projectList.forEach(function (project) {
  if (filterTypes.indexOf(project.type) === -1) {
    filterTypes.push(project.type);
  }
});

filterTypes.forEach(function (type) {
  var button = document.createElement("button");
  button.type = "button";
  button.className = "tab";
  button.textContent = type;
  button.addEventListener("click", function () {
    showProjects(type);
  });
  filterBox.appendChild(button);
});
showProjects("All");

// ---------- Contact form ----------
var form = document.getElementById("contact-form");
var success = document.getElementById("form-success");

function setError(id, message) {
  document.getElementById(id + "-error").textContent = message;
  document.getElementById(id).classList.toggle("input-error", message !== "");
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  var valid = true;

  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var message = document.getElementById("message").value.trim();

  if (name.length < 2) {
    setError("name", "Please enter your name.");
    valid = false;
  } else {
    setError("name", "");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("email", "Please enter a valid email address.");
    valid = false;
  } else {
    setError("email", "");
  }

  if (message.length < 10) {
    setError("message", "Your message should be at least 10 characters.");
    valid = false;
  } else {
    setError("message", "");
  }

  success.hidden = !valid;
  if (valid) {
    // This is a demo, so the message is not sent anywhere.
    form.reset();
  }
});

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
