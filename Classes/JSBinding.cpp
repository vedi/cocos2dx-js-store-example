//
// Created by Fedor Shubin on 1/22/14.
//

#include "JSBinding.h"
#include "CCSoomlaError.h"
#include "jansson.h"
#import "CCSoomlaJsonHelper.h"
#include "CCSoomlaNdkBridge.h"
#include "jansson_private.h"

bool Soomla::JSBinding::init(){
    bool bRef = false;
    do{
        cocos2d::CCLog("JSB init...");

        bRef = true;
    } while (0);

    return bRef;
}

void Soomla::JSBinding::callNative(const char *params, std::string &result) {
    cocos2d::CCLog("Call native - in: %s", params);

    json_error_t error;
    json_t *root;
    root = json_loads(params, 0, &error);

    if (!root) {
        CCLog("error: at line #%d: %s", error.line, error.text);
        return;
    }

    cocos2d::CCObject *dataToPass = CCSoomlaJsonHelper::getCCObjectFromJson(root);
    CCDictionary *dictToPass = dynamic_cast<CCDictionary *>(dataToPass);
    CC_ASSERT(dictToPass);

    soomla::CCSoomlaError *soomlaError = NULL;
    CCDictionary *retParams = (CCDictionary *) soomla::CCSoomlaNdkBridge::callNative(dictToPass, &soomlaError);

    CCDictionary *resultParams = CCDictionary::create();
    if (soomlaError != NULL) {
        retParams = CCDictionary::create();
        retParams->setObject(CCInteger::create(soomlaError->getCode()), "code");
        retParams->setObject(CCString::create(soomlaError->getInfo()), "info");

        resultParams->setObject(CCBool::create(false), "success");
    } else {
        resultParams->setObject(CCBool::create(true), "success");
    }
    resultParams->setObject(retParams, "result");

    root = CCSoomlaJsonHelper::getJsonFromCCObject(resultParams);
    char *dump = json_dumps(root, JSON_COMPACT | JSON_ENSURE_ASCII);
    result = dump;
    cocos2d::CCLog("Call native - out: %s", dump);
    free(dump);
}

void Soomla::JSBinding::callCallback(CCDictionary *params) {


    js_proxy_t* p = jsb_get_native_proxy(this);
    jsval retval;
    jsval v[] = {
            v[0] = UINT_TO_JSVAL(32),
            v[1] = UINT_TO_JSVAL(88)
    };
    ScriptingCore::getInstance()->executeFunctionWithOwner(OBJECT_TO_JSVAL(p->obj),
            "callback", 2, v, &retval);
}
