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
      mProgressLevel1.setScaleX(progress);
    } else {
      cc.log("Sorry UI does not support such progress");
    }
  },

  setEquiped: function(equiped) {
    this.mEquiped = equiped;
    this.mEquipment.setNormalSpriteFrame(cc.SpriteFrameCache.getInstance().spriteFrameByName(
      equiped ? "equipped_O.png" : "equip_O.png"));
  },

  onBuy: function(pSender) {
    cc.log("onBuy");
    // TODO: Implement
//    soomla::CCSoomlaError *soomlaError = NULL;
//    soomla::CCStoreInventory::sharedStoreInventory()->buyItem(mItemId.c_str(), &soomlaError);
//    if (soomlaError) {
//      soomla::CCStoreUtils::logException("LevelIconWidget::onBuy", soomlaError);
//    }
  },

  onUpgrade: function(pSender) {
    cc.log("onUpgrade");
    // TODO: Implement
//    soomla::CCSoomlaError *soomlaError = NULL;
//    soomla::CCStoreInventory::sharedStoreInventory()->upgradeGood(mItemId.c_str(), &soomlaError);
//    if (soomlaError) {
//      soomla::CCStoreUtils::logException("LevelIconWidget::onUpgrade", soomlaError);
//    }
  },

  onEquipment: function(pSender) {
    cc.log("onEquipment");
    // TODO: Implement
//  soomla::CCSoomlaError *soomlaError = NULL;
//  if (!this->mEquiped) {
//    soomla::CCStoreInventory::sharedStoreInventory()->equipVirtualGood(mItemId.c_str(), &soomlaError);
//  } else {
//    soomla::CCStoreInventory::sharedStoreInventory()->unEquipVirtualGood(mItemId.c_str(), &soomlaError);
//  }
//  if (soomlaError) {
//    soomla::CCStoreUtils::logException("LevelIconWidget::onEquipment", soomlaError);
//  }
  }
});
