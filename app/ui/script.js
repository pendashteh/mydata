button_onclick("button-adddata", function(e) {
    var entry_fieldname = input_value('entry_fieldname');
    var entry_value = input_value('entry_value');
    var entry = {
        "fieldname": entry_fieldname,
        "value": entry_value
    };
    hc_post_object("publicEntryCreate", entry);
    return false;
});
button_onclick("button-setusername", function(e) {
    var username = input_value('username');
    hc_post("usernameCreate", username);
    return false;
});
button_onclick("button-getdata", function(e) {
    var username = input_value('getdata_username');
    var fieldname = input_value('getdata_fieldname');
    hc_post_object("publicEntryGetValue", {"username":username, "fieldname":fieldname}, function(data) {
        document.getElementById("x-getdata").innerHTML = "<b>Result:</b>" + data;
    });
});
button_onclick("button-listdata", function(e) {
    hc_post_object("publicEntryListMine", {}, function(data) {
        var result = JSON.parse(data);
        var items = [];
        for (i in result) {
            var entry = result[i];
            items.push(entry.fieldname + ": " + entry.value);
        }
        document.getElementById("x-listdata").innerHTML = items.join("<br>");
    });
    return false;
});
