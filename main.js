/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */

cc.game.onStart = function () {
  initSoomla();
  cc.view.adjustViewPort(true);
  cc.view.setDesignResolutionSize(640, 960, cc.ResolutionPolicy.SHOW_ALL);
  cc.view.resizeWithBrowserSize(true);
  //load resources
  cc.LoaderScene.preload(g_resources, function () {
    // create a scene. it's an autorelease object
    try {
      var mainScene = cc.BuilderReader.loadAsScene("ccb/MainScreen.ccbi", null, null);
      mainScene.retain();
      cc.director.runScene(mainScene);
    } catch (err) {
      console.log(err);
    }
  }, this);
};

function initSoomla() {
  console.log('try to init soomla');
  try {

    // Turn on debug logging
    Soomla.DEBUG = true;

    Soomla.initialize("ExampleCustomSecret");

    // We initialize SoomlaStore before we open the store.
    var assets = new MuffinRushAssets();
    var storeParams = {
      androidPublicKey: "ExamplePublicKey",
      testPurchases: true
    };

    // This is the call to initialize SoomlaStore
    Soomla.soomlaStore.initialize(assets, storeParams);


    /*
     * ** Set the amount of each currency to 10,000 if the **
     * ** balance drops under 1,000                        **
     *
     * ** Of course, this is just for testing...           **
     */
    var currencies = Soomla.storeInfo.getCurrencies();
    _.forEach(currencies, function (vc) {
      var balance = Soomla.storeInventory.getItemBalance(vc.itemId);
      if (balance < 1000) {
        Soomla.storeInventory.giveItem(vc.itemId, 10000 - balance);
      }
    });
    console.log('soomla inited');
  } catch (e) {
    console.log('cannot init soomla: ' + e);
    Soomla.logError(Soomla.dumpError(e));
  }
}

function applyScaleForNode(node) {
  var winSize = cc.director.getWinSize();
  var scale = winSize.width / node.getContentSize().width < winSize.height / node.getContentSize().height ?
  winSize.width / node.getContentSize().width : winSize.height / node.getContentSize().height;
  node.setScale(scale);
  node.setPosition(cc.p((winSize.width - node.getContentSize().width * scale) / 2,
    (winSize.height - node.getContentSize().height * scale) / 2));

  return scale;
}

function fill(targetNode) {
  var contentPoint = cc.p(targetNode.getContentSize().width, targetNode.getContentSize().height);

  var leftBottom = targetNode.getParent().convertToWorldSpace(targetNode.getPosition());
  var rightTop =
    targetNode.getParent().convertToWorldSpace(
      cc.p(targetNode.getPosition().x + contentPoint.x, targetNode.getPosition().y + contentPoint.y));

  var winSize = cc.director.getWinSize();

  var scaleX = winSize.width / (rightTop.x - leftBottom.x);
  var scaleY = winSize.height / (rightTop.y - leftBottom.y);

  targetNode.setScale(scaleX > scaleY ? scaleX : scaleY);
}

function shiftToLeftBottom(targetNode) {
  var position = targetNode.getParent().convertToNodeSpace(cc.POINT_ZERO);
  targetNode.setPosition(position);
}

function shiftToTop(targetNode) {
  var winSize = cc.director.getWinSize();
  var position =
    targetNode.getParent().convertToNodeSpace(cc.p(winSize.width, winSize.height));
  targetNode.setPositionY(position.y);
}

function shiftToBottom(targetNode) {
  var position = targetNode.getParent().convertToNodeSpace(cc.p(0, 0));
  targetNode.setPositionY(position.y);
}

function fillWidth(targetNode) {
  var leftBottom =
    targetNode.getParent().convertToWorldSpace(targetNode.getPosition());
  var contentPoint = cc.p(targetNode.getContentSize().width, targetNode.getContentSize().height);
  var rightTop =
    targetNode.getParent().convertToWorldSpace(
      cc.p(targetNode.getPosition().x + contentPoint.x, targetNode.getPosition().y + contentPoint.y));

  var winSize = cc.director.getWinSize();

  targetNode.setScale(winSize.width / (rightTop.x - leftBottom.x));
}

function putToCenterMiddleOf(targetNode, anchorNode) {

  var contentPoint = cc.p(anchorNode.getContentSize().width, anchorNode.getContentSize().height);
  var minusAnchorPoint = cc.p(1 - anchorNode.getAnchorPoint().x, 1 - anchorNode.getAnchorPoint().y);

  var leftBottom =
    anchorNode.convertToWorldSpaceAR(
      cc.p(
        -anchorNode.getAnchorPoint().x * contentPoint.width,
        -anchorNode.getAnchorPoint().y * contentPoint.height));
  var rightTop =
    anchorNode.convertToWorldSpaceAR(
      cc.p(
        minusAnchorPoint.x * contentPoint.width,
        minusAnchorPoint.y * contentPoint.height));
  var globalPosition = cc.p(leftBottom.x + (rightTop.x - leftBottom.x) / 2, leftBottom.y + (rightTop.y - leftBottom.y) / 2);

  targetNode.setPosition(targetNode.getParent().convertToNodeSpace(globalPosition));
}

function isNodeAtPoint(node, touchLocation) {
  var nodePoint = node.convertToNodeSpace(touchLocation);
  var rect = cc.rect(0, 0, node.getContentSize().width, node.getContentSize().height);
  return cc.rectContainsPoint(rect, nodePoint);
}

cc.game.run();
