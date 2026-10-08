import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Framer's full `motion` component bundles every feature eagerly;
      // the app renders `m` inside <LazyMotion> (components/Providers.tsx).
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "framer-motion",
              importNames: ["motion"],
              message: "Use `m` — features load lazily via <LazyMotion> in components/Providers.tsx.",
            },
          ],
        },
      ],
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "public/**"]),
]);

export default eslintConfig;
