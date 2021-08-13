import Utils from "./Utils";
import Vec2 = cc.Vec2;

const {ccclass, property} = cc._decorator;

@ccclass
export default class UtilsAction extends cc.Component {
    // UtilsAction.moveTo()
    static moveTo(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        return new Promise<any>((resolve, reject) => {
            node.stopAllActions()
            let interval = cc.moveTo(duration, x, y);
            let callbacktemp = cc.callFunc(() => {
                if (callback) {
                    callback()
                }
                resolve()
            }, this);
            let sequence = cc.sequence(interval, callbacktemp);
            node.runAction(sequence);
        })

    }

    static moveToByElasticInOut(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        return new Promise<any>((resolve, reject) => {
            node.stopAllActions()
            let interval = cc.moveTo(duration, x, y).easing(cc.easeElasticInOut(duration));
            let callbacktemp = cc.callFunc(() => {
                if (callback) {
                    callback()
                }
                resolve()
            }, this);
            let sequence = cc.sequence(interval, callbacktemp);
            node.runAction(sequence);
        })

    }

    //永远从一个地方到另一个地方
    // UtilsAction.moveByRepeatForeverX(node,duration,x,y)
    static moveByRepeatForeverX(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        let interval1 = cc.moveBy(duration, x, y);
        let interval2 = cc.moveBy(0.01, -x, y);
        // let callbacktemp = cc.callFunc(()=> {
        //     if (callback) {
        //         callback()
        //     }
        // }, this);
        let sequence = cc.sequence(interval1, interval2);
        let repeatForever = cc.repeatForever(sequence);
        node.runAction(repeatForever);
    }

    static moveToRepeatForeverXY(node: cc.Node, duration: number, x1: number, y1: number, x2: number, y2: number, callback: any) {
        node.stopAllActions()
        let interval1 = cc.moveTo(duration, x1, y1);
        let interval2 = cc.moveTo(duration, x2, y2);
        let callbacktemp1 = cc.callFunc(() => {
            if (callback) {
                callback(0)
            }
        }, this);
        let callbacktemp2 = cc.callFunc(() => {
            if (callback) {
                callback(1)
            }
        }, this);
        let sequence = cc.sequence(callbacktemp1, interval1, callbacktemp2, interval2);
        let repeatForever = cc.repeatForever(sequence);
        node.runAction(repeatForever);
    }

    //永远上下
    static moveByRepeatForeverXY(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        let interval1 = cc.moveBy(duration, x, y);
        let interval2 = cc.moveBy(duration, -x, -y);
        // let callbacktemp = cc.callFunc(()=> {
        //     if (callback) {
        //         callback()
        //     }
        // }, this);
        let sequence = cc.sequence(interval1, interval2);
        let repeatForever = cc.repeatForever(sequence);
        node.runAction(repeatForever);
    }

    // UtilsAction.moveBy()
    static moveBy(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        return new Promise<any>((resolve, reject) => {
            node.stopAllActions()
            let interval = cc.moveBy(duration, x, y);
            let callbacktemp = cc.callFunc(() => {
                if (callback) {
                    callback()
                }
                resolve()
            }, this);
            let sequence = cc.sequence(interval, callbacktemp);
            node.runAction(sequence);
        })

    }

    static moveByElasticInOut(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        return new Promise<any>((resolve, reject) => {
            node.stopAllActions()
            let interval = cc.moveBy(duration, x, y).easing(cc.easeElasticInOut(duration));
            let callbacktemp = cc.callFunc(() => {
                if (callback) {
                    callback()
                }
                resolve()
            }, this);
            let sequence = cc.sequence(interval, callbacktemp);
            node.runAction(sequence);
        })

    }

    // UtilsAction.scaleTo()
    static scaleTo(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        return new Promise<any>((resolve, reject) => {
            node.stopAllActions()
            // node.scaleX = 1
            // node.scaleY = 1
            let interval = cc.scaleTo(duration, x, y);
            let callbacktemp = cc.callFunc(() => {
                if (callback) {
                    callback()
                }
                resolve()
            }, this);
            let sequence = cc.sequence(interval, callbacktemp);
            node.runAction(sequence);
        })

    }

    //缓动缩放到
    // UtilsAction.scaleToElasticInOut()
    static scaleToElasticInOut(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        return new Promise<any>((resolve, reject) => {
            node.stopAllActions()
            // node.scaleX = 1
            // node.scaleY = 1
            let interval = cc.scaleTo(duration, x, y).easing(cc.easeElasticInOut(duration));
            let callbacktemp = cc.callFunc(() => {
                if (callback) {
                    callback()
                }
                resolve()
            }, this);
            let sequence = cc.sequence(interval, callbacktemp);
            node.runAction(sequence);
        })


    }

    // UtilsAction.heartbeat()
    static heartbeat(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        // node.scaleX = 1
        // node.scaleY = 1
        let interval1 = cc.scaleTo(duration, x, y);
        let interval2 = cc.scaleTo(duration, 1, 1);
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(interval1, interval2, callbacktemp);
        node.runAction(sequence);
    }

    static heartbeatRepeatForever(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        // node.scaleX = 1
        // node.scaleY = 1
        let interval1 = cc.scaleTo(duration, x, y).easing(cc.easeElasticInOut(duration));
        let interval2 = cc.scaleTo(duration, 1, 1).easing(cc.easeElasticInOut(duration));
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(interval1, interval2);
        let rep = cc.repeatForever(sequence)
        node.runAction(rep);
    }

    //
    static actionRepeatForever(node: cc.Node, duration: number, x: number, y: number, offsetX: number, offsetY: number, callback: any) {
        node.stopAllActions()
        // node.scaleX = 1
        // node.scaleY = 1
        node.scaleX = x;
        node.scaleY = y;
        let interval1 = cc.scaleTo(duration, x, y).easing(cc.easeElasticInOut(duration));
        let interval2 = cc.scaleTo(duration, x + offsetX, y + offsetY).easing(cc.easeElasticInOut(duration));
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(interval1, interval2);
        let rep = cc.repeatForever(sequence)
        node.runAction(rep);
    }

    //旋转一定角度
    static rotateBy(node: cc.Node, deltaAngle: number, duration: number, callback) {
        return new Promise<any>((resolve, reject) => {
            node.stopAllActions()
            // node.scaleX = 1
            // node.scaleY = 1
            let interval1 = cc.rotateBy(duration, deltaAngle).easing(cc.easeElasticInOut(duration));
            // let interval2 = cc.scaleTo(duration, 1, 1).easing(cc.easeElasticInOut(duration));
            let callbacktemp = cc.callFunc(() => {
                if (callback) {
                    callback()
                }
                resolve()
            }, this);
            let sequence = cc.sequence(interval1, callbacktemp);
            // let rep = cc.repeatForever(interval1)
            node.runAction(sequence);
        })

    }

    //旋转一定角度
    static rotateTo(node: cc.Node, deltaAngle: number, duration: number, callback) {
        return new Promise<any>((resolve, reject) => {
            node.stopAllActions()
            // node.scaleX = 1
            // node.scaleY = 1
            let interval1 = cc.rotateTo(duration, deltaAngle).easing(cc.easeElasticInOut(duration));
            // let interval2 = cc.scaleTo(duration, 1, 1).easing(cc.easeElasticInOut(duration));
            let callbacktemp = cc.callFunc(() => {
                if (callback) {
                    callback()
                }
                resolve()
            }, this);
            let sequence = cc.sequence(interval1, callbacktemp);
            // let rep = cc.repeatForever(interval1)
            node.runAction(sequence);
        })

    }

    //一直旋转
    static turnUpRepeatForever(node: cc.Node, duration: number) {
        node.stopAllActions()
        // node.scaleX = 1
        // node.scaleY = 1
        let interval1 = cc.rotateBy(duration, 360).easing(cc.easeElasticInOut(duration));
        // let interval2 = cc.scaleTo(duration, 1, 1).easing(cc.easeElasticInOut(duration));
        // let callbacktemp = cc.callFunc(() => {
        //     if (callback) {
        //         callback()
        //     }
        // }, this);
        // let sequence = cc.sequence(interval1);
        let rep = cc.repeatForever(interval1)
        node.runAction(rep);
    }


    // UtilsAction.hpJump()
    static hpJump(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        let interval1 = cc.jumpBy(duration, x, y, 100, 1);
        let interval2 = cc.fadeOut(1);
        let spawn = cc.spawn(interval1, interval2)
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(spawn, callbacktemp);
        node.runAction(sequence);
    }

    static hpTop(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        let interval1 = cc.jumpBy(duration, x, y, 100, 1);
        let interval2 = cc.fadeOut(1);
        let spawn = cc.spawn(interval1, interval2)
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(spawn, callbacktemp);
        node.runAction(sequence);
    }

    static jumpBy(node: cc.Node, duration: number, x: number, y: number, height: number, jumps: number, callback: any) {
        return new Promise<any>((resolve, reject) => {
            node.stopAllActions()
            let interval1 = cc.jumpBy(duration, x, y, height, jumps);
            let callbacktemp = cc.callFunc(() => {
                if (callback) {
                    callback()
                }
                resolve()
            }, this);
            let sequence = cc.sequence(interval1, callbacktemp);
            node.runAction(sequence);
        })

    }

    static jumpTo(node: cc.Node, duration: number, x: number, y: number, height: number, jumps: number, callback: any) {
        return new Promise<any>((resolve, reject) => {
            node.stopAllActions()
            let interval1 = cc.jumpTo(duration, x, y, height, jumps);
            let callbacktemp = cc.callFunc(() => {
                if (callback) {
                    callback()
                }
                resolve()
            }, this);
            let sequence = cc.sequence(interval1, callbacktemp);
            node.runAction(sequence);
        })

    }

    //跳消失
    // UtilsAction.jumpToAndFadeOut(this.node,time,positionEnd.x,positionEnd.y,50,Utils.random(1,3),null)
    static jumpToAndFadeOut(node: cc.Node, duration: number, x: number, y: number, height: number, jumps: number, callback: any) {
        return new Promise<any>((resolve, reject) => {
            node.stopAllActions()
            let interval1 = cc.jumpTo(duration, x, y, height, jumps);
            let interval2 = cc.fadeOut(duration);
            let callbacktemp = cc.callFunc(() => {
                if (callback) {
                    callback()
                }
                resolve()
            }, this);
            let spawn = cc.spawn(interval1, interval2)
            let sequence = cc.sequence(spawn, callbacktemp);
            node.runAction(sequence);
        })

    }


    // UtilsAction.fadeOut()
    static fadeOut(node: cc.Node, duration: number, callback ?: any) {
        return new Promise<any>((resolve, reject) => {
            node.stopAllActions()
            // node.scaleX = 1
            // node.scaleY = 1
            let interval1 = cc.fadeOut(duration);
            let callbacktemp = cc.callFunc(() => {
                if (callback) {
                    callback()
                }
                resolve()
            }, this);
            let sequence = cc.sequence(interval1, callbacktemp);
            node.runAction(sequence);

        })

    }

    static fadeIn(node: cc.Node, duration: number, callback ?: any) {
        return new Promise<any>((resolve, reject) => {
            node.stopAllActions()
            let interval1 = cc.fadeIn(duration);
            let callbacktemp = cc.callFunc(() => {
                if (callback) {
                    callback()
                }
                resolve()
            }, this);
            let sequence = cc.sequence(interval1, callbacktemp);
            node.runAction(sequence);
        })
    }

    // UtilsAction.sidePullBoxLayout_start(node,callback)
    static sidePullBoxLayout_start(node: cc.Node, callback) {
        node.stopAllActions()
        let interval1 = cc.fadeIn(0.5);
        let interval2 = cc.moveBy(0.5, 0, -300).easing(cc.easeInOut(1.0));
        let spawn = cc.spawn(interval1, interval2)

        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(spawn, callbacktemp);
        node.runAction(sequence);
    }

    // UtilsAction.sidePullBoxLayout_stop(node,callback)
    static sidePullBoxLayout_stop(node: cc.Node, callback) {
        node.stopAllActions()
        let interval1 = cc.fadeOut(0.5);
        let interval2 = cc.moveBy(0.5, 0, 300).easing(cc.easeInOut(1.0));
        let spawn = cc.spawn(interval1, interval2)

        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(spawn, callbacktemp);
        node.runAction(sequence);
    }

    // UtilsAction.swing(node)
    static swing(node: cc.Node) {
        node.stopAllActions()
        let interval1 = cc.rotateTo(0.1, 10).easing(cc.easeInOut(0.5));
        let interval2 = cc.rotateTo(0.1, -10).easing(cc.easeInOut(0.5));
        let interval3 = cc.rotateTo(0.1, 0).easing(cc.easeInOut(0.5));
        let interval4 = cc.rotateTo(0.5, 0).easing(cc.easeInOut(0.5));
        let interval5 = cc.rotateTo(0.1, 20).easing(cc.easeInOut(0.5));
        let interval6 = cc.rotateTo(0.1, -20).easing(cc.easeInOut(0.5));
        let interval7 = cc.rotateTo(0.1, 0).easing(cc.easeInOut(0.5));
        let interval8 = cc.rotateTo(0.25, 0).easing(cc.easeInOut(0.5));
        // let interval2 = cc.moveBy(1,-100,0).easing(cc.easeInOut(1.0));
        let spawn = cc.spawn(interval1, interval2)

        // let callbacktemp = cc.callFunc(()=> {
        //     if (callback) {
        //         callback()
        //     }
        // }, this);
        let sequence = cc.sequence(interval1, interval2, interval3, interval4, interval5, interval6, interval7, interval8);
        let rep = cc.repeatForever(sequence)
        node.runAction(rep);
    }

    static huangdong(node: cc.Node, callback) {
        node.stopAllActions()
        let interval1 = cc.rotateTo(0.1, 10).easing(cc.easeInOut(0.5));
        let interval2 = cc.rotateTo(0.1, -10).easing(cc.easeInOut(0.5));
        let interval3 = cc.rotateTo(0.1, 0).easing(cc.easeInOut(0.5));
        // let interval2 = cc.moveBy(1,-100,0).easing(cc.easeInOut(1.0));
        let spawn = cc.spawn(interval1, interval2)

        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(interval1, interval2, interval3, callbacktemp);
        // let rep = cc.repeatForever(sequence)
        node.runAction(sequence);
    }

    static huangdongyongyuan(node: cc.Node, callback) {
        node.stopAllActions()
        let interval1 = cc.rotateTo(0.1, 10).easing(cc.easeInOut(0.5));
        let interval2 = cc.rotateTo(0.1, -10).easing(cc.easeInOut(0.5));
        let interval3 = cc.rotateTo(0.1, 0).easing(cc.easeInOut(0.5));
        // let interval2 = cc.moveBy(1,-100,0).easing(cc.easeInOut(1.0));
        let spawn = cc.spawn(interval1, interval2)

        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(interval1, interval2, interval3, callbacktemp);
        let rep = cc.repeatForever(sequence)
        node.runAction(rep);
    }

    //掉落小怪
    // UtilsAction.drop(node,endp,callback)
    static drop(node: cc.Node, endp, callback) {
        node.stopAllActions()

        let interval1 = cc.jumpTo(Utils.random(50, 100) / 100, endp, Utils.random(0, 100) * Utils.randomZF(), 1);
        let interval2 = cc.jumpBy(Utils.random(80, 150) / 100, cc.v2(Utils.random(50, 150) * Utils.randomZF(), Utils.random(50, 100) * Utils.randomZF()), Utils.random(50, 100), Utils.random(1, 3)).easing(cc.easeElasticOut(1));
        // let spawn = cc.spawn(interval1,interval2)

        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(interval1, interval2, callbacktemp);
        node.runAction(sequence);
    }

    // UtilsAction.hunt(node,endp,callback)
    //跳 吃怪兽
    static hunt(node: cc.Node, endp, callback) {
        node.stopAllActions()

        let interval1 = cc.jumpTo(Utils.random(20, 50) / 100, endp, Utils.random(100, 200), 1);
        let interval2 = cc.jumpBy(Utils.random(10, 60) / 100, cc.v2(0, 0), Utils.random(5, 100), Utils.random(1, 4));
        // let spawn = cc.spawn(interval1,interval2)

        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(interval1, interval2, callbacktemp);
        node.runAction(sequence);
    }

    //蛋里出生
    // UtilsAction.born(node,x,y,callback)
    static born(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        let interval1 = cc.scaleTo(duration, x, y).easing(cc.easeElasticOut(duration));
        let interval2 = cc.fadeIn(duration).easing(cc.easeElasticOut(duration));
        let spawn = cc.spawn(interval1, interval2)
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(spawn, callbacktemp);
        node.runAction(sequence);
    }

    // 透明从大到小最后弹一下
    // UtilsAction.scaleToAndfadeIn(node,oldx,oldy,x,y,callback)
    static scaleToAndfadeIn(node: cc.Node, duration: number, oldx: number, oldy: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        node.scaleX = oldx
        node.scaleY = oldy
        node.opacity = 0
        let interval1 = cc.scaleTo(duration, x, y).easing(cc.easeElasticOut(duration));
        let interval2 = cc.fadeIn(duration).easing(cc.easeElasticOut(duration));
        let spawn = cc.spawn(interval1, interval2)
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(spawn, callbacktemp);
        node.runAction(sequence);
    }

    // UtilsAction.scaleToAndfadeOut(node,duration,oldx,oldy,x,y,callback)
    static scaleToAndfadeOut(node: cc.Node, duration: number, oldx: number, oldy: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        node.scaleX = oldx
        node.scaleY = oldy
        node.opacity = 255
        let interval1 = cc.scaleTo(duration, x, y).easing(cc.easeElasticInOut(duration));
        let interval2 = cc.fadeOut(duration).easing(cc.easeElasticInOut(duration));
        let spawn = cc.spawn(interval1, interval2)
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(spawn, callbacktemp);
        node.runAction(sequence);
    }

    static scaleToAndfadeOut_sequence(node: cc.Node, scaleToduration: number, fadeOutduration: number, oldx: number, oldy: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        node.scaleX = oldx
        node.scaleY = oldy
        node.opacity = 255
        let interval1 = cc.scaleTo(scaleToduration, x, y).easing(cc.easeElasticInOut(scaleToduration / 2));
        let interval2 = cc.fadeOut(fadeOutduration).easing(cc.easeElasticInOut(fadeOutduration / 2));
        // let spawn = cc.spawn(interval1, interval2)
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(interval1, interval2, callbacktemp);
        node.runAction(sequence);
    }


    //击打效果
    // UtilsAction.hit(node)
    static hit(node: cc.Node) {
        node.stopAllActions()
        let interval1 = cc.rotateTo(0.1, 10).easing(cc.easeInOut(0.1));
        let interval2 = cc.rotateTo(0.1, -10).easing(cc.easeInOut(0.1));
        let interval3 = cc.rotateTo(0.1, 0).easing(cc.easeInOut(0.1));
        let interval4 = cc.scaleTo(0.2, 1.2, 1.2)
        let interval5 = cc.rotateTo(0.1, 0).easing(cc.easeInOut(0.1));
        let interval6 = cc.rotateTo(0.05, 20).easing(cc.easeInOut(0.1));
        let interval7 = cc.rotateTo(0.05, -20).easing(cc.easeInOut(0.1));
        let interval8 = cc.scaleTo(0.2, 1.3, 1.3)
        let interval9 = cc.rotateTo(0.05, 0).easing(cc.easeInOut(0.1));
        let interval10 = cc.scaleTo(0.2, 1, 1)
        let interval11 = cc.rotateTo(0.05, 0).easing(cc.easeInOut(0.1));
        // let interval2 = cc.moveBy(1,-100,0).easing(cc.easeInOut(1.0));
        let spawn = cc.spawn(interval1, interval2)

        // let callbacktemp = cc.callFunc(()=> {
        //     if (callback) {
        //         callback()
        //     }
        // }, this);
        let sequence = cc.sequence(
            interval1,
            interval2,
            interval3,
            interval4,
            interval5,
            interval6,
            interval7,
            interval8,
            interval9,
            interval10,
            interval11,
        );
        // let rep = cc.repeatForever(sequence)
        node.runAction(sequence);
    }

    //上牌 准备按住移动过去
    static moveToCard(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        let interval1 = cc.moveTo(duration, x, y + 400);

        // let spawn = cc.spawn(interval1, interval2)
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(interval1, callbacktemp);
        node.runAction(sequence);
    }

    // UtilsAction.moveToMaPai(node)
    static moveToMaPai(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        let interval = cc.moveTo(duration, x, y).easing(cc.easeElasticOut(duration));
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(interval, callbacktemp);
        node.runAction(sequence);
    }

    // UtilsAction.gameOverJump()
    static gameOverJump(node: cc.Node, callback: any) {
        node.stopAllActions()

        let interval1 = cc.jumpBy(0.5 + Utils.random(0, 1), Utils.random(0, 100) * Utils.randomZF(), Utils.random(350, 400), Utils.random(0, 200), Utils.random(0, 2));
        let interval2 = cc.fadeOut(0.8);
        let spawn = cc.spawn(interval1, interval2)
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(spawn, callbacktemp);
        node.runAction(sequence);
    }

    //一直左右
    // UtilsAction.moveByRepeatForever(node,duration,x,y,callback)
    static moveByRepeatForever(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        // node.scaleX = 1
        // node.scaleY = 1
        let interval1 = cc.moveBy(duration, x, y).easing(cc.easeElasticInOut(duration));
        let interval2 = cc.moveBy(duration, -x, -y).easing(cc.easeElasticInOut(duration));
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(interval1, interval2);
        let rep = cc.repeatForever(sequence)
        node.runAction(rep);
    }

    //飞的广告
    // UtilsAction.fiyAD(node,duration,x,y,offSetX,offSetY1,offSetY2,offSetY3,callback)
    // UtilsAction.fiyAD(this.node,duration0,x,y,duration1,offSetY1,duration2,offSetY2,duration3,offSetY3,this.fiyADCallBack)
    // static fiyAD(node: cc.Node, duration: number, x: number, y: number, offSetX: number, offSetY1: number,offSetY2: number,offSetY3: number, callback: any) {
    static fiyAD(node: cc.Node, duration0: number, x: number, y: number, duration1: number, offSetY1: number, duration2: number, offSetY2: number, duration3: number, offSetY3: number, self : any,,callback: any) {
        node.stopAllActions()
        // node.scaleX = 1
        // node.scaleY = 1
        let interval1 = cc.moveBy(duration0, x, y)
        let interval2 = cc.moveBy(duration1, 0, offSetY1).easing(cc.easeSineInOut());
        let interval3 = cc.moveBy(duration2, 0, offSetY2).easing(cc.easeSineInOut());
        let interval4 = cc.moveBy(duration3, 0, offSetY3).easing(cc.easeSineInOut());
        let sequence1 = cc.sequence(interval2, interval3, interval4);
        let spawn = cc.spawn(interval1, sequence1)

        // let interval2 = cc.moveBy(duration, -x, -y).easing(cc.easeElasticInOut(duration));
        // let interval1 = cc.bezierBy(duration,[new Vec2(x+offSetX,y+offSetY1),new Vec2(x+offSetX,y+offSetY2),new Vec2(x+offSetX,y+offSetY2)])


        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback(self)
            }
        }, this);
        let sequence2 = cc.sequence(spawn, callbacktemp);
        // let rep = cc.repeatForever(sequence)
        node.runAction(sequence2);


    }


    //一直上下
    static upDownRepeatForever(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        // node.scaleX = 1
        // node.scaleY = 1
        let interval1 = cc.moveTo(duration, x, y).easing(cc.easeElasticInOut(duration));
        let interval2 = cc.scaleTo(duration, 1, 1).easing(cc.easeElasticInOut(duration));
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(interval1, interval2);
        let rep = cc.repeatForever(sequence)
        node.runAction(rep);
    }

    //往一个方向移动淡出
    // UtilsAction.moveByfadeOut(node,duration,x,y,callback)
    static moveByfadeOut(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        let interval1 = cc.moveBy(duration, x, y).easing(cc.easeElasticOut(duration));
        let interval2 = cc.fadeOut(duration).easing(cc.easeElasticOut(duration));
        let spawn = cc.spawn(interval1, interval2)
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(spawn, callbacktemp);
        node.runAction(sequence);
    }

    // UtilsAction.moveByeaseElasticOut(node,duration,x,y,callback)
    static moveByeaseElasticOut(node: cc.Node, duration: number, x: number, y: number, callback ?: any) {
        node.stopAllActions()
        let interval1 = cc.moveBy(duration, x, y);
        let interval2 = cc.fadeOut(duration);
        let spawn = cc.spawn(interval1, interval2)
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(spawn, callbacktemp);
        node.runAction(sequence);
    }

    //门锁动画
    // UtilsAction.doorLockAn(node,duration,callback)
    static doorLockAn(node: cc.Node, duration: number, callback) {
        return new Promise<any>((resolve, reject) => {
            node.stopAllActions()
            let y = node.scaleY
            let interval1 = cc.scaleTo(duration, 1, 0.2).easing(cc.easeElasticInOut(duration));
            let interval2 = cc.scaleTo(duration, 1, 1).easing(cc.easeElasticInOut(duration));
            let interval3 = cc.scaleTo(duration, 1, 0.2).easing(cc.easeElasticInOut(duration));
            let interval4 = cc.scaleTo(duration, 1, 1).easing(cc.easeElasticInOut(duration));

            let interval5 = cc.scaleTo(duration, 1, 0.2).easing(cc.easeElasticInOut(duration));
            let interval6 = cc.scaleTo(duration, 1, 1).easing(cc.easeElasticInOut(duration));
            let interval7 = cc.scaleTo(duration, 1, 0.2).easing(cc.easeElasticInOut(duration));
            let interval8 = cc.scaleTo(duration, 1, 1).easing(cc.easeElasticInOut(duration));

            // let interval9 = cc.scaleTo(duration, 1, 0.2).easing(cc.easeElasticInOut(duration));
            // let interval10 = cc.scaleTo(duration, 1, 1).easing(cc.easeElasticInOut(duration));
            // let interval11 = cc.scaleTo(duration, 1, 0.2).easing(cc.easeElasticInOut(duration));
            // let interval12 = cc.scaleTo(duration, 1, 1).easing(cc.easeElasticInOut(duration));
            // let spawn = cc.spawn(interval1,interval2)
            let callbacktemp = cc.callFunc(() => {
                if (callback) {
                    callback()
                }
                resolve()
            }, this);
            let sequence = cc.sequence(
                interval1,
                interval2,
                interval3,
                interval4,
                interval5,
                interval6,
                interval7,
                interval8,
                // interval9,
                // interval10,
                // interval11,
                // interval12,
                callbacktemp);
            node.runAction(sequence);
        })
    }

    //门动画
    // UtilsAction.doorAn(node,duration,callback)
    static doorAn(node: cc.Node, duration: number, callback) {
        return new Promise<any>((resolve, reject) => {
            node.stopAllActions()
            let p = node.getPosition()

            let interval1 = cc.moveBy(duration, p.x + 4, 0).easing(cc.easeElasticInOut(duration));
            let interval2 = cc.moveBy(duration, p.x - 4, 0).easing(cc.easeElasticInOut(duration));
            let interval3 = cc.moveBy(duration, p.x - 4, 0).easing(cc.easeElasticInOut(duration));
            let interval4 = cc.moveBy(duration, p.x + 4, 0).easing(cc.easeElasticInOut(duration));

            let interval5 = cc.moveBy(duration, p.x + 4, 0).easing(cc.easeElasticInOut(duration));
            let interval6 = cc.moveBy(duration, p.x - 4, 0).easing(cc.easeElasticInOut(duration));
            let interval7 = cc.moveBy(duration, p.x - 4, 0).easing(cc.easeElasticInOut(duration));
            let interval8 = cc.moveBy(duration, p.x + 4, 0).easing(cc.easeElasticInOut(duration));

            // let interval9 = cc.moveBy(duration, p.x+10, 0).easing(cc.easeElasticInOut(duration));
            // let interval10 = cc.moveBy(duration, p.x-10 ,0).easing(cc.easeElasticInOut(duration));
            // let interval11 = cc.moveBy(duration, p.x-10, 0).easing(cc.easeElasticInOut(duration));
            // let interval12 = cc.moveBy(duration, p.x+10, 0).easing(cc.easeElasticInOut(duration));


            let interval13 = cc.moveTo(duration, p.x, p.y).easing(cc.easeElasticInOut(duration));
            // let spawn = cc.spawn(interval1,interval2)
            let callbacktemp = cc.callFunc(() => {
                if (callback) {
                    callback()
                }
                resolve()
            }, this);
            let sequence = cc.sequence(
                interval1,
                interval2,
                interval3,
                interval4,
                interval5,
                interval6,
                interval7,
                interval8,
                // interval9,
                // interval10,
                // interval11,
                // interval12,
                interval13,
                callbacktemp);
            node.runAction(sequence);
        })
    }

    //永远变色再变回来
    // UtilsAction.tintToRepeatForever(node,toColorTime,myColorTime,toColor,myColor,callback)
    static tintToRepeatForever(node: cc.Node, toColorTime: number, myColorTime: number, toColor: cc.Color, myColor: cc.Color, callback) {
        return new Promise<any>((resolve, reject) => {
            node.stopAllActions()

            let interval1 = cc.tintTo(toColorTime, myColor.r, myColor.g, myColor.b).easing(cc.easeElasticInOut(1));
            let interval2 = cc.tintTo(myColorTime, toColor.r, toColor.g, toColor.b).easing(cc.easeElasticInOut(1));
            // let spawn = cc.spawn(interval1,interval2)
            let callbacktemp = cc.callFunc(() => {
                if (callback) {
                    callback()
                }
                resolve()
            }, this);
            let sequence = cc.sequence(
                interval1,
                interval2,
                callbacktemp);
            let rep = cc.repeatForever(sequence)
            node.runAction(rep);
        })
    }

    // UtilsAction.tintTo(node,toColorTime,toColor,callback)
    static tintTo(node: cc.Node, toColorTime: number, toColor: cc.Color, callback) {
        return new Promise<any>((resolve, reject) => {
            node.stopAllActions()

            let interval1 = cc.tintTo(toColorTime, toColor.r, toColor.g, toColor.b).easing(cc.easeElasticInOut(1));
            // let spawn = cc.spawn(interval1,interval2)
            let callbacktemp = cc.callFunc(() => {
                if (callback) {
                    callback()
                }
                resolve()
            }, this);
            let sequence = cc.sequence(
                interval1,
                callbacktemp);
            // let rep = cc.repeatForever(sequence)
            node.runAction(sequence);
        })
    }

    //永远变色再变回来
    // UtilsAction.fadeOutToInRepeatForever(node,tofadeOutTime,tofadeInTime,callback)
    static fadeOutToInRepeatForever(node: cc.Node, tofadeOutTime: number, tofadeInTime: number, callback) {
        return new Promise<any>((resolve, reject) => {
            node.stopAllActions()

            let interval1 = cc.fadeOut(tofadeOutTime).easing(cc.easeElasticOut(tofadeOutTime));
            let interval2 = cc.fadeIn(tofadeInTime).easing(cc.easeElasticOut(tofadeInTime));
            // let spawn = cc.spawn(interval1,interval2)
            let callbacktemp = cc.callFunc(() => {
                if (callback) {
                    callback()
                }
                resolve()
            }, this);
            let sequence = cc.sequence(
                interval1,
                interval2,
                callbacktemp);
            let rep = cc.repeatForever(sequence)
            node.runAction(rep);
        })
    }

    // UtilsAction.fadeTo(node,tofadeOutTime,opacity,callback)
    static fadeTo(node: cc.Node, tofadeOutTime: number, opacity: number, callback) {
        return new Promise<any>((resolve, reject) => {
            node.stopAllActions()

            let interval1 = cc.fadeTo(tofadeOutTime, opacity).easing(cc.easeElasticOut(tofadeOutTime));
            // let spawn = cc.spawn(interval1,interval2)
            let callbacktemp = cc.callFunc(() => {
                if (callback) {
                    callback()
                }
                resolve()
            }, this);
            let sequence = cc.sequence(
                interval1,
                callbacktemp);
            // let rep = cc.repeatForever(sequence)
            node.runAction(sequence);
        })
    }

    //一直上下带缓动
    // UtilsAction.moveByRepeatForeverXY_easeElasticOut(node,duration,x,y,tofadeOutTime,callback)
    static moveByRepeatForeverXY_easeElasticOut(node: cc.Node, duration: number, x: number, y: number, tofadeOutTime, callback: any) {
        node.stopAllActions()
        let interval1 = cc.moveBy(duration, x, y).easing(cc.easeElasticInOut(tofadeOutTime));
        let interval2 = cc.moveBy(duration, -x, -y).easing(cc.easeElasticInOut(tofadeOutTime));
        // let callbacktemp = cc.callFunc(()=> {
        //     if (callback) {
        //         callback()
        //     }
        // }, this);
        let sequence = cc.sequence(interval1, interval2);
        let repeatForever = cc.repeatForever(sequence);
        node.runAction(repeatForever);
    }

    //一直旋转
    static turnUpRepeatForeverSetDeltaAngle(node: cc.Node, deltaAngle: number, duration: number) {
        node.stopAllActions()
        // node.scaleX = 1
        // node.scaleY = 1
        let interval1 = cc.rotateBy(duration, deltaAngle)
        // let interval2 = cc.scaleTo(duration, 1, 1).easing(cc.easeElasticInOut(duration));
        // let callbacktemp = cc.callFunc(() => {
        //     if (callback) {
        //         callback()
        //     }
        // }, this);
        // let sequence = cc.sequence(interval1);
        let rep = cc.repeatForever(interval1)
        node.runAction(rep);
    }


    //引导小手代码动画
    // UtilsAction.hand(node)
    static hand(node: cc.Node) {
        node.stopAllActions()
        // node.scaleX = 1
        // node.scaleY = 1
        // let interval2 = cc.scaleTo(duration, 1, 1).easing(cc.easeElasticInOut(duration));
        // let callbacktemp = cc.callFunc(() => {
        //     if (callback) {
        //         callback()
        //     }
        // }, this);


        node.opacity = 0
        node.scaleX = 2
        node.scaleY = 2
        node.angle = 0


        let interval1 = cc.scaleTo(1,1,1)
        let interval2 = cc.fadeIn(1)
        let spawn1 = cc.spawn(interval1,interval2)


        let interval3 = cc.rotateBy(0.2,-20)
        let interval4 = cc.rotateBy(0.2,20)
        let sequence1 = cc.sequence(interval3,interval4);

        let interval5 = cc.scaleTo(0.5,2,2)
        let interval6 = cc.fadeOut(0.5)
        let spawn2 = cc.spawn(interval5,interval6)


        let sequence = cc.sequence(spawn1,sequence1,spawn2);
        let rep = cc.repeatForever(sequence)
        node.runAction(rep);
    }
    //按钮缩放
    // UtilsAction.btnAn(node)
    static btnAn(node: cc.Node) {
        node.stopAllActions()
        node.scale = 1
        let interval1 = cc.scaleTo(1, 1.2, 1.2).easing(cc.easeElasticOut(0.25));
        let interval2 = cc.scaleTo(1, 1, 1)

        let sequence = cc.sequence(interval1,interval2);
        let rep = cc.repeatForever(sequence)
        node.runAction(rep);
    }

}