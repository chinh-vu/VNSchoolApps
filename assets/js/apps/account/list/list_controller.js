define([
        'backbone',
        'marionette',
        'jquery',
        'underscore',
        'app',
        'apps/account/list/account_list_layout',
        'apps/account/list/account_list_view',
        'apps/account/list/account_panel_view',
        'entities/account/family',
        'entities/account/profile',
        'entities/account/profile_collection'],
    function (Backbone, Marionette, $, _, App, AccountsLayout, AccountsView, PanelView, Family, Profile, Profiles) {

        var AccountController = {
            listAccounts: function () {
                var studentsProfile = new Profiles();
                var views;
                var layout = new AccountsLayout();

                var fetchingFamily = App.request('family:entities');
                $.when(fetchingFamily).done(function (families) {
                    families.each(function (family) {
                        var stdProfiles = family.get('students');

                        //stdProfiles.each(function(profile){
                        var familyId = family.get('id');
                        var j = 0;
                        var profile;
                        for(j; j<stdProfiles.length; j++) {
                            console.log("=============== ", stdProfiles[j]);
                            profile = new Profile(stdProfiles[j]);
                            profile.set('familyId', familyId);
                            studentsProfile.add(profile);
                        }
                    });

                    //var profiles = new Profiles(studentsProfile);
                    //console.log("Account Controller: ", JSON.stringify(profiles));
                    views = new AccountsView({
                        collection: studentsProfile
                    });

                    views.on('account:show', function(id){

                    });

                    var panel = new PanelView();

                    layout.on('show', function () {
                        layout.panelRegion.show(panel);
                        layout.accountsRegion.show(views);
                    });

                    panel.on('account:new', function () {
                        console.log('received event from account:new');

                        App.trigger('account:new');
                    });
                    App.regions.main.show(layout);
                });
            }
        };

        return AccountController;
    });
