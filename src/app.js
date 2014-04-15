var MainScreenLayer = cc.Layer.extend({
  ctor: function () {
    //////////////////////////////
    // 1. super init first
    this._super();

    /////////////////////////////
    // 2. add a menu item with "X" image, which is clicked to quit the program
    //    you may modify it.
    // ask director the window size
    var size = cc.director.getWinSize();

    var background = cc.Sprite.create(res.ImgDirect);
    background.attr({
      x: size.width / 2,
      y: size.height / 2,
      scale: 0.89
    });
    this.addChild(background, 0);

    var topLabel = cc.LabelTTF.create("SOOMLA Store Example", "Helvetica", 50, cc.size(400, 200),
      cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM);
    topLabel.attr({
      x: size.width / 2,
      y: size.height
    });
    topLabel.setAnchorPoint(cc.p(0.5, 1));
    this.addChild(topLabel, 1);

    var gameNameTitle = cc.LabelTTF.create("[YOUR GAME HERE]", "Helvetica", 50, cc.size(0, 0),
      cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
    gameNameTitle.attr({
      x: size.width / 2,
      y: size.height / 2
    });
    gameNameTitle.setAnchorPoint(cc.p(0.5, 0.5));
    this.addChild(gameNameTitle, 1);

    this.mUnlockArea = cc.Node.create();
    this.mUnlockArea.attr({
      x: size.width,
      y: 0
    });
    this.mUnlockArea.setAnchorPoint(cc.p(1, 0));
    this.mUnlockArea.setContentSize(cc.size(200, 200));
    this.addChild(this.mUnlockArea, 2);

    var unlockArea = cc.Sprite.create(res.RightBg);
    unlockArea.attr({
      x: 0,
      y: this.mUnlockArea.getContentSize().height,
      scale: 1.25
    });
    unlockArea.setAnchorPoint(cc.p(0, 1));
    this.mUnlockArea.addChild(unlockArea, 0);

    var mUnlockOn = cc.Sprite.create(res.RightBgHover);
    mUnlockOn.attr({
      x: 62,
      y: 136
    });
    mUnlockOn.setAnchorPoint(cc.p(0.5, 0.5));
    mUnlockOn.setVisible(false);
    this.mUnlockArea.addChild(mUnlockOn, 1);

    this.mUnlocker = cc.Sprite.create(res.SoomlaLogo);
    this.mUnlocker.attr({
      x: 140,
      y: 135,
      scale: 1.25
    });
    this.mUnlocker.setAnchorPoint(cc.p(0.5, 0.5));
    this.addChild(this.mUnlocker, 2);

    var hintLabel = cc.LabelTTF.create("Drag the SooMLA-bot to the box top open store", "Helvetica", 24, cc.size(550, 50),
      cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
    hintLabel.attr({
      x: size.width / 2,
      y: 0
    });
    hintLabel.setAnchorPoint(cc.p(0.5, 0));
    this.addChild(hintLabel, 1);

    return true;
  }
});

var MainScreenScene = cc.Scene.extend({
  onEnter: function () {
    this._super();

    this.layer = new MainScreenLayer();
    this.addChild(this.layer);

    var _this = this;

    if ('touches' in cc.sys.capabilities) {
      cc.eventManager.addListener(cc.EventListener.create({
        event: cc.EventListener.TOUCH_ALL_AT_ONCE,
        onTouchesBegan: function () {
          _this.startDrag();
        },
        onTouchesMoved: function (touches) {
          _this.drag(touches[0].getLocation());
        },
        onTouchesEnded: function (touches) {
          _this.drop(touches[0].getLocation());
        }
      }), this);
    }
    else if ('mouse' in cc.sys.capabilities) {
      cc.eventManager.addListener({
        event: cc.EventListener.MOUSE,
        onMouseDown: function () {
          _this.startDrag();
        },
        onMouseMove: function (event) {
          _this.drag(event.getLocation());
        },
        onMouseUp: function (event) {
          _this.drop(event.getLocation());
        }
      }, this);
    }
  },
  startDrag: function () {
    this.mOriginalPos = this.layer.mUnlocker.getPosition();
  },
  drag: function (touchPoint) {
    this.layer.mUnlocker.setPosition(this.layer.mUnlocker.getParent().convertToNodeSpace(touchPoint));
  },
  drop: function (touchPoint) {
    this.layer.mUnlocker.setPosition(this.layer.mUnlocker.getParent().convertToNodeSpace(touchPoint));
      var rect1 = this.layer.mUnlocker.getBoundingBox();
      var rect2 = this.layer.mUnlockArea.getBoundingBox();

      if (cc.rectIntersectsRect(rect1, rect2)) {
        cc.LoaderScene.preload(aScene_resources, function () {
          cc.director.runScene(cc.TransitionMoveInR.create(0.8, new StoreAScene()));
        }, this);
      }
      else {
        // Snap
        this.layer.mUnlocker.runAction(cc.MoveTo.create(0.2, this.mOriginalPos));
      }
  }
});
