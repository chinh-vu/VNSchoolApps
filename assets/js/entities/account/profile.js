define(["backbone", "app"], function (Backbone, App) {
    return Backbone.Model.extend({
        urlRoot: "profile",

        defaults: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: ""
        },

        validate: function (attrs, options) {
            var errors = {}
            if (!attrs.firstName) {
                errors.firstName = "can't be blank";
            }
            if (!attrs.lastName) {
                errors.lastName = "can't be blank";
            } else {
                if (attrs.lastName.length < 2) {
                    errors.lastName = "is too short";
                }
            }
            if (!_.isEmpty(errors)) {
                return errors;
            }
        }
    })
});