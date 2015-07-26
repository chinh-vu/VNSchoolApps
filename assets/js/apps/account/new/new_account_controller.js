define([
        "backbone",
        "marionette",
        "jquery",
        "underscore",
        "app",
        "apps/account/new/account_new_layout",
        "apps/account/new/new_primary_profile_view",
        "apps/account/new/other_profiles_view",
        "apps/account/new/new_other_profile_view"],
    function (Backbone, Marionette, $, _, App, AccountNewLayout, PrimaryProfileView, OtherProfilesView, OtherProfileView) {
        var AccountController = {
            newAccount: function () {
                var layout = new AccountNewLayout();
                var views = new PrimaryProfileView();
                var others = new OtherProfilesView();

                layout.on("show", function () {
                    layout.primaryProfileRegion.show(views);
                    layout.otherProfilesRegion.show(others);
                });

                views.on("new:profile", function() {
                    App.dialog.show(new OtherProfileView());
                });

                App.regions.main.show(layout);
            }
        };

        return AccountController;
    });
