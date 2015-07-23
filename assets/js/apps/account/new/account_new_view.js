define(["backbone", "marionette", "app", "apps/account/common/views"],
    function (Backbone, Marionette, App, Form) {
        return Form.extend({
            title: "New Admission",

            onRender: function () {
                this.$(".js-submit").text("Create Account");
            }
        });
    });