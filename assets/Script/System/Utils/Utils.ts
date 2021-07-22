import ccLog from "../Log/ccLog";
import Tools from "./Tools";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Utils extends cc.Component {
    /**Utils.random(0,2)
     * 产生随机整数，包含下限值，但不包括上限值
     * @param {Number} lower 下限
     * @param {Number} upper 上限
     * @return {Number} 返回在下限到上限之间的一个随机整数
     */
    static random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    }



    //正1 或者 负1
    // Utils.randomZF()
    static randomZF() {
       let num = Utils.random(0,2)
        if (num == 0) {
            return -1
        }else{
            return 1
        }

    }
    static getTime(){
        let time = new Date().getTime()
        return time
    }

    static sjsz(num) {
        let ary = [];					//创建一个空数组用来保存随机数组
        for (let i = 0; i < num; i++) {			//按照正常排序填充数组
            ary[i] = i + 1;
        }
        ary.sort(function () {
            return 0.5 - Math.random();		//返回随机正负值
        });
        return ary;					//返回数组
    }
    //要一个随机数组 可以选择要多少个数字
    static sjszgetNumberByNum(num,count): [] {
        let ary = [];					//创建一个空数组用来保存随机数组
        for (let i = 0; i < num; i++) {			//按照正常排序填充数组
            ary[i] = i + 0;
        }
        ary.sort(function () {
            return 0.5 - Math.random();		//返回随机正负值
        });
        let temp = []
        ccLog.log("随机数组吗",ary)
        for (let i = 0; i < ary.length; i++) {
            if (i<count) {
                temp.push(ary[i])
            }
        }

        return temp;					//返回数组
    }

    // Utils.valueparseInt(value)
    static valueparseInt(value) {
        if (value >= 1000000000000000) {
            //1000000000000 万亿
            value = ((value / 10000000000000) / 100).toFixed(2) + "MT"
        } else if (value >= 1000000000000) {
            //1000000000000 万亿
            value = ((value / 10000000000) / 100).toFixed(2) + "T"
        } else if (value >= 1000000000) {
            //1000000000  十亿
            value = ((value / 10000000) / 100).toFixed(2) + "B"
        } else if (value >= 1000000) {
            //1000000 百万
            value = ((value / 10000) / 100).toFixed(2) + "M"
        } else if (value >= 1000) {
            //1000 千
            value = ((value / 10) / 100).toFixed(2) + "K"
        }
        return value;
    }

    // Utils.time2Str(time)
    static time2Str(time) {
        let minute = parseInt(time / 60);
        let second = parseInt(time % 60);
        let hour = parseInt(minute / 60);
        let hour1 = hour > 60 ? hour % 24 : hour;
        let day = parseInt(hour / 24);
        minute = minute % 60;
        let timeStr = "";
        // timeStr = hour <= 0 ? timeStr = "倒计时：" +
        //     // "00" + "天" +
        //     "00" + "时" +
        //     parseInt(minute / 10) + "" + minute % 10 + "分" +
        //     parseInt(second / 10) + "" + second % 10 + "秒" :
        //     timeStr = "倒计时：" +
        //     // parseInt(day / 10) + "" + day % 10 + "天" +
        //     parseInt(hour1 / 10) + "" + hour1 % 10 + "时" +
        //     parseInt(minute / 10) + "" + minute % 10 + "分" +
        //     parseInt(second / 10) + "" + second % 10 + "秒";
        timeStr = minute <= 0 ? timeStr = "" +
            // "00" + "天" +
            "00" + ":" +
            parseInt(second / 10) + "" + second % 10 + "" :
            timeStr = "" +
                // parseInt(day / 10) + "" + day % 10 + "天" +
                // parseInt(hour1 / 10) + "" + hour1 % 10 + "时" +
                parseInt(minute / 10) + "" + minute % 10 + ":" +
                parseInt(second / 10) + "" + second % 10 + "";
        return timeStr;
    }
    //一个单位看另一个单位
    /**
     *
     * @param target 目标单位
     * @param mynode 我的单位
     */
    // Utils.lookAtObj(target,mynode)
    static lookAtObj(target,mynode){
        //计算出朝向
        let dx = target.x - mynode.x;
        let dy = target.y - mynode.y;
        let dir = cc.v2(dx,dy);

        //根据朝向计算出夹角弧度
        let angle = dir.signAngle(cc.v2(1,0));

        //将弧度转换为欧拉角
        let degree = angle / Math.PI * 180;

        //赋值给节点
        mynode.angle = degree;
    }




   static get2Double(double){
       return parseFloat(double.toFixed(2))
    }
    static get2DoubleString(double){
        return double.toFixed(2)
    }

    public static setTimerOnce(component,d,callBack ?){


        return new Promise <any>((resolve, reject) => {
            if (component) {
                component.scheduleOnce(()=>{
                    if (callBack) {
                        callBack()
                    }
                    resolve()
                },d)
            }

        })
    }

    //递归获取一个节点下面的所有子孩子
    static getNodesBynode(list:[any] , node : cc.Node){
        for (let i = 0; i <node.children.length ; i++) {
            let childrenNode = node.children[i]
            list.push(childrenNode)
            this.getNodesBynode(list,childrenNode)
        }
    }
    //判断数组里面有没有包含 这个node 的uuid 返回结果
    static isNodeByUUID(list:[any],node: cc.Node){
        let uuidReturn = false
        for (let i = 0; i <list.length ; i++) {
            if (list[i].uuid == node.uuid) {
                uuidReturn = true
            }
        }

        return uuidReturn
    }
    //批量关闭显示其中一个
    // Utils.setActiveShowByIndex(list,index ?)
    static setActiveShowByIndex(list,index ?){
        for (let i in list){
            list[i].active = false
        }

        if (index != null) {
            list[index].active = true
        }

    }

    //获取字符串 开头index 到 你想截取的字符的位置的 所有字符
    static getStr(initStr,index,str):string{
        let a = initStr.indexOf(str);
        let c = initStr.substring(index,a);
        if (c.length == 0) {
            return initStr
        }
        return c
    }


    //获得高度 设置按钮高度  激励视频和取消的距离
    static getADBtnHeight(code,adNode,node,heightsPercent):number{
        //入侵百分比
       let heightPercent =  heightsPercent[code]
//         code1	10秒内展示2次，默认点击区域
//         code2	5秒内展示2次，原生广告按钮占关闭按钮15%点击区域，查看提示占关闭按钮5%；
        // code3	5秒内展示2次，原生广告按钮占关闭按钮30%点击区域，查看提示占关闭按钮10%；
        // code4	无限制展示次数，原生广告按钮占关闭按钮50%点击区域，查看提示占关闭按钮15%；
        //

       let height =  adNode.height+ node.height*heightPercent/100 + ( adNode.height - node.height)
        ccLog.log("进来的参数是",code,"设置高度是",height)
        return height
    }

    //获得高度 设置广告高度  激励视频和取消的距离
    static getADNativeHeight(code,node,parent,heightsPercent):number{
        //入侵百分比
        let heightPercent =  heightsPercent[code]
//         code1	10秒内展示2次，默认点击区域
//         code2	5秒内展示2次，原生广告按钮占关闭按钮15%点击区域，查看提示占关闭按钮5%；
        // code3	5秒内展示2次，原生广告按钮占关闭按钮30%点击区域，查看提示占关闭按钮10%；
        // code4	无限制展示次数，原生广告按钮占关闭按钮50%点击区域，查看提示占关闭按钮15%；
        //

       let newP = Tools.convetOtherNodeSpace(node,parent)


        ccLog.log("进来的参数是 激励视频和取消的距离 0",code,"设置高度是",newP.y)
        // - node.height + (node.height*heightPercent/100)
        // let height = newP.y +cc.winSize.height /2- node.height + (node.height*heightPercent/100)
        // let height = newP.y +cc.winSize.height /2- node.height + (node.height*heightPercent/100)
        let height = cc.winSize.height
        ccLog.log("进来的参数是 激励视频和取消的距离 2",code,"设置高度是",height)

        return height
    }
    //设置16进制颜色
    // Utils.set16Color(node,color16)
    static set16Color(node,color16){
        let newColor = new  cc.Color()
        cc.Color.fromHEX(newColor,color16)
        node.color = newColor
    }

    //字符串转数组
    // Utils.strToArr(str)
    static strToArr(str : string){
      let arr = []
        if (str) {
          let ss =  str.split(",")
            arr = ss
        }
        return arr
    }
    //数组转字符串
    // Utils.arrToStr(arr)
    static arrToStr(arr){
        let str = ""

        for (let i = 0; i <arr.length ; i++) {
           let a = arr[i]
            if (i < arr.length-1) {
                str =  str + a + ","
            }else{
                str =  str + a
            }

        }
        return str
    }

    /**
     *
     @param textToWrite数据
     @param fileNameToSaveAs 文件名
   */
    // Utils.saveForBrowser(textToWrite,fileNameToSaveAs)
    static saveForBrowser(textToWrite,fileNameToSaveAs){
        if(cc.sys.isBrowser){
            console.log('浏览器');
            let textFileAsBlob= new Blob([textToWrite], { type: 'application/json' });
            let downloadLink = document.createElement('a');
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = 'DownloadFile';
            if (window.webkitURL != null){
                //Chromeallowsthelinktobeclicked
                //withoutactuallyaddingittotheDOM.
                downloadLink.href=window.webkitURL.createObjectURL(textFileAsBlob);
            }
            else{
                //FirefoxrequiresthelinktobeaddedtotheDOM
                //beforeitcanbeclicked.
                downloadLink.href=window.URL.createObjectURL(textFileAsBlob);
                downloadLink.onclick=this.destroyClickedElement;
                downloadLink.style.display='none';
                document.body.appendChild(downloadLink);
            }
            downloadLink.click();
        }
    }
    static destroyClickedElement(event) {
         document.body.removeChild(event.target);
     }
    /**
     * 以某点为圆心，生成圆周上等分点的坐标
     *
     * @param {number} r 半径
     * @param {cc.Vec2} pos 圆心坐标
     * @param {number} count 等分点数量
     * @param {number} [randomScope=80] 等分点的随机波动范围
     * @returns {cc.Vec2[]} 返回等分点坐标
     */
    // Utils.getCirclePoints(300,new cc.Vec2(0,0),count,60)
    static getCirclePoints(r: number, pos: cc.Vec2, count: number, randomScope: number = 60): cc.Vec2[] {
        let points = [];
        let radians = (Math.PI / 180) * Math.round(360 / count);
        for (let i = 0; i < count; i++) {
            let x = pos.x + r * Math.sin(radians * i);
            let y = pos.y + r * Math.cos(radians * i);
            points.unshift(cc.v3(x + Math.random() * randomScope, y + Math.random() * randomScope, 0));
        }
        return points;
    }
    // Utils.getCirclePointsNoRandom(300,new cc.Vec2(0,0),count,60)
    static getCirclePointsNoRandom(r: number, pos: cc.Vec2, count: number, randomScope: number = 60): cc.Vec2[] {
        let points = [];
        let radians = (Math.PI / 180) * Math.round(360 / count);
        for (let i = 0; i < count; i++) {
            let x = pos.x + r * Math.sin(radians * i);
            let y = pos.y + r * Math.cos(radians * i);
            points.unshift(cc.v3(x +  randomScope, y +  randomScope, 0));
        }
        return points;
    }
}