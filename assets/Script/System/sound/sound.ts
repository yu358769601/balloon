// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import Emitter from "../Msg/Emitter";
import UtilsDB from "../Utils/UtilsDB";
import LoadManage from "../Load/LoadManage";
import ccLog from "../Log/ccLog";

const {ccclass, property} = cc._decorator;
// SoundType.第1_5_20_41_42关BGM
export enum SoundType {
    错误X = "错误X",
    第1_5_20_41_42关BGM = "第1_5_20_41_42关BGM",
    第1_20关没给到金币就拿装备的声音 = "第1_20关没给到金币就拿装备的声音",
    第1关金币获取声 = "第1关金币获取声",
    第2_26_27关BGM = "第2_26_27关BGM",
    第2关救命 = "第2关救命",
    第7_40关BGM = "第7_40关BGM",
    第7关累了 = "第7关累了",
    第14_24_33_34关 = "第14_24_33_34关",
    第14关走步声 = "第14关走步声",
    第20关给到胸针 = "第20关给到胸针",
    第27关马叫 = "第27关马叫",
    第27关马跑 = "第27关马跑",
    第27关小怪攻击 = "第27关小怪攻击",
    第30关BGM = "第30关BGM",
    第32关倒水声 = "第32关倒水声",
    第32关盖盖子 = "第32关盖盖子",
    第32关开书 = "第32关开书",
    第42关放进箱子的声音 = "第42关放进箱子的声音",
    点击按钮 = "点击按钮",
    二级界面内的按钮 = "二级界面内的按钮",
    关闭界面声 = "关闭界面声",
    过关掌声 = "过关掌声",
    剑攻击 = "剑攻击",
    结算界面 = "结算界面",
    魔法师闪电 = "魔法师闪电",
    射中的声音 = "射中的声音",
    跳关 = "跳关",
    射击 = "射击",

    小怪攻击 = "小怪攻击",
}

@ccclass
export default class Sound extends cc.Component {

    // @property(cc.Label)
    as: cc.AudioSource = null;


    @property([cc.AudioClip])
    acs: cc.AudioClip [] = [];

    // @property
    // text: string = 'hello';
    soundTag : boolean = true
    musicTag : boolean = true
    //是否暂停过
    pauseMusic : boolean = false
    
    
    // LIFE-CYCLE CALLBACKS:
    removeEmitter() {
        Emitter.remove('onPlay', this.onPlay, this)
        Emitter.remove('onStop', this.onStop, this)
        Emitter.remove('onPause', this.onPause, this)
        Emitter.remove('onResume', this.onResume, this)
        Emitter.remove('onRewind', this.onRewind, this)
        Emitter.remove('onPlaySwitch', this.onPlaySwitch, this)
        Emitter.remove('onMusicSwitch', this.onMusicSwitch, this)

        Emitter.remove('onInitMusicSwitch', this.onInitMusicSwitch, this)
        Emitter.remove('onPlaySound', this.onPlaySound, this)

    }
    registerEmitter() {
        Emitter.register('onPlay', this.onPlay, this)
        Emitter.register('onStop', this.onStop, this)
        Emitter.register('onPause', this.onPause, this)
        Emitter.register('onResume', this.onResume, this)
        Emitter.register('onRewind', this.onRewind, this)
        Emitter.register('onPlaySwitch', this.onPlaySwitch, this)
        Emitter.register('onMusicSwitch', this.onMusicSwitch, this)
        Emitter.register('onInitMusicSwitch', this.onInitMusicSwitch, this)
        Emitter.register('onPlaySound', this.onPlaySound, this)

    }
    music : string = ""


    protected onDestroy(): void {
        // cc.log(" 现在删不掉吗 ","PK");
        this.removeEmitter()
    }
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()

        this.as = this.getComponent(cc.AudioSource)

        // this.initMusicSwitch()
        // this.soundTag = UtilsDB.getSettingSound()
    }
    onPlay(){
        this.as.play()
    }
    onPlaySwitch(){
        if (UtilsDB.getSettingSound()) {
            // this.soundTag = false
            UtilsDB.setSettingSound(false)
        }else{
            // this.soundTag = true
            UtilsDB.setSettingSound(true)
        }
    }

    setMusic(music){
        if (music != null) {
            this.music = music
        }else{
            this.music = SoundType.第1_5_20_41_42关BGM
        }
    }

    async onInitMusicSwitch(selfName,music ?){
        if (UtilsDB.getSettingMusic()) {
            // this.as.stop()
            this.setMusic(music)

            // if (cc.audioEngine.isMusicPlaying() == false) {
            //
            // }
            ccLog.log("之前没播放过现在播放",this.pauseMusic)
            if (this.pauseMusic == true) {
                this.pauseMusic = false
                cc.audioEngine.resumeMusic()

                cc.audioEngine.setMusicVolume(1)

            }else{
                cc.audioEngine.resumeMusic()
                cc.audioEngine.setMusicVolume(1)
                let audioClip =  await LoadManage.getAudioClipForName("sound"+"_"+this.music)
                cc.audioEngine.playMusic(audioClip,true)
                this.pauseMusic = false
                ccLog.log("之前没播放过现在播放")
            }



            // this.as.loop = true
            // this.as.play()
            // this.musicTag = false
            // }
        }
        else{
            if (cc.audioEngine.isMusicPlaying() == true) {
                this.pauseMusic = true
            }
            ccLog.log("现在暂停")
            cc.audioEngine.setMusicVolume(0)
            cc.audioEngine.pauseMusic()

            // this.as.stop()
        }
    }


    async onMusicSwitch(selfName,music ?){
        ccLog.log("开始响",music,UtilsDB.getSettingMusic())
        if (UtilsDB.getSettingMusic()) {
            // if (this.as.isPlaying) {
            // this.as.stop()
            // this.as.loop = true
            // this.as.play()
            this.setMusic(music)

            cc.audioEngine.setMusicVolume(0)
            cc.audioEngine.stopMusic()
            let audioClip =  await LoadManage.getAudioClipForName("sound"+"_"+this.music)

            cc.audioEngine.setMusicVolume(1)
            cc.audioEngine.playMusic(audioClip,true)

            // this.musicTag = true
            UtilsDB.setSettingMusic(true)
            // }
        }
        else{
            // this.as.stop()
            cc.audioEngine.setMusicVolume(0)
            cc.audioEngine.pauseMusic()
            // this.musicTag = false
            UtilsDB.setSettingMusic(false)
        }
    }
    onStop(){
        this.as.stop()
    }
    onPause(){
        this.as.pause()
    }
    onResume(){
        this.as.resume()
    }
    onRewind(){
        this.as.rewind()
    }
    start () {
    }
    async soundAudioClip(name,volume ?){
        ccLog.log("要播放这个音效了 ",name)
        if (UtilsDB.getSettingSound()){
            let audioClip =  await LoadManage.getAudioClipForName("sound"+"_"+name)
            // goumaijineng
            ccLog.log("好用了吗",audioClip)
            if (volume) {
                // cc.audioEngine.stopEffect(id);
                cc.audioEngine.setEffectsVolume(volume)
                let audioID = cc.audioEngine.playEffect(audioClip, false);
                // ccLog.log("判断","名字",name,"对应id",audioID)
                cc.audioEngine.setFinishCallback(audioID, function () {
                    // console.log("判断","名字播完",name,"对应id",audioID)
                    cc.audioEngine.stopEffect(audioID);
                });
            }else{
                let audioID =  cc.audioEngine.playEffect(audioClip, false);
                // ccLog.log("判断","名字",name,"对应id",audioID)
                cc.audioEngine.setFinishCallback(audioID, function () {
                    // console.log("判断","名字播完",name,"对应id",audioID)
                    cc.audioEngine.stopEffect(audioID);
                });
            }

        }
    }


    // Emitter.fire("onPlaySound",SoundType.初始擦除音效)
    async onPlaySound(selfName,sound){
        // ccLog.log("点了购买小怪")
        this.soundAudioClip(sound)
    }

    // update (dt) {}
}