*This project is a part of The [SOOMLA](http://www.soom.la) Framework, which is a series of open source initiatives with a joint goal to help mobile game developers do more together. SOOMLA encourages better game design, economy modeling, social engagement, and faster development.*

# cocos2dx-js-store-example

**cocos2dx-js-store-example** is an example project demonstrating usage and implementation of SOOMLA's [cocos2dx-store](http://github.com/soomla/cocos2dx-store).

This project contains examples for implementing all of SOOMLA's interfaces and using SOOMLA's various services. Read up on what you can do with SOOMLA in this [wiki](https://github.com/soomla/android-store/wiki) (the wiki is for Android but it applies to all the projects under The SOOMLA Project).

## Getting started

1. Obtain the Cocos2d-js framework either from [git](https://github.com/cocos2d/cocos2d-js) or from the [Cocos2d-x website](http://www.cocos2d-x.org/download). Make sure to use the latest **stable** version (v3.3 as of Mar 31 2015).

2. Download and install Cocos IDE (http://www.cocos2d-x.org/download).


3. Recursively clone this project to the workspace folder of Cocos IDE.
    ```
    $ git clone --recursive https://github.com/soomla/cocos2dx-js-store-example.git
    ```

4. Import this project to workspace of Cocos IDE.

#### Build instructions for Android

1. Build Custom Sumulator for Android in Cocos IDE.

Take a look around, and get a feel for all you can do with cocos2dx-store.

> Please, get sure you selected `Android ADB Mode` and set up path to just created runtime (`runtime/android/cocos2dxJsStoreExample-debug.apk`) in your "Debug Configuration".

#### Build instructions for iOS

1. In order to proceed we need to know, where your cocos2d-x is. Please, create a symlink with `cocos2d-x` at the path `frameworks/runtime-src` of the project, which looks at `cocos2d-x`. It can be something like that:

  ```
ln -s <your-cocos2d-js-path>/frameworks/js-bindings/cocos2d-x frameworks/runtime-src/cocos2d-x
  ```

2. Build Custom Sumulator for iOS in Cocos IDE.

Take a look around, and get a feel for all you can do with cocos2dx-store.

> Please, get sure you selected `IOS Simulator` and set up path to just created runtime (`runtime/ios/cocos2dxJsStoreExample iOS.app`) in your "Debug Configuration".

#### IStoreAssets

A good example of how to define an economy model can be found in [MuffinRushAssets](https://github.com/soomla/cocos2dx-js-store-example/blob/master/Resources/src/MuffinRushAssets.js).

Take a look at that file and see how you can define your specific game's economy.

#### Scenes

This project contains three main scenes: MainScene, StoreAScene, and StoreBScene. They are all built with [*CocosBuilder*](http://cocosbuilder.com/)
- **MainScene**: serves as an entry point to the store, use it as a reference how to enter the store in your app.
- **StoreAScene**: contains all of the PurchaseWithVirtualItem items and allows the user to buy them.
- **StoreBScene**: contains all of the PurchaseWithMarket items and allows the user to buy them.

Contribution
---
SOOMLA appreciates code contributions! You are more than welcome to extend the capabilities of SOOMLA.

Fork -> Clone -> Implement -> Add documentation -> Test -> Pull-Request.

IMPORTANT: If you would like to contribute, please follow our [Documentation Guidelines](https://github.com/soomla/cocos2dx-store/blob/master/documentation.md
). Clear, consistent comments will make our code easy to understand.

## SOOMLA, Elsewhere ...

+ [Framework Website](http://www.soom.la/)
+ [Knowledge Base](http://know.soom.la/)


<a href="https://www.facebook.com/pages/The-SOOMLA-Project/389643294427376"><img src="http://know.soom.la/img/tutorial_img/social/Facebook.png"></a><a href="https://twitter.com/Soomla"><img src="http://know.soom.la/img/tutorial_img/social/Twitter.png"></a><a href="https://plus.google.com/+SoomLa/posts"><img src="http://know.soom.la/img/tutorial_img/social/GoogleP.png"></a><a href ="https://www.youtube.com/channel/UCR1-D9GdSRRLD0fiEDkpeyg"><img src="http://know.soom.la/img/tutorial_img/social/Youtube.png"></a>

## License

Apache License. Copyright (c) 2012-2015 SOOMLA. http://soom.la
+ http://opensource.org/licenses/Apache-2.0
