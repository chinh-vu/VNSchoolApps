define(["backbone", "marionette", "jquery", "underscore", "app", "apps/header/list/list_controller"],
    function (Backbone, Marionette, $, _, App, ListController) {
        var API = {
            listHeader: function () {
                ListController.listHeader();
            }
        };

        App.commands.setHandler("set:active:header", function (name) {
            ListController.setActiveHeader(name);
        });

        App.on("start", function () {
            API.listHeader();
        });
    });