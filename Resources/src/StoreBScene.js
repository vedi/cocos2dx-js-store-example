//
// StoreAScene class
//
var StoreBScene = cc.Class.extend({
  GOODS_NUMBER: 5,
  _mGoodTitles: [],
  _mGoodDescriptions: [],
  _mPrices: [],

  onDidLoadFromCCB: function () {
    applyScaleForNode(this.rootNode);
    fill(this.mBackgroundNode);
    shiftToTop(this.mTopNode);
    shiftToBottom(this.mBottomNode);

    for (var i = 0; i < this.GOODS_NUMBER; i++) {

      // TODO: Implement
      this.mGoodTitles[i].setString("mGoodTitles" + i);
      this.mGoodDescriptions[i].setString("mGoodDescriptions" + i);
      this.mPrices[i].setString(i);

//      CCSoomlaError *soomlaError = NULL;
//      CCVirtualItem *virtualItem = CCStoreInfo::sharedStoreInfo()->getItemByItemId(
//        mGoodTitles[i]->getString(), &soomlaError);
//      if (soomlaError) {
//        CCStoreUtils::logException("StoreBScene", soomlaError);
//        continue;
//      }
//      CC_ASSERT(virtualItem);
//      CCPurchasableVirtualItem *purchasableVirtualItem = dynamic_cast<CCPurchasableVirtualItem *>(virtualItem);
//      CC_ASSERT(purchasableVirtualItem);
//      CCPurchaseWithMarket *purchaseWithMarket = dynamic_cast<CCPurchaseWithMarket *>(purchasableVirtualItem->getPurchaseType());
//      CC_ASSERT(purchaseWithMarket);
//      double price = purchaseWithMarket->getMarketItem()->getPrice()->getValue();
//
//      mGoodTitles[i].setString(virtualItem->getName()->getCString());
//      mGoodDescriptions[i].setString(virtualItem->getDescription()->getCString());
//      mPrices[i].setString(CCString::createWithFormat("%.2f", price)->getCString());
    }

    // TODO: Implement
    var balance = 0;
//    CCSoomlaError *soomlaError = NULL;
//    int balance = CCStoreInventory::sharedStoreInventory()->getItemBalance("currency_muffin", &soomlaError);
//    if (soomlaError) {
//      CCStoreUtils::logException("StoreBScene", soomlaError);
//      balance = 0;
//      CCLog("Soomla balance error");
//    }
    this.updateCurrencyBalance(balance);
  },

  onBack: function (pSender) {
    var scene = cc.BuilderReader.loadAsScene("ccb/StoreAScene");
    cc.Director.getInstance().replaceScene(cc.TransitionMoveInL.create(0.8, scene));
  },

  onBuy: function(pSender) {
    if (pSender) {
      var tag = pSender.getTag();
      cc.log("onBuy: " + tag);
      var itemId = this.itemIdFromTag(tag);
      // TODO: Implement
//      CCSoomlaError *soomlaError = NULL;
//      CCStoreInventory::sharedStoreInventory()->buyItem(itemId.c_str(), &soomlaError);
//      if (soomlaError) {
//        CCStoreUtils::logException("StoreBScene::onBuy", soomlaError);
//        return;
//      }
    }
  },

  itemIdFromTag: function (tag) {
    switch (tag) {
      case 0: return "no_ads";
      case 1: return "muffins_10";
      case 2: return "muffins_50";
      case 3: return "muffins_400";
      case 4: return "muffins_1000";
      default: return "ERROR";
    }
  },

  onEnter: function () {
    // TODO: Implement
//    CCLayer::onEnter();
//    CCNotificationCenter::sharedNotificationCenter()->addObserver(this,
//      callfuncO_selector(StoreBScene::updateCurrencyBalance),
//      EVENT_ON_CURRENCY_BALANCE_CHANGED, NULL);
  },

  onExit: function () {
  // TODO: Implement
//    CCNotificationCenter::sharedNotificationCenter()->removeObserver(this, EVENT_ON_CURRENCY_BALANCE_CHANGED);
//    CCLayer::onExit();
  },

  updateCurrencyBalance: function (pBalance) {
    this.mMuffinAmount.setString(pBalance);
  }

});

Object.defineProperty(StoreBScene.prototype, "mGoodTitles", {
  get: function () {
    return this._mGoodTitles;
  },
  set: function (goodTitle) {
    this._mGoodTitles[goodTitle.getTag()] = goodTitle;
  }
});

Object.defineProperty(StoreBScene.prototype, "mGoodDescriptions", {
  get: function () {
    return this._mGoodDescriptions;
  },
  set: function (goodDescription) {
    this._mGoodDescriptions[goodDescription.getTag()] = goodDescription;
  }
});

Object.defineProperty(StoreBScene.prototype, "mPrices", {
  get: function () {
    return this._mPrices;
  },
  set: function (price) {
    this._mPrices[price.getTag()] = price;
  }
});
