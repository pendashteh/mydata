'use strict';

function usernameCreate(username) {
    var usernameHash = commit("username", username);
    commit("reference", {Links: [{
        Base: App.Key.Hash,
        Link: usernameHash,
        Tag: 'username'
    }]});
    return usernameHash;
}
function usernameGetMine() {
    var links = getLinks(App.Key.Hash, 'username', {Load: true});
    for (var i in links) {
        return links[i]["Entry"];
    }
    return null;
}
function publicEntryCreate(publicEntry) {
    var publicEntryHash = commit("publicEntry", publicEntry);
    var base = makeHash('username', usernameGetMine());
    commit("reference", {Links:[{
        Base: base,
        Link: publicEntryHash,
        Tag: 'public_entry'
    }]});
    return publicEntryHash;
}

function publicEntryListMine() {
    var username = usernameGetMine();
    return publicEntryListByUser(username);
}

function publicEntryListByUser(username) {
    var usernameHash = makeHash('username', username);
    var links = getLinks(usernameHash, 'public_entry', {Load: true});
    var entries = [];
    for (var i in links) {
        var entry = links[i]["Entry"];
        entries.push(entry);
    }
    return entries;
}

/**
* Returns the value of a fieldname for a given username
* @param {object} input - containing properties username, fieldname
* @return {object} the value of the provided fieldname for the provided username, or "null" if not found.
*/
function publicEntryGetValue(input) {
    var input = input || {};
    if (!input.username) {
        input.username = usernameGetMine();
    } else {
        // input.username = JSON.stringify(input.username);
    }
    if (!input.fieldname) {
        // @TODO Throw an exception or putput an error
        debug("MYDATA_ERROR: No fieldname provided.");
        return null;
    }
    var entries = publicEntryListByUser(input.username);
    for (var i in entries) {
        var entry = entries[i];
        var entry_fieldname = entry.fieldname || "";
        if (entry.fieldname == input.fieldname) {
            return entry.value;
        }
    }
    return null;
}

// -----------------------------------------------------------------
//  The Genesis Function https://developer.holochain.org/genesis
// -----------------------------------------------------------------

/**
* Called only when your source chain is generated
* @return {boolean} success
*/
function genesis () {
    return true;
}

// -----------------------------------------------------------------
//  Validation functions for every change to the local chain or DHT
// -----------------------------------------------------------------

function _baseValidateDefault(entryName, entry, header, pkg, sources) {
    // @FIXME consider!
    switch (entryName) {
        case "publicEntry":
            return true;
        case "username":
            return true;
        case "reference":
            return true;
        default:
        // invalid entry name
            return false;
    }
}
function _baseValidateLinkDefault(entryName, entry, header, pkg, sources) {
    switch (entryName) {
        default:
        // invalid entry name
            return false;
    }
}

/**
* Called to validate any changes to the local chain or DHT
* @param {string} entryName - the type of entry
* @param {*} entry - the entry data to be set
* @param {object} header - header for the entry containing properties EntryLink, Time, and Type
* @param {*} pkg - the extra data provided by the validate[X]Pkg methods
* @param {object} sources - an array of strings containing the keys of any authors of this entry
* @return {boolean} is valid?
*/
function validateCommit(entryName, entry, header, pkg, sources) {
    return _baseValidateDefault(entryName, entry, header, pkg, sources);
}

/**
* Called to validate any changes to the local chain or DHT
* @param {string} entryName - the type of entry
* @param {*} entry - the entry data to be set
* @param {object} header - header for the entry containing properties EntryLink, Time, and Type
* @param {*} pkg - the extra data provided by the validate[X]Pkg methods
* @param {object} sources - an array of strings containing the keys of any authors of this entry
* @return {boolean} is valid?
*/
function validatePut (entryName, entry, header, pkg, sources) {
    return _baseValidateDefault(entryName, entry, header, pkg, sources);
}

/**
* Called to validate any changes to the local chain or DHT
* @param {string} entryName - the type of entry
* @param {*} entry - the entry data to be set
* @param {object} header - header for the entry containing properties EntryLink, Time, and Type
* @param {string} replaces - the hash for the entry being updated
* @param {*} pkg - the extra data provided by the validate[X]Pkg methods
* @param {object} sources - an array of strings containing the keys of any authors of this entry
* @return {boolean} is valid?
*/
function validateMod (entryName, entry, header, replaces, pkg, sources) {
    return _baseValidateDefault(entryName, entry, header, pkg, sources);
}

/**
* Called to validate any changes to the local chain or DHT
* @param {string} entryName - the type of entry
* @param {string} hash - the hash of the entry to remove
* @param {*} pkg - the extra data provided by the validate[X]Pkg methods
* @param {object} sources - an array of strings containing the keys of any authors of this entry
* @return {boolean} is valid?
*/
function validateDel (entryName, hash, pkg, sources) {
    return _baseValidateDefault(entryName, entry, header, pkg, sources);
}

/**
* Called to validate any changes to the local chain or DHT
* @param {string} entryName - the type of entry
* @param {string} baseHash - the hash of the base entry being linked
* @param {?} links - ?
* @param {*} pkg - the extra data provided by the validate[X]Pkg methods
* @param {object} sources - an array of strings containing the keys of any authors of this entry
* @return {boolean} is valid?
*/
function validateLink (entryName, baseHash, links, pkg, sources) {
    return true;
    return _baseValidateLinkDefault(entryName, entry, header, pkg, sources);
}

/**
* Called to get the data needed to validate
* @param {string} entryName - the name of entry to validate
* @return {*} the data required for validation
*/
function validatePutPkg (entryName) {
    return null;
}

/**
* Called to get the data needed to validate
* @param {string} entryName - the name of entry to validate
* @return {*} the data required for validation
*/
function validateModPkg (entryName) {
    return null;
}

/**
* Called to get the data needed to validate
* @param {string} entryName - the name of entry to validate
* @return {*} the data required for validation
*/
function validateDelPkg (entryName) {
    return null;
}

/**
* Called to get the data needed to validate
* @param {string} entryName - the name of entry to validate
* @return {*} the data required for validation
*/
function validateLinkPkg (entryName) {
    return null;
}
