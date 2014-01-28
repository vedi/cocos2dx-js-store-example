/**
 * Created by vedi on 1/28/14.
 */
function MuffinRushAssets() {

  var MUFFIN_CURRENCY_ITEM_ID = "currency_muffin";
  var TENMUFF_PACK_PRODUCT_ID = "android.test.refunded";
  var FIFTYMUFF_PACK_PRODUCT_ID = "android.test.canceled";
  var FOURHUNDMUFF_PACK_PRODUCT_ID = "android.test.purchased";
  var THOUSANDMUFF_PACK_PRODUCT_ID = "android.test.item_unavailable";
  var NO_ADDS_NONCONS_PRODUCT_ID = "no_ads";

  var MUFFINCAKE_ITEM_ID = "fruit_cake";
  var PAVLOVA_ITEM_ID = "pavlova";
  var CHOCLATECAKE_ITEM_ID = "chocolate_cake";
  var CREAMCUP_ITEM_ID = "cream_cup";


  /** Virtual Currencies **/
  var muffinCurrency = Soomla.VirtualCurrency.create({
    name: "Muffins",
    description: "",
    itemId: MUFFIN_CURRENCY_ITEM_ID
  });


  /** Virtual Currency Packs **/

  var tenmuffPack = Soomla.VirtualCurrencyPack.create({
    name: "10 Muffins",
    description: "Test refund of an item",
    itemId: "muffins_10",
    currencyAmount: 10,
    currencyItemId: MUFFIN_CURRENCY_ITEM_ID,
    purchasableItem: Soomla.PurchaseWithMarket.createWithMarketItem(TENMUFF_PACK_PRODUCT_ID, 0.99)
  });

  var fiftymuffPack = Soomla.VirtualCurrencyPack.create({
    name: "50 Muffins",
    description: "Test cancellation of an item",
    itemId: "muffins_50",
    currencyAmount: 50,
    currencyItemId: MUFFIN_CURRENCY_ITEM_ID,
    purchasableItem: Soomla.PurchaseWithMarket.createWithMarketItem(FIFTYMUFF_PACK_PRODUCT_ID, 1.99)
  });

  var fourhundmuffPack = Soomla.VirtualCurrencyPack.create({
    name: "400 Muffins",
    description: "Test purchase of an item",
    itemId: "muffins_400",
    currencyAmount: 400,
    currencyItemId: MUFFIN_CURRENCY_ITEM_ID,
    purchasableItem: Soomla.PurchaseWithMarket.createWithMarketItem(FOURHUNDMUFF_PACK_PRODUCT_ID, 4.99)
  });

  var thousandmuffPack = Soomla.VirtualCurrencyPack.create({
    name: "1000 Muffins",
    description: "Test item unavailable",
    itemId: "muffins_1000",
    currencyAmount: 1000,
    currencyItemId: MUFFIN_CURRENCY_ITEM_ID,
    purchasableItem: Soomla.PurchaseWithMarket.createWithMarketItem(THOUSANDMUFF_PACK_PRODUCT_ID, 8.99)
  });

  /** Virtual Goods **/
  var muffincakeGood = Soomla.SingleUseVG.create({
    name: "Fruit Cake",
    description: "Customers buy a double portion on each purchase of this cake",
    itemId: "fruit_cake",
    purchasableItem: Soomla.PurchaseWithVirtualItem.create({
      itemId: MUFFIN_CURRENCY_ITEM_ID,
      amount: 225
    })
  });

  var pavlovaGood = Soomla.SingleUseVG.create({
    name: "Pavlova",
    description: "Gives customers a sugar rush and they call their friends",
    itemId: "pavlova",
    purchasableItem: Soomla.PurchaseWithVirtualItem.create({
      itemId: MUFFIN_CURRENCY_ITEM_ID,
      amount: 175
    })
  });

  var tenPavlovaGoods = Soomla.SingleUsePackVG.create({
    goodItemId: "pavlova",
    goodAmount: 10,
    name: "10 Pavlova",
    description: "Gives customers a sugar rush and they call their friends",
    itemId: "pavlova_10",
    purchasableItem: Soomla.PurchaseWithVirtualItem.create({
      itemId: MUFFIN_CURRENCY_ITEM_ID,
      amount: 1750
    })
  });

  var choclatecakeGood = Soomla.SingleUseVG.create({
    name: "Chocolate Cake",
    description: "A classic cake to maximize customer satisfaction",
    itemId: "chocolate_cake",
    purchasableItem: Soomla.PurchaseWithVirtualItem.create({
      itemId: MUFFIN_CURRENCY_ITEM_ID,
      amount: 250
    })
  });

  var creamcupGood = Soomla.SingleUseVG.create({
    name: "Cream Cup",
    description: "Increase bakery reputation with this original pastry",
    itemId: "cream_cup",
    purchasableItem: Soomla.PurchaseWithVirtualItem.create({
      itemId: MUFFIN_CURRENCY_ITEM_ID,
      amount: 50
    })
  });

  var tenCreamcupGoods = Soomla.SingleUsePackVG.create({
    goodItemId: "cream_cup",
    goodAmount: 10,
    name: "10 Cream Cup",
    description: "Increase bakery reputation with this original pastry",
    itemId: "cream_cup_10",
    purchasableItem: Soomla.PurchaseWithVirtualItem.create({
      itemId: MUFFIN_CURRENCY_ITEM_ID,
      amount: 500
    })
  });

  var showRoomGood = Soomla.LifetimeVG.create({
    name: "Show Room",
    description: "Show Room ",
    itemId: "show_room",
    purchasableItem: Soomla.PurchaseWithVirtualItem.create({
      itemId: MUFFIN_CURRENCY_ITEM_ID,
      amount: 100
    })
  });

  var showRoomGood0 = Soomla.UpgradeVG.create({
    goodItemId: "show_room",
    prevItemId: null,
    nextItemId: "show_room_1",
    name: "Show Room L0",
    description: "",
    itemId: "show_room_0",
    purchasableItem: Soomla.PurchaseWithVirtualItem.create({
      itemId: MUFFIN_CURRENCY_ITEM_ID,
      amount: 220
    })
  });

  var showRoomGood1 = Soomla.UpgradeVG.create({
    goodItemId: "show_room",
    prevItemId: "show_room_0",
    nextItemId: "show_room_2",
    name: "Show Room L1",
    description: "",
    itemId: "show_room_1",
    purchasableItem: Soomla.PurchaseWithVirtualItem.create({
      itemId: MUFFIN_CURRENCY_ITEM_ID,
      amount: 220
    })
  });

  var showRoomGood2 = Soomla.UpgradeVG.create({
    goodItemId: "show_room",
    prevItemId: "show_room_1",
    nextItemId: "show_room_3",
    name: "Show Room L2",
    description: "",
    itemId: "show_room_2",
    purchasableItem: Soomla.PurchaseWithVirtualItem.create({
      itemId: MUFFIN_CURRENCY_ITEM_ID,
      amount: 220
    })
  });

  var showRoomGood3 = Soomla.UpgradeVG.create({
    goodItemId: "show_room",
    prevItemId: "show_room_2",
    nextItemId: "show_room_4",
    name: "Show Room L3",
    description: "",
    itemId: "show_room_3",
    purchasableItem: Soomla.PurchaseWithVirtualItem.create({
      itemId: MUFFIN_CURRENCY_ITEM_ID,
      amount: 220
    })
  });

  var showRoomGood4 = Soomla.UpgradeVG.create({
    goodItemId: "show_room",
    prevItemId: "show_room_3",
    nextItemId: null,
    name: "Show Room L4",
    description: "",
    itemId: "show_room_4",
    purchasableItem: Soomla.PurchaseWithVirtualItem.create({
      itemId: MUFFIN_CURRENCY_ITEM_ID,
      amount: 220
    })
  });

  var deliveryVehicleGood = Soomla.LifetimeVG.create({
    name: "Delivery Vehicle",
    description: "Delivery Vehicle",
    itemId: "delivery_vehicle",
    purchasableItem: Soomla.PurchaseWithVirtualItem.create({
      itemId: MUFFIN_CURRENCY_ITEM_ID,
      amount: 20
    })
  });

  var deliveryVehicleGood0 = Soomla.UpgradeVG.create({
    goodItemId: "delivery_vehicle",
    prevItemId: null,
    nextItemId: "delivery_vehicle_1",
    name: "Delivery Vehicle 0",
    description: "",
    itemId: "delivery_vehicle_0",
    purchasableItem: Soomla.PurchaseWithVirtualItem.create({
      itemId: MUFFIN_CURRENCY_ITEM_ID,
      amount: 20
    })
  });

  var deliveryVehicleGood1 = Soomla.UpgradeVG.create({
    goodItemId: "delivery_vehicle",
    prevItemId: "delivery_vehicle_0",
    nextItemId: "delivery_vehicle_2",
    name: "Delivery Vehicle 1",
    description: "",
    itemId: "delivery_vehicle_1",
    purchasableItem: Soomla.PurchaseWithVirtualItem.create({
      itemId: MUFFIN_CURRENCY_ITEM_ID,
      amount: 20
    })
  });

  var deliveryVehicleGood2 = Soomla.UpgradeVG.create({
    goodItemId: "delivery_vehicle",
    prevItemId: "delivery_vehicle_1",
    nextItemId: "delivery_vehicle_3",
    name: "Delivery Vehicle 2",
    description: "",
    itemId: "delivery_vehicle_2",
    purchasableItem: Soomla.PurchaseWithVirtualItem.create({
      itemId: MUFFIN_CURRENCY_ITEM_ID,
      amount: 20
    })
  });

  var deliveryVehicleGood3 = Soomla.UpgradeVG.create({
    goodItemId: "delivery_vehicle",
    prevItemId: "delivery_vehicle_2",
    nextItemId: "delivery_vehicle_4",
    name: "Delivery Vehicle 3",
    description: "",
    itemId: "delivery_vehicle_3",
    purchasableItem: Soomla.PurchaseWithVirtualItem.create({
      itemId: MUFFIN_CURRENCY_ITEM_ID,
      amount: 20
    })
  });

  var deliveryVehicleGood4 = Soomla.UpgradeVG.create({
    goodItemId: "delivery_vehicle",
    prevItemId: "delivery_vehicle_3",
    nextItemId: null,
    name: "Delivery Vehicle 4",
    description: "",
    itemId: "delivery_vehicle_4",
    purchasableItem: Soomla.PurchaseWithVirtualItem.create({
      itemId: MUFFIN_CURRENCY_ITEM_ID,
      amount: 20
    })
  });

  var fatCatGood = Soomla.EquippableVG.create({
    equippingModel: Soomla.EquippableVG.EquippingModel.CATEGORY,
    name: "Fat Cat",
    description: "Fat cat description",
    itemId: "fat_cat",
    purchasableItem: Soomla.PurchaseWithVirtualItem.create({
      itemId: MUFFIN_CURRENCY_ITEM_ID,
      amount: 27
    })
  });

  var happiHippoGood = Soomla.EquippableVG.create({
    equippingModel: Soomla.EquippableVG.EquippingModel.CATEGORY,
    name: "Happi Hippo",
    description: "Happi Hippo description",
    itemId: "happi_hippo",
    purchasableItem: Soomla.PurchaseWithVirtualItem.create({
      itemId: MUFFIN_CURRENCY_ITEM_ID,
      amount: 44
    })
  });

  var funkeyMonkeyGood = Soomla.EquippableVG.create({
    equippingModel: Soomla.EquippableVG.EquippingModel.CATEGORY,
    name: "Funkey Monkey",
    description: "Funkey Monkey description",
    itemId: "funkey_monkey",
    purchasableItem: Soomla.PurchaseWithVirtualItem.create({
      itemId: MUFFIN_CURRENCY_ITEM_ID,
      amount: 35
    })
  });


  /** Virtual Categories **/
  var cakes = Soomla.VirtualCategory.create({
    name: "Cakes",
    goodItemIds: [
      MUFFINCAKE_ITEM_ID,
      PAVLOVA_ITEM_ID,
      "pavlova_10",
      CHOCLATECAKE_ITEM_ID,
      CREAMCUP_ITEM_ID,
      "cream_cup_10"
    ]
  });

  var upgrades = Soomla.VirtualCategory.create({
    name: "Upgrades",
    goodItemIds: [
      "show_room_0",
      "show_room_1",
      "show_room_2",
      "show_room_3",
      "show_room_4",
      "delivery_vehicle_0",
      "delivery_vehicle_1",
      "delivery_vehicle_2",
      "delivery_vehicle_3",
      "delivery_vehicle_4"
    ]
  });

  var characters = Soomla.VirtualCategory.create({
    name: "Characters",
    goodItemIds: [
      "fat_cat",
      "happi_hippo",
      "funkey_monkey"
    ]
  });

  /** Google MANAGED Items **/

  var noAdsNoncons = Soomla.NonConsumableItem.create({
    name: "No Ads",
    description: "Test purchase of MANAGED item.",
    itemId: "no_ads",
    purchasableItem: Soomla.PurchaseWithMarket.create({
      marketItem: Soomla.MarketItem.create({
        productId: NO_ADDS_NONCONS_PRODUCT_ID,
        consumable: Soomla.MarketItem.Consumable.NONCONSUMABLE,
        price: 1.99
      })
    })
  });

  var muffinRushAssets = Soomla.IStoreAssets.create({
    categories: [cakes, upgrades, characters],
    currencies: [muffinCurrency],
    currencyPacks: [tenmuffPack, fiftymuffPack, fourhundmuffPack, thousandmuffPack],
    goods: {
      singleUse: [muffincakeGood, pavlovaGood, choclatecakeGood, creamcupGood],
      lifetime: [showRoomGood, deliveryVehicleGood],
      equippable: [fatCatGood, happiHippoGood, funkeyMonkeyGood],
      goodUpgrades: [showRoomGood0, showRoomGood1, showRoomGood2, showRoomGood3, showRoomGood4,
        deliveryVehicleGood0, deliveryVehicleGood1, deliveryVehicleGood2, deliveryVehicleGood3, deliveryVehicleGood4],
      goodPacks: [tenPavlovaGoods, tenCreamcupGoods]
    },
    nonConsumables: [noAdsNoncons],
    version: 1
  });

  return muffinRushAssets;
}