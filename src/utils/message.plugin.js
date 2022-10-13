export default {
  install: (app, options) => {
    app.config.globalProperties.$message = function(text){
      M.toast({html: text})
    }
    app.config.globalProperties.$error = function(text){
      M.toast({html: `Ошибка: ${text}`, classes: 'red lighten-1'})
    }
  },
};
