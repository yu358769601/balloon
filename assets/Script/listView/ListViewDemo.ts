import ListView, {AbsAdapter} from "./ListView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ListViewDemo extends cc.Component {

    @property(ListView)
    private listView: ListView = null;


    protected start(): void {


        //做到这里了


        const dataSet = Array(100)
        for (let i = 0; i < 100; i++) {
            dataSet[i] = "==" + i;
        }
        const adapter = new MyDataListAdapter()
        adapter.setDataSet(dataSet);

        this.listView.setAdapter(adapter);
    }

    public pageUp() {

        if (!this.listView.pager.canPrePage()) {
            console.log("已到第一页")
            return;
        }

        this.listView.pager.prePage();
    }

    public pageDown() {

        if (!this.listView.pager.canNextPage()) {
            console.log("已到最后一页")
            return;
        }

        this.listView.pager.nextPage();
    }
}

class MyDataListAdapter extends AbsAdapter {

    updateView(item: cc.Node, posIndex: number, data?: any) {

        const itemComp = item.getComponent("ListItem");
        itemComp.setData(data);
    }
}