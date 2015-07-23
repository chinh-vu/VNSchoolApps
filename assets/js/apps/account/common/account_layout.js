define(["marionette", "tpl!apps/account/common/templates/layout.tpl"],
    function (Marionette, layoutTpl) {
        return Marionette.LayoutView.extend({
            template: layoutTpl,

            regions: {
                panelRegion: "#primary-profile-region",
                accountsRegion: "#other-profile-region"
            }
        });
    });