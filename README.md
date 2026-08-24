# Disha

Disha is the official student assistance cell of SFI GEC Kozhikode. This project is a free academic resource hub with study notes, KTU question papers, syllabus links, and scholarship support for engineering students.

## Current version

This first build is a static website. It does not need a framework, package install, or backend. Open `index.html` in a browser to run it.

## Project structure

```txt
index.html          Main website
assets/styles.css   Styling and responsive layout
src/data.js         Notes, papers, syllabus, scholarship, and contact data
src/app.js          Search, filters, rendering, and interactions
```

## Google Drive resources

Notes, papers, and syllabus items are stored as Google Drive links. Add the real links in `src/data.js`.

For every resource, replace:

```js
driveUrl: "#"
```

with a shared Google Drive file or folder URL:

```js
driveUrl: "https://drive.google.com/drive/folders/YOUR_FOLDER_ID"
```

Recommended Drive sharing setting:

```txt
General access: Anyone with the link
Role: Viewer
```

Use `driveType: "Drive folder"` for folders and `driveType: "Drive file"` for PDFs or documents.

## Adding a new note, paper, or syllabus link

Copy one object inside `resources` in `src/data.js` and update the fields:

```js
{
  id: "notes-cse-s4",
  title: "CSE S4 Notes Collection",
  department: "CSE",
  semester: "S4",
  scheme: "KTU 2024",
  subject: "Department subjects",
  description: "Module-wise notes for fourth-semester CSE students.",
  driveUrl: "https://drive.google.com/drive/folders/YOUR_FOLDER_ID",
  driveType: "Drive folder",
  updatedAt: "2026-06-12",
  tags: ["CSE", "S4", "Modules"]
}
```

## Next improvements

- Replace placeholder Drive links with real folders and files.
- Add real coordinator contacts in `src/data.js`.
- Add verified scholarship links after checking official sources.
- Later, move this static build to Next.js if you need admin login, automatic indexing, or a CMS.
