define(["backbone", "app"], function (Backbone, App) {
    return Backbone.Model.extend({
        defaults: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            profileType:"",
            email: ""
        },


    })
});