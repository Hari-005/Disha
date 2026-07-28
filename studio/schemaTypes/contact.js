import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons/User";

export const contact = defineType({
  name: "contact",
  title: "Contact Card",
  type: "document",
  icon: UserIcon,
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
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "active",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Hidden", value: "hidden" }
        ],
        layout: "radio"
      },
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
      name: "label",
      title: "Button label",
      type: "string",
      initialValue: "Contact",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "url",
      title: "Contact URL",
      type: "url",
      description: "Use a mailto link, WhatsApp link, Google Form, or public profile URL.",
      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https", "mailto"]
        })
    }),
    defineField({
      name: "orderRank",
      title: "Display order",
      type: "number",
      initialValue: 10,
      validation: (rule) => rule.required().integer().min(0)
    })
  ],
  preview: {
    select: {
      title: "title",
      status: "status"
    },
    prepare: ({ title, status }) => ({
      title,
      subtitle: status
    })
  }
});
