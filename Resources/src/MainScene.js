//
// MainScene class
//
var MainScene = function(){};

// Create callback for button
MainScene.prototype.onDidLoadFromCCB = function() {
  cc.log("onDidLoadFromCCB");
  // Forward relevant touch events to controller (this)
  this.rootNode.onTouchesBegan = function( touches, event) {
    cc.log("this.controller.onTouchBegan");
    this.controller.onTouchesBegan(touches, event);
    return true;
  };
};

MainScene.prototype.onTouchesBegan = function(touches,event)
{
  cc.log("onTouchBegan");
};


MainScene.prototype.onPressButton = function() {
    // Rotate the label when the button is pressed
    this.helloLabel.runAction(cc.RotateBy.create(1,360));
};