define(["marionette", "tpl!apps/account/new/templates/profile_item.tpl"],
    function (Marionette, profileTpl) {
        return Marionette.ItemView.extend({
            tagName: "tr",
            template: profileTpl,
            triggers: {
                "click td a.js-show": "account:show",
                "click td a.js-edit": "account:edit",
                "click button.js-delete": "account:delete"
            },

            events: {
                "click": "highlightName"
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
            }

        });
    });