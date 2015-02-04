angular-jmpress
===============

An angular module adapter for jmpress

[![Build Status](https://travis-ci.org/web-stories/angular-jmpress.svg)](https://travis-ci.org/web-stories/angular-jmpress)
[![Build status](https://ci.appveyor.com/api/projects/status/uvnv7ugeempbottw?svg=true)](https://ci.appveyor.com/project/FagnerMartinsBrack/angular-jmpress)
[![devDependency Status](https://david-dm.org/web-stories/angular-jmpress/dev-status.svg)](https://david-dm.org/web-stories/angular-jmpress#info=devDependencies)

**DISCLAIMER:**  
This project is a **WORK IN PROGRESS**, and currently supports only some basic features of jmpress. Feel free to open a pull request and implement additional features.

## Get started

1. jmpress is a jquery plugin, so first you need to include the latest [jquery](jquery.com) version in your page.

2. Also download and include the latest [angular](https://angularjs.org/) version.

3. jmpress does a lot of things angular can do out of the box, so not all modules are necessary, but a custom build of jmpress with the following modules are required:

    * `core.js` - Necessary to expose plugin facility
    * `near.js` - It is used a dependency for several modules
    * `transform.js` - Necessary to apply transformation on steps
    * `active.js` - Necessary to apply active classes

It is necessary that you pick `circular.js`, which handles the default mechanism for selecting the slides using the default methods (next, prev, home, etc.), or you can roll your own using jmpress plugin facility.

Also, it is necessary to specify the viewport width, so jmpress is able to adjust itself to fit the screen accordingly:

```javascript
// A viewport config is necessary to enable auto resize of the content on window resize
$.jmpress( "beforeActive", function( step, eventData ) {
	eventData.stepData.viewPortWidth = 2000;
});
```

*Note1: The relationship between the size of the viewport and the steps width determines the size of the contents, to fit the whole screen, also declare `.step { width: 2000px; }` in the css.*

*Note2: This project supports AMD, so you can create a custom jquery.jmpress.js module with all dependencies. For details see [here](https://github.com/web-stories/angular-jmpress/blob/master/src/main/jquery.jmpress.js).*

4. Last, but no least, you should include the `angular-jmpress.js` to enable angular functionalities.

*Note: Due to some quirks in the original jmpress project, it is necessary some changes to make it work with angular-jmpress. Theres is a [fork](https://github.com/web-stories/jmpress.js) adapted and being tested on angular-jmpress. You can try to build a custom jmpress build from original repo, but do it at your own risk.*

## Usage

First thing you should do is specify a container for jmpress inside a controller, the container directive is called `jmpress-root`:

```html
<div ng-controller="MyController">
  <div jmpress-root></div>
</div>
```

After that you need to specify the property that is going to be watched for an array of step objects, in this case we use `presentation.slides`:

```html
<div ng-controller="MyController">
  <div jmpress-root
      jmpress-steps="presentation.slides"></div>
</div>
```

We also need to declare the step elements. The steps are updated for each change in the array of step objects, but we still need to declare the HTML structure:

```html
<div ng-controller="PresentationController">
  <div jmpress-root
      jmpress-steps="presentation.slides">
    <div class="step" ng-repeat="step in steps">
      Step {{ step.number }}
    </div>
  </div>
</div>
```

*Note that `ng-repeat` uses `step in steps` instead of `step in presentation.slides`. The inner content of the root directive is bound to the isolated scope of the root directive, not the outside controller scope.*

After that you just need to start your angular module and include `jmpress` as its dependency:

```javascript
angular.module( "myModule", [ "jmpress" ] )
  .controller( "PresentationController", function( $scope ) {
    $scope.presentation = {
      slides: [{
        number: 1
      }, {
        number: 2
      }]
    };
  });
```

If you want to see thing working, check out the [demo](https://github.com/web-stories/angular-jmpress/tree/master/src/gh-pages/demo) and the [test files](https://github.com/web-stories/angular-jmpress/tree/master/src/test)

## jmpress service

angular-jmpress has a service called `jmpress`, which contains some utility methods to
retrieve the presentation information.

By default, all utility methods start either with "find" or "get".

* If a method starts with "get", then you have to provide the steps array in the first argument.
* If a method starts with "find", then you can omit the first argument, angular-jmpress will
  lookup for the steps array in the current service instance.

Example of "get" usage:

```javascript
angular.module( "myModule", [ "jmpress" ] )
  .controller(function( $scope, jmpress ) {
    $scope.steps = [{
      active: true
    }];
    var active = jmpress.getActive( $scope.steps );
  });
```

Example of "find" usage:

```javascript
angular.module( "myModule", [ "jmpress" ] )
  .controller(function( $scope, jmpress ) {
    $scope.steps = [{
      active: true
    }];
    $scope.executedLater = function() {
      var active = jmpress.findActive();
    };
  });
```

*Note that you should not call "find" methods in the same digest cycle used to create the steps
 array, because angular-jmpress does not yet have the internal reference for the steps. Use them
 only if you created the steps in a previous digest cycle.*

### getActive( steps ) / findActive()

Retrieves the current active step or `undefined` if there's no active step.

```javascript
jmpress.getActive( steps ); // { active: true }
jmpress.findActive(); // { active: true }
```

### getActive( steps, index ) / findActive( index )

Retrieves the step relative to the current active step, or `undefined` if there's no active step or
if the step is out of range.

```javascript
var steps = [{
  number: 1
}, {
  number: 2,
  active: true
}, {
  number: 3
}];

jmpress.getActive( steps, 1 ); // { number: 3 }
jmpress.findActive( -1 ); // { number: 1 }
```

## Manual release process

1. Remove `-pre` suffix on `package.json` and `bower.json` version
2. Commit "Create version x.x.x"
3. Create tag
4. Create github release
5. Bump the version and add the `-pre` suffix on on `package.json` and `bower.json`