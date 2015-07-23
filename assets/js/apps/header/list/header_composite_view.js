define(["backbone", "marionette", "jquery", "underscore", "app", "tpl!apps/header/list/templates/list.tpl", "apps/header/list/header_item_view"],
    function (Backbone, Marionette, $, _, App, listTpl, Header) {
        return Marionette.CompositeView.extend({
            template: listTpl,

            triggers: {
                "click a.js-admission": "admission",
                "click a.js-about": "about",
                "click button.js-delete": "enrollments"
            },
            //className: "navbar navbar-inverse navbar-fixed-top",
            //childView: Header,
            //childViewContainer: "ul",
            //
            //events: {
            //    "click a.brand": "brandClicked"
            //},
            //
            //brandClicked: function (e) {
            //    e.preventDefault();
            //    this.trigger("brand:clicked");
            //}
        });
    });