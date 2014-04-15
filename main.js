cc.game.onStart = function(){
  Soomla.DEBUG = true;
  // init soomla
  try {
    // We initialize CCStoreController before we open the store.
    var assets = new MuffinRushAssets();
    var storeParams = {
      soomSec: "ExampleSoomSecret",
      androidPublicKey: "ExamplePublicKey",
      customSecret: "ExampleCustomSecret"
    };

    // This is the call to initialize CCStoreController
    Soomla.StoreController.createShared(assets, storeParams);

    /*
     * ** Set the amount of each currency to 10,000 if the **
     * ** balance drops under 1,000                        **
     *
     * ** Of course, this is just for testing...           **
     */
    var currencies = Soomla.storeInfo.getVirtualCurrencies();
    _.forEach(currencies, function(vc) {
      var balance = Soomla.storeInventory.getItemBalance(vc.itemId);
      if (balance < 1000) {
        Soomla.storeInventory.giveItem(vc.itemId, 10000 - balance);
      }
    });
  } catch (e) {
    Soomla.logError(Soomla.dumpError(e));
  }

  cc.view.setDesignResolutionSize(640, 960, cc.ResolutionPolicy.SHOW_ALL);
	cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(aScene_resources, function () {
      cc.director.runScene(new MainScreenScene());
    }, this);
};

cc.game.run();