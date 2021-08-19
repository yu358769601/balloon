import ccLog from "../Log/ccLog";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UtilsTime extends cc.Component {
    //设置一个明天凌晨的时间戳
    // UtilsTime.setTimeTomorrow()
    static setTimeTomorrow() {
        // 获取当天 0 点的时间戳
        let timeStamp = new Date(new Date().setHours(0, 0, 0, 0)).valueOf()
        let s = timeStamp + 86400000 * 1
        return s
    }
    //api获取 获取当前时间(ms)
    static getTime(addTime ?) {
        let time
        if (addTime == true) {
            time = new Date(addTime).getTime()
        }else{
            time = new Date().getTime()
        }

        return time
    }

    // dateFormat("YYYY-mm-dd HH:MM", date)
    // UtilsTime.dateFormat("MM:SS", date)
    static dateFormat(fmt, date) {
        let ret;
        const opt = {
            "Y+": date.getFullYear().toString(),        // 年
            "m+": (date.getMonth() + 1).toString(),     // 月
            "d+": date.getDate().toString(),            // 日
            "H+": date.getHours().toString(),           // 时
            "M+": date.getMinutes().toString(),         // 分
            "S+": date.getSeconds().toString()          // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            };
        };
        return fmt;
    }


}