/**
 * Created by sange_000 on 3/17/2016.
 */
module.exports = function(app){
    var userModel = require("./models/user.model.js")(app);
    var formModel = require("./models/form.model.js")(app);
    var fieldModel = require("./models/field.model.js")(formModel);

    var userService = require("./services/user.service.server.js")(app,userModel);
    var formService = require("./services/form.service.server.js")(app,formModel);
    var fieldService = require("./services/field.service.server.js")(app,formModel,fieldModel);
};