import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#151823",
        indigo: "#4f57d8",
        teal: "#4a9d98",
        mist: "#f5f7fb",
      },
      boxShadow: {
        soft: "0 24px 70px rgba(31, 38, 72, 0.10)",
      },
    },
  },
  plugins: [],
};
export default config;
