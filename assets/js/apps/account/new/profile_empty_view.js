define(["marionette", "tpl!apps/account/list/templates/none.tpl"],
    function (Marionette, emptyTpl) {
        return Marionette.ItemView.extend({
            template: emptyTpl,
            tagName: "tr",
            className: "alert"
        });
    });