var mongoose = require("mongoose");
var q =require("q");

module.exports = function(app,db){
    var FormSchema = require("./form.schema.server.js")();
    var form = mongoose.model("form",FormSchema);
    var fieldModel = require("./field.model.js")(form);
    var fieldService = require("../services/field.service.server.js")(app,fieldModel);


    var api = {
        createForm:createForm,
        findFormById:findFormById,
        findFormsByUserId:findFormsByUserId,
        deleteFormById:deleteFormById,
        updateFormById:updateFormById,
        findFormByTitle:findFormByTitle
    };

    return api;

    function createForm(userid,newForm){
        var deferred = q.defer();
        var formObj = {
            "userId": userid,
            "title": newForm.title,
            "fields": [],
            "created": new Date(),
            "updated": new Date()
        };
        form.create(formObj,function(err,doc){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function findFormById(formId){
        return form.findById(formId);
    }


    function findFormsByUserId(userid){
        var deferred = q.defer();
        form.find({userId:userid},
        function(err,forms){
            if(!err){
                deferred.resolve(forms);
            }else{
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }


    function deleteFormById(formId){
        var deferred = q.defer();
        form.remove({_id:formId},
        function(err,stats){
            if(!err){
                deferred.resolve(stats);
            }
        });
        return deferred.promise;
    }

    function updateFormById(formId,newForm){
        var deferred = q.defer();
        form.update({_id:formId},{$set:newForm},
        function(err,stats){
            if(!err){
                deferred.resolve(stats);
            }else{
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }

    function findFormByTitle(formName){
        var deferred = q.defer();
        form.findOne({title:formName},
        function(err,form){
            if(!err){
                deferred.resolve(form);
            }else{
                deferred.reject(err);
            }
        });
    }
};