/** @type {import('@remix-run/dev').AppConfig} */
export default {
  postcss: true,
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  serverDependenciesToBundle: ["use-count-up"],
  browserNodeBuiltinsPolyfill: { modules: { crypto: true, path: true, os: true } }
};
