define(["app", "marionette", "tpl!apps/account/new/templates/other_profile.tpl"],
    function (App, Marionette, otherProfileTpl) {
        return Marionette.ItemView.extend({
            template: otherProfileTpl,
            events : {
                "click button.js-save-other " : "createProfile"
            },

            createProfile: function(e) {
                e.preventDefault();
                var data = Backbone.Syphon.serialize(this);

                console.log(JSON.stringify(data));

                this.trigger("form:new:profile", data);
            },
        });
    })