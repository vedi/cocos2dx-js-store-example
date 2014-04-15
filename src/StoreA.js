/**
 * Created by vedi on 4/14/14.
 */
var StoreALayer = cc.Layer.extend({
  sprite: null,
  listMeta: [
    {
      title: "Cakes",
      type: "category"
    },
    {
      key: "fruit_cake",
      img: res.FruitCake
    },
    {
      key: "pavlova",
      img: res.Pavlova
    },
    {
      key: "pavlova_10",
      img: res.Pavlova10
    },
    {
      key: "chocolate_cake",
      img: res.ChocolateCake
    },
    {
      key: "cream_cup",
      img: res.CreamCup
    },
    {
      key: "cream_cup_10",
      img: res.CreamCup10
    },
    {
      title: "Upgrades",
      type: "category"
    },
    {
      key: "show_room",
      img: res.ShowRoom,
      type: "upgrade"
    },
    {
      key: "delivery_vehicle",
      img: res.DeliveryVehicle,
      type: "upgrade"
    },
    {
      title: "Characters",
      type: "category"
    },
    {
      key: "fat_cat",
      img: res.FatCat,
      type: "equip"
    },
    {
      key: "happi_hippo",
      img: res.HappiHippo,
      type: "equip"
    },
    {
      key: "funkey_monkey",
      img: res.FunkeyMonkey,
      type: "equip"
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

    this.mButtonMoreMuffins = cc.MenuItemImage.create(res.GetMore, res.GetMore);
    this.mButtonMoreMuffins.attr({
      x: this.mBottomMenu.width,
      y: 0
    });
    this.mButtonMoreMuffins.setAnchorPoint(cc.p(1, 0));
    this.mBottomMenu.addChild(this.mButtonMoreMuffins, 1);

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
      Soomla.logError("StoreA: " + Soomla.dumpError(e));
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
        Soomla.logError("StoreA: " + Soomla.dumpError(e));
      }

      var balance;
      try {
        balance = Soomla.storeInventory.getItemBalance(itemId);
      } catch (e) {
        Soomla.logError("StoreA: " + Soomla.dumpError(e));
        balance = 0;
      }
      listItem.setBalance(balance);

      if (itemMeta.type === 'upgrade') {
        var progress;
        try {
          progress = Soomla.storeInventory.getGoodUpgradeLevel(itemId);
        } catch (e) {
          progress = 0;
          Soomla.logError("StoreA::getItemBalance: " + Soomla.dumpError(e));
        }
        listItem.setProgress(progress);
      }
      else if (itemMeta.type === 'equip') {
        var equipped;
        try {
          equipped = Soomla.storeInventory.isVirtualGoodEquipped(itemId);
        } catch (e) {
          Soomla.logError("StoreA: " + Soomla.dumpError(e));
          equipped = false;
        }
        listItem.setEquiped(equipped);
      }

      if (virtualItem) {
        var purchasableVirtualItem = virtualItem;
        if (purchasableVirtualItem.purchasableItem) {
          var purchasableItem = purchasableVirtualItem.purchasableItem;
          var price;
          if (purchasableItem.purchaseType == "market") {
            price = purchasableItem.marketItem.price;
          } else if (purchasableItem.purchaseType == "virtualItem") {
            price = purchasableItem.pvi_amount;
          } else {
            Soomla.logError("Unsupported purchaseType: " + Soomla.dumpError(purchasableItem));
            price = -1;
          }
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
        Soomla.logError("StoreA::onGoodUpgrade: " + Soomla.dumpError(e));
      }
      listItem.setProgress(progress);
    }
  }
});

var StoreAScene = cc.Scene.extend({
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

    this.layer = new StoreALayer();
    this.addChild(this.layer);
    this.layer.mButtonBack.setCallback(this.onBack, this);
    this.layer.mButtonMoreMuffins.setCallback(this.onMoreMuffins, this);

    this.layer.tableView.reloadData();
  },
  onExit: function () {
    Soomla.removeEventHandler(this.eventHandler);

    cc.spriteFrameCache.removeSpriteFrameByName(res.Equip);
    cc.spriteFrameCache.removeSpriteFrameByName(res.UnEquip);

    this._super();
  },
  onMoreMuffins: function(pSender) {
    cc.LoaderScene.preload(main_resources, function () {
      cc.director.runScene(cc.TransitionMoveInR.create(0.8, new StoreBScene()));
    }, this);
  },
  onBack: function(pSender) {
    cc.LoaderScene.preload(main_resources, function () {
      cc.director.runScene(cc.TransitionMoveInL.create(0.8, new MainScreenScene()));
    }, this);
  },
  createEventHandler: function () {
    var _this = this;
    return {
      onCurrencyBalanceChanged: function(virtualCurrency, balance, amountAdded) {
        Soomla.logDebug("CurrencyBalanceChanged: " + balance);
        _this.layer.updateCurrencyBalance(balance);
      },
      onGoodBalanceChanged: function(virtualGood, balance, amountAdded) {
        Soomla.logDebug("GoodBalanceChanged");
        _this.layer.updateGoodBalance(virtualGood, balance);
      },
      onGoodEquipped: function(equippableVG) {
        Soomla.logDebug("GoodEquipped");
        _this.layer.onGoodEquipped(equippableVG);
      },
      onGoodUnEquipped: function(equippableVG) {
        Soomla.logDebug("GoodUnEquipped");
        _this.layer.onGoodUnEquipped(equippableVG);
      },
      onGoodUpgrade: function(virtualGood, upgradeVG) {
        Soomla.logDebug("GoodUpgrade");
        _this.layer.onGoodUpgrade(virtualGood);
      }
    };
  }
});
