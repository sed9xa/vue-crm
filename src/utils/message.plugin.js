export default {
  install: (app, options) => {
    app.config.globalProperties.$message = function(text){
      M.toast({html: text})
    }
    app.config.globalProperties.$error = function(text){
      M.toast({html: `Error: ${text}`, classes: 'red lighten-1'})
    }
  },
};
