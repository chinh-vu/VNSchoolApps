define(["backbone", "app"], function (Backbone, App) {
    return Backbone.Model.extend({
        parse:function(response) {
            //console.log("in parse method of family ", JSON.stringify(response));
            return response;
        },
        sync: function(method, model, options) {
            var self = this,
                config = {
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('uniphy-app','web-portal');
                        xhr.setRequestHeader ("Authorization",
                             "Basic " + btoa("andy" + ":" + "andy2"));
                    }
                };

            var baseUrl = "http://localhost:8080/core-api/v1/family";

            switch(method) {
                case "create":
                    config = _.extend(config, {
                            method: "POST",
                        url: _.result(this, 'urlRoot'),
                        data: JSON.stringify(model.pick('fN', 'lN', 'mN', 'type'))
                    })
                    break;
                case "read":
                    //console.log('In sync read method ', JSON.stringify(config));

                    config = _.extend(config, {
                        method: 'GET',
                        url: baseUrl + "/" + model.get("id")
                    });
                    break;
                case "update":
                    break;
                case "delete":
                    break;
            };
            options = _.extend(options, config);

            return Backbone.Model.prototype.sync.call(this, method, model, options);
        }
    })
});