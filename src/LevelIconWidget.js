//
// LevelIconWidget class
//
var LevelIconWidget = cc.BuilderReader.registerController('LevelIconWidget', {
  onDidLoadFromCCB: function () {
    this.mEquipable = this.mEquipment.isVisible();

    var _this = this;
    cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ALL_AT_ONCE,
      onTouchesEnded: function (touches, event) {
        try {
          var touchPoint = touches[0].getLocation();
          if (_this.mButtonBuy.isVisible() && isNodeAtPoint(_this.mButtonBuy, touchPoint)) {
            _this.onBuy();
          } else if (_this.mButtonUpgrade.isVisible() && isNodeAtPoint(_this.mButtonUpgrade, touchPoint)) {
            _this.onUpgrade();
          } else if (_this.mEquipment.isVisible() && isNodeAtPoint(_this.mEquipment, touchPoint)) {
            _this.onEquipment();
          }
        } catch (err) {
          console.log(err);
        }
      }
    }, this.rootNode);
  },

  setData: function(itemId, name, description, price, balance) {
    this.mItemId = itemId;
    this.mGoodsTitle.setString(name);
    this.mDescriptionLabel.setString(description);
    this.mPrice.setString(price);
    this.setBalance(balance);
  },

  setBalance: function(balance) {
    this.mBalance.setString(balance);
    if (this.mEquipable) {
      this.mButtonBuy.setVisible(balance == 0);
      this.mEquipment.setVisible(balance != 0);
    }
  },

  setProgress: function(progress) {
    if (progress >= 0 && progress <= 5) {
      this.mProgressLevel1.setScaleX(progress);
    } else {
      console.log("Sorry UI does not support such progress");
    }
  },

  setEquiped: function(equiped) {
    this.mEquipped.setVisible(equiped);
  },

  onBuy: function(pSender) {
    console.log("onBuy");
    try {
      Soomla.storeInventory.buyItem(this.mItemId);
    } catch(e) {
      Soomla.logError("LevelIconWidget: " + Soomla.dumpError(e));
    }
  },

  onUpgrade: function(pSender) {
    console.log("onUpgrade");
    try {
      Soomla.storeInventory.upgradeGood(this.mItemId);
    } catch(e) {
      Soomla.logError("LevelIconWidget: " + Soomla.dumpError(e));
    }
  },

  onEquipment: function(pSender) {
    console.log("onEquipment");
    try {
      if (!this.mEquipped.isVisible()) {
        Soomla.storeInventory.equipVirtualGood(this.mItemId);
      } else {
        Soomla.storeInventory.unEquipVirtualGood(this.mItemId);
      }
    } catch(e) {
      Soomla.logError("LevelIconWidget: " + Soomla.dumpError(e));
    }
  }
});
