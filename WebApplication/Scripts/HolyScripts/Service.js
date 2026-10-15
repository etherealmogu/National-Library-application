app.service("NationalLibrarySystemService", function($http) {

    this.getGetUserFunc = function() {
        return $http.get("/Main/GetUsernameFunc");
    };

    this.UpdateUsernameFunc = function(username) {
        return $http.post("/Main/UpdateUsernameFunc", { username: username });
    };

    this.CollectiveUpdateFunc = function(userdata) {
        return $http.post("/Main/CollectiveUpdateFunc", userdata);
    };

}); 