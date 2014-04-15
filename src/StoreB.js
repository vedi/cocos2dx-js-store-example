/**
 * Created by vedi on 4/14/14.
 */
var StoreBLayer = cc.Layer.extend({
  sprite: null,
  listMeta: [
    {
      key: "no_ads",
      img: res.NoAds,
      type: "currencyPack"
    },
    {
      key: "muffins_10",
      img: res.Muffins01,
      type: "currencyPack"
    },
    {
      key: "muffins_50",
      img: res.Muffins02,
      type: "currencyPack"
    },
    {
      key: "muffins_400",
      img: res.Muffins03,
      type: "currencyPack"
    },
    {
      key: "muffins_1000",
      img: res.Muffins04,
      type: "currencyPack"
    }
  ],
  ctor: function () {
    //////////////////////////////
    // 1. super init first
    this._super();

    /////////////////////////////
    // 2. add a menu item with "X" image, which is clicked to quit the program
    //    you may modify it.
    // ask director the window size
    var size = this.winSize = cc.director.getWinSize();

    var background = cc.LayerColor.create(cc.color(255, 255, 255, 255), size.width, size.height);
    background.attr({
      x: 0,
      y: 0
    });
    this.addChild(background, 0);

    this.mTopNode = cc.Node.create();
    this.mTopNode.attr({
      x: size.width / 2,
      y: size.height
    });
    this.mTopNode.setAnchorPoint(cc.p(0.5, 1));
    this.mTopNode.setContentSize(cc.size(size.width, 130));
    this.addChild(this.mTopNode, 1);

    var testStoreLabel = cc.LabelTTF.create("Soomla Test Store", "Helvetica", 30, cc.size(270, 100),
      cc.TEXT_ALIGNMENT_RIGHT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
    testStoreLabel.attr({
      x: 0,
      y: this.mTopNode.getContentSize().height,
      color: cc.color(255, 38, 0)
    });
    testStoreLabel.setAnchorPoint(cc.p(0, 1));
    this.mTopNode.addChild(testStoreLabel, 1);

    var virtualGoodsLabel = cc.LabelTTF.create("Virtual Goods", "Helvetica", 30, cc.size(0, 0),
      cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
    virtualGoodsLabel.attr({
      x: this.mTopNode.getContentSize().width / 2,
      y: 0,
      color: cc.color.BLACK
    });
    virtualGoodsLabel.setAnchorPoint(cc.p(0.5, 0));
    this.mTopNode.addChild(virtualGoodsLabel, 1);

    var rightTopNode = cc.Node.create();
    rightTopNode.attr({
      x: this.mTopNode.getContentSize().width,
      y: this.mTopNode.getContentSize().height
    });
    rightTopNode.setAnchorPoint(cc.p(1, 1));
    rightTopNode.setContentSize(cc.size(170, 100));
    this.mTopNode.addChild(rightTopNode, 1);

    var muffin = cc.Sprite.create(res.Muffin);
    muffin.attr({
      x: 0,
      y: rightTopNode.getContentSize().height / 2,
      scale: 0.5
    });
    muffin.setAnchorPoint(cc.p(0, 0.5));
    rightTopNode.addChild(muffin, 0);

    this.mMuffinAmount = cc.LabelTTF.create("10000", "Helvetica", 50, cc.size(0, 0),
      cc.TEXT_ALIGNMENT_RIGHT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
    this.mMuffinAmount.attr({
      x: muffin.getContentSize().width,
      y: muffin.getContentSize().height / 2,
      color: cc.color(0, 252, 255)
    });
    this.mMuffinAmount.setAnchorPoint(cc.p(0, 0.5));
    muffin.addChild(this.mMuffinAmount, 1);

    this.mBottomMenu = cc.Menu.create();
    this.mBottomMenu.attr({
      x: size.width / 2,
      y: 0
    });
    this.mBottomMenu.ignoreAnchorPointForPosition(false);
    this.mBottomMenu.setAnchorPoint(cc.p(0.5, 0));
    this.mBottomMenu.setContentSize(cc.size(size.width, 120));
    this.addChild(this.mBottomMenu, 1);

    this.mButtonBack = cc.MenuItemImage.create(res.Back, res.Back);
    this.mButtonBack.attr({
      x: 0,
      y: 0
    });
    this.mButtonBack.setAnchorPoint(cc.p(0, 0));
    this.mBottomMenu.addChild(this.mButtonBack, 1);

    this.tableView = cc.TableView.create(this, cc.size(640, 710));
    this.tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
    this.tableView.attr({
      x: 320,
      y: 820
    });
    this.tableView.ignoreAnchorPointForPosition(false);
    this.tableView.setAnchorPoint(cc.p(0.5, 1));
    this.tableView.setDelegate(this);
    this.tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
    this.addChild(this.tableView);

    var balance;
    try {
      balance = Soomla.storeInventory.getItemBalance("currency_muffin");
    } catch (e) {
      Soomla.logError("StoreB: " + Soomla.dumpError(e));
      balance = 0;
    }
    this.mMuffinAmount.setString(balance);

    return true;
  },
  scrollViewDidScroll: function (view) {
  },
  scrollViewDidZoom: function (view) {
  },
  tableCellTouched: function (table, cell) {
  },
  tableCellSizeForIndex: function (table, idx) {
    return cc.size(this.winSize.width, 100)
  },
  tableCellAtIndex: function (table, idx) {
    var cell = table.dequeueCell();
    if (!cell) {
      cell = new cc.TableViewCell();
      this.buildListItem(cell, this.listMeta[idx]);
    } else {
      cell = new cc.TableViewCell();
      this.buildListItem(cell, this.listMeta[idx]);
    }

    return cell;
  },
  numberOfCellsInTableView: function (table) {
    return this.listMeta.length;
  },
  buildListItem: function(parent, itemMeta) {
    parent.meta = itemMeta;
    var listItem = this.createListItem(cc.size(this.winSize.width, 100), itemMeta);
    itemMeta.item = listItem;

    if (itemMeta.key) {
      var itemId = itemMeta.key;

      var virtualItem;
      try {
        virtualItem = Soomla.storeInfo.getItemByItemId(itemId);
        listItem.setName(virtualItem.name);
        listItem.setDescription(virtualItem.description);
      } catch (e) {
        Soomla.logError("StoreB: " + Soomla.dumpError(e));
      }

      if (virtualItem) {
        var purchasableVirtualItem = virtualItem;
        if (purchasableVirtualItem.purchasableItem) {
          var purchasableItem = purchasableVirtualItem.purchasableItem;
          var price = purchasableItem.marketItem.price;
          listItem.setPrice(price);
        }
      }
    }

    listItem.attr({
      x: 0,
      y: parent.getContentSize().height / 2
    });
    parent.listItem = listItem;
    parent.addChild(listItem)
  },
  createListItem: function(size, itemMeta) {
    var node = new ListItem();
    node.setContentSize(size);
    node.build(size, itemMeta);

    return node;
  },

  findListItem: function (itemId) {
    for (var i = 0; i < this.listMeta.length; i++) {
      var cell = this.tableView.cellAtIndex(i);
      if (cell && cell.meta) {
        if (itemId == cell.meta.key) {
          return cell.listItem;
        }
      }
    }
    cc.log("cannot find listItem for " + itemId);
    return null;
  },

  updateCurrencyBalance: function(balance) {
    this.mMuffinAmount.setString(balance);
  },

  updateGoodBalance: function(virtualCurrency, balance) {
    var listItem = this.findListItem(virtualCurrency.itemId);
    if (listItem) {
      listItem.setBalance(balance);
    }
  },

  onGoodEquipped: function(virtualGood) {
    var listItem = this.findListItem(virtualGood.itemId);
    if (listItem) {
      listItem.setEquiped(true);
    }
  },

  onGoodUnEquipped: function(virtualGood) {
    var listItem = this.findListItem(virtualGood.itemId);
    if (listItem) {
      listItem.setEquiped(false);
    }
  },

  onGoodUpgrade: function(virtualGood) {
    var listItem = this.findListItem(virtualGood.itemId);
    if (listItem) {
      var progress;
      try {
        progress = Soomla.storeInventory.getGoodUpgradeLevel(virtualGood.itemId);
      } catch (e) {
        progress = 0;
        Soomla.logError("StoreB::onGoodUpgrade: " + Soomla.dumpError(e));
      }
      listItem.setProgress(progress);
    }
  }
});

var StoreBScene = cc.Scene.extend({
  ctor: function() {
    this._super();
    this.eventHandler = this.createEventHandler();
  },
  onEnter: function () {
    this._super();

    Soomla.addEventHandler(this.eventHandler);

    var texture;
    texture = cc.textureCache.addImage(res.Equip);
    cc.spriteFrameCache.addSpriteFrame(cc.SpriteFrame.create(texture, cc.rect(0, 0, 200, 40)), res.Equip);
    texture = cc.textureCache.addImage(res.UnEquip);
    cc.spriteFrameCache.addSpriteFrame(cc.SpriteFrame.create(texture, cc.rect(0, 0, 200, 40)), res.UnEquip);

    this.layer = new StoreBLayer();
    this.addChild(this.layer);
    this.layer.mButtonBack.setCallback(this.onBack, this);

    this.layer.tableView.reloadData();
  },
  onExit: function () {
    Soomla.removeEventHandler(this.eventHandler);

    cc.spriteFrameCache.removeSpriteFrameByName(res.Equip);
    cc.spriteFrameCache.removeSpriteFrameByName(res.UnEquip);

    this._super();
  },
  onBack: function(pSender) {
    cc.LoaderScene.preload(main_resources, function () {
      cc.director.runScene(cc.TransitionMoveInL.create(0.8, new StoreAScene()));
    }, this);
  },
  createEventHandler: function () {
    var _this = this;
    return {
      onCurrencyBalanceChanged: function(virtualCurrency, balance, amountAdded) {
        Soomla.logDebug("CurrencyBalanceChanged: " + balance);
        _this.layer.updateCurrencyBalance(balance);
      }
    };
  }
});
