class SpecialAdControl {
    public static readonly instance = new SpecialAdControl();
    /**广告rec4解密钥匙 */
    private ADKEY = 'f0dS9min6fSk8bLksM';
    private _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    private sookiead = null;
    public codeAD = 1;
     httpADType(request: string = 'post',paramData) {
       return  new Promise<any>((resolve, reject) => {
            let xmlhttp = cc.loader.getXMLHttpRequest();
            /*判断是否支持请求*/
            if (xmlhttp == null) {
                alert('你的浏览器不支持XMLHttp');
                return;
            }
            /*请求方式，并且转换为大写*/
            let httpType = request.toUpperCase();
            /*请求接口*/
           let httpUrl = 'https://minigame.ugmars.com/api/ctrl';
            /*是否异步请求*/
           let async = true;
            /*请求参数--post请求参数格式为：foo=bar&lorem=ipsum*/
            // var paramData = {
            //     appid: 'qcql',   // 小游戏ID
            //     cnid: "mz",        //渠道ID
            //     postid: "QoHtip4H",      //广告位ID
            //     sookie: {}      //第一次只传空对象就可了,服务端缓存在客户端的内容，下次请求带过来
            // };
            if (this.sookiead) {
                paramData.sookie = this.sookiead;
            }
           let requestData = JSON.stringify(paramData);
            // console.log('发送数据', requestData, httpUrl)
            /*请求接收*/
            xmlhttp.onreadystatechange = () => {
                if (xmlhttp.readyState == 4 && (xmlhttp.status >= 200 && xmlhttp.status < 400)) {
                    // console.log("成功回调函数requestType: ", JSON.parse(this.rc4Decode(xmlhttp.responseText)));
                    let data = JSON.parse(this.rc4Decode(xmlhttp.responseText))//加密
                    console.log('回来什么呢',data)
                    if (data.status.code == '0') {
                        data.data.code //广告策略类型
                        data.data.sookie  //服务端缓存在客户端的内容，不能直接对象赋值对象，要以键的形式赋值
                        this.sookiead = data.data.sookie
                        this.codeAD = data.data.code

                        resolve(data)
                        // console.log('走记者李了吗', resolve,data)
                    }else{
                        reject(null)
                    }
                } else {
                    // console.log("失败回调函数: ", xmlhttp);
                    // reject(xmlhttp)
                }
            }
            /*接口连接，先判断连接类型是post还是get*/
            if (httpType == 'GET') {
                xmlhttp.open("GET", httpUrl, async);
                xmlhttp.send(null);
            } else if (httpType == 'POST') {
                xmlhttp.open("POST", httpUrl, async);
                // 发送合适的请求头信息
                xmlhttp.setRequestHeader("Content-Type", "html/text");//加密
                xmlhttp.setRequestHeader("ec", "true");//加密
                xmlhttp.send(this.rc4Encrypt(requestData));//加密
            }
        }).catch((e) => {});
    }


    /**
      * 加密RC4reject
       */
    rc4Encrypt(data): string {
        return this.encodeHex(this.rc4(this.base64encode(data), this.ADKEY));
    }
    /**
     * 解密RC4
     */
    rc4Decode(data): string {
        return this.base64decode(this.rc4(this.decodeHex(data), this.ADKEY));
    }

    encodeHex(str): string {
        var HEX = "0123456789abcdef";
        let radix = 16;
        let len = str.length;
        let retStr = "";
        for (var i = 0; i < len; i++) {
            var num = str.charCodeAt(i);
            retStr += HEX.charAt((num >>> 4) & 0x0F);
            retStr += HEX.charAt(num & 0x0F);
        }
        return retStr;
    }

    decodeHex(str): string {
        var map = { "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "a": 10, "b": 11, "c": 12, "d": 13, "e": 14, "f": 15, };
        let len = str.length;
        let retStr = "";
        for (var i = 0; i < len / 2; i++) {
            var ha = str[2 * i];
            var h = map[ha];
            var l = map[str[2 * i + 1]];
            retStr += String.fromCharCode((h << 4) | l);
        }
        return retStr;
    }


    base64decode(input) {
        var output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = this._utf8_decode(output);
        return output;
    }


    base64encode(input) {
        var output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
        input = this._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    }


    _utf8_encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }


    _utf8_decode(utftext) {
        var string = "", i = 0, c = 0, c1 = 0, c2 = 0, c3 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }

    rc4(data, key): string {
        var iS = Array(256);
        var iK = Array(256);
        for (var i = 0; i < 256; i++) {
            iS[i] = i;
        }

        var j = 1;
        for (var i = 0; i < 256; i++) {
            iK[i] = key.charCodeAt((i % key.length));
        }
        var j = 0;
        for (var i = 0; i < 256; i++) {
            j = (j + iS[i] + iK[i]) % 256;
            var temp = iS[i];
            iS[i] = iS[j];
            iS[j] = temp;
        }
        var i = 0;
        var j = 0;
        var encodeStr = "";
        var das = Array(data.length);
        for (var x = 0; x < data.length; x++) {
            var i = (i + 1) % 256;
            var j = (j + iS[i]) % 256;
            var temp = iS[i];
            iS[i] = iS[j];
            iS[j] = temp;
            var t = (iS[i] + (iS[j] % 256)) % 256;
            var iY = iS[t]
            das[x] = String.fromCharCode(data.charCodeAt(x) ^ iY);
        }
        return das.join('');
    }
}
export default <SpecialAdControl>SpecialAdControl.instance;