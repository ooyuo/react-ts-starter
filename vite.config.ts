import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import path from "path";
import tailwindcss from "tailwindcss";
import { defineConfig, loadEnv } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import prettier from "vite-plugin-prettier";
import svgrPlugin from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default async ({ mode }) => {
  const isDevelopment = mode === "development";
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // 프로덕션 빌드에서만 사용할 플러그인들
  const prodPlugins =
    mode === "production"
      ? [
          ViteImageOptimizer({
            // sharp 옵션
            jpeg: {
              quality: 75,
            },
            jpg: {
              quality: 75,
            },
            png: {
              quality: 75,
              compressionLevel: 9,
            },
            webp: {
              quality: 75,
            },
            avif: {
              quality: 75,
            },
          }),
          (await import("vite-plugin-compression")).default({
            algorithm: "gzip",
            ext: ".gz",
          }),
          (await import("vite-plugin-compression")).default({
            algorithm: "brotliCompress",
            ext: ".br",
          }),
        ]
      : [];

  return defineConfig({
    plugins: [
      react(),
      svgrPlugin(),
      prettier(),
      tsconfigPaths(),
      ...prodPlugins,
    ],
    build: {
      target: "ESNext",
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            // 'node_modules' 폴더에 있는 모든 라이브러리를 분할
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: isDevelopment
      ? {
          proxy: {
           
          },
        }
      : undefined,
    define: {
      "import.meta.env.VITE_BASE_URL": JSON.stringify(
        process.env.VITE_BASE_URL
      ),
    },
  });
};
