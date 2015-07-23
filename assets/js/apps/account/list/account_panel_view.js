define(["marionette", "tpl!apps/account/list/templates/panel.tpl"],
    function (Marionette, panelTpl) {
        return Marionette.ItemView.extend({
            template: panelTpl,

            triggers: {
                "click button.js-new": "account:new"
            },

            events: {
                "submit #filter-form": "filterProfile"
            },

            ui: {
                criterion: "input.js-filter-criterion"
            },

            filterContacts: function(e){
                e.preventDefault();
                var criterion = this.$(".js-filter-criterion").val();
                this.trigger("account:filter", criterion);
            },

            onSetFilterCriterion: function(criterion){
                this.ui.criterion.val(criterion);
            }
        });
    });