const { getApiData, getNetworkName } = require("./src/utils/server");
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

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  const networks = [80001];
  const defaultNetwork = 80001;

  // networks.map(async (network) => {
  for (const network of networks) {
    const data = await getApiData(network);

    data.forEach((item) => {
      const networkName = getNetworkName(item.chainId);

      let urlPath = `/${networkName}/covers/${item.coverKeyString}`;
      let component = `src/pages/covers/[coverId]`;

      if (item.productKeyString) {
        urlPath = `/${networkName}/covers/${item.coverKeyString}/products/${item.productKeyString}`;
        component = `src/pages/covers/[coverId]/products/[productId]`;
      }

      const pages = [
        {
          path: urlPath + "",
          component: path.resolve(component + "/index.jsx"),
        },
        !item.productKeyString && {
          path: urlPath + "/add-liquidity",
          component: path.resolve(component + "/add-liquidity/index.jsx"),
        },
        {
          path: urlPath + "/cover-terms",
          component: path.resolve(component + "/cover-terms/index.jsx"),
        },
        {
          path: urlPath + "new-report",
          component: path.resolve(component + "/new-report/index.jsx"),
        },
        {
          path: urlPath + "/purchase",
          component: path.resolve(component + "/purchase/index.jsx"),
        },
      ].filter(Boolean);

      pages.forEach((page) => {
        createPage({
          path: page.path,
          component: page.component,
          context: {
            data: item,
          },
        });

        if (network === defaultNetwork) {
          const _urlPath = page.path.replace(`/${networkName}`, "");

          createPage({
            path: _urlPath,
            component: page.component,
            context: {
              data: item,
            },
          });
        }
      });
    });
  }
};
