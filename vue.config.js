const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  configureWebpack: (config) => {
    config.devtool = "source-map";

    config.output.devtoolModuleFilenameTemplate = (info) => {
      if (!info.resourcePath.match(/^\.\/\S*?\.vue$/)) {
        return  `webpack-yourCode:///${info.resourcePath}`;
      } else {
        return ""
      }

    };

    config.output.devtoolFallbackModuleFilenameTemplate =
      "webpack:///[resource-path]?[hash]";
  },
});
