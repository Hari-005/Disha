(function () {
  var data = normalizeData(window.dishaData || {});
  var resourceState = {
    query: "",
    category: "All",
    department: "All",
    semester: "All",
    scheme: "All",
    sort: "updated-desc"
  };
  var scholarshipStatus = "All";
  var toastTimer;

  var els = {
    globalSearch: document.getElementById("globalSearch"),
    heroSearchButton: document.getElementById("heroSearchButton"),
    resourceSearch: document.getElementById("resourceSearch"),
    categoryTabs: document.getElementById("categoryTabs"),
    departmentFilter: document.getElementById("departmentFilter"),
    semesterFilter: document.getElementById("semesterFilter"),
    schemeFilter: document.getElementById("schemeFilter"),
    sortFilter: document.getElementById("sortFilter"),
    resourceCount: document.getElementById("resourceCount"),
    resourceGrid: document.getElementById("resourceGrid"),
    resetFilters: document.getElementById("resetFilters"),
    scholarshipFilters: document.getElementById("scholarshipFilters"),
    scholarshipGrid: document.getElementById("scholarshipGrid"),
    contactGrid: document.getElementById("contactGrid"),
    statResources: document.getElementById("statResources"),
    statDepartments: document.getElementById("statDepartments"),
    statScholarships: document.getElementById("statScholarships"),
    toast: document.getElementById("toast"),
    nav: document.querySelector(".site-nav"),
    menuToggle: document.querySelector(".menu-toggle")
  };

  function unique(values) {
    return Array.from(new Set(values.filter(Boolean))).sort(function (a, b) {
      return a.localeCompare(b, undefined, { numeric: true });
    });
  }

  function normalizeData(nextData) {
    return {
      resources: Array.isArray(nextData.resources) ? nextData.resources : [],
      scholarships: Array.isArray(nextData.scholarships) ? nextData.scholarships : [],
      contacts: Array.isArray(nextData.contacts) ? nextData.contacts : []
    };
  }

  function isRealUrl(url) {
    return Boolean(url && url !== "#");
  }

  function formatDate(value) {
    if (!value) {
      return "Not dated";
    }

    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(new Date(value));
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    els.toast.textContent = message;
    els.toast.classList.add("is-visible");
    toastTimer = setTimeout(function () {
      els.toast.classList.remove("is-visible");
    }, 2600);
  }

  function normalize(value) {
    return String(value || "").toLowerCase();
  }

  function resourceMatchesQuery(resource, query) {
    if (!query) {
      return true;
    }

    var haystack = [
      resource.title,
      resource.category,
      resource.department,
      resource.semester,
      resource.scheme,
      resource.subject,
      resource.description,
      (resource.tags || []).join(" ")
    ].join(" ");

    return normalize(haystack).includes(normalize(query));
  }

  function getFilteredResources() {
    var filtered = data.resources.filter(function (resource) {
      return (
        resourceMatchesQuery(resource, resourceState.query) &&
        (resourceState.category === "All" || resource.category === resourceState.category) &&
        (resourceState.department === "All" || resource.department === resourceState.department) &&
        (resourceState.semester === "All" || resource.semester === resourceState.semester) &&
        (resourceState.scheme === "All" || resource.scheme === resourceState.scheme)
      );
    });

    return filtered.sort(function (a, b) {
      if (resourceState.sort === "title-asc") {
        return a.title.localeCompare(b.title);
      }

      if (resourceState.sort === "semester-asc") {
        return a.semester.localeCompare(b.semester, undefined, { numeric: true });
      }

      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
  }

  function createOption(value) {
    var option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    return option;
  }

  function populateSelect(select, values) {
    select.innerHTML = "";
    ["All"].concat(values).forEach(function (value) {
      select.appendChild(createOption(value));
    });
  }

  function renderCategoryTabs() {
    var categories = ["All"].concat(unique(data.resources.map(function (resource) {
      return resource.category;
    })));

    els.categoryTabs.innerHTML = "";
    categories.forEach(function (category) {
      var button = document.createElement("button");
      button.className = "tab-button";
      button.type = "button";
      button.textContent = category;
      button.setAttribute("aria-pressed", String(resourceState.category === category));
      button.addEventListener("click", function () {
        resourceState.category = category;
        renderResources();
        renderCategoryTabs();
      });
      els.categoryTabs.appendChild(button);
    });
  }

  function renderScholarshipFilters() {
    var statuses = ["All"].concat(unique(data.scholarships.map(function (scholarship) {
      return scholarship.status;
    })));

    els.scholarshipFilters.innerHTML = "";
    statuses.forEach(function (status) {
      var button = document.createElement("button");
      button.className = "status-button";
      button.type = "button";
      button.textContent = status;
      button.setAttribute("aria-pressed", String(scholarshipStatus === status));
      button.addEventListener("click", function () {
        scholarshipStatus = status;
        renderScholarshipFilters();
        renderScholarships();
      });
      els.scholarshipFilters.appendChild(button);
    });
  }

  function iconCopy() {
    return [
      '<svg viewBox="0 0 24 24" aria-hidden="true">',
      '<path d="M8 8h10v12H8z"></path>',
      '<path d="M6 16H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>',
      "</svg>"
    ].join("");
  }

  function badgeClass(category) {
    return "badge badge-" + normalize(category).replace(/\s+/g, "-");
  }

  function renderResources() {
    var resources = getFilteredResources();
    els.resourceGrid.innerHTML = "";
    els.resourceCount.textContent = resources.length + " resource" + (resources.length === 1 ? "" : "s") + " shown";

    if (!resources.length) {
      var empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "No resources match the selected filters.";
      els.resourceGrid.appendChild(empty);
      return;
    }

    resources.forEach(function (resource) {
      var hasUrl = isRealUrl(resource.driveUrl);
      var article = document.createElement("article");
      article.className = "resource-card";
      article.innerHTML = [
        '<div class="card-topline">',
        '<span class="' + badgeClass(resource.category) + '">' + resource.category + "</span>",
        '<span class="updated">Updated ' + formatDate(resource.updatedAt) + "</span>",
        "</div>",
        "<h3>" + resource.title + "</h3>",
        "<p>" + resource.description + "</p>",
        '<dl class="meta-list">',
        "<div><dt>Department</dt><dd>" + resource.department + "</dd></div>",
        "<div><dt>Semester</dt><dd>" + resource.semester + "</dd></div>",
        "<div><dt>Scheme</dt><dd>" + resource.scheme + "</dd></div>",
        "<div><dt>Type</dt><dd>" + resource.driveType + "</dd></div>",
        "</dl>",
        '<div class="tag-row">' + (resource.tags || []).map(function (tag) {
          return "<span>" + tag + "</span>";
        }).join("") + "</div>",
        '<div class="card-actions">',
        hasUrl
          ? '<a class="button" href="' + resource.driveUrl + '" target="_blank" rel="noreferrer">Open Drive</a>'
          : '<button class="button" type="button" disabled>Drive pending</button>',
        '<button class="icon-button" type="button" data-copy-url="' + (hasUrl ? resource.driveUrl : "") + '" aria-label="Copy Drive link">' + iconCopy() + "</button>",
        "</div>"
      ].join("");
      els.resourceGrid.appendChild(article);
    });
  }

  function renderScholarships() {
    var scholarships = data.scholarships.filter(function (scholarship) {
      return scholarshipStatus === "All" || scholarship.status === scholarshipStatus;
    });

    els.scholarshipGrid.innerHTML = "";
    scholarships.forEach(function (scholarship) {
      var hasUrl = isRealUrl(scholarship.url);
      var article = document.createElement("article");
      article.className = "scholarship-card";
      article.innerHTML = [
        '<div class="card-topline">',
        '<span class="badge badge-' + normalize(scholarship.status) + '">' + scholarship.status + "</span>",
        '<span class="updated">' + scholarship.category + "</span>",
        "</div>",
        "<h3>" + scholarship.title + "</h3>",
        "<p>" + scholarship.summary + "</p>",
        '<div class="scholarship-meta">',
        "<span>" + scholarship.provider + "</span>",
        "<span>" + scholarship.deadline + "</span>",
        "</div>",
        '<div class="card-actions">',
        hasUrl
          ? '<a class="button" href="' + scholarship.url + '" target="_blank" rel="noreferrer">' + scholarship.actionLabel + "</a>"
          : '<button class="button" type="button" disabled>Link pending</button>',
        "</div>"
      ].join("");
      els.scholarshipGrid.appendChild(article);
    });
  }

  function renderContacts() {
    els.contactGrid.innerHTML = "";
    data.contacts.forEach(function (contact) {
      var hasUrl = isRealUrl(contact.url);
      var article = document.createElement("article");
      article.className = "contact-card";
      article.innerHTML = [
        "<h3>" + contact.title + "</h3>",
        "<p>" + contact.description + "</p>",
        hasUrl
          ? '<a class="button button-secondary" href="' + contact.url + '" target="_blank" rel="noreferrer">' + contact.label + "</a>"
          : '<button class="button button-secondary" type="button" disabled>' + contact.label + "</button>"
      ].join("");
      els.contactGrid.appendChild(article);
    });
  }

  function setFilterFromFeature(category) {
    resourceState.category = category;
    resourceState.query = "";
    els.resourceSearch.value = "";
    renderCategoryTabs();
    renderResources();
  }

  function resetFilters() {
    resourceState = {
      query: "",
      category: "All",
      department: "All",
      semester: "All",
      scheme: "All",
      sort: "updated-desc"
    };
    els.resourceSearch.value = "";
    els.departmentFilter.value = "All";
    els.semesterFilter.value = "All";
    els.schemeFilter.value = "All";
    els.sortFilter.value = "updated-desc";
    renderCategoryTabs();
    renderResources();
  }

  function bindEvents() {
    els.heroSearchButton.addEventListener("click", function () {
      resourceState.query = els.globalSearch.value.trim();
      els.resourceSearch.value = resourceState.query;
      document.getElementById("resources").scrollIntoView({ behavior: "smooth" });
      renderResources();
    });

    els.globalSearch.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        els.heroSearchButton.click();
      }
    });

    els.resourceSearch.addEventListener("input", function (event) {
      resourceState.query = event.target.value.trim();
      renderResources();
    });

    els.departmentFilter.addEventListener("change", function (event) {
      resourceState.department = event.target.value;
      renderResources();
    });

    els.semesterFilter.addEventListener("change", function (event) {
      resourceState.semester = event.target.value;
      renderResources();
    });

    els.schemeFilter.addEventListener("change", function (event) {
      resourceState.scheme = event.target.value;
      renderResources();
    });

    els.sortFilter.addEventListener("change", function (event) {
      resourceState.sort = event.target.value;
      renderResources();
    });

    els.resetFilters.addEventListener("click", resetFilters);

    document.querySelectorAll("[data-category-link]").forEach(function (link) {
      link.addEventListener("click", function () {
        setFilterFromFeature(link.getAttribute("data-category-link"));
      });
    });

    document.addEventListener("click", function (event) {
      var copyButton = event.target.closest("[data-copy-url]");
      if (!copyButton) {
        return;
      }

      var url = copyButton.getAttribute("data-copy-url");
      if (!url) {
        showToast("Drive link is not added yet.");
        return;
      }

      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        showToast("Copy is unavailable in this browser.");
        return;
      }

      navigator.clipboard.writeText(url).then(function () {
        showToast("Drive link copied.");
      }).catch(function () {
        showToast("Copy failed. Open the Drive link instead.");
      });
    });

    els.menuToggle.addEventListener("click", function () {
      var isOpen = els.nav.classList.toggle("is-open");
      els.menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    els.nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        els.nav.classList.remove("is-open");
        els.menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function renderStats() {
    els.statResources.textContent = data.resources.length;
    els.statDepartments.textContent = unique(data.resources.map(function (resource) {
      return resource.department;
    })).length;
    els.statScholarships.textContent = data.scholarships.length;
  }

  function init() {
    populateSelect(els.departmentFilter, unique(data.resources.map(function (resource) {
      return resource.department;
    })));
    populateSelect(els.semesterFilter, unique(data.resources.map(function (resource) {
      return resource.semester;
    })));
    populateSelect(els.schemeFilter, unique(data.resources.map(function (resource) {
      return resource.scheme;
    })));

    renderStats();
    renderCategoryTabs();
    renderScholarshipFilters();
    renderResources();
    renderScholarships();
    renderContacts();
    bindEvents();
  }

  function boot() {
    if (typeof window.loadDishaSanityData !== "function") {
      init();
      return;
    }

    window.loadDishaSanityData().then(function (remoteData) {
      if (remoteData) {
        data = normalizeData(remoteData);
      }
      init();
    }).catch(function (error) {
      console.warn("Using local fallback data because Sanity could not load.", error);
      init();
    });
  }

  boot();
}());
