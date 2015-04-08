//
// StoreAScene class
//
cc.BuilderReader.registerController('StoreAScene', {
  NUMBER_OF_ROWS: 14,

  mListItems: [],

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

    var _this = this;
    var superOnEnter = this.rootNode.onEnter;
    this.rootNode.onEnter = function () {
      Soomla.on(Soomla.Models.StoreConsts.EVENT_CURRENCY_BALANCE_CHANGED, _this.onCurrencyBalanceChanged, _this);
      Soomla.on(Soomla.Models.StoreConsts.EVENT_GOOD_BALANCE_CHANGED, _this.updateGoodBalance, _this);
      Soomla.on(Soomla.Models.StoreConsts.EVENT_GOOD_EQUIPPED, _this.onGoodEquipped, _this);
      Soomla.on(Soomla.Models.StoreConsts.EVENT_GOOD_UNEQUIPPED, _this.onGoodUnEquipped, _this);
      Soomla.on(Soomla.Models.StoreConsts.EVENT_GOOD_UPGRADE, _this.onGoodUpgrade, _this);
      _this.initData();
      console.log('onEnter');
      superOnEnter.call(_this.rootNode);
    };
    var superOnExit = this.rootNode.onExit;
    this.rootNode.onExit = function () {
      console.log('onExit');
      Soomla.removeEventHandlersWithTarget(_this)
      superOnExit.call(_this.rootNode);
    };

    cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ALL_AT_ONCE,
      onTouchesEnded: function (touches, event) {
        try {
          var touchPoint = touches[0].getLocation();
          if (isNodeAtPoint(_this.mButtonBack, touchPoint)) {
            _this.onBack();
          } else if (isNodeAtPoint(_this.mButtonMoreMuffins, touchPoint)) {
            _this.onMoreMuffins();
          }
        } catch (err) {
          console.log(err);
        }
      }
    }, this.rootNode);

  },

  initData: function () {
    var balance;
    this.mListItems.length = this.NUMBER_OF_ROWS;
    for (var i = 0; i < this.NUMBER_OF_ROWS; i++) {
      var itemId = this.itemIdFromTag(i);
      if (itemId != "ERROR") {
        var name = " ";
        var info = " ";

        var virtualItem;
        try {
          virtualItem = Soomla.storeInfo.getItemByItemId(itemId);
          name = virtualItem.name;
          info = virtualItem.description;
        } catch (e) {
          Soomla.logError("StoreAScene: " + Soomla.dumpError(e));
        }

        try {
          balance = Soomla.storeInventory.getItemBalance(itemId);
        } catch (e) {
          Soomla.logError("StoreAScene: " + Soomla.dumpError(e));
          balance = 0;
        }

        if (itemId == "show_room" || itemId == "delivery_vehicle") {
          this.setProgressForItem(itemId, this.mListItems[i].controller);
        }
        else if (itemId == "fat_cat"
          || itemId == "happi_hippo"
          || itemId == "funkey_monkey") {
          this.setEquippedForItem(itemId, this.mListItems[i].controller);
        }

        var price = -1;
        var purchasableVirtualItem = virtualItem;
        if (purchasableVirtualItem.purchasableItem) {
          var purchasableItem = purchasableVirtualItem.purchasableItem;
          if (purchasableItem.purchaseType == "market") {
            price = purchasableItem.marketItem.price;
          } else if (purchasableItem.purchaseType == "virtualItem") {
            price = purchasableItem.pvi_amount;
          } else {
            Soomla.logError("Unsupported purchaseType: " + Soomla.dumpError(purchasableItem));
            price = -1;
          }
        } else {
          price = -1;
        }

        this.mListItems[i].controller.setData(itemId, name, info, price, balance);
      }
    }

    try {
      balance = Soomla.storeInventory.getItemBalance("currency_muffin");
    } catch (e) {
      Soomla.logError("StoreAScene: " + Soomla.dumpError(e));
      balance = 0;
    }

    this.updateCurrencyBalance(balance);
  },

  onMoreMuffins: function () {
    console.log('onMoreMuffins');
    var scene = cc.BuilderReader.loadAsScene("ccb/StoreBScene");
    cc.director.runScene(new cc.TransitionMoveInR(0.8, scene));
  },

  onBack: function () {
    console.log('onBack');
    // TODO: Implement
//    #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
//        CCStoreController::sharedStoreController()->stopIabServiceInBg();
//    #endif
//
    var scene = cc.BuilderReader.loadAsScene("ccb/MainScreen");
    cc.director.runScene(new cc.TransitionMoveInL(0.8, scene));
  },

  itemIdFromTag: function (tag) {
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

  updateCurrencyBalance: function (balance) {
    this.mMuffinAmount.setString(balance);
  },

  updateGoodBalance: function(virtualCurrency, balance) {
    for (var i = 0; i < this.NUMBER_OF_ROWS; i++) {
      var itemId = this.itemIdFromTag(i);
      if (virtualCurrency.itemId == itemId) {
        this.mListItems[i].controller.setBalance(balance);
        break;
      }
    }
  },

  onCurrencyBalanceChanged: function (virtualCurrency, balance, amountAdded) {
    Soomla.logDebug("CurrencyBalanceChanged: " + balance);
    this.updateCurrencyBalance(balance);
  },

  onGoodBalanceChanged: function (virtualGood, balance, amountAdded) {
    Soomla.logDebug("GoodBalanceChanged");
    this.updateGoodBalance(virtualGood, balance);
  },

  onGoodEquipped: function(virtualGood) {
    Soomla.logDebug("GoodEquipped");
    for (var i = 0; i < this.NUMBER_OF_ROWS; i++) {
      var itemId = this.itemIdFromTag(i);
      if (virtualGood.itemId == itemId) {
        this.mListItems[i].controller.setEquiped(true);
        break;
      }
    }
  },

  onGoodUnEquipped: function(virtualGood) {
    Soomla.logDebug("GoodUnEquipped");
    for (var i = 0; i < this.NUMBER_OF_ROWS; i++) {
      var itemId = this.itemIdFromTag(i);
      if (virtualGood.itemId == itemId) {
        this.mListItems[i].controller.setEquiped(false);
        break;
      }
    }
  },

  onGoodUpgrade: function(virtualGood) {
    Soomla.logDebug("GoodUpgrade");
    for (var i = 0; i < this.NUMBER_OF_ROWS; i++) {
      var itemId = this.itemIdFromTag(i);
      if (virtualGood.itemId == itemId) {
        this.setProgressForItem(itemId, this.mListItems[i].controller);
        break;
      }
    }
  },

  //  CCTableViewCell delegate
  tableCellAtIndex: function (table, idx) {
    return this._mListRows[this.NUMBER_OF_ROWS - idx - 1];
  },

  numberOfCellsInTableView: function (table) {
    return this.NUMBER_OF_ROWS;
  },

  tableCellSizeForIndex: function (table, idx) {
    return this._mListRows[this.NUMBER_OF_ROWS - idx - 1].getContentSize();
  },
  //  \CCTableViewCell delegate

  setProgressForItem: function (itemId, pWidget) {
    var progress;
    try {
      progress = Soomla.storeInventory.getGoodUpgradeLevel(itemId);
    } catch (e) {
      progress = 0;
      Soomla.logError("StoreAScene::getItemBalance: " + Soomla.dumpError(e));
    }
    pWidget.setProgress(progress);
  },

  setEquippedForItem: function (itemId, pWidget) {
    var equipped;
    try {
      equipped = Soomla.storeInventory.isVirtualGoodEquipped(itemId);
    } catch (e) {
      Soomla.logError("StoreAScene: " + Soomla.dumpError(e));
      equipped = false;
    }
    pWidget.setEquiped(equipped);
  }

});

var StoreAScene = cc.BuilderReader._controllerClassCache['StoreAScene'];

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
