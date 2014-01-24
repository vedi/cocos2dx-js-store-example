//
// StoreAScene class
//
var StoreAScene = cc.Class.extend({
  NUMBER_OF_ROWS: 14,

  _mListRows: [],
  _mListItems: [],
  mCacheListItems: [],

  onDidLoadFromCCB: function () {
    applyScaleForNode(this.rootNode);
    fill(this.mBackgroundNode);
//    putToCenterMiddleOf(this.mMainNode, this.mBackgroundNode);
    shiftToTop(this.mTopNode);
    shiftToBottom(this.mBottomNode);

    //  create TableView instead of node-container
    var tableParent = this.mGoodsTableView.getParent();
    tableParent.removeChild(this.mGoodsTableView);
    var contentSize = this.mGoodsTableView.getContentSize();
    var tableView = cc.TableView.create(this, contentSize);
    tableView.ignoreAnchorPointForPosition(this.mGoodsTableView.isIgnoreAnchorPointForPosition());
    tableView.setAnchorPoint(this.mGoodsTableView.getAnchorPoint());
    tableView.setContentSize(this.mGoodsTableView.getContentSize());
    tableView.setPosition(this.mGoodsTableView.getPosition());
    this.mGoodsTableView = tableView;
    tableParent.addChild(tableView);
    this.mGoodsTableView.setBounceable(false);
    this.mGoodsTableView.setDelegate(this);
    this.mGoodsTableView.reloadData();

    for (var i = 0; i < this.NUMBER_OF_ROWS; i++) {
      var itemId = this.itemIdFromTag(i);
      if (itemId != "ERROR") {
        var name = " ";
        var info = " ";

        //  TODO: Implement
        var balance = 0;
        name = "name" + i;
        info = "info" + i;
//        CCSoomlaError *soomlaError = NULL;
//
//        CCVirtualItem *virtualItem;
//        virtualItem = CCStoreInfo::sharedStoreInfo()->getItemByItemId(itemId.c_str(), &soomlaError);
//        if (!soomlaError) {
//          name = virtualItem->getName()->getCString();
//          info = virtualItem->getDescription()->getCString();
//        } else {
//          CCStoreUtils::logException("StoreAScene::createListViewItem", soomlaError);
//        }
//
//        soomlaError = NULL;
//        int balance = CCStoreInventory::sharedStoreInventory()->getItemBalance(itemId.c_str(), &soomlaError);
//        if (soomlaError) {
//          CCStoreUtils::logException("StoreAScene::getItemBalance", soomlaError);
//          balance = 0;
//          CC_ASSERT(false);
//        }
        if (itemId == "show_room" || itemId == "delivery_vehicle") {
          this.setProgressForItem(itemId, this.mListItems[i]);
        }
        else if (itemId == "fat_cat"
          || itemId == "happi_hippo"
          || itemId == "funkey_monkey") {
          this.setEquippedForItem(itemId, this.mListItems[i]);
        }

        var price = -1;
        // TODO: Implement
//        CCPurchasableVirtualItem *purchasableVirtualItem = dynamic_cast<CCPurchasableVirtualItem *>(virtualItem);
//        if (purchasableVirtualItem != NULL) {
//          CCPurchaseType *purchaseType = purchasableVirtualItem->getPurchaseType();
//          if (dynamic_cast<CCPurchaseWithMarket *>(purchaseType)) {
//            price = static_cast<CCPurchaseWithMarket *>(purchaseType)->getMarketItem()->getPrice()->getValue();
//          } else if (dynamic_cast<CCPurchaseWithVirtualItem *>(purchaseType)) {
//            price = static_cast<CCPurchaseWithVirtualItem *>(purchaseType)->getAmount()->getValue();
//          } else {
//            price = -1;
//          }
//        } else {
//          price = -1;
//        }

        this.mListItems[i].controller.setData(itemId, name, info, price, balance);
      }
    }

    // TODO: Implement
    var balance = 0;
//    CCSoomlaError *soomlaError = NULL;
//    int balance = CCStoreInventory::sharedStoreInventory()->getItemBalance("currency_muffin", &soomlaError);
//    if (soomlaError) {
//      CCStoreUtils::logException("StoreAScene::setCurrencyBalanceLabel", soomlaError);
//      balance = 0;
//      CCLog("Soomla balance error");
//    }

    this.updateCurrencyBalance(balance);
  },

  onMoreMuffins: function(pSender) {
    var scene = cc.BuilderReader.loadAsScene("ccb/StoreBScene");
    cc.Director.getInstance().replaceScene(cc.TransitionMoveInR.create(0.8, scene));
  },

  onEnter: function () {
    // TODO: Implement
//    CCLayer::onEnter();
//    CCNotificationCenter::sharedNotificationCenter() - > addObserver(this,
//      callfuncO_selector(StoreAScene::updateCurrencyBalance),
//      EVENT_ON_CURRENCY_BALANCE_CHANGED, NULL);
//    CCNotificationCenter::sharedNotificationCenter() - > addObserver(this,
//      callfuncO_selector(StoreAScene::updateGoodBalance),
//      EVENT_ON_GOOD_BALANCE_CHANGED, NULL);
//    CCNotificationCenter::sharedNotificationCenter() - > addObserver(this,
//      callfuncO_selector(StoreAScene::onGoodEquipped),
//      EVENT_ON_GOOD_EQUIPPED, NULL);
//    CCNotificationCenter::sharedNotificationCenter() - > addObserver(this,
//      callfuncO_selector(StoreAScene::onGoodUnEquipped),
//      EVENT_ON_GOOD_UNEQUIPPED, NULL);
//    CCNotificationCenter::sharedNotificationCenter() - > addObserver(this,
//      callfuncO_selector(StoreAScene::onGoodUpgrade),
//      EVENT_ON_GOOD_UPGRADE, NULL);
  },

  onExit: function() {
    // TODO: Implement
//    CCNotificationCenter::sharedNotificationCenter()->removeObserver(this, EVENT_ON_CURRENCY_BALANCE_CHANGED);
//    CCNotificationCenter::sharedNotificationCenter()->removeObserver(this, EVENT_ON_GOOD_BALANCE_CHANGED);
//    CCNotificationCenter::sharedNotificationCenter()->removeObserver(this, EVENT_ON_GOOD_EQUIPPED);
//    CCNotificationCenter::sharedNotificationCenter()->removeObserver(this, EVENT_ON_GOOD_UNEQUIPPED);
//    CCNotificationCenter::sharedNotificationCenter()->removeObserver(this, EVENT_ON_GOOD_UPGRADE);
//    CCLayer::onExit();
  },

  onBack: function(pSender) {
    // TODO: Implement
//    #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
//        CCStoreController::sharedStoreController()->stopIabServiceInBg();
//    #endif

    var scene = cc.BuilderReader.loadAsScene("ccb/MainScreen");
    cc.Director.getInstance().replaceScene(cc.TransitionMoveInL.create(0.8, scene));
  },

  itemIdFromTag: function(tag) {
    var ret;
    switch (tag) {
      case 1:
        ret = "fruit_cake";
        return ret;
      case 2:
        ret = "pavlova";
        return ret;
      case 3:
        ret = "pavlova_10";
        return ret;
      case 4:
        ret = "chocolate_cake";
        return ret;
      case 5:
        ret = "cream_cup";
        return ret;
      case 6:
        ret = "cream_cup_10";
        return ret;
      case 8:
        ret = "show_room";
        return ret;
      case 9:
        ret = "delivery_vehicle";
        return ret;
      case 11:
        ret = "fat_cat";
        return ret;
      case 12:
        ret = "happi_hippo";
        return ret;
      case 13:
        ret = "funkey_monkey";
        return ret;
      default:
        ret = "ERROR";
        return ret;
    }
  },

  updateCurrencyBalance: function(pBalance) {
    this.mMuffinAmount.setString(pBalance.getValue());
  },

  updateCurrencyBalance: function(pParams) {
    // TODO: Implement
//    soomla::CCVirtualGood *virtualGood = (CCVirtualGood *) pParams->objectAtIndex(0);
//    CCInteger *balance = (CCInteger *) pParams->objectAtIndex(1);
//
//    ////*****
//    for (var i = 0; i < this.NUMBER_OF_ROWS; i++) {
//      var itemId = this.itemIdFromTag(i);
//      if (virtualGood->getItemId()->compare(itemId.c_str()) == 0) {
//        mListItem[i]->setBalance(balance->getValue());
//        break;
//      }
//    }
  },

  onGoodEquipped: function(virtualGood) {
    // TODO: Implement
//    for (unsigned int i = 0; i < NUMBER_OF_ROWS; i++) {
//      string itemId = itemIdFromTag(i);
//      if (virtualGood->getItemId()->compare(itemId.c_str()) == 0) {
//        mListItem[i]->setEquiped(true);
//        break;
//      }
//    }
  },

  onGoodUnEquipped: function(virtualGood) {
    // TODO: Implement
//    for (unsigned int i = 0; i < NUMBER_OF_ROWS; i++) {
//      string itemId = itemIdFromTag(i);
//      if (virtualGood->getItemId()->compare(itemId.c_str()) == 0) {
//        mListItem[i]->setEquiped(false);
//        break;
//      }
//    }
  },

  onGoodUpgrade: function(virtualGood) {
  // TODO: Implement
//    for (unsigned int i = 0; i < NUMBER_OF_ROWS; i++) {
//      string itemId = itemIdFromTag(i);
//      if (virtualGood->getItemId()->compare(itemId.c_str()) == 0) {
//        setProgressForItem(itemId, mListItem[i]);
//        break;
//      }
//    }
  },

  //  CCTableViewCell delegate
  tableCellAtIndex: function(table, idx) {
    return this._mListRows[this.NUMBER_OF_ROWS - idx - 1];
  },

  numberOfCellsInTableView: function(table) {
    return this.NUMBER_OF_ROWS;
  },

  tableCellSizeForIndex: function(table, idx) {
    return this._mListRows[this.NUMBER_OF_ROWS - idx - 1].getContentSize();
  },
  //  \CCTableViewCell delegate

  setProgressForItem: function(itemId, pWidget) {
    // TODO: Implement
//    CCSoomlaError *soomlaError = NULL;
//    int progress = CCStoreInventory::sharedStoreInventory()->getGoodUpgradeLevel(itemId.c_str(), &soomlaError);
//    if (soomlaError) {
//      CCStoreUtils::logException("StoreAScene::setProgressForItem", soomlaError);
//      progress = 0;
//      CC_ASSERT(false);
//    }
//    pWidget->setProgress(progress);
  },

  setEquippedForItem: function(itemId, pWidget) {
    // TODO: Implement
//    CCSoomlaError *soomlaError = NULL;
//    bool equipped = CCStoreInventory::sharedStoreInventory()->isVirtualGoodEquipped(itemId.c_str(), &soomlaError);
//    if (soomlaError) {
//      CCStoreUtils::logException("StoreAScene::setEquippedForItem", soomlaError);
//      equipped = false;
//      CC_ASSERT(false);
//    }
//    pWidget->setEquiped(equipped);
  }
});

Object.defineProperty(StoreAScene.prototype, "mListRows", {
  get: function () {
    return this._mListRows;
  },
  set: function (listRow) {
    listRow.getParent().removeChild(listRow);
    var cell = new cc.TableViewCell();
    cell.retain();
    cell.setAnchorPoint(listRow.getAnchorPoint());
    cell.ignoreAnchorPointForPosition(listRow.isIgnoreAnchorPointForPosition());
    cell.setContentSize(listRow.getContentSize());
    cell.addChild(listRow);
    listRow.setPosition(cc.p(0, 0));
    this._mListRows[listRow.getTag()] = cell;
  }
});

Object.defineProperty(StoreAScene.prototype, "mListItems", {
  get: function () {
    return this._mListItems;
  },
  set: function (listItem) {
    this._mListItems[listItem.getTag()] = listItem;
  }
});
