define(["marionette", "jquery-ui"],
    function (Marionette) {
        var App = new Marionette.Application();

        App.navigate = function (route, options) {
            options || (options = {});
            Backbone.history.navigate(route, options);
        };

        App.getCurrentRoute = function () {
            return Backbone.history.fragment
        };

        App.startSubApp = function (appName, args) {
            var currentApp = appName ? App.module(appName) : null;
            if (App.currentApp === currentApp) {
                return;
            }

            if (App.currentApp) {
                App.currentApp.stop();
            }

            App.currentApp = currentApp;
            if (currentApp) {
                currentApp.start(args);
            }
        };

        App.on("before:start", function () {
            var RegionContainer = Marionette.LayoutView.extend({
                el: "#app-container",

                regions: {
                    header: "#header-region",
                    main: "#main-region",
                    dialog: "#dialog-region"
                }
            });

            App.regions = new RegionContainer();
            App.regions.dialog.onShow = function (view) {
                var self = this;
                var closeDialog = function () {
                    self.stopListening();
                    self.empty();
                    self.$el.dialog("destroy");
                };

                this.listenTo(view, "dialog:close", closeDialog);

                this.$el.dialog({
                    modal: true,
                    title: view.title,
                    width: "auto",
                    close: function (e, ui) {
                        closeDialog();
                    }
                });
            };

            require(["entities/header_collection"], function (HeaderCollection) {
                var initializeHeaders = function () {
                    App.header = new HeaderCollection([
                        {name: "Account", url: "accounts", navigationTrigger: "accounts:list"},
                        {name: "About", url: "about", navigationTrigger: "about:show"}
                    ]);
                };

                var API = {
                    getHeaders: function () {
                        if (App.header === undefined) {
                            initializeHeaders();
                        }
                        return App.header;
                    }
                };

                App.reqres.setHandler("header:entities", function () {
                    console.log("response to request header:entities ", API.getHeaders());
                    return API.getHeaders();
                });
            });

            require(["entities/account/family", "entities/account/family_collection"],
                function (Family, Families) {
                var API = {
                    getFamily: function (familyId) {
                        var family = new Family({id: familyId});

                        var defer = $.Deferred();
                        setTimeout(function () {
                            family.fetch({
                                success: function (data) {
                                    console.log("hoorah");
                                    defer.resolve(data);
                                }
                            });
                        }, 2000);
                        return defer.promise();
                    },

                    getFamilies: function () {
                        var families = new Families();

                        var defer = $.Deferred();
                        setTimeout(function () {
                            families.fetch({
                                success: function (data) {
                                    console.log("hoorah");
                                    defer.resolve(data);
                                }
                            });
                        }, 2000);
                        return defer.promise();
                    }
                };

                App.reqres.setHandler("family:entities", function () {
                    console.log("family:entities get invoked!!!");

                    return API.getFamilies();
                });


                App.reqres.setHandler("family:entity", function (id) {

                    console.log("family:entity get invoked!!! ", id);

                    return API.getFamily(id);
                });
            });
        });


        App.on("start", function () {

            if (Backbone.history) {
                require(["apps/about/about_app"], function () {
                    Backbone.history.start();
                    if (App.getCurrentRoute() === "") {
                        App.trigger("accounts:list");
                    }
                });
            }
        });

        return App;
    });
