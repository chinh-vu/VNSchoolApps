define(["app", "apps/about/show/show_view"], function(App, View){
  return {
    showAbout: function(){
      var view = new View.Message();
      App.regions.main.show(view);
    }
  };
});
