export class HttpClient {
	/**
	 * 作用：调用方式
	 * HttpClient.toData('http://xkxz.zhonghao.huo.inner.layabox.com/api/getData',{name:"myname",psword:"xxx"}, 'get', 'text',function(data){
			console.log(data);
		});
	 * @param url 请求url
	 * @param params 传递参数格式{name:'myname',psword:'xxx'}
	 * @param completeFunction 请求完成后调用
	 * @param method 请求方式-----可以post或get
	 * @param responseType 请求数据类型-----json,xml,txt
	 * @param header "application/json"
	 */
	public static toData(url: string, params: any, method: string, responseType: string, headers: any = null, B: boolean = true, dataFun: Function = null): void {
		HttpClient.on(url, params, dataFun, method, responseType, headers, B);
	}
	/**
	 * 作用：
	 * @param url 请求url
	 * @param params 传递参数格式{name:'myname',psword:'xxx'}
	 * @param completeFunction 请求完成后调用
	 * @param method 请求方式-----可以post或get
	 * @param responseType 请求数据类型-----json,xml,txt
	 *
	 */
	public static on(url: string, params: any = null, completeFunction: Function = null, method: string = "post", responseType: string = "json", headers: any = null, B: boolean): void {
		requestToUrl(url, params, completeFunction, method, responseType, headers, B);
		function requestToUrl(url: string, params: any, completeFunction: Function = null, method: string, responseType: string = "json", headers: any = null, B: boolean): void {
			HttpClient.get(url, params, Laya.stage, function (deta): void {
				completeFunction(deta);
			}, function (nn: number): void {
				if (nn == 2) {
					console.log("正在加载中。。。。");
				}
				else {
					console.log("网络出错请重试！");
					/////////////////////////////////////
					Laya.timer.once(500, this, function () {
						Laya.timer.clearAll(this);
						requestToUrl(url, params, completeFunction, method, responseType, headers, B);
					});
				}
				//===================要做一个弹出框============================
			}, method, responseType, headers, B);
		}
	}

	/**
	 *作用：url请求
	 * @param url 请求url
	 * @param params 传递参数
	 * @param completeFunction
	 * @param timeoutFunction
	 * @param method
	 */
	public static get(url: string, params: any, caller: any, completeFunction: Function = null, timeoutFunction: Function = null, method: string = "get", responseType: string = "json", headers: any = null, B: boolean): void {
		var postUrl: string = "";
		if (B) {
			var k: any;
			var kArr: Array<number> = [];
			var kNameArr: Array<number> = [];
			var kMixNum: number = 0;


			for (k in params) {
				kNameArr[kMixNum] = k;
				kArr[kMixNum] = params[k];
				kMixNum++;
			}

			var request: Laya.HttpRequest;



			var getRequest = function (): void {
				url += "?";
				for (var i: number = 0; i < kArr.length; i++) {
					if (i >= kArr.length - 1) {
						url += kNameArr[i] + "=" + kArr[i];
					}
					else {
						url += kNameArr[i] + "=" + kArr[i] + "&";
					}
				}
				postUrl = null;
			}

			var postRequest = function (): void {
				for (var ia: number = 0; ia < kArr.length; ia++) {
					if (ia >= kArr.length - 1) {
						postUrl += kNameArr[ia] + "=" + kArr[ia];
					}
					else {
						postUrl += kNameArr[ia] + "=" + kArr[ia] + "&";
					}
				}
			}

			if (method == "get" || method == "GET") {
				getRequest();
			}
			else if (method == "post" || method == "POST") {
				postRequest();
			}
		} else {
			postUrl = params;
		}
		//console.log(postUrl);
		/////////////////////----url请求---//////////////////////
		request = new Laya.HttpRequest();
		//request.http.timeout = 10000;//设置超时时间；
		request.on(Laya.Event.PROGRESS, caller, onHttpRequestProgress);
		request.once(Laya.Event.COMPLETE, caller, onHttpRequestComplete);
		request.once(Laya.Event.ERROR, caller, onHttpRequestError);

		request.send(url, postUrl, method, responseType, headers);
		function onHttpRequestError(e: any): void //错误
		{
			request.offAll(Laya.Event.PROGRESS);
			request.offAll(Laya.Event.COMPLETE);
			request.offAll(Laya.Event.ERROR);
			///////////////////////////
			timeoutFunction(1);
			request = null;
		}

		function onHttpRequestProgress(e: any): void //进度
		{
			timeoutFunction(2);
		}

		function onHttpRequestComplete(e: any): void {
			request.offAll(Laya.Event.PROGRESS);
			request.offAll(Laya.Event.COMPLETE);
			request.offAll(Laya.Event.ERROR);
			completeFunction(request.data);
			request = null;
		}
	}
}