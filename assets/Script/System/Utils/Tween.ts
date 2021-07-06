// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Tween extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    // Tween.Tweens.Quad
    static Tweens : any = {
        //d duration（持续步长）。
        //c change in value（变化增量）；
        //b  beginning value（位置初始值）；
        //t  current time（当前步长）；
        //缓动
            //无缓动效果
            Linear(t,b,c,d){ return c*t/d + b; },
            //二次方的缓动
            Quad: {
                easeIn(t,b,c,d){
                    return c*(t/=d)*t + b;
                },
                easeOut(t,b,c,d){
                    return -c *(t/=d)*(t-2) + b;
                },
                easeInOut(t,b,c,d){
                    if ((t/=d/2) < 1) return c/2*t*t + b;
                    return -c/2 * ((--t)*(t-2) - 1) + b;
                }
            },
            //三次方的缓动
            Cubic: {
                easeIn(t,b,c,d){
                    return c*(t/=d)*t*t + b;
                },
                easeOut(t,b,c,d){
                    return c*((t=t/d-1)*t*t + 1) + b;
                },
                easeInOut(t,b,c,d){
                    if ((t/=d/2) < 1) return c/2*t*t*t + b;
                    return c/2*((t-=2)*t*t + 2) + b;
                }
            },
            //四次方的缓动
            Quart: {
                easeIn(t,b,c,d){
                    return c*(t/=d)*t*t*t + b;
                },
                easeOut(t,b,c,d){
                    return -c * ((t=t/d-1)*t*t*t - 1) + b;
                },
                easeInOut(t,b,c,d){
                    if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
                    return -c/2 * ((t-=2)*t*t*t - 2) + b;
                }
            },
            //五次方的缓动
            Quint: {
                easeIn(t,b,c,d){
                    return c*(t/=d)*t*t*t*t + b;
                },
                easeOut(t,b,c,d){
                    return c*((t=t/d-1)*t*t*t*t + 1) + b;
                },
                easeInOut(t,b,c,d){
                    if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
                    return c/2*((t-=2)*t*t*t*t + 2) + b;
                }
            },
            //正弦曲线的缓动
            Sine: {
                easeIn(t,b,c,d){
                    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
                },
                easeOut(t,b,c,d){
                    return c * Math.sin(t/d * (Math.PI/2)) + b;
                },
                easeInOut(t,b,c,d){
                    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
                }
            },
            //先快后慢
            // Tween.Tweens.Expo.easeOut(t,b,c,d)
            //指数曲线的缓动
            Exponential : {
                easeIn(t,b,c,d){
                    return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
                },
                easeOut (t,b,c,d){
                    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
                },
                easeInOut (t,b,c,d){
                    if (t==0) return b;
                    if (t==d) return b+c;
                    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
                    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
                }
            },
            //圆形曲线的缓动
            Circ: {
                easeIn (t,b,c,d){
                    return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
                },
                easeOut (t,b,c,d){
                    return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
                },
                easeInOut (t,b,c,d){
                    if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
                    return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
                }
            },
            //指数衰减的正弦曲线缓动
            Elastic: {
                easeIn (t,b,c,d,a,p){
                    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                    if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
                    else var s = p/(2*Math.PI) * Math.asin (c/a);
                    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                },
                easeOut (t,b,c,d,a,p){
                    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                    if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
                    else var s = p/(2*Math.PI) * Math.asin (c/a);
                    return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
                },
                easeInOut (t,b,c,d,a,p){
                    if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
                    if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
                    else var s = p/(2*Math.PI) * Math.asin (c/a);
                    if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                    return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
                }
            },
            //超过范围的三次方缓动
            Back: {
                easeIn (t,b,c,d,s){
                    if (s == undefined) s = 1.70158;
                    return c*(t/=d)*t*((s+1)*t - s) + b;
                },
                easeOut (t,b,c,d,s){
                    if (s == undefined) s = 1.70158;
                    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
                },
                easeInOut (t,b,c,d,s){
                    if (s == undefined) s = 1.70158;
                    if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
                }
            },
            //指数衰减的反弹缓动
            Bounce: {
                easeIn (t,b,c,d){
                    return c - this.Tweens.Bounce.easeOut(d-t, 0, c, d) + b;
                },
                easeOut (t,b,c,d){
                    if ((t/=d) < (1/2.75)) {
                        return c*(7.5625*t*t) + b;
                    } else if (t < (2/2.75)) {
                        return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
                    } else if (t < (2.5/2.75)) {
                        return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
                    } else {
                        return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
                    }
                },
                easeInOut (t,b,c,d){
                    if (t < d/2) return this.Tweens.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
                    else return this.Tweens.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
                }
            }
    }
    start () {

    }
    // update (dt) {}
}
