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
                    require(["apps/account/new/account_new_view", "entities/account/profile"], function (AccountNewView, Profile) {
                        console.log('loading account_new_view');
                        var profile  = new Profile();
                        var accountNewView = new AccountNewView({model:profile});
                        App.regions.main.show(accountNewView);
                    });
                });
                App.regions.main.show(layout);
            }
        };

        return AccountController;
    });
