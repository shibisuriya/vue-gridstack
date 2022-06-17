const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  configureWebpack: (config) => {
    config.devtool = "eval-source-map";
  },
});
