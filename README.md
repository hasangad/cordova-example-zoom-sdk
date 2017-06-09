ZoOm SDK Cordova Example
------------------------
This application provides a simple example for using the ZoOm SDK Cordova plugin.  

Preparing the Sample App
------------------------
Before the app can be built correctly, all platform dependencies must be updated by running `cordova platform update android' and `cordova platform update ios' from the command line while in the project directory.

Installing the Plugin
---------------------
After cloning this project, the ZoOm plugin must first be installed by running `cordova plugin add https://github.com/facetec/cordova-plugin-zoom-sdk` from the command line.  For more details about the plugin, [see here](https://github.com/facetec/cordova-plugin-zoom-sdk).

Setting Your App Token
----------------------
In index.js, modify the following line to contain your ZoOm app token:
```javascript
var appToken = "SET YOUR TOKEN HERE";
```
If you do not have an app token, register for [developer access](https://dev.zoomlogin.com/).

Running the Application
-----------------------
Run `cordova run android` or `cordova run ios` to build and install the app.  For more complete instructions, see the [Cordova](https://cordova.apache.org/#getstarted) documentation. 
