app.controller("NationalLibrarySystemController", function ($scope, NationalLibrarySystemService) {

    $scope.userarray = [];
    $scope.status = "Borrowed";
    $scope.isEditing = false;
    $scope.editIndex = -1;


    $scope.hasNoNumbers = function (value) {
        return !/\d/.test(value || "");
    };


    $scope.findInvalidRegistrationField = function () {
        var fieldsToCheck = [
            { label: "First Name", value: $scope.firstName },
            { label: "Middle Name", value: $scope.middleName },
            { label: "Last Name", value: $scope.lastName },
            { label: "Position", value: $scope.position }
        ];

        for (var i = 0; i < fieldsToCheck.length; i++) {
            var field = fieldsToCheck[i];
            if (field.value && !$scope.hasNoNumbers(field.value)) {
                return field.label;
            }
        }
        return null;
    };

    $scope.clearForm = function () {
        $scope.firstName = "";
        $scope.middleName = "";
        $scope.lastName = "";
        $scope.position = "";
        $scope.bookTitle = "";
        $scope.author = "";
        $scope.status = "Borrowed";
        $scope.isEditing = false;
        $scope.editIndex = -1;
    };

    $scope.alertFunc = function () {
        alert("yehey!");
    };

    $scope.nameFunc = function (username) {
        alert(username);
    };

    $scope.getName = function () {
        alert($scope.username);
    };

    // Register a new borrower & book
    $scope.registrationFunc = function () {

        if (!$scope.firstName || !$scope.lastName || !$scope.position || !$scope.bookTitle || !$scope.author) {
            Swal.fire({
                title: "Incomplete Fields!",
                text: "Please enter First Name, Last Name, Position, Book Title, and Author.",
                icon: "warning"
            });
            return;
        }

        if ($scope.author && $scope.author.length > 50) {
            Swal.fire({
                title: "Limit Exceeded!",
                text: "Author must not exceed 50 characters.",
                icon: "warning"
            });
            return;
        }

        var invalidField = $scope.findInvalidRegistrationField();
        if (invalidField) {
            Swal.fire({
                title: "Invalid Format!",
                text: "You inputted an invalid format on the " + invalidField + " field. Numbers are not allowed.",
                icon: "warning"
            });
            return;
        }


        var userdata = {
            FName: $scope.firstName,
            MName: $scope.middleName || "N/A",
            LName: $scope.lastName,
            Position: $scope.position,
            BookTitle: $scope.bookTitle,
            Author: $scope.author,
            Status: $scope.status || "Borrowed"
        };

        $scope.userarray.push(userdata);

        Swal.fire({
            title: "Success!",
            text: "Borrower record registered successfully (" + userdata.Status + ")",
            icon: "success"
        });

        $scope.clearForm();
    };

    // Load record into form for editing
    $scope.editFunc = function (userindex) {
        $scope.editIndex = userindex;
        $scope.isEditing = true;

        var userdata = $scope.userarray[userindex];
        $scope.firstName = userdata.FName;
        $scope.middleName = userdata.MName === "N/A" ? "" : userdata.MName;
        $scope.lastName = userdata.LName;
        $scope.position = userdata.Position;
        $scope.bookTitle = userdata.BookTitle || "";
        $scope.author = userdata.Author || "";
        $scope.status = userdata.Status || "Borrowed";

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Save changes to the record being edited
    $scope.updateFunc = function () {

        if ($scope.editIndex < 0 || $scope.editIndex >= $scope.userarray.length) {
            Swal.fire({
                title: "Error!",
                text: "No record selected for editing.",
                icon: "error"
            });
            return;
        }

        if (!$scope.firstName || !$scope.lastName || !$scope.position || !$scope.bookTitle || !$scope.author) {
            Swal.fire({
                title: "Incomplete Fields!",
                text: "Please ensure First Name, Last Name, Position, Book Title, and Author are filled.",
                icon: "warning"
            });
            return;
        }

        if ($scope.author && $scope.author.length > 50) {
            Swal.fire({
                title: "Limit Exceeded!",
                text: "Author must not exceed 50 characters.",
                icon: "warning"
            });
            return;
        }

        var invalidField = $scope.findInvalidRegistrationField();
        if (invalidField) {
            Swal.fire({
                title: "Invalid Format!",
                text: "You inputted an invalid format on the " + invalidField + " field. Numbers are not allowed.",
                icon: "warning"
            });
            return;
        }


        var userdata = $scope.userarray[$scope.editIndex];

        if ($scope.firstName != userdata.FName ||
            ($scope.middleName || "N/A") != userdata.MName ||
            $scope.lastName != userdata.LName ||
            $scope.position != userdata.Position ||
            $scope.bookTitle != userdata.BookTitle ||
            $scope.author != userdata.Author ||
            $scope.status != userdata.Status) {

            userdata.FName = $scope.firstName;
            userdata.MName = $scope.middleName || "N/A";
            userdata.LName = $scope.lastName;
            userdata.Position = $scope.position;
            userdata.BookTitle = $scope.bookTitle;
            userdata.Author = $scope.author;
            userdata.Status = $scope.status || "Borrowed";

            Swal.fire({
                title: "Updated!",
                text: "Borrower record updated successfully!",
                icon: "success"
            });

            $scope.clearForm();
        } else {
            Swal.fire({
                title: "No Changes Detected",
                text: "No changes were made to the existing record.",
                icon: "info"
            });
        }
    };

   

    // Delete borrower record with confirmation
    $scope.deleteFunc = function (userindex) {
        var borrower = $scope.userarray[userindex];
        var borrowerName = borrower ? (borrower.FName + " " + borrower.LName) : "this record";

        Swal.fire({
            title: "Delete Record?",
            text: "Are you sure you want to delete " + borrowerName + "?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d32f2f",
            cancelButtonColor: "#757575",
            confirmButtonText: "Yes, delete",
            cancelButtonText: "Cancel"
        }).then(function (result) {
            if (result.isConfirmed) {
                $scope.$apply(function () {
                    $scope.userarray.splice(userindex, 1);
                    if ($scope.isEditing && $scope.editIndex === userindex) {
                        $scope.clearForm();
                    }
                });
                Swal.fire({
                    title: "Deleted!",
                    text: "The record has been removed.",
                    icon: "success"
                });
            }
        });
    };

    $scope.redirectFunc = function () {
        window.location.href = "/Main/AboutPage";
    };

    $scope.getGetUserFunc = function () {
        var getData = NationalLibrarySystemService.getGetUserFunc();
        getData.then(function (returnedData) {
            Swal.fire({
                title: "Notification!",
                text: "C# returned the name: " + returnedData.data,
                icon: "info"
            });
        });
    };

    $scope.UpdateUsernameFunc = function (username) {
        var getData = NationalLibrarySystemService.UpdateUsernameFunc(username);
        getData.then(function (returnedData) {
            Swal.fire({
                title: "Notification!",
                text: "C# returned the name: " + returnedData.data,
                icon: "info"
            });
        });
    };

    $scope.CollectiveUpdateFunc = function () {

        if (!$scope.firstName || !$scope.lastName || !$scope.position) {
            Swal.fire({
                title: "Notification!",
                text: "Please insert valid values to the required fields",
                icon: "warning"
            });
            return;
        }

        var invalidField = $scope.findInvalidRegistrationField();
        if (invalidField) {
            Swal.fire({
                title: "Invalid Format!",
                text: "You inputted an invalid format on the " + invalidField + " field. Numbers are not allowed.",
                icon: "warning"
            });
            return;
        }


        var userdata = {
            FName: $scope.firstName,
            MName: $scope.middleName || "N/A",
            LName: $scope.lastName,
            Position: $scope.position,
            BookTitle: $scope.bookTitle || "General Book",
            Author: $scope.author || "Unknown Author",
            Status: $scope.status || "Borrowed"
        };

        var getData = NationalLibrarySystemService.CollectiveUpdateFunc(userdata);
        getData.then(function (returnedData) {
            Swal.fire({
                title: "C# Server Sync!",
                text: "C# returned: " + returnedData.data.FName + " (" + returnedData.data.Status + ")",
                icon: "success"
            });

            $scope.userarray.push(returnedData.data);
            $scope.clearForm();
        });
    };


    $scope.loginUsername = "";
    $scope.loginPassword = "";
    $scope.loginRole = "Librarian";

    $scope.loginFunc = function () {
        if (!$scope.loginUsername || !$scope.loginPassword) {
            Swal.fire({
                title: "Missing Credentials!",
                text: "Please enter your username/email and password.",
                icon: "warning"
            });
            return;
        }

        Swal.fire({
            title: "Access Granted!",
            text: "Welcome back, " + $scope.loginUsername + "! Redirecting to Home...",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
        }).then(function () {
            window.location.href = "/Main/Index";
        });
    };

  
    $scope.contactName = "";
    $scope.contactEmail = "";
    $scope.contactSubject = "";
    $scope.contactMessage = "";

    $scope.contactSubmitFunc = function () {
        if (!$scope.contactName || !$scope.contactEmail || !$scope.contactMessage) {
            Swal.fire({
                title: "Incomplete Message!",
                text: "Please provide your Name, Email, and Message content.",
                icon: "warning"
            });
            return;
        }

        Swal.fire({
            title: "Message Sent!",
            text: "Thank you, " + $scope.contactName + "! Our library administration team will respond shortly.",
            icon: "success"
        });

        $scope.contactName = "";
        $scope.contactEmail = "";
        $scope.contactSubject = "";
        $scope.contactMessage = "";
    };

});