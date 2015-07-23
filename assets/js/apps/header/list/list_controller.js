define(["backbone", "marionette", "jquery", "underscore", "app", "apps/header/list/header_composite_view"],
    function (Backbone, Marionette, $, _, App, Views) {

        var Controller = {
            listHeader: function () {
                require(["entities/header_collection"], function () {
                    var links = App.request("header:entities");
                    //var headers = new Views({collection: links});
                    var headers = new Views({});

                    headers.on("brand:clicked", function () {
                        App.trigger("accounts:list");
                    });

                    headers.on("admission", function (childView, model) {
                        App.trigger("accounts:list");
                    });

                    headers.on("childview:navigate", function (childView, model) {
                        var trigger = model.get("navigationTrigger");
                        App.trigger(trigger);
                    });

                    headers.on("about", function (childView, model) {
                        App.trigger("about:show");
                    });

                    App.regions.header.show(headers);
                });
            },

            setActiveHeader: function (headerUrl) {
                var links = App.request("header:entities");
                var headerToSelect = links.find(function (header) {
                    return header.get("url") === headerUrl;
                });
                headerToSelect.select();
                links.trigger("reset");
            }
        };

        return Controller;
    });

