const path = require("path");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/lib": path.resolve(__dirname, "lib"),
        "@/locales": path.resolve(__dirname, "locales"),
        "@/utils": path.resolve(__dirname, "src/utils"),
        "@/icons": path.resolve(__dirname, "src/icons"),
        "@/common": path.resolve(__dirname, "src/common"),
        "@/modules": path.resolve(__dirname, "src/modules"),
        "@/pages": path.resolve(__dirname, "src/pages"),
        "@/src": path.resolve(__dirname, "src"),
      },
    },
  });
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: "@babel/plugin-transform-react-jsx",
    options: {
      runtime: "automatic",
    },
  });
};
