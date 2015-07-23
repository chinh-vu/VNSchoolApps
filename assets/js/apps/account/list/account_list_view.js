define(["marionette", "tpl!apps/account/list/templates/list.tpl", "apps/account/list/account_empty_view", "apps/account/list/account_item_view"],
    function (Marionette, accountListTpl, EmptyAccountView, AccountItemView) {
        return Marionette.CompositeView.extend({
            tagName: "table",
            className: "table table-hover",
            template: accountListTpl,
            emptyView: EmptyAccountView,
            childView: AccountItemView,
            childViewContainer: "tbody",

            //initialize: function () {
            //    if (this.collection != null) {
            //        this.listenTo(this.collection, "reset", function () {
            //            this.attachHtml = function (collectionView, childView, index) {
            //                collectionView.$el.append(childView.el);
            //            }
            //        });
            //    }
            //},


            onRenderCollection: function () {
                this.attachHtml = function (collectionView, childView, index) {
                    collectionView.$el.prepend(childView.el);
                }
            }
        });
    });