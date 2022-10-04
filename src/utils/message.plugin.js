export default {
  install: (app, options) => {
    app.config.globalProperties.$message = function(text){
      M.toast({html: text})
    }
  },
};
