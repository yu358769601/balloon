// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import Vec2 = cc.Vec2;

const { ccclass, property } = cc._decorator;

@ccclass
export default class Tools {

    //-------------------------------------------------------------节点空间转换
    //节点相对另一个节点空间下的坐标
    public static convetOtherNodeSpace(node: cc.Node, targetNode: cc.Node): cc.Vec2 {
        if (!node || !targetNode)
            return null;


        let worldPos = node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        return targetNode.convertToNodeSpaceAR(worldPos);
    }
    //都以面朝下为正方向 forward=cc.Vec2.UP.mul(-1)
    //默认 顺时针旋转
    //所有操作都在同一坐标系下，如果不在请调用API之前转换convetOtherNodeSpace
    //------------------------------------------------------角度公式

    private static FORWARD = cc.Vec2.UP.mul(-1);

    //获取物体朝向 局部
    //参考向量
    public static getFaceDir(node: cc.Node, referenceVec: cc.Vec2 = cc.Vec2.ZERO) {

        let vec = referenceVec;
        if (vec.x == 0 && vec.y == 0)
            vec = Tools.FORWARD;

        let radian = cc.misc.degreesToRadians(node.rotation == NaN ? 0 : node.rotation);
        let dir = vec.rotate(-radian);

        return dir.normalize();
    }
    //计算两点之间距离
    // Tools.p2pDistance(p1,p2)
    public static p2pDistance(p1: cc.Vec2,p2:cc.Vec2){
        let distance = p1.sub(p2).mag();
        return distance
    }



    //看向方向
    public static lookAtDir(node: cc.Node, dir: cc.Vec2, referenceVec: cc.Vec2 = cc.Vec2.ZERO) {

        let vec = referenceVec;
        if (vec.x == 0 && vec.y == 0)
            vec = Tools.FORWARD;

        let angle = dir.signAngle(vec);

        let degree = angle / Math.PI * 180;
        node.angle = -degree;
    }

    //看向目标
    public static lookAtTargetNode(node: cc.Node, targetNode: cc.Node, referenceVec: cc.Vec2 = cc.Vec2.ZERO) {

        Tools.lookAtTargetPos(node, targetNode.position, referenceVec);
    }
    //看向目标点
    public static lookAtTargetPos(node: cc.Node, targetPos: cc.Vec2, referenceVec: cc.Vec2 = cc.Vec2.ZERO) {

        let vec = referenceVec;
        if (vec.x == 0 && vec.y == 0)
            vec = Tools.FORWARD;
        let dx = node.x - targetPos.x ;
        let dy =  node.y - targetPos.y;

        let dir = cc.v2(dx, dy);
        Tools.lookAtDir(node, dir, vec);
    }

    //绕目标做弧线旋转并看向目标
    //speed -+可控制顺逆旋转
    public static RotateAroundLookAtTargetNode(node: cc.Node, targetNode: cc.Node, speed: number, referenceVec: cc.Vec2 = cc.Vec2.ZERO) {

        return Tools.RotateAroundLookAtTargetPos(node, targetNode.position, speed, referenceVec);
    }
    //绕目标点做弧线旋转并看向目标点
    //speed -+可控制顺逆旋转
    public static RotateAroundLookAtTargetPos(node: cc.Node, targetPos: cc.Vec2, speed: number, lookAtReferenceVec: cc.Vec2 = cc.Vec2.ZERO) {

        //看向点
        Tools.lookAtTargetPos(node, targetPos, lookAtReferenceVec);

        //获取右朝向 轨迹的切线方向
        let rightDir = Tools.getFaceDir(node, cc.Vec2.RIGHT);
        //移动
        let dis = rightDir.mul(speed);
        let pos = node.position.add(dis);
        node.setPosition(pos);
        return pos;
    }
    //绕目标做弧线旋转
    //speed -+可控制顺逆旋转
    public static RotateAroundTargetNode(node: cc.Node, targetNode: cc.Node, speed: number): cc.Vec2 {

        return Tools.RotateAroundTargetPos(node, targetNode.position, speed);
    }
    //绕目标点做弧线旋转
    //speed -+可控制顺逆旋转
    public static RotateAroundTargetPos(node: cc.Node, targetPos: cc.Vec2, speed: number): cc.Vec2 {

        //获取指向目标点的向量
        let targetDir = targetPos.sub(node.position).normalize();
        //获取右朝向 轨迹的切线方向
        let rightDir = Tools.rotateVector(targetDir, -90);
        //移动
        let dis = rightDir.mul(speed);
        let pos = node.position.add(dis);
        node.setPosition(pos);
        return pos;
    }

    //角度转向量 angle +-可控制镜像
    //相当于参考向量旋转angle得到
    public static angle2Vector(angle, referenceVec: cc.Vec2 = cc.Vec2.ZERO) {

        let vec = referenceVec;
        if (vec.x == 0 && vec.y == 0)
            vec = Tools.FORWARD;

        let radian = cc.misc.degreesToRadians(angle);
        let dir = vec.rotate(-radian);
        return dir.normalize();
    }

    //向量转角度https://blog.csdn.net/iFasWind/article/details/83655525
    public static vector2Angle(vec: cc.Vec2, referenceVec: cc.Vec2 = cc.Vec2.ZERO) {
        let radian = vec.signAngle(referenceVec);    // 求方向向量与对比向量间的弧度
        let degree = cc.misc.radiansToDegrees(radian);    // 将弧度转换为角度
        return degree;
    }

    //旋转向量 angle +-可控制正逆旋转
    public static rotateVector(vec: cc.Vec2, angle) {
        return Tools.angle2Vector(angle, vec);
    }

    //向量线性插值
    //v2-v1即为v1,v2组成的三角形的另外一条边。
    //因为|v1| = |v2|,所以v1 + t*(v2-v1)的长度肯定小于|v1|或|v2|，当0<t<1时。得到的插值向量v(t)的端点沿着v2-v1行进
    //cur沿着vecOther向target移动
    //长度会发生变化 要不变化使用球面插值
    public static LerpVec(cur: cc.Vec2, target: cc.Vec2, t: number) {

        //看target在cur的左边还是右边
        let z = cur.cross(target);// 0 1 -1
        // let vecOther = target//围成一个三角形
        // if (z >0)//在左边
        //     vecOther = target.sub(cur).normalize();//围成一个三角形
        // else if (z < 0)
        //     vecOther = cur.sub(target).normalize();//围成一个三角形
        let vecOther = target.sub(cur);//第三边
        return cur.add(vecOther.mul(t));
    }
    //向量线性插值 标准化
    public static LerpVecNormal(cur: cc.Vec2, target: cc.Vec2, t: number) {

        let vec = Tools.LerpVec(cur, target, t);
        return vec.normalize();
    }

    //向量球面插值 https://blog.csdn.net/weixin_34081595/article/details/92408923
    //将一般线性插值得到的结果乘以放大系数k(t),使其长度放大到|v1|或|v2|,即得保持向量长度不变的插值:
    //v(t) = k(t)*(v1 + t*(v2-v1))
    //k(t) = |v1|/|v(t)|=|v1|/|v1+t*(v2-v1)|
    //插值向量v(t)的端点就会沿着v1,v2端点构成的圆弧行进。
    //因为v1,v2是等长的，这个圆弧实际上是位于v1,v2构成的球面上的一段，所以又叫球面线性插值
    //cur沿着vecOther向target移动
    //长度会发生变化

    //这个插值解决了3D空间中旋转的插值，在关键帧动画中可以用来计算两个关键帧之间的动画。
    //但是，由于它的插值不是等角速度的，而是变速的,所以要匀速效果还要另外处理
    public static LerpSphereVec(cur: cc.Vec2, target: cc.Vec2, t: number) {

        let vecOther = target.sub(cur);//第三边
        let k = cur.mag() / cur.add(vecOther.mul(t)).mag();
        let vec = cur.add(vecOther.mul(t)).mul(k);

        return vec;
    }
}