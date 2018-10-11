var helperCommon = require('walnutjs/src/support/helper/common');
var trest = require('walnutjs/src/support/api/trest');
var jsonparser = require('walnutjs/src/support/parser/jsonparser');
var helperVars = require('walnutjs/src/support/helper/variables');
var helperString = require('walnutjs/src/support/helper/string');

var custom = function () {

    /**
     * This method should return the elements quantity based on keypath
     */
    this.Then(/^\(custom\) the JSON response key '(.*)' should contain the elements quantity equals to '(\d+)'$/, function (keyPath, expectedValue, callback) {
        var _this = this;

        //Count number of elements
        keyPath = helperCommon.getTreatedValue(keyPath);
        jsonparser.init(JSON.parse(trest.responseContent));
        var list = jsonparser.getValue(keyPath);
        var count = list.length;

        //compare
        var compareRes = helperCommon.compare(count, 'equalsto', expectedValue);
        if (!compareRes.result) {
            _this.handleError(compareRes.msg, callback);
        } else {
            _this.delayCallback(callback);
        }
    });
    
    /**
     * This method should store a random sku in variable
     */
    this.Then(/^\(custom\) user stores random SKU into variable '(.*)'$/, function (name, callback) {

        //Genarate ramdom sku config and simples
        var randomsku_config = helperCommon.getTreatedValue('${random(l|2)}')+ helperCommon.getTreatedValue('${random(n|3)}') + 
        helperCommon.getTreatedValue('${random(l|3)}') + helperCommon.getTreatedValue('${random(n|2)}')+helperCommon.getTreatedValue('${random(l|3)}');
        
        //Add the value to variable
        var varName = helperCommon.getTreatedValue(name);
        helperVars.addVariable(varName, randomsku_config.toUpperCase());
        this.delayCallback(callback);
    });

    /**
     * Compare the full value of body response     
     */
    this.Then(/^\(custom\) the response body should have value (equals to|not equals to|which contains|which not contains|which starts with|which ends with) '(.*)'$/, function (comparissonType, expectedValue, callback) {
        var _this = this;

        trest.responseContent = trest.response.raw_body.replace(/(\r\n|\n|\r|\s)/gm, "");
        expectedValue = expectedValue.replace(/(\r\n|\n|\r|\s)/gm, "");

        //compare
        var compareRes = helperCommon.compare(trest.responseContent, comparissonType, expectedValue);
        if (!compareRes.result) {
            _this.handleError(compareRes.msg, callback);
        } else {
            _this.delayCallback(callback);
        }
    });

    /**
    * Stores the integer value of the response field found by json path
    */
    this.Then(/^\(custom\) user stores the value '(.*)' from response in an integer variable '(.*)'$/, function (keyPath, name, callback) {

        keyPath = helperCommon.getTreatedValue(keyPath);
        var varName = helperCommon.getTreatedValue(name);

        //get value from JSON using JSONPATH
        jsonparser.init(trest.response.body);
        var varValue = jsonparser.getValue(keyPath)[0].replace(/\D/g, '');
       
        // Add the value to variables
        helperVars.addVariable(varName, varValue);
        this.delayCallback(callback);
    });

    /**
     * Validates a value of specific node in JSON response.body     
     */
    this.Then(/^\(custom\) the JSON response key '(.*)' should have (FLOAT|INT|DOUBLE) value equals to '(.*)'$/, function (keyPath, typeNumber, expectedValue, callback) {
        keyPath = helperCommon.getTreatedValue(keyPath);       

        switch (typeNumber.toLowerCase().trim()) {
            case 'float':
                expectedValue = parseFloat(helperCommon.getTreatedValue(expectedValue));
                break;
            case 'int':
                expectedValue = parseInt(helperCommon.getTreatedValue(expectedValue));
                break;
            case 'double':
                expectedValue = parseDouble(helperCommon.getTreatedValue(expectedValue));
                break;
            default:
                break;
        }      

        jsonparser.init(trest.response.body);
        var jsonValue = parseFloat(jsonparser.getValue(keyPath)[0]);

        if (!(jsonValue == expectedValue)) {
            msg = helperString.formatString('Expected [{0}] is equals to [{1}]', [jsonValue, expectedValue]);
            this.handleError(msg,callback);
        } else {
            this.delayCallback(callback);
        }
    });

    /**
     * Sum values and store the result in a variable     
     */
    this.Then(/^\(custom\) user sum values '(.*)' should have value equals to '(.*)'$/, function (expression, expectedValue, callback) {
        var parts = expression.split(',').map(i => parseInt(helperCommon.getTreatedValue(i)));
        var value = parseInt(helperCommon.getTreatedValue(expectedValue));
        var sum = 0;

        parts.forEach(element => {
            sum = sum + element
        });
      
        if(!(sum == value)) {
            msg = helperString.formatString('Expected [{0}] is equals to [{1}]', [sum, value]);
            this.handleError(msg,callback);
        } else {
            this.delayCallback(callback);
        }
    });

    /**
     * Sum values and store the result in a variable     
     */
    this.Given(/^\(custom\) user store the current timestamp in variable '(.*)'$/, function (name, callback) {

        current_time = Math.floor(Date.now() / 1000);
        
        //Add the value to variable
        var varName = helperCommon.getTreatedValue(name);
        helperVars.addVariable(varName, current_time);
        this.delayCallback(callback);
      
    });

}

module.exports = custom;