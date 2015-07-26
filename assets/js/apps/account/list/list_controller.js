define([
        "backbone",
        "marionette",
        "jquery",
        "underscore",
        "app",
        "apps/account/list/account_list_layout",
        "apps/account/list/account_list_view",
        "apps/account/list/account_panel_view"],
    function (Backbone, Marionette, $, _, App, AccountsLayout, AccountsView, PanelView) {

        var AccountController = {
            listAccounts: function () {
                //var fetchingAccounts = App.request("contact:entities");
                //console.log("Account controller ", fetchingAccounts);
                var layout = new AccountsLayout();
                var views = new AccountsView();
                var panel = new PanelView();

                layout.on("show", function () {
                    layout.panelRegion.show(panel);
                    layout.accountsRegion.show(views);
                });

                panel.on("account:new", function () {
                    console.log("received event from account:new");
                    App.trigger("account:new");
                });
                App.regions.main.show(layout);
            }
        };

        return AccountController;
    });
