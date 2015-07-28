define(["marionette", "tpl!apps/account/new/templates/list_profile_item.tpl", "apps/account/new/profile_empty_view", "apps/account/new/other_profile_item_view"],
    function (Marionette, profileListTpl, EmptyProfileView, ProfileItemView) {
        return Marionette.CompositeView.extend({
            tagName: "table",
            className: "table table-hover",
            template: profileListTpl,
            emptyView: EmptyProfileView,
            childView: ProfileItemView,
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