define(["backbone", "marionette", "jquery", "underscore", "app", "tpl!apps/header/list/templates/list_item.tpl"],
    function (Backbone, Marionette, $, _, App, listItemTpl) {

        return Marionette.ItemView.extend({
            template: listItemTpl,
            tagName: "li",

            events: {
                "click a": "navigate"
            },

            navigate: function (e) {
                e.preventDefault();
                this.trigger("navigate", this.model);
            },

            onRender: function () {
                if (this.model.selected) {
                    // add class so Bootstrap will highlight the active entry in the navbar
                    this.$el.addClass("active");
                }
            }
        });
    });
