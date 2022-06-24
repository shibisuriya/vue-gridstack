const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  configureWebpack: (config) => {
    config.devtool = "eval-source-map";

    config.output.devtoolModuleFilenameTemplate = (info) =>
      info.resourcePath.match(/^\.\/\S*?\.vue$/)
        ? `webpack-generated:///${info.resourcePath}?${info.hash}`
        : `webpack-yourCode:///${info.resourcePath}`;

    config.output.devtoolFallbackModuleFilenameTemplate =
      "webpack:///[resource-path]?[hash]";
  },
});
