define(["app", "marionette", "tpl!apps/account/new/templates/other_profile.tpl"],
    function (App, Marionette, otherProfileTpl) {
        return Marionette.ItemView.extend({
            template: otherProfileTpl
        });
    })