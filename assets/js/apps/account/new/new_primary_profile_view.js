define(["backbone", "marionette", "jquery", "underscore", "app",
        "tpl!apps/account/new/templates/account_new_primary.tpl", "backbone.syphon"],
    function (Backbone, Marionette, $, _, App, formTpl) {
        return Marionette.ItemView.extend({
            template: formTpl,


            events: {
                "click button.js-save-primary": "savePrimaryProfile",
                "click button.js-new-other":  "newProfile"

            },

            newProfile:function(e) {
                e.preventDefault();
                console.log("new profile");

                this.trigger("new:profile");
            },

            savePrimaryProfile: function (e) {
                e.preventDefault();
                var data = Backbone.Syphon.serialize(this);

                console.log(JSON.stringify(data));

                this.trigger("form:submit", data);
            },

            onFormDataInvalid: function (errors) {
                var $view = this.$el;

                var clearFormErrors = function () {
                    var $form = $view.find("form");
                    $form.find(".help-inline.error").each(function () {
                        $(this).remove();
                    });
                    $form.find(".control-group.error").each(function () {
                        $(this).removeClass("error");
                    });
                }

                var markErrors = function (value, key) {
                    var $controlGroup = $view.find("#contact-" + key).parent();
                    var $errorEl = $("<span>", {class: "help-inline error", text: value});
                    $controlGroup.append($errorEl).addClass("error");
                }

                clearFormErrors();
                _.each(errors, markErrors);
            }
        });
    });
