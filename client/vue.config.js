// vue.config.js
module.exports = {
  // options...
  /* vue.config.js */
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "E-Commerce";
      return args;
    });
  }
};
