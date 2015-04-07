var res = {
  MainScene_ccbi: 'ccb/MainScreen.ccbi',
  StoreAScene_ccbi: 'ccb/StoreAScene.ccbi',
  StoreBScene_ccbi: 'ccb/StoreBScene.ccbi',
  main_atlas_png: 'res/main.png',
  main_atlas_plist: 'res/main.plist'
};

for (var i = 0; i <= 13; i++) {
  res['ListItemWidget' + i + '_ccbi'] = 'ccb/ListItemWidget' + i + '.ccbi';
}

var g_resources = [];
for (var i in res) {
  g_resources.push(res[i]);
}
