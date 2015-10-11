define(["backbone", "app", "entities/account/profile"], function (Backbone, App, Profile) {
    return Backbone.Collection.extend({
        model: Profile
    });
})