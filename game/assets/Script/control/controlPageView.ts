import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ControlPageView extends cc.Component {

    @property(
        {
            // type: [cc.Node],
            displayName: "当前页面",
            tooltip: "当前页面"
        }
    )    // call cc.Enum
    curNum: number = 0

    @property(
        {
            // type: [cc.Node],
            displayName: "最大页面",
            tooltip: "最大页面"
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
        Emitter.remove('onJumpAddIndex', this.onJumpAddIndex,this)
    }
    registerEmitter(){
        Emitter.register('onAddPageView', this.onAddPageView,this)
        Emitter.register('onJumpIndex', this.onJumpIndex,this)
        Emitter.register('onRemoveAllPages', this.onRemoveAllPages,this)
        Emitter.register('onJumpAddIndex', this.onJumpAddIndex,this)
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
    onJumpAddIndex(selfName,index,time) {
        // 第二个参数为滚动所需时间，默认值为 0.3 秒

        ccLog.log("增减操作 0",index,time)
        if (index > 0) {
            this.plusPage(() => {
                ccLog.log("增减操作 增加",this.curNum)
                if (this.curNum>this.target.getPages().length) {
                    this.curNum = this.target.getPages().length-1
                }
                
                this.target.scrollToPage(this.curNum,time);
                ccLog.log("添加完了能有都少 2 :" + this.target.getPages().length,"当前选项是",this.curNum);
            });
        }else if (index <=0) {

            ccLog.log("有啥问题吗",this.curNum)

            this.lessPageNum(() => {
                ccLog.log("增减操作 减少",this.curNum)
                this.target.scrollToPage(this.curNum,time);
            });
        }




    }




// 添加页面
    plusPage(callback) {
        ccLog.log("添加完了能有都少 1 :" + this.target.getPages().length);
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
        this.curNum = 0;
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

           this.curTotal =   this.target.getPages().length

            ccLog.log("添加完了能有都少 0 :" + this.target.getPages().length);
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
        ccLog.log("当前所在的页面索引:" + sender.getCurrentPageIndex(),"总个数",sender.getPages());
        this.curNum = sender.getCurrentPageIndex()
        this.curTotal = sender.getPages()
    }


}
