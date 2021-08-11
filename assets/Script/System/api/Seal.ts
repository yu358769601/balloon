export class Seal {
	public static KEY = "f0dS9min6fSk8bLksM";
	// public static KEY = "abc";
	public static _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	/**
	 * 转入64位
	 */
	public static base64encode(input) {
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

	/**
	 * 转出64位
	 */
	public static base64decode(input) {
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

	/**
	 * 转出utf8
	 */
	public static _utf8_encode(string) {
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

	/**
	 * 转出utf8
	 */
	public static _utf8_decode(utftext) {
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

	/**
	 * 加密
	 */
	public static rc4Encrypt(data, key = null): string {
		if (key) {
			return this.encodeHex(this.rc4(this.base64encode(data), key));
		} else {
			return this.encodeHex(this.rc4(this.base64encode(data), this.KEY));
		}
	}
	/**
	 * 解密
	 */
	public static rc4Decode(data, key = null): string {
		if (key) {
			var des = this.base64decode(this.rc4(this.decodeHex(data), key));
		} else {
			var des = this.base64decode(this.rc4(this.decodeHex(data), this.KEY));
		}
		return des;
	}

	public static encodeHex(str): string {
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

	public static decodeHex(str): string {
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

	public static rc4(data, key): string {
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
