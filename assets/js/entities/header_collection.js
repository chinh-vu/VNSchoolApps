define(["backbone", "marionette", "jquery", "underscore", "entities/header_model", "backbone.picky"],
    function (Backbone, Marionette, $, _, Header) {
        return Backbone.Collection.extend({
            model: Header,

            initialize: function () {
                var singleSelect = new Backbone.Picky.SingleSelect(this);
                _.extend(this, singleSelect);
            }
        });
    })