define(['backbone', 'marionette', 'jquery', 'underscore', 'app',
        'apps/account/new/account_new_layout', 'apps/account/new/new_primary_profile_view',
        'apps/account/new/other_profiles_view', 'apps/account/new/new_other_profile_view',
        'entities/account/family', 'entities/account/profile', 'entities/account/profile_collection'],
    function (Backbone, Marionette, $, _, App,
              AccountNewLayout, PrimaryProfileView,
              OtherProfilesView, OtherProfileView,
              Family, Profile, Profiles) {
        var AccountController = {
            newAccount: function (id) {
                var primary = new Profile();
                var secondary;
                if (id !== undefined) {
                    console.log('ok loading for showing');
                    var fetchingFamily = App.request('family:entity', id);
                    $.when(fetchingFamily).done(function (family) {
                        console.log('new account controller ', JSON.stringify(family));
                        var stdProfiles = family.get('students');
                        var parentProfiles = family.get('parents');
                        console.log('parent profile ', parentProfiles);

                        for (var i = 0; i < parentProfiles.length; i++) {
                            var profile = new Profile(parentProfiles[i]);
                            if (profile.get('primary') == true) {
                                console.log('head household ', JSON.stringify(profile));
                                primary = new Profile(parentProfiles[i]);
                            } else {
                                console.log('not head household ', profile);
                                secondary = new Profile(parentProfiles[i]);
                            }
                        }
                        var collections = new Profiles();
                        if (secondary !== undefined) collections.add(secondary);
                        for (var i = 0; i < stdProfiles.length; i++) {
                            var profile = new Profile(stdProfiles[i]);
                            collections.add(profile);
                        }
                        var layout = new AccountNewLayout();
                        var views = new PrimaryProfileView({model: primary});
                        var others = new OtherProfilesView({collection:collections});

                        layout.on('show', function () {
                            layout.primaryProfileRegion.show(views);
                            layout.otherProfilesRegion.show(others);
                        });


                        others.on('childview:show:profile', function(id) {
                            console.log("show:profile ", id);
                        });

                        views.on('new:profile', function (id) {
                            var otherProfileView = new OtherProfileView();

                            otherProfileView.on('form:new:profile', function (e) {
                                if(id!==undefined) {
                                    e.id = id;
                                    console.log('get form:new:profile event -- saving new profile ', e.id);
                                } else {
                                    console.log('get form:new:profile event -- saving new profile ');
                                }

                                this.trigger('show', e);
                            });

                            App.regions.dialog.show(otherProfileView);
                        });

                        App.regions.main.show(layout);
                    });
                } else {
                    console.log('ok - loading for creating');
                    var layout = new AccountNewLayout();
                    var views = new PrimaryProfileView({model: primary});
                    var others = new OtherProfilesView();

                    layout.on('show', function () {
                        layout.primaryProfileRegion.show(views);
                        layout.otherProfilesRegion.show(others);
                    });

                    views.on('new:profile', function () {
                        var otherProfileView = new OtherProfileView();

                        otherProfileView.on('form:new:profile', function (e) {
                            console.log('get form:new:profile event -- saving new profile');

                            this.trigger('show', e);
                        });

                        App.regions.dialog.show(otherProfileView);
                    });

                    App.regions.main.show(layout);
                }

            }
        };

        return AccountController;
    });
