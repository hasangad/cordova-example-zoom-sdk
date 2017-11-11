/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var appToken = "dyGvvFAeOCHXXKKMR5oj4cQ6GHkYb5v1";
var userId = "sampleUserId";
var encryptionSecret = "some secret data";

var enrollButton = null;
var authButton = null;

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    updateAuthButtonState: function() {
        ZoomAuthentication.isUserEnrolled(userId, function(isEnrolled) {
            authButton.disabled = !isEnrolled;
        });
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        enrollButton = document.getElementById("enrollButton");
        enrollButton.addEventListener("click", this.onEnrollClick.bind(this));
        
        authButton = document.getElementById("authButton");
        authButton.addEventListener("click", this.onAuthClick.bind(this));
    
        if (typeof ZoomAuthentication !== 'undefined') {
            ZoomAuthentication.initialize(appToken, this.onZoomInitializeSuccess.bind(this), this.onError.bind(this));
        }
        else {
            alert("ZoOm plugin not available.");
        }
    },

  /* Zoom Events */
    onZoomInitializeSuccess: function(success) {
        enrollButton.disabled = false;
        this.updateAuthButtonState();
        ZoomAuthentication.getVersion(function(v) {
            var versionElement = document.getElementById("version");
            versionElement.innerText = "SDK Version " + v;
            versionElement.setAttribute('style', 'display:block');
        }, this.onError.bind(this));
    },

    onZoomInitializeError: function(message) {
        this.onError("Zoom initalize failed: " + message);
    },

    onZoomEnrollFinish: function(result) {
        if (result.status == "Enrolled") {
            authButton.disabled = false;
        }
        else {
            authButton.disabled = true;
        }
        this.updateAuthButtonState();
    },

    onZoomAuthFinish: function(result) {
        this.updateAuthButtonState();
        alert(JSON.stringify(result));
    },

    onError: function(message) {
        if (message) {
            alert("Error: " + message);
        }
        else {
            alert("Unknown error");
        }
    },

  /* Click Events */
    onEnrollClick: function() {
        ZoomAuthentication.enroll(userId, encryptionSecret, this.onZoomEnrollFinish.bind(this), this.onError.bind(this));
    },

    onAuthClick: function() {
        ZoomAuthentication.authenticate(userId, encryptionSecret, this.onZoomAuthFinish.bind(this), this.onError.bind(this));
    },
};

app.initialize();
