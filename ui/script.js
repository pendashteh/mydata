var display_message = function(text) {
    document.getElementById("message").innerHTML = '<p>' + text + '</p>';
}
var hc_post = function(command, input, fn) {
    xhr_post("fn/base/"+command, input, function(data) {
        var message = [];
        message.push("<b>Command:</b> " + command);
        message.push("<b>Input:</b> " + input);
        message.push("<b>Response:</b> " + data);
        display_message(message.join("<br>"));
        !fn || fn(data);
        return data;
    });
}
var hc_post_object = function(command, input, fn) {
    input = JSON.stringify(input);
    hc_post(command, input, fn);
}
var xhr_post = function(url, input, callback) {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(xhr.responseText)
      }
    }
    xhr.send(input)
}
var button_onclick = function(id, callback) {
    document.getElementById(id).addEventListener('click', callback);
}
var input_value = function(name) {
    var inputs = document.getElementsByName(name);
    for (i in inputs) {
        return inputs[i].value;
    }
    return null;
}
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
