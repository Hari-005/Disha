import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";

export const scholarship = defineType({
  name: "scholarship",
  title: "Scholarship Support",
  type: "document",
  icon: DocumentTextIcon,
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
      readOnly: true,
      hidden: ({ value }) => value === undefined
    }),
    defineField({
      name: "provider",
      title: "Provider",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "Active",
      options: {
        list: [
          { title: "Active", value: "Active" },
          { title: "Watch", value: "Watch" },
          { title: "Closed", value: "Closed" },
          { title: "Hidden", value: "Hidden" }
        ],
        layout: "radio"
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "deadline",
      title: "Deadline",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "description",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(240)
    }),
    defineField({
      name: "actionLabel",
      title: "Action label",
      type: "string",
      initialValue: "Open link",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https"]
        })
    })
  ],
  preview: {
    select: {
      title: "title",
      provider: "provider",
      status: "status"
    },
    prepare: ({ title, provider, status }) => ({
      title,
      subtitle: [provider, status].filter(Boolean).join(" / ")
    })
  }
});
