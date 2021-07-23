import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ControlPageView extends cc.Component {

    @property(
        {
            // type: [cc.Node],
            displayName: "显示几个",
            tooltip: "显示几个"
        }
    )    // call cc.Enum
    curNum: number = 3

    @property(
        {
            // type: [cc.Node],
            displayName: "显示个数",
            tooltip: "显示个数"
        }
    )    // call cc.Enum
    curTotal: number = 10

    @property(
        {
            type: cc.Prefab,
            displayName: "要显示得预制体",
            tooltip: "要显示得预制体"
        }
    )    // call cc.Enum
    pageTeample: cc.Prefab = null


    @property(
        {
            type: cc.PageView,
            displayName: "操作的节点",
            tooltip: "操作的节点"
        }
    )    // call cc.Enum
    target: cc.PageView = null

    @property(
        {
            type: cc.Label,
            displayName: "更换文字",
            tooltip: "更换文字"
        }
    )    // call cc.Enum
    label: cc.Label = null


    _createPage() {

        let page = cc.instantiate(this.pageTeample);
        page.setPosition(cc.v2(0, 0));
        let color = new cc.Color();
        color.r = Math.floor(Math.random() * 255);
        color.g = Math.floor(Math.random() * 255);
        color.b = Math.floor(Math.random() * 255);
        page.color = color;
        return  page;
    }


    onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        Emitter.remove('onAddPageView', this.onAddPageView,this)
        Emitter.remove('onJumpIndex', this.onJumpIndex,this)
        Emitter.remove('onRemoveAllPages', this.onRemoveAllPages,this)
    }
    registerEmitter(){
        Emitter.register('onAddPageView', this.onAddPageView,this)
        Emitter.register('onJumpIndex', this.onJumpIndex,this)
        Emitter.register('onRemoveAllPages', this.onRemoveAllPages,this)
    }
    onLoad() {
        this.removeEmitter()
        this.registerEmitter()

        if ( this.label) {
            this.label.string = ""
        }

        // 设置的当前页面为 1
        this.target.setCurrentPageIndex(0);
    }

    update() {
        // 当前页面索引
        // this.label.string = "第" + (this.target.getCurrentPageIndex() + 1) + "页";
    }

// 返回首页
    onJumpHome() {
        // 第二个参数为滚动所需时间，默认值为 0.3 秒
        this.target.scrollToPage(0,0);
    }
    onJumpIndex(selfName,index) {
        // 第二个参数为滚动所需时间，默认值为 0.3 秒
        this.target.scrollToPage(index,0);
    }
// 添加页面
    plusPage(callback) {
        if (this.curNum > this.curTotal) {
            return;
        }
        this.curNum++;
        if (callback) {
            callback();
        }
    }

// 减少页面
    lessPageNum(callback) {
        if (this.curNum <= 0) {
            return;
        }
        this.curNum--;
        if (callback) {
            callback();
        }
    }
    onRemoveAllPages(selfName) {
        this.target.removeAllPages();
    }
// 添加页面
    onAddPage() {
        this.plusPage(() => {
            this.target.addPage(this._createPage());
        });
    }
    onAddPageView(selfName,node) {
        this.plusPage(() => {
            this.target.addPage(node);
        });
    }
// 插入当前页面
    onInsertPage() {
        this.plusPage(() => {
            this.target.insertPage(this._createPage(), this.target.getCurrentPageIndex());
        });
    }

// 移除最后一个页面
    onRemovePage() {
        this.lessPageNum(() => {
            let pages = this.target.getPages();
            this.target.removePage(pages[pages.length - 1]);
        });
    }

// 移除当前页面
    onRemovePageAtIndex() {
        this.lessPageNum(() => {
            this.target.removePageAtIndex(this.target.getCurrentPageIndex());
        });
    }

// 移除所有页面
    onRemoveAllPage() {
        this.target.removeAllPages();
        this.curNum = 0;
    }

// 监听事件
    onPageEvent(sender, eventType) {
        // 翻页事件
        if (eventType !== cc.PageView.EventType.PAGE_TURNING) {
            return;
        }
        ccLog.log("当前所在的页面索引:" + sender.getCurrentPageIndex());
    }


}
