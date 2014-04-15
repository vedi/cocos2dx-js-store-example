/**
 * Created by vedi on 4/14/14.
 */
var ListItem = cc.Node.extend({
  build: function(size, itemMeta) {

    this.itemMeta = itemMeta;

    var background = cc.Sprite.create(res.Button);
    background.attr({
      x: 0,
      y: -3,
      scaleX: 0.89
    });
    background.setAnchorPoint(cc.p(0, 1));
    this.addChild(background, 0);

    if (itemMeta.type == 'category') {
      var categoryMarkerLeft = cc.Sprite.create(res.CategoryMarker);
      categoryMarkerLeft.attr({
        x: 0,
        y: size.height / 2,
        scaleX: 1
      });
      categoryMarkerLeft.setAnchorPoint(cc.p(0, 0.5));
      this.addChild(categoryMarkerLeft, 0);

      var categoryTitle = cc.LabelTTF.create(itemMeta.title, "Helvetica", 40, cc.size(0, 0),
        cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
      categoryTitle.attr({
        x: size.width / 2,
        y: size.height / 2,
        color: cc.color.BLACK
      });
      categoryTitle.setAnchorPoint(cc.p(0.5, 0.5));
      this.addChild(categoryTitle, 1);

      var categoryMarkerRight = cc.Sprite.create(res.CategoryMarker);
      categoryMarkerRight.attr({
        x: size.width,
        y: size.height / 2,
        scaleX: -1
      });
      categoryMarkerRight.setAnchorPoint(cc.p(0, 0.5));
      this.addChild(categoryMarkerRight, 0);
    } else {
      var goodsImage = cc.Sprite.create(itemMeta.img);

      var scaleX = 80 / goodsImage.getContentSize().width;
      var scaleY = 80 / goodsImage.getContentSize().height;
      var scale = scaleX < scaleY ? scaleX : scaleY;

      goodsImage.attr({
        x: 4,
        y: 4,
        scale: scale
      });
      goodsImage.setAnchorPoint(cc.p(0, 0));
      this.addChild(goodsImage, 0);

      this.goodsTitle = cc.LabelTTF.create("Fruit cake", "Helvetica", 30, cc.size(0, 0),
        cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
      this.goodsTitle.attr({
        x: 110,
        y: 64,
        color: cc.color.BLACK
      });
      this.goodsTitle.setAnchorPoint(cc.p(0, 0.5));
      this.addChild(this.goodsTitle, 1);

      this.goodsDescription = cc.LabelTTF.create("description", "Helvetica", 15, cc.size(0, 0),
        cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
      this.goodsDescription.attr({
        x: 112,
        y: 36,
        color: cc.color.BLACK
      });
      this.goodsDescription.setAnchorPoint(cc.p(0, 0.5));
      this.addChild(this.goodsDescription, 1);

      if (itemMeta.type == 'upgrade') {
        var progressBar = cc.Sprite.create(res.ProgressBar);
        progressBar.attr({
          x: 109,
          y: 12,
          scale: 0.75
        });
        progressBar.setAnchorPoint(cc.p(0, 0.5));
        this.addChild(progressBar, 0);

        this.progressBarItem = cc.Sprite.create(res.ProgressBarItem);
        this.progressBarItem.attr({
          x: 2,
          y: 2
        });
        this.progressBarItem.setAnchorPoint(cc.p(0, 0));
        progressBar.addChild(this.progressBarItem, 0);

      }

      var menu = cc.Menu.create();
      menu.attr({
        x: size.width,
        y: size.height - 4
      });
      menu.ignoreAnchorPointForPosition(false);
      menu.setAnchorPoint(cc.p(1, 1));
      menu.setContentSize(cc.size(200, 60));
      this.addChild(menu, 0);

      if (itemMeta.type !== 'upgrade') {
        this.buyButton = cc.MenuItemImage.create(res.Buy, res.Buy, this.onBuy, this);
        this.buyButton.attr({
          x: 140,
          y: 20
        });
        this.buyButton.setAnchorPoint(cc.p(0.5, 0.5));
        menu.addChild(this.buyButton, 1);
      }

      if (itemMeta.type == 'upgrade') {
        var upgradeButton = cc.MenuItemImage.create(res.Upgrade, res.Upgrade, this.onUpgrade, this);
        upgradeButton.attr({
          x: 89,
          y: 33
        });
        upgradeButton.setAnchorPoint(cc.p(0.5, 0.5));
        menu.addChild(upgradeButton, 1);
      }
      else if (itemMeta.type == 'equip') {
        this.equipButton = cc.MenuItemImage.create(res.Equip, res.Equip, this.onEquipment, this);
        this.equipButton.attr({
          x: 89,
          y: 33
        });
        this.equipButton.setAnchorPoint(cc.p(0.5, 0.5));
        menu.addChild(this.equipButton, 1);
      }

      var priceTitle = cc.LabelTTF.create("price:", "Helvetica", 20, cc.size(0, 0),
        cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
      priceTitle.attr({
        x: 466,
        y: 24,
        color: cc.color(0, 252, 255)
      });
      priceTitle.setAnchorPoint(cc.p(1, 1));
      this.addChild(priceTitle, 1);

      this.priceValue = cc.LabelTTF.create("10", "Helvetica", 20, cc.size(0, 0),
        cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
      this.priceValue.attr({
        x: 468,
        y: 24,
        color: cc.color(0, 252, 255)
      });
      this.priceValue.setAnchorPoint(cc.p(0, 1));
      this.addChild(this.priceValue, 1);

      if (itemMeta.type != 'currencyPack') {
        var balanceTitle = cc.LabelTTF.create("balance:", "Helvetica", 20, cc.size(0, 0),
          cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        balanceTitle.attr({
          x: 596,
          y: 24,
          color: cc.color(0, 252, 255)
        });
        balanceTitle.setAnchorPoint(cc.p(1, 1));
        this.addChild(balanceTitle, 1);

        this.balanceValue = cc.LabelTTF.create("10", "Helvetica", 20, cc.size(0, 0),
          cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.balanceValue.attr({
          x: 598,
          y: 24,
          color: cc.color(0, 252, 255)
        });
        this.balanceValue.setAnchorPoint(cc.p(0, 1));
        this.addChild(this.balanceValue, 1);
      }
    }
  },
  setName: function(name) {
    this.goodsTitle.setString(name);
  },
  setDescription: function(description) {
    this.goodsDescription.setString(description);
  },
  setBalance: function(balance) {
    if (this.itemMeta.type === 'equip') {
      this.buyButton.setVisible(balance == 0);
      this.equipButton.setVisible(balance != 0);
    }
    this.balanceValue.setString(balance);
  },
  setPrice: function(price) {
    this.priceValue.setString(price);
  },
  setProgress: function (progress) {
    if (!this.progressBarItem) {
      cc.log("no progress bar");
      return;
    }
    if (progress >= 0 && progress <= 5) {
      this.progressBarItem.setScaleX(progress);
    } else {
      cc.log("Sorry UI does not support such progress");
    }
  },
  setEquiped: function (equiped) {
    this.equiped = equiped;
    var spriteFrame = cc.spriteFrameCache.getSpriteFrame(equiped ? res.UnEquip : res.Equip);
    if (spriteFrame) {
      this.equipButton.setNormalSpriteFrame(spriteFrame);
    }
  },
  onBuy: function() {
    cc.log("onBuy");
    try {
      Soomla.storeInventory.buyItem(this.itemMeta.key);
    } catch(e) {
      Soomla.logError("ListItem: " + Soomla.dumpError(e));
    }
  },
  onUpgrade: function() {
    cc.log("onUpgrade");
    try {
      Soomla.storeInventory.upgradeGood(this.itemMeta.key);
    } catch(e) {
      Soomla.logError("ListItem: " + Soomla.dumpError(e));
    }
  },
  onEquipment: function() {
    cc.log("onEquipment");
    try {
      if (!this.equiped) {
        Soomla.storeInventory.equipVirtualGood(this.itemMeta.key);
      } else {
        Soomla.storeInventory.unEquipVirtualGood(this.itemMeta.key);
      }
    } catch(e) {
      Soomla.logError("ListItem: " + Soomla.dumpError(e));
    }
  }
});
