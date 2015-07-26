define(["marionette", "tpl!apps/account/new/templates/account_new_layout.tpl"],
    function (Marionette, layoutTpl) {
        return Marionette.LayoutView.extend({
            template: layoutTpl,

            regions: {
                primaryProfileRegion: "#primary-profile-region",
                otherProfilesRegion: "#other-profile-region"
            }
        });
    });