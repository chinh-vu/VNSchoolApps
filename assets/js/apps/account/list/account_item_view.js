define(["marionette", "tpl!apps/account/list/templates/list_item.tpl"],
    function (Marionette, itemTpl) {
        return Marionette.ItemView.extend({
            tagName: "tr",
            template: itemTpl,

            triggers: {
                //"click td a.js-show": "account:show",
                "click td a.js-edit": "account:edit",
                "click button.js-delete": "account:delete"
            },

            events: {
                "click": "highlightName",
                "click td a.js-show": "showAccount",
            },

            initialize:function() {
                console.log("account item view get invoked ", JSON.stringify(this.model));
            },

            flash: function (cssClass) {
                var $view = this.$el;
                $view.hide().toggleClass(cssClass).fadeIn(800, function () {
                    setTimeout(function () {
                        $view.toggleClass(cssClass)
                    }, 500);
                });
            },

            highlightName: function (e) {
                this.$el.toggleClass("warning");
            },

            remove: function () {
                var self = this;
                this.$el.fadeOut(function () {
                    Marionette.ItemView.prototype.remove.call(self);
                });
            },

            showAccount:function() {
                console.log('showAccount ', this.id);
            },
            onRender: function () {
                console.log("On render get call ", JSON.stringify(this.model));
            }

        });
    });