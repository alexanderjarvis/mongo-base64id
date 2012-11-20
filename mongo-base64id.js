/*
 * Mongo Base64Id - Shell Enhancement
 * An alternative to working with hexidecimal representations of ObjectId's in mongo.
 *
 * Copyright 2012 Alex Jarvis (@alexanderjarvis)
 */

setBase64Id(true)

function setBase64Id(value) {
    if (value == undefined) value = true;
    _base64Id = value;
}

function Base64Id(s) {
    return new ObjectId(BinData(0, s.replace("-","+").replace("_","/")).hex())
}

function b64string(s) {
    return new HexData(0, ObjectId(s).str).base64().replace("+","-").replace("/","_")
}

function oid2b64(o) {
    return new HexData(0, o.str).base64().replace("+","-").replace("/","_")
}

ObjectId.prototype.toString = function() {
    if (_base64Id) {
        return 'Base64Id("' + oid2b64(this) + '")';
    } else {
        return 'ObjectId("' + this.str + '")';
    }
}