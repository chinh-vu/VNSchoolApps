define(["app", "marionette"], function (App, Marionette) {
    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            "accounts": "listAccount"
        }
    });

    var executeAction = function (action, arg) {
        App.startSubApp("AccountsApp");
        action(arg);
        App.execute("set:active:header", "accounts");
    };

    var API = {
        listAccount: function (criterion) {
            require(["apps/account/list/list_controller"], function(ListController){
              ListController.listAccounts();
            });
            //require(["apps/account/list/list_controller"], function(ListController){
            //    executeAction(ListController.listContacts, criterion);
            //});
        },

        newAccount: function() {
            console.log("new account get invoke!");

            require(["apps/account/new/new_account_controller"], function(NewAccountController) {
                NewAccountController.newAccount();
            });
        }

    };

    App.on("accounts:list", function () {
        App.navigate("accounts");
        API.listAccount();
    });

    App.on("account:new", function(){
        API.newAccount();
    })
    App.on("before:start", function () {
        new Router({
            controller: API
        });
    });

    return Router;
});
