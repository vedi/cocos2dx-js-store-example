//
// Created by Fedor Shubin on 1/22/14.
//


#ifndef __JSBinding_H_
#define __JSBinding_H_

#include "cocos2d.h"
#include "ScriptingCore.h"

// Define a namespace to manage your code and make your code clearly
namespace JSB {
    class JSBinding: public cocos2d::CCObject
    {
    public:
        static cocos2d::CCScene* scene();

        virtual bool init();
        CREATE_FUNC(JSBinding);

        void functionTest();
    };
}

#endif //__JSBinding_H_
