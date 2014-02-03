//
// MainScene class
//
var MainScreen = cc.Class.extend({
  onDidLoadFromCCB: function () {
    sys.garbageCollect();

    var rootNode = this.rootNode;
    this.mUnlocker.retain();
    rootNode.retain();
    rootNode.setTouchEnabled(true);

    applyScaleForNode(this.rootNode);
    fill(this.mBackgroundNode);

    rootNode.onTouchesBegan = function (touches, event) {
      this.controller.onTouchesBegan(touches, event);
      return true;
    };
    rootNode.onTouchesMoved = function (touches, event) {
      this.controller.onTouchesMoved(touches, event);
      return true;
    };
    rootNode.onTouchesEnded = function (touches, event) {
      this.controller.onTouchesEnded(touches, event);
      return true;
    };
  },

  onTouchesBegan: function (touches, event) {
    this.mOriginalPos = this.mUnlocker.getPosition();
  },
  onTouchesMoved: function (touches, event) {
    var touchPoint = touches[0].getLocation();
    this.mUnlocker.setPosition(this.mUnlocker.getParent().convertToNodeSpace(touchPoint));
  },
  onTouchesEnded: function (touches, event) {
    var rect1 = this.mUnlocker.getBoundingBox();
    var rect2 = this.mUnlockArea.getBoundingBox();

    if (cc.rectIntersectsRect(rect1, rect2)) {
      var scene = cc.BuilderReader.loadAsScene("ccb/StoreAScene");
      cc.Director.getInstance().replaceScene(cc.TransitionMoveInR.create(0.8, scene));
    }
    else {
      // Snap
      this.mUnlocker.setPosition(this.mOriginalPos);
    }
  }
});
