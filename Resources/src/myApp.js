/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

  require("underscore.js");
  require("soomla.js");
  require("src/MuffinRushAssets.js");
  require("src/ExampleEventHandler.js");
  require("src/MainScreen.js");
  require("src/StoreAScene.js");
  require("src/StoreBScene.js");
  require("src/LevelIconWidget.js");

function startApplication(director) {

  // We initialize CCStoreController before we open the store.
  var assets = new MuffinRushAssets();
  var storeParams = {
    soomSec: "ExampleSoomSecret",
    androidPublicKey: "ExamplePublicKey",
    customSecret: "ExampleCustomSecret"
  };

  // This is the call to initialize CCStoreController
  Soomla.StoreController.createShared(assets, storeParams);

  /*
   * ** Set the amount of each currency to 10,000 if the **
   * ** balance drops under 1,000                        **
   *
   * ** Of course, this is just for testing...           **
   */
  var currencies = Soomla.storeInfo.getVirtualCurrencies();
  _.forEach(currencies, function(vc) {
    var balance = Soomla.storeInventory.getItemBalance(vc.itemId);
    if (balance < 1000) {
      Soomla.storeInventory.giveItem(vc.itemId, 10000 - balance);
    }
  });

// create a scene. it's an autorelease object
//  var mainScene = cc.BuilderReader.loadAsScene("ccb/MainScene");
  var mainScene = cc.BuilderReader.loadAsScene("ccb/MainScreen");
  mainScene.retain();

// run
  director.runWithScene(mainScene);
}

function applyScaleForNode(node) {
  var winSize = cc.Director.getInstance().getWinSize();
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

  var winSize = cc.Director.getInstance().getWinSize();

  var scaleX = winSize.width / (rightTop.x - leftBottom.x);
  var scaleY = winSize.height / (rightTop.y - leftBottom.y);

  targetNode.setScale(scaleX > scaleY ? scaleX : scaleY);
}

function shiftToLeftBottom(targetNode) {
  var position = targetNode.getParent().convertToNodeSpace(cc.POINT_ZERO);
  targetNode.setPosition(position);
}

function shiftToTop(targetNode) {
  var winSize = cc.Director.getInstance().getWinSize();
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

  var winSize = cc.Director.getInstance().getWinSize();

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

