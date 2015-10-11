define(['app',
        'marionette',
        'tpl!apps/account/list/templates/list.tpl', 
        'apps/account/list/account_empty_view', 
        'apps/account/list/account_item_view'],
    function (App, Marionette, accountListTpl, EmptyAccountView, AccountItemView) {
        return Marionette.CompositeView.extend({
            tagName: 'table',
            className: 'table table-hover',
            template: accountListTpl,
            emptyView: EmptyAccountView,
            childView: AccountItemView,
            childViewContainer: 'tbody',

            initialize: function () {
                console.log("initialize: Collection is NOT null ", JSON.stringify(this.collection));
                if (this.collection != null) {
                    this.listenTo(this.collection, 'reset', function () {
                        this.attachHtml = function (collectionView, childView, index) {
                            console.log('inside initialize of account list view ', JSON.stringify(this.collection[index]));
                            collectionView.$el.append(childView.el);
                        }
                    });
                } else {
                    console.log("Collection is null ", JSON.stringify(this.collection));
                }
            },
            onRenderCollection: function () {
                console.log("onRenderCollection: Collection is NOT null ", JSON.stringify(this.collection));
                this.attachHtml = function (collectionView, childView, index) {
                    console.log('inside initialize of account list view ', JSON.stringify(this.collection[index]));
                    collectionView.$el.prepend(childView.el);
                }
            }
        });
    });