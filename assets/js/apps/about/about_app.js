define(["app", "marionette"], function (App, Marionette) {
    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            "about": "showAbout"
        }
    });

    var API = {
        showAbout: function () {
            require(["apps/about/show/show_controller"], function (ShowController) {
                App.startSubApp(null);

                ShowController.showAbout();
                App.execute("set:active:header", "about");
            });
        }
    };

    App.on("about:show", function () {
        App.navigate("about");
        API.showAbout();
    });

    App.on("before:start", function () {
        new Router({
            controller: API
        });
    });

    return Router;
});
