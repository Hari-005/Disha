(function () {
  var config = {
    projectId: "luona25o",
    dataset: "production",
    apiVersion: "2026-07-28",
    useCdn: false,
    enabled: true
  };

  var query = [
    "{",
    '  "resources": *[_type == "resource" && status == "published"] | order(updatedAt desc, title asc) {',
    '    "id": coalesce(legacyId, _id),',
    "    title,",
    "    department,",
    "    semester,",
    "    scheme,",
    "    subject,",
    "    description,",
    '    "driveUrl": coalesce(driveUrl, "#"),',
    '    "driveType": coalesce(driveType, "Drive folder"),',
    '    "updatedAt": coalesce(updatedAt, _updatedAt),',
    '    "tags": coalesce(tags, [])',
    "  },",
    '  "scholarships": *[_type == "scholarship" && status != "Hidden"] | order(_updatedAt desc, title asc) {',
    '    "id": coalesce(legacyId, _id),',
    "    title,",
    "    provider,",
    "    status,",
    "    category,",
    "    deadline,",
    '    "summary": description,',
    '    "actionLabel": coalesce(actionLabel, "Open link"),',
    '    "url": coalesce(url, "#")',
    "  },",
    '  "contacts": *[_type == "contact" && status == "active"] | order(orderRank asc, title asc) {',
    '    "id": coalesce(legacyId, _id),',
    "    title,",
    "    description,",
    '    "label": coalesce(label, "Contact"),',
    '    "url": coalesce(url, "#")',
    "  }",
    "}"
  ].join("\n");

  window.dishaSanity = config;

  window.loadDishaSanityData = function () {
    if (!config.enabled || config.projectId === "your-sanity-project-id") {
      return Promise.resolve(null);
    }

    var host = config.useCdn ? "apicdn.sanity.io" : "api.sanity.io";
    var url = [
      "https://",
      config.projectId,
      ".",
      host,
      "/v",
      config.apiVersion,
      "/data/query/",
      config.dataset,
      "?query=",
      encodeURIComponent(query)
    ].join("");

    return fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Sanity request failed with status " + response.status);
        }
        return response.json();
      })
      .then(function (payload) {
        return payload.result || null;
      });
  };
}());
