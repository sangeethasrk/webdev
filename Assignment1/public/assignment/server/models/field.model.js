var q =require("q");

module.exports = function(form){

    var api = {
        createField : createField,
        deleteField:deleteField,
        updateField:updateField,
        findField:findField,
        findAllFieldsForForm:findAllFieldsForForm
    };

    return api;

    function createField(formId,newField){
        console.log("create - model");
        var deferred = q.defer();
        form.findById(formId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    doc.fields.push(newField);
                    form.update({_id:formId},
                        {$set:{
                            fields: doc.fields,
                            updated:new Date()
                        }},
                        function (err,response) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(response);
                            }
                        });
                }
            });

        return deferred.promise;
    }

    function  deleteField(formId,fieldId){
        var deferred = q.defer();
        form.findById(formId,
            function (err, response) {
                if (err) {
                    deferred.reject(err);
                } else {
                    var newForm = response;
                    for(var u in newForm.fields){
                        if(newForm.fields[u]._id == fieldId){
                            newForm.fields.splice(u,1);
                            form.update({_id : formId},
                                {$set:{
                                    fields:newForm.fields,
                                    updated:new Date()
                                }},
                                function (err,doc) {
                                    if (err) {
                                        deferred.reject(err);
                                    } else {
                                        deferred.resolve(doc);
                                    }
                                });
                        }
                    }
                }
            });
        return deferred.promise;
    }

    function  updateField(formId,fieldId,field){
        var deferred = q.defer();
        form.findById(formId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    var newForm = doc;
                    for(var u in newForm.fields){
                        if(newForm.fields[u]._id == fieldId){
                            newForm.fields[u] = field;
                            form.update({_id : formId},
                                {$set: {fields: newForm.fields,
                                    updated:new Date()}},
                                function (err, doc) {
                                    if (err) {
                                        deferred.reject(err);
                                    } else {
                                        deferred.resolve(field);
                                    }
                                });
                        }
                    }
                }
            });
        return deferred.promise;
    }

    function findField(formId,fieldId){
        var deferred = q.defer();

        form.findById(formId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {

                    var fields = doc.fields;
                    for(var u in fields){
                        if(fields[u]._id == fieldId){
                            deferred.resolve(fields[u]);
                        }
                    }
                }
            });
        return deferred.promise;
    }

    function findAllFieldsForForm(formId){
        var deferred = q.defer();
        form.findById(formId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc.fields);
                }
            });

        return deferred.promise;
    }
};