//MainScene class
cc.BuilderReader.registerController('MainScreen', {
  onDidLoadFromCCB: function () {
    cc.sys.garbageCollect();

    var rootNode = this.rootNode;
    this.mUnlocker.retain();
    rootNode.retain();

    applyScaleForNode(this.rootNode);
    fill(this.mBackgroundNode);

    var _this = this;
    cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ALL_AT_ONCE,
      onTouchesBegan: function (touches, event) {
        _this.mOriginalPos = _this.mUnlocker.getPosition();
      },
      onTouchesMoved: function (touches, event) {
        var touchPoint = touches[0].getLocation();
        _this.mUnlocker.setPosition(_this.mUnlocker.getParent().convertToNodeSpace(touchPoint));
      },
      onTouchesEnded: function (touches, event) {
        var rect1 = _this.mUnlocker.getBoundingBox();
        var rect2 = _this.mUnlockArea.getBoundingBox();

        if (cc.rectIntersectsRect(rect1, rect2)) {
          try {
            var scene = new cc.Scene();
            var node = cc.BuilderReader.load("ccb/StoreAScene", scene);
            if (node != null) {
              scene.addChild(node);
            }
            cc.director.runScene(new cc.TransitionMoveInR(0.8, scene));
          } catch (err) {
            console.log(err);
          }
        }
        else {
          // Snap
          _this.mUnlocker.setPosition(_this.mOriginalPos);
        }
      }
    }, this.mUnlocker);
  }
});
