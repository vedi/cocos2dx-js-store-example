/**
 * Created by vedi on 1/28/14.
 */

const EVENT_ON_CURRENCY_BALANCE_CHANGED = "onCurrencyBalanceChanged";
const EVENT_ON_GOOD_BALANCE_CHANGED = "onGoodBalanceChanged";
const EVENT_ON_GOOD_EQUIPPED = "onGoodEquipped";
const EVENT_ON_GOOD_UNEQUIPPED = "onGoodUnEquipped";
const EVENT_ON_GOOD_UPGRADE = "onGoodUpgrade";

// TODO: Move the implementation to screens

function ExampleEventHandler() {
  var exampleEventHandler = Soomla.EventHandler.create({
    onBillingNotSupported: function() {
      Soomla.logDebug("BillingNotSupported");
    },
    onBillingSupported: function() {
      Soomla.logDebug("BillingSupported");
    },
    onCurrencyBalanceChanged: function(virtualCurrency, balance, amountAdded) {
      Soomla.logDebug("CurrencyBalanceChanged");
//      cc.NotificationCenter.getInstance().postNotification(EVENT_ON_CURRENCY_BALANCE_CHANGED, CCInteger::create(balance));
    },
    onCurrencyBalanceChanged: function(virtualCurrency, balance, amountAdded) {
      Soomla.logDebug("CurrencyBalanceChanged");
//    CCNotificationCenter::sharedNotificationCenter()->postNotification(EVENT_ON_CURRENCY_BALANCE_CHANGED, CCInteger::create(balance));
    },
    onGoodBalanceChanged: function(virtualCurrency, balance, amountAdded) {
      Soomla.logDebug("GoodBalanceChanged");
//    CCNotificationCenter::sharedNotificationCenter()->postNotification(EVENT_ON_GOOD_BALANCE_CHANGED, CCArray::create(virtualGood, CCInteger::create(balance), NULL));
    },
    onGoodEquipped: function(equippableVG) {
      Soomla.logDebug("GoodEquipped");
//      CCNotificationCenter::sharedNotificationCenter()->postNotification(EVENT_ON_GOOD_EQUIPPED, equippableVG);
    },
    onGoodUnEquipped: function(equippableVG) {
      Soomla.logDebug("GoodUnEquipped");
//      CCNotificationCenter::sharedNotificationCenter()->postNotification(EVENT_ON_GOOD_UNEQUIPPED, equippableVG);
    },
    onGoodUpgrade: function(virtualGood, upgradeVG) {
      Soomla.logDebug("GoodUpgrade");
//      CCNotificationCenter::sharedNotificationCenter()->postNotification(EVENT_ON_GOOD_UPGRADE, virtualGood);
    },
    onItemPurchased: function(purchasableVirtualItem) {
      Soomla.logDebug("ItemPurchased");
    },
    onItemPurchaseStarted: function(purchasableVirtualItem) {
      Soomla.logDebug("ItemPurchaseStarted");
    },
    onMarketPurchaseCancelled: function(purchasableVirtualItem) {
      Soomla.logDebug("MarketPurchaseCancelled");
    },
    onMarketPurchase: function(purchasableVirtualItem) {
      Soomla.logDebug("MarketPurchase");
    },
    onMarketPurchaseStarted: function(purchasableVirtualItem) {
      Soomla.logDebug("MarketPurchaseStarted");
    },
    onRestoreTransactions: function(success) {
      Soomla.logDebug("RestoreTransactions");
    },
    onRestoreTransactionsStarted: function() {
      Soomla.logDebug("RestoreTransactionsStarted");
    },
    onUnexpectedErrorInStore: function() {
      Soomla.logDebug("UnexpectedErrorInStore");
    },
    onStoreControllerInitialized: function() {
      Soomla.logDebug("StoreContorllerInitialized");
    },
    // Android specific
    onMarketRefund: function(purchasableVirtualItem) {
      Soomla.logDebug("MarketRefund");
    },
    onIabServiceStarted: function() {
      Soomla.logDebug("IabServiceStarted");
    },
    onIabServiceStopped: function() {
      Soomla.logDebug("IabServiceStopped");
    }
  });
  return exampleEventHandler;
}