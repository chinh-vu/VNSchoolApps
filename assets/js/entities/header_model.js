define(["backbone", "marionette", "jquery", "underscore", "backbone.picky"],
    function (Backbone, Marionette, $, _) {
        return Backbone.Model.extend({
            initialize: function () {
                var selectable = new Backbone.Picky.Selectable(this);
                _.extend(this, selectable);
            }
        });
    })