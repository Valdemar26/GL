"use strict";

(function () {
    var name = "basecamp";

    var obj = {
        name: name,
        logName: function logName() {
            alert(this.name);
        }
    };

    obj.logName();
})();