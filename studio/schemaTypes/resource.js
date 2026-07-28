import { defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons/Link";

export const resource = defineType({
  name: "resource",
  title: "Academic Resource",
  type: "document",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "legacyId",
      title: "Legacy ID",
      type: "string",
      description: "Optional ID from the old local data file. Do not use this as the Sanity document ID.",
      readOnly: true,
      hidden: ({ value }) => value === undefined
    }),
    defineField({
      name: "status",
      title: "Publish status",
      type: "string",
      initialValue: "published",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" }
        ],
        layout: "radio"
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Notes", value: "Notes" },
          { title: "Papers", value: "Papers" },
          { title: "Syllabus", value: "Syllabus" }
        ],
        layout: "radio"
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "department",
      title: "Department",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "semester",
      title: "Semester",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "scheme",
      title: "Scheme",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "subject",
      title: "Subject",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(220)
    }),
    defineField({
      name: "driveUrl",
      title: "Google Drive URL",
      type: "url",
      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https"]
        })
    }),
    defineField({
      name: "driveType",
      title: "Drive type",
      type: "string",
      initialValue: "Drive folder",
      options: {
        list: [
          { title: "Drive folder", value: "Drive folder" },
          { title: "Drive file", value: "Drive file" }
        ],
        layout: "radio"
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "updatedAt",
      title: "Updated date",
      type: "date",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.unique().max(8)
    })
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      department: "department",
      semester: "semester"
    },
    prepare: ({ title, category, department, semester }) => ({
      title,
      subtitle: [category, department, semester].filter(Boolean).join(" / ")
    })
  }
});
