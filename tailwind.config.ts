import type { Config } from "tailwindcss";
import { join } from "path";
import { skeleton } from "@skeletonlabs/tw-plugin";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    join(
      require.resolve("@skeletonlabs/skeleton"),
      "../**/*.{html,js,svelte,ts}",
    ),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    forms,
    skeleton({
      themes: {
        preset: [
          "skeleton",
          "rocket",
          "modern",
          "crimson",
          "wintry",
          "seafoam",
          "vintage",
          "sahara",
          "hamlindigo",
          "gold-nouveau",
        ],
      },
    }),
  ],
} satisfies Config;

export default config;
