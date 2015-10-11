define(['marionette', 'tpl!apps/account/list/templates/layout.tpl'],
    function (Marionette, layoutTpl) {
        return Marionette.LayoutView.extend({
            template: layoutTpl,

            regions: {
                panelRegion:    '#panel-region',
                accountsRegion: '#accounts-region'
            }
        });
    });