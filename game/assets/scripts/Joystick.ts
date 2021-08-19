import ccLog from "../Script/System/Log/ccLog";
import Emitter from "../Script/System/Msg/Emitter";

const { ccclass, property } = cc._decorator;

/**
 * 全局事件监听实例
 */
export const instance = new cc.EventTarget();

export enum JoystickTypes {
  上 ="上",
  下 ="下",
  左 ="左",
  右 ="右",
}


/**
 * 方向类型
 */
export enum DirectionType {
  FOUR,
  EIGHT,
  ALL,
}

/**
 * 速度类型
 */
export enum SpeedType {
  STOP,
  NORMAL,
  FAST,
}

/**
 * 摇杆类型
 */
export enum JoystickType {
  FIXED,
  FOLLOW,
}

/**
 * 摇杆类
 */
@ccclass
export default class Joystick extends cc.Component {

  firstX : number = 0
  firstY : number = 0


  @property({
    type: cc.Node,
    displayName: "Dot",
    tooltip: "摇杆操纵点",
  })
  dot = null;

  @property({
    type: cc.Node,
    displayName: "Ring",
    tooltip: "摇杆背景节点",
  })
  ring = null;

  @property({
    type: cc.Enum(JoystickType),
    displayName: "Touch Type",
    tooltip: "触摸类型",
  })
  joystickType = JoystickType.FIXED;

  @property({
    type: cc.Enum(DirectionType),
    displayName: "Direction Type",
    tooltip: "方向类型",
  })
  directionType = DirectionType.ALL;

  @property({
    type: cc.Node,
    tooltip: "摇杆所在位置",
  })
  _stickPos = null;

  @property({
    type: cc.Node,
    tooltip: "触摸位置",
  })
  _touchLocation = null;

  @property({
    tooltip: "半径",
  })
  _radius = 0;

  onLoad() {
    this._radius = this.ring.width / 2;
    this._initTouchEvent();
    // hide joystick when follow
    if (this.joystickType === JoystickType.FOLLOW) {
      this.node.opacity = 0;
    }
  }

  /**
   * 启用时
   */
  onEnable() {
    instance.on("set_joystick_type", this._onSetJoystickType, this);
  }

  /**
   * 禁用时
   */
  onDisable() {
    instance.off("set_joystick_type", this._onSetJoystickType, this);
  }

  /**
   * 改变摇杆类型
   * @param type
   */
  _onSetJoystickType(type: JoystickType) {
    this.joystickType = type;
    this.node.opacity = type === JoystickType.FIXED ? 255 : 0;
  }

  /**
   * 初始化触摸事件
   */
  _initTouchEvent() {
    // set the size of joystick node to control scale
    this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartEvent, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndEvent, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this);
  }




  /**
   * 触摸开始回调函数
   * @param event
   */
  _touchStartEvent(event: cc.Event.EventTouch) {
    instance.emit(cc.Node.EventType.TOUCH_START, event);

    let location = event.getLocation();// 获取节点坐标
    this.firstX = location.x;
    this.firstY = location.y;



    const touchPos = this.node.convertToNodeSpaceAR(event.getLocation());

    if (this.joystickType === JoystickType.FIXED) {
      this._stickPos = this.ring.getPosition();

      // 触摸点与圆圈中心的距离
      const distance = touchPos.sub(this.ring.getPosition()).mag();

      // 手指在圆圈内触摸,控杆跟随触摸点
      this._radius > distance && this.dot.setPosition(touchPos);
    } else if (this.joystickType === JoystickType.FOLLOW) {
      // 记录摇杆位置，给 touch move 使用
      this._stickPos = touchPos;
      this.node.opacity = 255;
      this._touchLocation = event.getLocation();

      // 更改摇杆的位置
      this.ring.setPosition(touchPos);
      this.dot.setPosition(touchPos);
    }
  }

  /**
   * 触摸移动回调函数
   * @param event
   */
  _touchMoveEvent(event: cc.Event.EventTouch) {
    // 如果 touch start 位置和 touch move 相同，禁止移动
    if (
      this.joystickType === JoystickType.FOLLOW &&
      this._touchLocation === event.getLocation()
    ) {
      return false;
    }
    // let location = event.getLocation();// 获取节点坐标
    // this.firstX = location.x;
    // this.firstY = location.y;
    let delta = event.getDelta();

    let touchPoint = event.getLocation();
    let endX = delta.x
    let endY = delta.y
    // var tempPlayer = node.parent.convertToNodeSpaceAR(touchPoint);
    // node.setPosition(tempPlayer);

    if (Math.abs(endX) > Math.abs(endY)){
      //手势向左右
      //判断向左还是向右
      if (endX  < 0){
        //向左函数
        // ccLog.log('滑动方向 左',endX);
        Emitter.fire("onJoystick",JoystickTypes.左,Math.abs(endX),delta)
      } else {
        //向右函数
        // ccLog.log('滑动方向 右',endX);
        Emitter.fire("onJoystick",JoystickTypes.右,Math.abs(endX),delta)
      }
      // if (endY  > 0){
      //   //向左函数
      //   ccLog.log('滑动方向 左下',endX);
      //   Emitter.fire("onJoystick",JoystickTypes.左)
      // } else {
      //   //向右函数
      //   ccLog.log('滑动方向 右上',endX);
      //   Emitter.fire("onJoystick",JoystickTypes.右)
      // }
    } else {
      //手势向上下
      //判断手势向上还是向下
      if (endY  < 0){
        //向下函数
        // ccLog.log('滑动方向 下',endY);
        Emitter.fire("onJoystick",JoystickTypes.下,Math.abs(endY),delta)
      } else {
        //向上函数
        // ccLog.log('滑动方向 上',endY);
        Emitter.fire("onJoystick",JoystickTypes.上,Math.abs(endY),delta)
      }
      // if (endX  > 0){
      //   //向左函数
      //   ccLog.log('滑动方向 左',endX);
      //   Emitter.fire("onJoystick",JoystickTypes.左)
      // } else {
      //   //向右函数
      //   ccLog.log('滑动方向 右',endX);
      //   Emitter.fire("onJoystick",JoystickTypes.右)
      // }
    }






    // 以圆圈为锚点获取触摸坐标
    const touchPos = this.ring.convertToNodeSpaceAR(event.getLocation());
    const distance = touchPos.mag();

    // 由于摇杆的 postion 是以父节点为锚点，所以定位要加上 touch start 时的位置
    const posX = this._stickPos.x + touchPos.x;
    const posY = this._stickPos.y + touchPos.y;

    // 归一化
    const p = cc.v2(posX, posY).sub(this.ring.getPosition()).normalize();

    let speedType;

    if (this._radius > distance) {
      this.dot.setPosition(cc.v2(posX, posY));

      speedType = SpeedType.NORMAL;
    } else {
      // 控杆永远保持在圈内，并在圈内跟随触摸更新角度
      const x = this._stickPos.x + p.x * this._radius;
      const y = this._stickPos.y + p.y * this._radius;
      this.dot.setPosition(cc.v2(x, y));

      speedType = SpeedType.FAST;
    }

    instance.emit(cc.Node.EventType.TOUCH_MOVE, event, {
      speedType: speedType,
      moveDistance: p,
    });
    // Emitter.fire("onJoystick",JoystickTypes.上,p,delta)
  }

  /**
   * 触摸结束回调函数
   * @param event
   */
  _touchEndEvent(event: cc.Event.EventTouch) {
    this.dot.setPosition(this.ring.getPosition());
    if (this.joystickType === JoystickType.FOLLOW) {
      this.node.opacity = 0;
    }

    instance.emit(cc.Node.EventType.TOUCH_END, event, {
      speedType: SpeedType.STOP,
    });
  }
}
