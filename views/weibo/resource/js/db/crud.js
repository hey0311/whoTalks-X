/**
 * Created by Echo on 2016/5/16.
 */

var mongoose = require('mongoose'),
    rt = require('./schema_model/Dongtan'),
    Comments = require('./schema_model/Comments'),
    initDb = require('./initDb');

function test() {
    initDb.getConnection();
    rt.find(function (err, dts) {
        if (err) return console.error(err);
        console.log('dts: ', dts);
    });
}

var CRUD = {
    insert: function (tableName, param) {
        if (Object.prototype.toString.call(param) != '[object Object]') {
            console.error('Error -- param is not json type');
            return;
        }
        initDb.getConnection(tableName);
        var table = require('./schema_model/' + tableName);
        var newInstance = new table(param);
        newInstance.save();
    },
    remove: function (tableName, param, callback) {
        if (Object.prototype.toString.call(param) != '[object Object]') {
            console.error('Error -- param is not json type');
            return;
        }
        initDb.getConnection(tableName);
        var table = require('./schema_model/' + tableName);
        table.remove(param, function (err) {
            if (err) return console.error(err);
            callback();
        });
    },

    update: function (tableName, findParam, updateParam, callback) {
        if (Object.prototype.toString.call(param) != '[object Object]') {
            console.error('Error -- param is not json type');
            return;
        }
        initDb.getConnection(tableName);
        var table = require('./schema_model/' + tableName);
        table.update(findParam, updateParam, function (err) {
            if (err) return console.error(err);
            callback();
        });
    },

    find: function (tableName, param, callback) {
        if (Object.prototype.toString.call(param) != '[object Object]') {
            console.error('Error -- param is not json type');
            return;
        }
        initDb.getConnection(tableName);
        var table = require('./schema_model/' + tableName);
        table.find(param, function (err, results) {
            if (err) return console.error(err);
            callback(results);
        });
    }
};



CRUD.find('Dongtan', {'_id': ''}, function (results) {
    console.log('in callback, results: ', results);
});


 module.exports = CRUD;