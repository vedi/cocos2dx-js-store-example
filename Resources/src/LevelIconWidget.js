//
// StoreAScene class
//
var LevelIconWidget = cc.Class.extend({
  onDidLoadFromCCB: function () {
    this.mEquipable = this.mEquipment.isVisible();
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
      cc.log("Sorry UI does not support such progress");
    }
  },

  setEquiped: function(equiped) {
    this.mEquiped = equiped;
    this.mEquipment.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame(
      equiped ? "equipped_O.png" : "equip_O.png"));
  },

  onBuy: function(pSender) {
    cc.log("onBuy");
    try {
      Soomla.storeInventory.buyItem(this.mItemId);
    } catch(e) {
      Soomla.logError("LevelIconWidget: " + Soomla.dumpError(e));
    }
  },

  onUpgrade: function(pSender) {
    cc.log("onUpgrade");
    try {
      Soomla.storeInventory.upgradeGood(this.mItemId);
    } catch(e) {
      Soomla.logError("LevelIconWidget: " + Soomla.dumpError(e));
    }
  },

  onEquipment: function(pSender) {
    cc.log("onEquipment");
    try {
      if (!this.mEquiped) {
        Soomla.storeInventory.equipVirtualGood(this.mItemId);
      } else {
        Soomla.storeInventory.unEquipVirtualGood(this.mItemId);
      }
    } catch(e) {
      Soomla.logError("LevelIconWidget: " + Soomla.dumpError(e));
    }
  }
});
