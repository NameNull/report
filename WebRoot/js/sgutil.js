function getHeight() {
	return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body.clientHeight;
};

function getWidth() {
	return window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body.clientWidth;
};

function getTop() {
	return window.pageYOffset || document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;
};

function getLeft() {
	window.pageXOffset || document.documentElement && document.documentElement.scrollLeft || document.body.scrollLeft;
};

function getRight() {
	return windowPosition.left() + windowPosition.width();
};

function getBottom() {
	return windowPosition.top() + windowPosition.height();
};
/**
 * 获取窗体可见度高度
 * 
 * @returns
 */
function getClientHeight() {
	var clientHeight = 0;
	if (document.body.clientHeight && document.documentElement.clientHeight) {
		clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight
				: document.documentElement.clientHeight;
	} else {
		clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight
				: document.documentElement.clientHeight;
	}
	return clientHeight;
}
/**
 * 获取窗体可见度宽度
 * 
 * @returns
 */
function getClientWidth() {
	var clientWidth = 0;
	if (document.body.clientWidth && document.documentElement.clientWidth) {
		clientWidth = (document.body.clientWidth < document.documentElement.clientWidth) ? document.body.clientWidth
				: document.documentElement.clientWidth;
	} else {
		clientWidth = (document.body.clientWidth > document.documentElement.clientWidth) ? document.body.clientWidth
				: document.documentElement.clientWidth;
	}
	return clientWidth;
}

function getScrollHeight() {
	return Math.max(getClientHeight(), document.body.scrollHeight,
			document.documentElement.scrollHeight);
}

function getScrollTop() {
	var scrollTop = 0;
	if (document.documentElement && document.documentElement.scrollTop) {
		scrollTop = document.documentElement.scrollTop;
	} else if (document.body) {
		scrollTop = document.body.scrollTop;
	}
	return scrollTop;
}

/* 文件大小转换为MB GB KB格式 */
function tm_countFileSize(size) {
	var fsize = parseFloat(size, 2);
	var fileSizeString;
	if (fsize < 1024) {
		fileSizeString = fsize.toFixed(2) + "B";
	} else if (fsize < 1048576) {
		fileSizeString = (fsize / 1024).toFixed(2) + "KB";
	} else if (fsize < 1073741824) {
		fileSizeString = (fsize / 1024 / 1024).toFixed(2) + "MB";
	} else if (fsize < 1024 * 1024 * 1024) {
		fileSizeString = (fsize / 1024 / 1024 / 1024).toFixed(2) + "GB";
	} else {
		fileSizeString = "0B";
	}
	return fileSizeString;
};

/* 获取文件后缀 */
function tm_getExt(fileName) {
	if (fileName.lastIndexOf(".") == -1)
		return fileName;
	var pos = fileName.lastIndexOf(".") + 1;
	return fileName.substring(pos, fileName.length).toLowerCase();
}

/* 获取文件名称 */
function tm_getFileName(fileName) {
	var pos = fileName.lastIndexOf("/") + 1;
	if (pos == -1) {
		return fileName;
	} else {
		return fileName.substring(pos, fileName.length);
	}
}

/* 随机产生ID */
var random = 0;
/* 随机生成随机数 */
function tm_Random() {
	random++;
	return new Date().getTime() + "" + random;
};

function filterTag(str) {
    str = str.replace(/&/ig, "&amp;");
    str = str.replace(/</ig, "&lt;");
    str = str.replace(/>/ig, "&gt;");
    str = str.replace(" ", "&nbsp;");
    return str;
}

function filterScript(str) {
	return str.replace(/(<script)/ig, "&lt;script").replace(/(<script>)/ig, "&lt;script&gt;").replace(/(<\/script>)/ig, "&lt;/script&gt;");
}
/**
 * 判断非空
 * 
 * @param val
 * @returns {Boolean}
 */
function isEmpty(val) {
	val = $.trim(val);
	if (val == null)
		return true;
	if (val == undefined || val == 'undefined')
		return true;
	if (val == "")
		return true;
	if (val.length == 0)
		return true;
	if (!/[^(^\s*)|(\s*$)]/.test(val))
		return true;
	return false;
}

function isNotEmpty(val) {
	return !isEmpty(val);
}

/* 获取鼠标的坐标 */
function tm_posXY(event) {
	event = event || window.event;
	var posX = event.pageX
			|| (event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
	var posY = event.pageY
			|| (event.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
	return {
		x : posX,
		y : posY
	};
}
/** ******************************数组相关开始*********************************** */

/** ******************************数组相关结束*********************************** */
/**
 * 禁止窗体选中
 */
function tm_forbiddenSelect() {
	$(document).bind("selectstart", function() {
		return false;
	});
	document.onselectstart = new Function("event.returnValue=false;");
	$("*").css({
		"-moz-user-select" : "none"
	});
}
/* 窗体允许选中 */
function tm_autoSelect() {
	$(document).bind("selectstart", function() {
		return true;
	});
	document.onselectstart = new Function("event.returnValue=true;");
	$("*").css({
		"-moz-user-select" : ""
	});
}

/* 获取剪切板中的内容 */
function tm_GetClipboard() {
	if (window.clipboardData) {
		return (window.clipboardData.getData('text'));
	} else {
		if (window.netscape) {
			try {
				netscape.security.PrivilegeManager
						.enablePrivilege("UniversalXPConnect");
				var clip = Components.classes["@mozilla.org/widget/clipboard;1"]
						.createInstance(Components.interfaces.nsIClipboard);
				if (!clip) {
					return;
				}
				var trans = Components.classes["@mozilla.org/widget/transferable;1"]
						.createInstance(Components.interfaces.nsITransferable);
				if (!trans) {
					return;
				}
				trans.addDataFlavor("text/unicode");
				clip.getData(trans, clip.kGlobalClipboard);
				var str = new Object();
				var len = new Object();
				trans.getTransferData("text/unicode", str, len);
			} catch (e) {
				alert("您的firefox安全限制限制您进行剪贴板操作，请打开'about:config'将signed.applets.codebase_principal_support'设置为true'之后重试，相对路径为firefox根目录/greprefs/all.js");
				return null;
			}
			if (str) {
				if (Components.interfaces.nsISupportsWString) {
					str = str.value
							.QueryInterface(Components.interfaces.nsISupportsWString);
				} else {
					if (Components.interfaces.nsISupportsString) {
						str = str.value
								.QueryInterface(Components.interfaces.nsISupportsString);
					} else {
						str = null;
					}
				}
			}
			if (str) {
				return (str.data.substring(0, len.value / 2));
			}
		}
	}
	return null;
};
/**
 * 往剪切板里赋值
 * 
 * @param txt
 * @returns {Boolean}
 */
function tmSetClipboard(txt) {
	if (window.clipboardData) {
		window.clipboardData.clearData();
		window.clipboardData.setData("Text", txt);
	} else if (navigator.userAgent.indexOf("Opera") != -1) {
		window.location = txt;
	} else if (window.netscape) {
		try {
			netscape.security.PrivilegeManager
					.enablePrivilege("UniversalXPConnect");
		} catch (e) {
			alert("您的firefox安全限制限制您进行剪贴板操作，请打开'about:config'将signed.applets.codebase_principal_support'设置为true'之后重试，相对路径为firefox根目录/greprefs/all.js");
			return false;
		}
		var clip = Components.classes['@mozilla.org/widget/clipboard;1']
				.createInstance(Components.interfaces.nsIClipboard);
		if (!clip)
			return;
		var trans = Components.classes['@mozilla.org/widget/transferable;1']
				.createInstance(Components.interfaces.nsITransferable);
		if (!trans)
			return;
		trans.addDataFlavor('text/unicode');
		var str = Components.classes["@mozilla.org/supports-string;1"]
				.createInstance(Components.interfaces.nsISupportsString);
		var copytext = txt;
		str.data = copytext;
		trans.setTransferData("text/unicode", str, copytext.length * 2);
		var clipid = Components.interfaces.nsIClipboard;
		if (!clip)
			return false;
		clip.setData(trans, null, clipid.kGlobalClipboard);
	}
};

function tm_position_toolbar($this) {
	var offset = $this.offset();
	var left = offset.left;
	var top = offset.top - $("#tm-user-boxtip").height() - 38;
	$(".tmui-top-tip").hide();
	$(".tmui-bottom-tip").show();
	if (top <= 200) {
		$(".tmui-top-tip").show();
		$(".tmui-bottom-tip").hide();
		top = offset.top + $this.height() + 18;
	}
	$("#tm-user-boxtip").show().css({
		left : left,
		top : top
	});
	$("#tm-user-boxtip").mouseleave(function() {
		$(this).hide();
	});
};

function tm_numberKey($this, e) {
	var range = $this.attr("range");
	if (isNotEmpty(range)) {
		var ranges = range.split("_");
		var max = ranges[1] * 1, min = ranges[0] * 1;
		var val = parseInt($this.val());
		if (val <= min)
			$this.val(min);
		if (val >= max)
			$this.val(max);
	}
	if (!e)
		e = window.event;
	var code = e.keyCode | e.which | e.charCode;
	if (code >= 48 && code <= 57 || code >= 96 && code <= 105 || code == 9)
		return true; // 数字
	switch (code) {
	case 8:
		// 退格
	case 37:
	case 38:
	case 39:
	case 40:
		// 方向键
	case 13:
		// 回车
	case 46:
		// 删除
	case 45:
	case 110:
		return true;
	}
	return false;
}

//trim() , ltrim() , rtrim()
String.prototype.trim = function(){ 
	return this.replace(/(^\s*)|(\s*$)/g, ""); 
} ;
String.prototype.ltrim = function(){ 
	return this.replace(/(^\s*)/g, ""); 
} ;
String.prototype.rtrim = function() { 
	return this.replace(/(\s*$)/g, ""); 
};

/**
 * 对Date的扩展，将 Date 转化为指定格式的String 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 * 可以用 1-2 个占位符 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) eg: (new
 * Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 (new
 * Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04 (new
 * Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04 (new
 * Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04 (new
 * Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function(fmt) {
	var o = {
		"M+" : this.getMonth() + 1,
		// 月份
		"d+" : this.getDate(),
		// 日
		"h+" : this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
		// 小时
		"H+" : this.getHours(),
		// 小时
		"m+" : this.getMinutes(),
		// 分
		"s+" : this.getSeconds(),
		// 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3),
		// 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	var week = {
		"0" : "/u65e5",
		"1" : "/u4e00",
		"2" : "/u4e8c",
		"3" : "/u4e09",
		"4" : "/u56db",
		"5" : "/u4e94",
		"6" : "/u516d"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt
				.replace(
						RegExp.$1,
						((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f"
								: "/u5468")
								: "")
								+ week[this.getDay() + ""]);
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
};

/**
 * 将数字转换成对应的中文 将阿拉伯数字翻译成中文的大写数字
 * 
 * @param {Object}
 *            num 比如:1对应一 11：十一 101:一百零一
 * @return {TypeName}
 */
function tm_NumberToChinese(num) {
	var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
	var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
	var a = ("" + num).replace(/(^0*)/g, "").split("."), k = 0, re = "";
	for (var i = a[0].length - 1; i >= 0; i--) {
		switch (k) {
		case 0:
			re = BB[7] + re;
			break;
		case 4:
			if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$")
					.test(a[0]))
				re = BB[4] + re;
			break;
		case 8:
			re = BB[5] + re;
			BB[7] = BB[5];
			k = 0;
			break;
		}
		if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
			re = AA[0] + re;
		if (a[0].charAt(i) != 0)
			re = AA[a[0].charAt(i)] + BB[k % 4] + re;
		k++;
	}

	if (a.length > 1) // 加上小数部分(如果有小数部分)
	{
		re += BB[6];
		for (var i = 0; i < a[1].length; i++)
			re += AA[a[1].charAt(i)];
	}
	if (re == '一十')
		re = "十";
	if (re.match(/^一/) && re.length == 3)
		re = re.replace("一", "");
	return re;
}

function getCursortPosition(ctrl) {
	var CaretPos = 0; // IE Support
	if (document.selection) {
		ctrl.focus();
		var Sel = document.selection.createRange();
		Sel.moveStart('character', -ctrl.value.length);
		CaretPos = Sel.text.length;
	}
	// Firefox support
	else if (ctrl.selectionStart || ctrl.selectionStart == '0')
		CaretPos = ctrl.selectionStart;
	return (CaretPos);
}

/* 获取光标处内容 */
function setCaretPosition(inputDom, startIndex, endIndex) {
	if (inputDom.setSelectionRange) {
		inputDom.setSelectionRange(startIndex, endIndex);
	} else if (inputDom.createTextRange) // IE
	{
		var range = inputDom.createTextRange();
		range.collapse(true);
		range.moveStart('character', startIndex);
		range.moveEnd('character', endIndex - startIndex - 1);
		range.select();
	}
	inputDom.focus();
}

// 获取选中文本
function getSelectedText(inputDom) {
	if (document.selection) // IE
	{
		return document.selection.createRange().text;
	} else {
		return inputDom.value.substring(inputDom.selectionStart,
				inputDom.selectionEnd);
	}
};

/**
 * 阻止事件冒泡
 * 
 * @param e
 */
function stopBubble(e) {
	// 如果提供了事件对象，则这是一个非IE浏览器
	if (e && e.stopPropagation)
		// 因此它支持W3C的stopPropagation()方法
		e.stopPropagation();
	else
		// 否则，我们需要使用IE的方式来取消事件冒泡
		window.event.cancelBubble = true;
};

/* 刷新当前 */
function tm_refreash() {
	window.location.href = window.location.href;
}

// 在光标处插入字符串
// myField 文本框对象
// myValue 要插入的值
function tm_insertAtCursorxxx(myField, myValue) {
	// IE support
	if (document.selection) {
		myField.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
		sel.select();
	}
	// MOZILLA/NETSCAPE support
	else if (myField.selectionStart || myField.selectionStart == '0') {
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		// save scrollTop before insert
		var restoreTop = myField.scrollTop;
		myField.value = myField.value.substring(0, startPos) + myValue
				+ myField.value.substring(endPos, myField.value.length);
		if (restoreTop > 0) {
			// restore previous scrollTop
			myField.scrollTop = restoreTop;
		}
		myField.focus();
		myField.selectionStart = startPos + myValue.length;
		myField.selectionEnd = startPos + myValue.length;
	} else {
		myField.value += myValue;
		myField.focus();
	}
}

function tm_insertAtCursor(tc, str) {
	var tclen = tc.value.length;
	tc.focus();
	if (typeof document.selection != "undefined") {
		document.selection.createRange().text = str;
	} else {
		tc.value = tc.value.substr(0, tc.selectionStart) + str
				+ tc.value.substring(tc.selectionStart, tclen);
	}
}

/** ******************json*************** */
function jsonToString(obj) {
	var THIS = this;
	switch (typeof (obj)) {
	case 'string':
		return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';
	case 'array':
		return '[' + obj.map(THIS.jsonToString).join(',') + ']';
	case 'object':
		if (obj instanceof Array) {
			var strArr = [];
			var len = obj.length;
			for (var i = 0; i < len; i++) {
				strArr.push(THIS.jsonToString(obj[i]));
			}
			return '[' + strArr.join(',') + ']';
		} else if (obj == null) {
			return 'null';

		} else {
			var string = [];
			for ( var property in obj)
				string.push(THIS.jsonToString(property) + ':'
						+ THIS.jsonToString(obj[property]));
			return '{' + string.join(',') + '}';
		}
	case 'number':
		return obj;
	case 'false':
		return obj;
	}
}



/* loading快速加载方法 */
function tmLoading(content, timeout, overlay) {
	$.tmLoading(content, {
		timer : timeout,
		skin : "black",
		overlay : overlay
	});
};
/* 获取浏览器的版本 */
function tm_getBroswerVersion() {
	var Sys = {};
	var ua = navigator.userAgent.toLowerCase();
	if (ua) {
		window.ActiveXObject ? Sys.version = "ie_"
				+ ua.match(/msie ([\d]+)/)[1]
				: document.getBoxObjectFor ? Sys.version = "firefox_"
						+ ua.match(/firefox\/([\d.]+)/)[1]
						: window.MessageEvent && !document.getBoxObjectFor ? Sys.version = "chrome"
								: window.opera ? Sys.version = "opera_"
										+ ua.match(/opera.([\d.]+)/)[1]
										: window.openDatabase ? Sys.version = ua
												.match(/version\/([\d.]+)/)[1]
												: 0;
	}
	return Sys;
}

/* 判断一个元素释放包含在数组中。 */
Array.prototype.contains = function(obj) {
	var i = this.length;
	while (i--) {
		if (this[i] === obj) {
			return true;
		}
	}
	return false;
};

/*内容高度自适应*/
function tm_heightellipsis(id, length) {
	var len = length;
	var p = document.getElementById(id);
	if (p) {
		var trunc = p.innerHTML;
		if (trunc.length > len) {
			trunc = trunc.substring(0, len);
			trunc = trunc.replace(/\w+$/, '');
			trunc += '<a href="#" ' + 'onclick="this.parentNode.innerHTML='
					+ 'unescape(\'' + escape(p.innerHTML)
					+ '\');return false;">' + '...<\/a>';
			p.innerHTML = trunc;
		}
	}
}

function getTimeFormat(startTime) {
	var startTimeMills = startTime.getTime();
	var endTimeMills = new Date().getTime();
	var diff = parseInt((endTimeMills - startTimeMills) / 1000);//秒
	var day_diff = parseInt(Math.floor(diff / 86400));//天
	var buffer = Array();
	if (day_diff < 0) {
		return "[error],时间越界...";
	} else {
		if (day_diff == 0 && diff < 60) {
			if (diff <= 0)
				diff = 1;
			buffer.push(diff + "秒前");
		} else if (day_diff == 0 && diff < 120) {
			buffer.push("1 分钟前");
		} else if (day_diff == 0 && diff < 3600) {
			buffer.push(Math.round(Math.floor(diff / 60)) + "分钟前");
		} else if (day_diff == 0 && diff < 7200) {
			buffer.push("1小时前");
		} else if (day_diff == 0 && diff < 86400) {
			buffer.push(Math.round(Math.floor(diff / 3600)) + "小时前");
		} else if (day_diff == 1) {
			buffer.push("1天前");
		} else if (day_diff < 7) {
			buffer.push(day_diff + "天前");
		} else if (day_diff < 30) {
			buffer.push(Math.round(Math.floor(day_diff / 7)) + " 星期前");
		} else if (day_diff >= 30 && day_diff <= 179) {
			buffer.push(Math.round(Math.floor(day_diff / 30)) + "月前");
		} else if (day_diff >= 180 && day_diff < 365) {
			buffer.push("半年前");
		} else if (day_diff >= 365) {
			buffer.push(Math.round(Math.floor(day_diff / 30 / 12)) + "年前");
		}
	}
	return buffer.toString();
}

/*验证是否为图片*/
function tmCheckImage(fileName) {
	return /(gif|jpg|jpeg|png|GIF|JPG|PNG)$/ig.test(fileName);
};

/*验证是否为视频*/
function tmCheckVideo(fileName) {
	return /(mp4|mp3|flv|wav)$/ig.test(fileName);
};

/*验证是否为文档*/
function tmCheckDocument(fileName) {
	return /(doc|docx|xls|xlsx|pdf|txt|ppt|pptx|rar|zip|html|jsp|sql|htm|shtml|xml)$/ig
			.test(fileName);
};

function tmCheckOffice(fileName) {
	return /(doc|docx|xls|xlsx|pdf|txt|ppt|pptx)$/ig.test(fileName);
};

var flag = false;
function DrawImage(ImgD, iwidth, iheight) {
	//参数(图片,允许的宽度,允许的高度)
	var image = new Image();
	image.src = ImgD.src;
	if (image.width > 0 && image.height > 0) {
		flag = true;
		if (image.width / image.height >= iwidth / iheight) {
			if (image.width > iwidth) {
				ImgD.width = iwidth;
				ImgD.height = (image.height * iwidth) / image.width;
			} else {
				ImgD.width = image.width;
				ImgD.height = image.height;
			}
			ImgD.alt = image.width + "×" + image.height;
		} else {
			if (image.height > iheight) {
				ImgD.height = iheight;
				ImgD.width = (image.width * iheight) / image.height;
			} else {
				ImgD.width = image.width;
				ImgD.height = image.height;
			}
			ImgD.alt = image.width + "×" + image.height;
		}
	}
};

/*********加密算法************/
function encryption(str,k){
	var string = "";
	for (var i = 0; i < str.length; i++) {
		var c= str.charCodeAt(i);
		if(c>=97 && c<=122){
			c += k%26;
			if(c<97){
				c+=26;
			}
			if(c>122){
				c-=26;
			}
		}else if(c>=65 && c<=90){
			c+=k%26;
			if(c<65){
				c+=26;
			}
			if(c>122){
				c-=26;
			}
		}
		string+=String.fromCharCode(c);
	}
	return string;
}


function dencryption(str,n){
	var string = "";
	var k = parseInt("-"+n);
	for (var i = 0; i < str.length; i++) {
		var c= str.charCodeAt(i);
		if(c>=97 && c<=122){
			c += k%26;
			if(c<97){
				c+=26;
			}
			if(c>122){
				c-=26;
			}
		}else if(c>=65 && c<=90){
			c+=k%26;
			if(c<65){
				c+=26;
			}
			if(c>122){
				c-=26;
			}
		}
		string+=String.fromCharCode(c);
	}
	return string;
};

function getRandomColor() {
	return '#' + (function(h) {
		return new Array(7 - h.length).join("0") + h;
	})((Math.random() * 0x1000000 << 0).toString(16));
};


/*array*/	
$.tmArray = {
	/*each和map的功能是一样的*/	
	each : function(arr,fn){
		fn = fn || Function.K;
		var a = [];
		var args = Array.prototype.slice.call(arguments, 1);
		for(var i = 0; i < arr.length; i++){
			var res = fn.apply(arr,[arr[i],i].concat(args));
			if(res != null) a.push(res);
		}
		return a;
	},
	/*each和map的功能是一样的*/	
	map : function(arr,fn,thisObj){
		var scope = thisObj || window;
		var a = [];
		for ( var i=0, j=arr.length; i < j; ++i ) {
			var res = fn.call(scope, arr[i], i, this);
			if(res != null) a.push(res);
		}
		return a;
	},
	orderBy : function(array,sortFlag){
		var $arr = array;
		if(sortFlag=='asc'){
			$arr.sort(this._numAscSort);
		}else if(sortFlag=='desc'){
			$arr.sort(this._numDescSort);
		}else{
			$arr.sort(this._numAscSort);
		}
		return $arr;
	},
	// 求两个集合的并集
	union : function(a, b){
		 var newArr = a.concat(b);
		 return this.unique2(newArr);
	},
	// 求两个集合的补集
	complement :function(a,b){
		return this.minus(this.union(a,b),this.intersect(a,b));	
	},
	// 求两个集合的交集
	intersect : function(a,b){
	   a = this.unique(a);	
		return this.each(a,function(o){
			return b.contains(o) ? o : null;
		});
	},
	//求两个集合的差集
	minus : function(a,b){
		a = this.unique(a);	
		return this.each(a,function(o){
			return b.contains(o) ? null : o;
		});
	},
	max : function(arr){
		return Math.max.apply({},arr) ;
	},
	min : function(arr){
		return Math.min.apply({},arr) ;
	},
	unique :function(arr){
		 var ra = new Array();
		 for(var i = 0; i < arr.length; i ++){
			 if(!ra.contains(arr[i])){
			 //if(this.contains(ra,arr[i])){	
				ra.push(arr[i]);
			 }
		 }
		 return ra;
	},
	unique2 : function(arr){
		for ( var i = 0; i < arr.length; i++) {
			for ( var j = i + 1; j < arr.length;) {
				if (arr[j] == arr[i]) {
					arr.splice(j, 1);
				} else {
					j++;
				}
			}
		}
		return arr;
	},
	indexOf : function(arr,val){
		for ( var i = 0; i < arr.length; i++) {
			if (arr[i] == val)
				return i;
		}
		return -1;	
	},
	contains : function(arr,val){
		return this.indexOf(arr,val) !=-1 ? true : false;
	},
	
	remove : function(arr,indexs){
		var index = this.indexOf(arr,indexs);
		if (index > -1) {
			arr.splice(index, 1);
		}
		return arr;
	},
	removeObject : function(arr,item){
		for ( var i = 0; i < arr.length; i++) {
			var jsonData = arr[i];
			for ( var key in jsonData) {
				if (jsonData[key] == item) {
					arr.splice(i, 1);
				}
			}
		}
		return arr;
	},
	toArray : function(arrString,sp){
		if(sp==undefined)sp=",";
		if(arrString==undefined)return this;
		var arrs = arrString.split(sp);
		return arrs;
	},
	_numAscSort :function(a,b){
		 return a-b;
	},
	_numDescSort :function(a,b){
		return b-a;
	},
	_sortAsc : function(x, y){
		if(x>y){
			return 1;
		}else{
			return -1;
		}
	},
	_sortDesc : function (x, y){
		if(x>y){
			return -1;
		}else{
			return 1; 
		}
	}
	
 };

/*日期工具类*/
$.tmDate = {
 /*转换日期*/
 _transferDate : function(date){
	if(typeof date =="string"){
		return new Date(date.replace(/-/ig,"/"));
	}else{
		return date;
	}
 },
  /*格式化日期*/
 _toString : function(date,pattern){
	var d = this._transferDate(date);
	return d.format(pattern);
 },

 /*获取两个时间相减的时间*/
 _Date : function(date1,date2){
	var dateTime = this._numMillSecond(date1,date2);
	return new Date(dateTime).format("yyyy-MM-dd");
 },

 //间隔年份
 _numYear : function(date1,date2){
	var times = this._numDay(date1,date2);
	return  Math.floor(times/365);
 },

  //间隔月份
 _numMonth : function(date1,date2){
	var times = this._numDay(date1,date2);
	return  Math.floor(times/30);
 },

 //间隔天数
 _numDay : function(date1,date2){
	var times = this._numSecond(date1,date2);
	var hour = this._var().hour;
	var mills = this._var().mills;
	return Math.ceil(times/(mills * hour));
 },

//间隔时
 _numHour : function(date1,date2){
	return Math.floor(this._numMillSecond(date1,date2)/(1000*60*60));
 },

 //间隔分
 _numMinute : function(date1,date2){
	return Math.floor(this._numMillSecond(date1,date2)/(1000*60));
 },

 //间隔秒数
 _numSecond : function(date1,date2){
	 return Math.floor(this._numMillSecond(date1,date2) / 1000);
 },

  //间隔毫秒
 _numMillSecond : function(date1,date2){
	var stimes = this._getTime(this._transferDate(date1));
	var etimes = this._getTime(this._transferDate(date2));
	return etimes - stimes;
 },

 _var : function(){
	return {hour:24,second:60,mills:3600,format:"yyyy-MM-dd",dateFormat:"yyyy-MM-dd HH:mm:ss"};
 },

/*某个日期加上多少毫秒*/
 _plusMillisSeconds : function(date,millisSeconds){
	var dateTime = this._getTime(date);
	var mintimes = millisSeconds;
	var rdate = dateTime*1 + mintimes*1;
	return this._format(new Date(rdate));
 },
 /*某个日期加上多少秒*/
 _plusSeconds : function(date,seconds){
	var dateTime = this._getTime(date);
	var mintimes = seconds*1000;
	var rdate = dateTime*1 + mintimes*1;
	return this._format(new Date(rdate));
 },
  /*某个日期加上多少分钟*/
 _plusMinutes : function(date,minutes){
	var dateTime = this._getTime(date);
	var mintimes = minutes*60*1000;
	var rdate = dateTime*1 + mintimes*1;
	return this._format(new Date(rdate));
 },
  /*某个日期加上小时数*/
 _plusHours : function(date,hours){
	var dateTime = this._getTime(date);
	var mintimes = hours*60*60*1000;
	var rdate = dateTime + mintimes;
	return this._format(new Date(rdate));
 },
 /*某个日期加上天数*/
 _plusDays : function(date,days){
	var dateTime = this._getTime(date);
	var mintimes = days*60*60*1000*24;
	var rdate = dateTime*1 + mintimes*1;
	return this._format(new Date(rdate));
 },

 /*某个日期加上多少个月,这里是按照一个月30天来计算天数的*/
 _plusMonths : function(date,months){
	var dateTime = this._getTime(date);
	var mintimes = months*30*60*60*1000*24;
	var rdate = dateTime + mintimes*1;
	return this._format(new Date(rdate));
 },

 /*某个日期加上多少个年,这里是按照一个月365天来计算天数的，如果loop为true则按闰年计算*/
 _plusYears : function(date,years,isLoop){
	var dateTime = this._getTime(date);
	var day = 365;
	if(isLoop)day =366;
	var mintimes = years*day*60*60*1000*24;
	var rdate = dateTime + mintimes;
	return this._format(new Date(rdate));
 },

 /*某个日期加上某个日期，这样的操作视乎没什么意义*/
 _plusDate : function(date1,date2){
	var dateTime = this._getTime(date1);
	var dateTime2 = this._getTime(date2);;
	var rdate = dateTime + dateTime2;
	return this._format(new Date(rdate));
 },

 /*某个日期减去多少毫秒秒*/
 _minusMillisSeconds : function(date,millisSeconds){
	var dateTime = this._getTime(date);
	var mintimes = millisSeconds*1;
	var rdate = dateTime - mintimes;
	return this._format(new Date(rdate));
 },
 /*某个日期减去多少秒*/
 _minusSeconds : function(date,seconds){
	var dateTime = this._getTime(date);
	var mintimes = seconds*1000;
	var rdate = dateTime - mintimes;
	return this._format(new Date(rdate));
 },
  /*某个日期减去多少分钟*/
 _minusMinutes : function(date,minutes){
	var dateTime = this._getTime(date);
	var mintimes = minutes*60*1000;
	var rdate = dateTime - mintimes;
	return this._format(new Date(rdate));
 },
  /*某个日期减去小时数*/
 _minusHours : function(date,hours){
	var dateTime = this._getTime(date);
	var mintimes = hours*60*60*1000;
	var rdate = dateTime - mintimes;
	return this._format(new Date(rdate));
 },
 /*某个日期减去天数*/
 _minusDays : function(date,days){
	var dateTime = this._getTime(date);
	var mintimes = days*60*60*1000*24;
	var rdate = dateTime - mintimes;
	return this._format(new Date(rdate));
 },

 /*某个日期减去多少个月,这里是按照一个月30天来计算天数的*/
 _minusMonths : function(date,months){
	var dateTime = this._getTime(date);
	var mintimes = months*30*60*60*1000*24;
	var rdate = dateTime - mintimes;
	return this._format(new Date(rdate));
 },

 /*某个日期减去多少个年,这里是按照一个月365天来计算天数的*/
 _minusYears : function(date,years,isLoop){
	var dateTime = this._getTime(date);
	var day = 365;
	if(isLoop)day =366;
	var mintimes = years*day*60*60*1000*24;
	var rdate = dateTime - mintimes;
	return this._format(new Date(rdate));
 },

 /*某个日期减去某个日期，这样的操作视乎没什么意义*/
 _minusDate : function(date1,date2){
	var dateTime = this._getTime(date1);
	var dateTime2 = this._getTime(date2);;
	var rdate = dateTime - dateTime2;
	return this._format(new Date(rdate));
 },

 /*获取一个月有多少天*/
 _getMonthOfDay :function(date1){
	var currentMonth = this._getFirstDayOfMonth(date1);
	var nextMonth = this._getNextDayOfMonth(date1);
	return this._numDay(currentMonth,nextMonth);
 },

 /*获取一年又多少天*/
 _getYearOfDay : function(date){
	var firstDayYear = this._getFirstDayOfYear(date);
	var lastDayYear = this._getLastDayOfYear(date);
	return Math.ceil(this._numDay(firstDayYear,lastDayYear));
 },

 /*某个日期是当年中的第几天*/
 _getDayOfYear : function(date1){
	return Math.ceil(this._numDay(this._getFirstDayOfYear(date1),date1));	
 },

 /*某个日期是在当月中的第几天*/
  _getDayOfMonth : function(date1){
	return Math.ceil(this._numDay(this._getFirstDayOfMonth(date1),date1));	
 },

 /*获取某个日期在这一年的第几周*/
 _getDayOfYearWeek : function(date){
	var numdays = this._getDayOfYear(date);
	return Math.ceil(numdays / 7);
 },

  /*某个日期是在当月中的星期几*/
  _getDayOfWeek : function(date1){
	return this._getWeek(date1);
 },

 /*获取在当前日期中的时间*/
 _getHourOfDay : function(date){
	 return this._getHour(date);
 },
 _eq : function(date1,date2){
	 var stime = this._getTime(this._transferDate(date1));
	 var etime = this._getTime(this._transferDate(date2));
	 return stime == etime ? true :false; 
 },
 /*某个日期是否晚于某个日期*/
 _after : function(date1,date2){
	 var stime = this._getTime(this._transferDate(date1));
	 var etime = this._getTime(this._transferDate(date2));
	 return  stime < etime ? true :false; 
 },

  /*某个日期是否早于某个日期*/
 _before : function(date1,date2){
	 var stime = this._getTime(this._transferDate(date1));
	 var etime = this._getTime(this._transferDate(date2));
	 return  stime > etime ? true :false; 
 },
 
 /*获取某年的第一天*/
 _getFirstDayOfYear : function(date){
	var year = this._getYear(date);
	var dateString = year+"-01-01 00:00:00";
	return dateString;
 },

  /*获取某年的最后一天*/
 _getLastDayOfYear : function(date){
	var year = this._getYear(date);
	var dateString = year+"-12-01 00:00:00";
	var endDay = this._getMonthOfDay(dateString);
	return year+"-12-"+endDay+" 23:59:59";
 },

  /*获取某月的第一天*/
 _getFirstDayOfMonth: function(date){
	var year = this._getYear(date);
	var month = this._getMonth(date);
	var dateString = year +"-"+month+"-01 00:00:00";
	return dateString;
 },

 /*获取某月最后一天*/
 _getLastDayOfMonth : function(date){
	var endDay = this._getMonthOfDay(date);
	var year = this._getYear(date);
	var month = this._getMonth(date);
	return year +"-"+month+"-"+endDay+" 23:59:59";
 },
 /*一天的开始时间*/
 _getFirstOfDay : function(date){
	 var year = this._getYear(date);
	 var month = this._getMonth(date);
	 var dates = this._getDay(date);
	 return year+"-"+month+"-"+dates+" 00:00:00";
 },

 /*一天的结束时间*/
 _getLastOfDay : function(date){
	 var year = this._getYear(date);
	 var month = this._getMonth(date);
	 var dates = this._getDay(date);
	 return year+"-"+month+"-"+dates+" 23:59:59";
 },
 
 /*获取下个月的第一天*/
 _getNextDayOfMonth: function(date){
	var year = this._getYear(date);
	var month = this._getMonth(date);
	month = month * 1 +1;
	if(month>12){
		year = year+1;
		month = month - 12;
	}
	month = month>9 ? month : "0"+month;
	var dateString = year +"-"+month+"-01 00:00:00";
	return dateString;
 },

 _getFirstOfWeek : function(date1){
	 var week = this._getWeek(date1);
	 var date = this._minusDays(date1,week);
	 var year = this._getYear(date);
	 var month = this._getMonth(date);
	 var dates = this._getDay(date);
	 return year+"-"+month+"-"+dates+" 00:00:00";
 },
 
 _getLastOfWeek : function(date1){
	 var week = 6-this._getWeek(date1);
	 var date = this._minusDays(date1,week);
	 var year = this._getYear(date);
	 var month = this._getMonth(date);
	 var dates = this._getDay(date);
	 return year+"-"+month+"-"+dates+" 23:59:59";
 },
 
 _getNow : function(){
	return new Date();	
 },
 _format : function(date){
	return this._getYear(date)+"-"+this._getMonth(date)+"-"+this._getDay(date)+" "+this._getHour(date)+":"+this._getMinute(date)+":"+this._getSecond(date);
 },
 _getDate :function(){
	 return this._getNow();
 },
 /*年*/
 _getYear:function(date){
	 return this._transferDate(date).getFullYear();
 },

 /*月*/
 _getMonth:function(date){
	 var month = this._transferDate(date).getMonth()+1;
	 return month>9 ? month : "0"+month;
 },

 /*日*/
 _getDay:function(date){
	 var day = this._transferDate(date).getDate();
	 return day >9 ? day : "0"+day;
 },

  /*获取今天星期几,如果为0代表星期日*/
 _getWeek : function(date){
	 return this._transferDate(date).getDay();
 },

 /*时*/
 _getHour : function(date){
	 var hour = this._transferDate(date).getHours();
	 return hour >9 ? hour : "0"+hour;
 },

 /*12小时制时*/
 _getHour12 : function(date){
	 var hour = this._transferDate(date).getHours();
	 return hour%12 == 0 ? 12 : hour % 12;
 },

 /*分*/
 _getMinute : function(date){
	 var minutes = this._transferDate(date).getMinutes();
	 return minutes >9 ? minutes : "0"+minutes;
 },

 /*秒*/
 _getSecond : function(date){
	var seconds = this._transferDate(date).getSeconds();
	return seconds >9 ? seconds : "0"+seconds;
 },

 /*毫秒*/
 _getMillisecond : function(date){
	return this._transferDate(date).getMilliseconds();
 },

 /*获取今天在当年是第几季度*/
 _getPeriod : function(date){
	var month = this._getMonth(date)*1;
	return  Math.floor((month+3)/3);
 },

 /*星期*/
 _nowWeekChinies : function(date){
	var nowWeek = this._getWeek(date);
	var day = "";
	switch (nowWeek){
		case 0:day="日";break;
		  break;
		case 1:day="一";break;
		  break;
		case 2:day="二";break;
		  break;
		case 3:day="三";break;
		  break;
		case 4:day="四";break;
		  break;
		case 5:day="五";break;
		  break;
		case 6:day="六";break;
	 }
	 return day;
 },

 /*返回 1970 年 1 月 1 日至今的毫秒数。*/
 _getTime : function(date){
	 return this._transferDate(date).getTime();
 }
};
/*date end*/
/*array end*/	
/*键盘事件*/
$.tmKeybord = function(options){
	var opts = $.extend({},$.tmKeybord.defaults,options);
	if(isNotEmpty(opts.target)){
		opts.target.on("keydown",function(evt){
			var keycode  = evt.keycode || evt.which;
			opts.keyCode = keycode;
			opts.charCode  = String.fromCharCode(keycode);
			opts.callback(opts,evt);
		}).on("keyup",function(evt){
			var keycode  = evt.keycode || evt.which;
			opts.keyCode = keycode;
			opts.charCode  = String.fromCharCode(keycode);
		});
	}else{
		$(document).on("keydown",function(evt){
			var keycode  = evt.keycode || evt.which;
			opts.keyCode = keycode;
			opts.charCode  = String.fromCharCode(keycode);
			opts.callback(opts,evt);
		}).on("keyup",function(evt){
			var keycode  = evt.keycode || evt.which;
			opts.keyCode = keycode;
			opts.charCode  = String.fromCharCode(keycode);
		});
	}
};

$.tmKeybord.defaults = {
	target:"",
	callback:function(opts,evt){},
	keyCode : "",
    charCode :""
};



/*日期工具类*/
$.tmDate = {
 /*转换日期*/
 _transferDate : function(date){
	if(typeof date =="string"){
		return new Date(date.replace(/-/ig,"/"));
	}else{
		return date;
	}
 },
  /*格式化日期*/
 _toString : function(date,pattern){
	var d = this._transferDate(date);
	return d.format(pattern);
 },

 /*获取两个时间相减的时间*/
 _Date : function(date1,date2){
	var dateTime = this._numMillSecond(date1,date2);
	return new Date(dateTime).format("yyyy-MM-dd");
 },

 //间隔年份
 _numYear : function(date1,date2){
	var times = this._numDay(date1,date2);
	return  Math.floor(times/365);
 },

  //间隔月份
 _numMonth : function(date1,date2){
	var times = this._numDay(date1,date2);
	return  Math.floor(times/30);
 },

 //间隔天数
 _numDay : function(date1,date2){
	var times = this._numSecond(date1,date2);
	var hour = this._var().hour;
	var mills = this._var().mills;
	return Math.ceil(times/(mills * hour));
 },

//间隔时
 _numHour : function(date1,date2){
	return Math.floor(this._numMillSecond(date1,date2)/(1000*60*60));
 },

 //间隔分
 _numMinute : function(date1,date2){
	return Math.floor(this._numMillSecond(date1,date2)/(1000*60));
 },

 //间隔秒数
 _numSecond : function(date1,date2){
	 return Math.floor(this._numMillSecond(date1,date2) / 1000);
 },

  //间隔毫秒
 _numMillSecond : function(date1,date2){
	var stimes = this._getTime(this._transferDate(date1));
	var etimes = this._getTime(this._transferDate(date2));
	return etimes - stimes;
 },

 _var : function(){
	return {hour:24,second:60,mills:3600,format:"yyyy-MM-dd",dateFormat:"yyyy-MM-dd HH:mm:ss"};
 },

/*某个日期加上多少毫秒*/
 _plusMillisSeconds : function(date,millisSeconds){
	var dateTime = this._getTime(date);
	var mintimes = millisSeconds;
	var rdate = dateTime*1 + mintimes*1;
	return this._format(new Date(rdate));
 },
 /*某个日期加上多少秒*/
 _plusSeconds : function(date,seconds){
	var dateTime = this._getTime(date);
	var mintimes = seconds*1000;
	var rdate = dateTime*1 + mintimes*1;
	return this._format(new Date(rdate));
 },
  /*某个日期加上多少分钟*/
 _plusMinutes : function(date,minutes){
	var dateTime = this._getTime(date);
	var mintimes = minutes*60*1000;
	var rdate = dateTime*1 + mintimes*1;
	return this._format(new Date(rdate));
 },
  /*某个日期加上小时数*/
 _plusHours : function(date,hours){
	var dateTime = this._getTime(date);
	var mintimes = hours*60*60*1000;
	var rdate = dateTime + mintimes;
	return this._format(new Date(rdate));
 },
 /*某个日期加上天数*/
 _plusDays : function(date,days){
	var dateTime = this._getTime(date);
	var mintimes = days*60*60*1000*24;
	var rdate = dateTime*1 + mintimes*1;
	return this._format(new Date(rdate));
 },

 /*某个日期加上多少个月,这里是按照一个月30天来计算天数的*/
 _plusMonths : function(date,months){
	var dateTime = this._getTime(date);
	var mintimes = months*30*60*60*1000*24;
	var rdate = dateTime + mintimes*1;
	return this._format(new Date(rdate));
 },

 /*某个日期加上多少个年,这里是按照一个月365天来计算天数的，如果loop为true则按闰年计算*/
 _plusYears : function(date,years,isLoop){
	var dateTime = this._getTime(date);
	var day = 365;
	if(isLoop)day =366;
	var mintimes = years*day*60*60*1000*24;
	var rdate = dateTime + mintimes;
	return this._format(new Date(rdate));
 },

 /*某个日期加上某个日期，这样的操作视乎没什么意义*/
 _plusDate : function(date1,date2){
	var dateTime = this._getTime(date1);
	var dateTime2 = this._getTime(date2);;
	var rdate = dateTime + dateTime2;
	return this._format(new Date(rdate));
 },

 /*某个日期减去多少毫秒秒*/
 _minusMillisSeconds : function(date,millisSeconds){
	var dateTime = this._getTime(date);
	var mintimes = millisSeconds*1;
	var rdate = dateTime - mintimes;
	return this._format(new Date(rdate));
 },
 /*某个日期减去多少秒*/
 _minusSeconds : function(date,seconds){
	var dateTime = this._getTime(date);
	var mintimes = seconds*1000;
	var rdate = dateTime - mintimes;
	return this._format(new Date(rdate));
 },
  /*某个日期减去多少分钟*/
 _minusMinutes : function(date,minutes){
	var dateTime = this._getTime(date);
	var mintimes = minutes*60*1000;
	var rdate = dateTime - mintimes;
	return this._format(new Date(rdate));
 },
  /*某个日期减去小时数*/
 _minusHours : function(date,hours){
	var dateTime = this._getTime(date);
	var mintimes = hours*60*60*1000;
	var rdate = dateTime - mintimes;
	return this._format(new Date(rdate));
 },
 /*某个日期减去天数*/
 _minusDays : function(date,days){
	var dateTime = this._getTime(date);
	var mintimes = days*60*60*1000*24;
	var rdate = dateTime - mintimes;
	return this._format(new Date(rdate));
 },

 /*某个日期减去多少个月,这里是按照一个月30天来计算天数的*/
 _minusMonths : function(date,months){
	var dateTime = this._getTime(date);
	var mintimes = months*30*60*60*1000*24;
	var rdate = dateTime - mintimes;
	return this._format(new Date(rdate));
 },

 /*某个日期减去多少个年,这里是按照一个月365天来计算天数的*/
 _minusYears : function(date,years,isLoop){
	var dateTime = this._getTime(date);
	var day = 365;
	if(isLoop)day =366;
	var mintimes = years*day*60*60*1000*24;
	var rdate = dateTime - mintimes;
	return this._format(new Date(rdate));
 },

 /*某个日期减去某个日期，这样的操作视乎没什么意义*/
 _minusDate : function(date1,date2){
	var dateTime = this._getTime(date1);
	var dateTime2 = this._getTime(date2);;
	var rdate = dateTime - dateTime2;
	return this._format(new Date(rdate));
 },

 /*获取一个月有多少天*/
 _getMonthOfDay :function(date1){
	var currentMonth = this._getFirstDayOfMonth(date1);
	var nextMonth = this._getNextDayOfMonth(date1);
	return this._numDay(currentMonth,nextMonth);
 },

 /*获取一年又多少天*/
 _getYearOfDay : function(date){
	var firstDayYear = this._getFirstDayOfYear(date);
	var lastDayYear = this._getLastDayOfYear(date);
	return Math.ceil(this._numDay(firstDayYear,lastDayYear));
 },

 /*某个日期是当年中的第几天*/
 _getDayOfYear : function(date1){
	return Math.ceil(this._numDay(this._getFirstDayOfYear(date1),date1));	
 },

 /*某个日期是在当月中的第几天*/
  _getDayOfMonth : function(date1){
	return Math.ceil(this._numDay(this._getFirstDayOfMonth(date1),date1));	
 },

 /*获取某个日期在这一年的第几周*/
 _getDayOfYearWeek : function(date){
	var numdays = this._getDayOfYear(date);
	return Math.ceil(numdays / 7);
 },

  /*某个日期是在当月中的星期几*/
  _getDayOfWeek : function(date1){
	return this._getWeek(date1);
 },

 /*获取在当前日期中的时间*/
 _getHourOfDay : function(date){
	 return this._getHour(date);
 },
 _eq : function(date1,date2){
	 var stime = this._getTime(this._transferDate(date1));
	 var etime = this._getTime(this._transferDate(date2));
	 return stime == etime ? true :false; 
 },
 /*某个日期是否晚于某个日期*/
 _after : function(date1,date2){
	 var stime = this._getTime(this._transferDate(date1));
	 var etime = this._getTime(this._transferDate(date2));
	 return  stime < etime ? true :false; 
 },

  /*某个日期是否早于某个日期*/
 _before : function(date1,date2){
	 var stime = this._getTime(this._transferDate(date1));
	 var etime = this._getTime(this._transferDate(date2));
	 return  stime > etime ? true :false; 
 },
 
 /*获取某年的第一天*/
 _getFirstDayOfYear : function(date){
	var year = this._getYear(date);
	var dateString = year+"-01-01 00:00:00";
	return dateString;
 },

  /*获取某年的最后一天*/
 _getLastDayOfYear : function(date){
	var year = this._getYear(date);
	var dateString = year+"-12-01 00:00:00";
	var endDay = this._getMonthOfDay(dateString);
	return year+"-12-"+endDay+" 23:59:59";
 },

  /*获取某月的第一天*/
 _getFirstDayOfMonth: function(date){
	var year = this._getYear(date);
	var month = this._getMonth(date);
	var dateString = year +"-"+month+"-01 00:00:00";
	return dateString;
 },

 /*获取某月最后一天*/
 _getLastDayOfMonth : function(date){
	var endDay = this._getMonthOfDay(date);
	var year = this._getYear(date);
	var month = this._getMonth(date);
	return year +"-"+month+"-"+endDay+" 23:59:59";
 },
 /*一天的开始时间*/
 _getFirstOfDay : function(date){
	 var year = this._getYear(date);
	 var month = this._getMonth(date);
	 var dates = this._getDay(date);
	 return year+"-"+month+"-"+dates+" 00:00:00";
 },

 /*一天的结束时间*/
 _getLastOfDay : function(date){
	 var year = this._getYear(date);
	 var month = this._getMonth(date);
	 var dates = this._getDay(date);
	 return year+"-"+month+"-"+dates+" 23:59:59";
 },
 
 /*获取下个月的第一天*/
 _getNextDayOfMonth: function(date){
	var year = this._getYear(date);
	var month = this._getMonth(date);
	month = month * 1 +1;
	if(month>12){
		year = year+1;
		month = month - 12;
	}
	month = month>9 ? month : "0"+month;
	var dateString = year +"-"+month+"-01 00:00:00";
	return dateString;
 },

 _getFirstOfWeek : function(date1){
	 var week = this._getWeek(date1);
	 var date = this._minusDays(date1,week);
	 var year = this._getYear(date);
	 var month = this._getMonth(date);
	 var dates = this._getDay(date);
	 return year+"-"+month+"-"+dates+" 00:00:00";
 },
 
 _getLastOfWeek : function(date1){
	 var week = 6-this._getWeek(date1);
	 var date = this._minusDays(date1,week);
	 var year = this._getYear(date);
	 var month = this._getMonth(date);
	 var dates = this._getDay(date);
	 return year+"-"+month+"-"+dates+" 23:59:59";
 },
 
 _getNow : function(){
	return new Date();	
 },
 _format : function(date){
	return this._getYear(date)+"-"+this._getMonth(date)+"-"+this._getDay(date)+" "+this._getHour(date)+":"+this._getMinute(date)+":"+this._getSecond(date);
 },
 _getDate :function(){
	 return this._getNow();
 },
 /*年*/
 _getYear:function(date){
	 return this._transferDate(date).getFullYear();
 },

 /*月*/
 _getMonth:function(date){
	 var month = this._transferDate(date).getMonth()+1;
	 return month>9 ? month : "0"+month;
 },

 /*日*/
 _getDay:function(date){
	 var day = this._transferDate(date).getDate();
	 return day >9 ? day : "0"+day;
 },

  /*获取今天星期几,如果为0代表星期日*/
 _getWeek : function(date){
	 return this._transferDate(date).getDay();
 },

 /*时*/
 _getHour : function(date){
	 var hour = this._transferDate(date).getHours();
	 return hour >9 ? hour : "0"+hour;
 },

 /*12小时制时*/
 _getHour12 : function(date){
	 var hour = this._transferDate(date).getHours();
	 return hour%12 == 0 ? 12 : hour % 12;
 },

 /*分*/
 _getMinute : function(date){
	 var minutes = this._transferDate(date).getMinutes();
	 return minutes >9 ? minutes : "0"+minutes;
 },

 /*秒*/
 _getSecond : function(date){
	var seconds = this._transferDate(date).getSeconds();
	return seconds >9 ? seconds : "0"+seconds;
 },

 /*毫秒*/
 _getMillisecond : function(date){
	return this._transferDate(date).getMilliseconds();
 },

 /*获取今天在当年是第几季度*/
 _getPeriod : function(date){
	var month = this._getMonth(date)*1;
	return  Math.floor((month+3)/3);
 },

 /*星期*/
 _nowWeekChinies : function(date){
	var nowWeek = this._getWeek(date);
	var day = "";
	switch (nowWeek){
		case 0:day="日";break;
		  break;
		case 1:day="一";break;
		  break;
		case 2:day="二";break;
		  break;
		case 3:day="三";break;
		  break;
		case 4:day="四";break;
		  break;
		case 5:day="五";break;
		  break;
		case 6:day="六";break;
	 }
	 return day;
 },

 /*返回 1970 年 1 月 1 日至今的毫秒数。*/
 _getTime : function(date){
	 return this._transferDate(date).getTime();
 }
};
/*date end*/



////以下进行测试
//if (Sys.ie) document.write('IE: ' + Sys.ie);
//if (Sys.firefox) document.write('Firefox: ' + Sys.firefox);
//if (Sys.chrome) document.write('Chrome: ' + Sys.chrome);
//if (Sys.opera) document.write('Opera: ' + Sys.opera);
//if (Sys.safari) document.write('Safari: ' + Sys.safari);
function tm_check_broswer(){
	var Sys = {};
	var ua = navigator.userAgent.toLowerCase();
	var s;
	(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
	(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
	(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
	(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
	(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
	return Sys;
}

/*******************************************************************************************统计******************************************************************************/
var tmStat = {};


function exmayCharset() {
	var charSet = "";
	var oType = getBrowser();
	switch (oType) {
	case "IE":
		charSet = document.charset;
		break;
	case "FIREFOX":
		charSet = document.characterSet;
		break;
	default:
		charSet = document.characterSet;
		break;
	}
	return charSet;
};

function getBrowser() {
	var oType = "";
	if (navigator.userAgent.indexOf("MSIE") != -1) {
		oType = "IE";
	} else if (navigator.userAgent.indexOf("Firefox") != -1) {
		oType = "FIREFOX";
	}
	return oType;
};


/**flash版本号*/
function exmayFlashVersion() {
	var f = "", n = navigator;
	if (n.plugins && n.plugins.length) {
		for ( var ii = 0; ii < n.plugins.length; ii++) {
			if (n.plugins[ii].name.indexOf('Shockwave Flash') != -1) {
				f = n.plugins[ii].description.split('Shockwave Flash ')[1];
				break;
			}
		}
	} else if (window.ActiveXObject) {
		for ( var ii = 10; ii >= 2; ii--) {
			try {
				var fl = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."
						+ ii + "');");
				if (fl) {
					f = ii + '.0';
					break;
				}
			} catch (e) {
			}
		}
	}
	return f;
};

function tmEncode(str) {
	return encodeURI(str).replace(/=/g, "%3D").replace(/\+/g, "%2B").replace(
			/\?/g, "%3F").replace(/\&/g, "%26");
};


function tm_getOs() {  
    var sUA=navigator.userAgent.toLowerCase();  
    if(sUA.indexOf( 'win' ) !=-1){  
         if(sUA.indexOf("nt 5.2")!=-1) {return "Windows 2003";}  
         if((sUA.indexOf("nt 5.1")!=-1)||(sUA.indexOf("XP")!=-1)) {return "Windows XP"; }  
         if((sUA.indexOf('nt 5.0')!=-1) || (sUA.indexOf('2000')!=-1)) {return 'Windows 2000';}  
         if((sUA.indexOf("winnt")!=-1) || (sUA.indexOf("windows nt")!=-1)) {return "Windows NT";}  
         if((sUA.indexOf("win98")!=-1) || (sUA.indexOf("windows 98")!=-1)) {return "Windows 98";}  
         return "Windows";  
    }  
    if(sUA.indexOf('linux')!=-1) {return 'Linux';}  
    if(sUA.indexOf("freebsd")!=-1) {return 'FreeBSD';}  
    if(sUA.indexOf( 'x11' )!=-1) {return 'Unix';}  
    if(sUA.indexOf('mac') != -1) {return "Mac"; }  
    if(sUA.indexOf("sunos")!=-1) {return 'Sun OS';}  
    if((sUA.indexOf("os/2")!=-1) || (navigator.appVersion.indexOf("OS/2")!=-1) || (sUA.indexOf("ibm-webexplorer")!=-1)) {return "OS 2";}  
    if(navigator.platform == 'PalmOS' ) {return 'Palm OS'; }  
    if((navigator.platform == 'WinCE' ) || ( navigator.platform == 'Windows CE' ) || ( navigator.platform == 'Pocket PC' ) ) {return 'Windows CE';}  
    if(sUA.indexOf( 'webtv')!=-1) {return 'WebTV Platform'; }  
    if(sUA.indexOf( 'netgem')!=-1) {return 'Netgem';}  
    if(sUA.indexOf( 'opentv')!=-1) {return 'OpenTV Platform';}  
    if(sUA.indexOf( 'symbian')!=-1) {return 'Symbian';}  
    return "Unknown";  
}  

function tm_getBrowse() {  
    var sUA=navigator.userAgent;
     //检测IE浏览器  
    if ((navigator.appName == "Microsoft Internet Explorer")) {  
        //检测模拟IE浏览的OPERA。edit at 2006-11-08(ver 0.1.2)  
        if (sUA.indexOf('Opera')!=-1) {  
            this.browseKernel='Presto';  
            if(window.opera && document.childNodes ) {  
                return 'Opera 7+';  
            } else {  
                return 'Opera 6-';  
            }  
        }  
        this.browseKernel='Trident';  
        if(sUA.indexOf('Maxthon')!=-1) {  
            return 'Maxthon';  
        }  
        if(sUA.indexOf('TencentTraveler')!=-1) { //ver 0.1.3  
            return '腾迅TT';  
        }  
        if(document.getElementById) {  
            return "IE5+";  
        } else {  
             return "IE4-";  
        }  
    }  
    //检测Gecko浏览器  
    if(sUA.indexOf('Gecko')!=-1) {
        this.browseKernel='Gecko';  
        if(navigator.vendor=="Mozilla") {return "Mozilla";}  
        if(navigator.vendor=="Firebird") {return "Firebird"; }  
        if (navigator.vendor.indexOf('Google')!=-1 || sUA.indexOf('Google')!=-1) {return 'Google';  }  
        if (sUA.indexOf('Firefox')!=-1) {return 'Firefox';  }
        return "Gecko";  
    }  
    //Netscape浏览器  
    if(sUA.indexOf('Netscape')!=-1) {  
        this.browseKernel='Gecko';  
        if(document.getElementById) {  
            return "Netscape 6+";  
        } else {  
            return 'Netscape 5-';  
        }  
    }  
    //检测Safari浏览器  
    if(sUA.indexOf('Safari') != -1) {this.browseKernel='KHTML';return 'Safari';}  
    if(sUA.indexOf('konqueror')!=-1) {this.browseKernel='KHTML';return 'Konqueror';}  
    //目前世界公认浏览网页速度最快的浏览器，但它占用的系统资源也很大。  
    if(sUA.indexOf('Opera') != -1) {  
        this.browseKernel='Presto';  
        if(window.opera && document.childNodes ) {  
            return 'Opera 7+';  
        } else {  
            return 'Opera 6-';  
        }  
        return 'Opera';  
    }  
    if((sUA.indexOf( 'hotjava' )!=-1) && typeof( navigator.accentColorName ) == 'undefined' ) {return 'HotJava';}  
    if( document.all && document.getElementById && navigator.savePreferences && (sUA.indexOf( 'netfront' ) < 0 ) && navigator.appName != 'Blazer' ) {return 'Escape 5'; }  
    //Konqueror / Safari / OmniWeb 4.5+  
    if( navigator.vendor == 'KDE' || ( document.childNodes && ( !document.all || navigator.accentColorName ) && !navigator.taintEnabled ) ) {this.browseKernel='KHTML';return 'KDE';}  
    if( navigator.__ice_version ) { return 'ICEbrowser';}  
    if( window.ScriptEngine && ScriptEngine().indexOf( 'InScript' ) + 1 ) {  
        if( document.createElement ) {  
            return 'iCab 3+';  
        } else {  
            return 'iCab 2-';  
        }  
    }  
    if(document.layers && !document.classes ) {return 'Omniweb 4.2-';}  
    if(document.layers && !navigator.mimeTypes['*'] ) {return 'Escape 4';}  
    if(navigator.appName.indexOf( 'WebTV' ) + 1 ) {return 'WebTV';}  
    if(sUA.indexOf( 'netgem' )!=-1 ) {return 'Netgem NetBox';}  
    if(sUA.indexOf( 'opentv' )!=-1 ) {return 'OpenTV';}  
    if(sUA.indexOf( 'ipanel' )!=-1) {return 'iPanel MicroBrowser';}  
    if(document.getElementById && !document.childNodes) {return 'Clue browser';}  
    if(document.getElementById && ( (sUA.indexOf( 'netfront' ) !=-1) || navigator.appName == 'Blazer' ) ) {return 'NetFront 3+';}  
    if((sUA.indexOf( 'msie' ) + 1 ) && window.ActiveXObject ) {return 'Pocket Internet Explorer'; }  
    return "Unknown";  
}  



/*
var second=0;
var minute=0;
var hour=0;
idt=window.setTimeout("interval();",1000);
function interval(){
	second++;
	if(second==60){second=0;minute+=1;}
	if(minute==60){minute=0;hour+=1;}
	tmLoading(hour+"时"+minute+"分"+second+"秒");
	idt=window.setTimeout("interval();",1000);
}*/

var tmStat = {
	screem : screen.width + " x " + screen.height,
	broswer : tm_getBrowse(),
	colorDepth : screen.colorDepth,
	flashVersion : exmayFlashVersion(),
	lang : navigator.systemLanguage ? navigator.systemLanguage: navigator.language,
	charset : exmayCharset(),
	javaAppletEnabled : navigator.javaEnabled() ? 1 : 0,
	cookieEnabled : (navigator.cookieEnabled) ? 1 : 0,
	referer : tmEncode(document.referrer),
	os:tm_getOs(),
	title : tmEncode(document.title),
	domain: document.domain,
	lastModified : document.lastModified,
	currentUrl : document.URL,
	url : tmEncode(location.href),
	host : location.host
};



$.tmFace = {
	"#萌#": "<img src='../../images/faces/tz/meng.gif' title='#萌#'>",
	"#织#": "<img src='../../images/faces/zz2_thumb.gif' title='#织#'>",
	"#神马#": "<img src='../../images/faces/horse2_thumb.gif' title='#神马#'>",
	"#浮云#": "<img src='../../images/faces/fuyun_thumb.gif' title='#浮云#'>",
	"#给力#": "<img src='../../images/faces/geili_thumb.gif' title='#给力#'>",
	"#围观#": "<img src='../../images/faces/wg_thumb.gif' title='#围观#'>",
	"#威武#": "<img src='../../images/faces/vw_thumb.gif' title='#威武#'>",
	"#熊猫#": "<img src='../../images/faces/panda_thumb.gif' title='#熊猫#'>",
	"#兔子#": "<img src='../../images/faces/rabbit_thumb.gif' title='#兔子#'>",
	"#奥特曼#": "<img src='../../images/faces/otm_thumb.gif' title='#奥特曼#'>",
	"#囧#": "<img src='../../images/faces/j_thumb.gif' title='#囧#'>",
	"#互粉#": "<img src='../../images/faces/hufen_thumb.gif' title='#互粉#'>",
	"#礼物#": "<img src='../../images/faces/liwu_thumb.gif' title='#礼物#'>",
	"#呵呵#": "<img src='../../images/faces/smilea_thumb.gif' title='#呵呵#'>",
	"#嘻嘻#": "<img src='../../images/faces/tootha_thumb.gif' title='#嘻嘻#'>",
	"#哈哈#": "<img src='../../images/faces/laugh.gif' title='#哈哈#'>",
	"#可爱#": "<img src='../../images/faces/tza_thumb.gif' title='#可爱#'>",
	"#可怜#": "<img src='../../images/faces/kl_thumb.gif' title='#可怜#'>",
	"#挖鼻屎#": "<img src='../../images/faces/kbsa_thumb.gif' title='#挖鼻屎#'>",
	"#吃惊#": "<img src='../../images/faces/cj_thumb.gif' title='#吃惊#'>",
	"#害羞#": "<img src='../../images/faces/shamea_thumb.gif' title='#害羞#'>",
	"#挤眼#": "<img src='../../images/faces/zy_thumb.gif' title='#挤眼#'>",
	"#闭嘴#": "<img src='../../images/faces/bz_thumb.gif' title='#闭嘴#'>",
	"#鄙视#": "<img src='../../images/faces/bs2_thumb.gif' title='#鄙视#'>",
	"#爱你#": "<img src='../../images/faces/lovea_thumb.gif' title='#爱你]'>",
	"#泪#": "<img src='../../images/faces/sada_thumb.gif' title='#泪#'>",
	"#偷笑#": "<img src='../../images/faces/heia_thumb.gif' title='#偷笑#'>",
	"#亲亲#": "<img src='../../images/faces/qq_thumb.gif' title='#亲亲#'>",
	"#生病#": "<img src='../../images/faces/sb_thumb.gif' title='#生病#'>",
	"#太开心#": "<img src='../../images/faces/mb_thumb.gif' title='#太开心#'>",
	"#懒得理你#": "<img src='../../images/faces/ldln_thumb.gif' title='#懒得理你#'>",
	"#右哼哼#": "<img src='../../images/faces/yhh_thumb.gif' title='#右哼哼#'>",
	"#左哼哼#": "<img src='../../images/faces/zhh_thumb.gif' title='#左哼哼#'>",
	"#嘘#": "<img src='../../images/faces/x_thumb.gif' title='#嘘#'>",
	"#衰#": "<img src='../../images/faces/cry.gif' title='#衰#'>",
	"#委屈#": "<img src='../../images/faces/wq_thumb.gif' title='#委屈#'>",
	"#吐#": "<img src='../../images/faces/t_thumb.gif' title='#吐#'>",
	"#打哈气#": "<img src='../../images/faces/k_thumb.gif' title='#打哈气#'>",
	"#抱抱#": "<img src='../../images/faces/bba_thumb.gif' title='#抱抱#'>",
	"#怒#": "<img src='../../images/faces/angrya_thumb.gif' title='#怒#'>",
	"#疑问#": "<img src='../../images/faces/yw_thumb.gif' title='#疑问#'>",
	"#馋嘴#": "<img src='../../images/faces/cza_thumb.gif' title='#馋嘴#'>",
	"#拜拜#": "<img src='../../images/faces/88_thumb.gif' title='#拜拜#'>",
	"#思考#": "<img src='../../images/faces/sk_thumb.gif' title='#思考#'>",
	"#汗#": "<img src='../../images/faces/sweata_thumb.gif' title='#汗#'>",
	"#困#": "<img src='../../images/faces/sleepya_thumb.gif' title='#困#'>",
	"#睡觉#": "<img src='../../images/faces/sleepa_thumb.gif' title='#睡觉#'>",
	"#钱#": "<img src='../../images/faces/money_thumb.gif' title='#钱#'>",
	"#失望#": "<img src='../../images/faces/sw_thumb.gif' title='#失望#'>",
	"#酷#": "<img src='../../images/faces/cool_thumb.gif' title='#酷#'>",
	"#花心#": "<img src='../../images/faces/hsa_thumb.gif' title='#花心#'>",
	"#哼#": "<img src='../../images/faces/hatea_thumb.gif' title='#哼#'>",
	"#鼓掌#": "<img src='../../images/faces/gza_thumb.gif' title='#鼓掌#'>",
	"#晕#": "<img src='../../images/faces/dizzya_thumb.gif' title='#晕#'>",
	"#悲伤#": "<img src='../../images/faces/bs_thumb.gif' title='#悲伤#'>",
	"#抓狂#": "<img src='../../images/faces/crazya_thumb.gif' title='#抓狂#'>",
	"#黑线#": "<img src='../../images/faces/h_thumb.gif' title='#黑线#'>",
	"#阴险#": "<img src='../../images/faces/yx_thumb.gif' title='#阴险#'>",
	"#怒骂#": "<img src='../../images/faces/nm_thumb.gif' title='#怒骂#'>",
	"#心#": "<img src='../../images/faces/hearta_thumb.gif' title='#心#'>",
	"#伤心#": "<img src='../../images/faces/unheart.gif' title='#伤心#'>",
	"#猪头#": "<img src='../../images/faces/pig.gif' title='#猪头#'>",
	"#ok#": "<img src='../../images/faces/ok_thumb.gif' title='#ok#'>",
	"#耶#": "<img src='../../images/faces/ye_thumb.gif' title='#耶#'>",
	"#good#": "<img src='../../images/faces/good_thumb.gif' title='#good#'>",
	"#不要#": "<img src='../../images/faces/no_thumb.gif' title='#不要#'>",
	"#赞#": "<img src='../../images/faces/z2_thumb.gif' title='#赞#'>",
	"#来#": "<img src='../../images/faces/come_thumb.gif' title='#来#'>",
	"#弱#": "<img src='../../images/faces/sad_thumb.gif' title='#弱#'>",
	"#蜡烛#": "<img src='../../images/faces/lazu_thumb.gif' title='#蜡烛#'>",
	"#钟#": "<img src='../../images/faces/clock_thumb.gif' title='#钟#'>",
	"#蛋糕#": "<img src='../../images/faces/cake.gif' title='#蛋糕#'>",
	"#话筒#": "<img src='../../images/faces/m_thumb.gif' title='#话筒#'>",
	"#围脖#": "<img src='../../images/faces/weijin_thumb.gif' title='#围脖#'>",
	"#转发#": "<img src='../../images/faces/lxhzhuanfa_thumb.gif' title='#转发#'>",
	"#路过这儿#": "<img src='../../images/faces/lxhluguo_thumb.gif' title='#路过这儿#'>",
	"#bofu变脸#": "<img src='../../images/faces/bofubianlian_thumb.gif' title='#bofu变脸#'>",
	"#gbz困#": "<img src='../../images/faces/gbzkun_thumb.gif' title='#gbz困#'>",
	"#生闷气#": "<img src='../../images/faces/boboshengmenqi_thumb.gif' title='#生闷气#'>",
	"#不要啊#": "<img src='../../images/faces/chn_buyaoya_thumb.gif' title='#不要啊#'>",
	"#dx泪奔#": "<img src='../../images/faces/daxiongleibenxiong_thumb.gif' title='#dx泪奔#'>",
	"#运气中#": "<img src='../../images/faces/cat_yunqizhong_thumb.gif' title='#运气中#'>",
	"#有钱#": "<img src='../../images/faces/youqian_thumb.gif' title='#有钱#'>",
	"#冲锋#": "<img src='../../images/faces/cf_thumb.gif' title='#冲锋#'>",
	"#照相机#": "<img src='../../images/faces/camera_thumb.gif' title='#照相机#'>",
	"操你妈": "<span class='tmui-tips' tip='操你妈'>【****】</span>"
};


function tm_comment_replace(content) {
	for (var key in $.tmFace) {
		if (content.indexOf(key) != -1) {
			var re = new RegExp(key,"gm");
			content = content.replace(re,$.tmFace[key]);
		}
	}
	return content;
};


$.fn.selectRange = function(start, end) {
	return this.each(function() {
		if (this.setSelectionRange) {
			this.focus();
			this.setSelectionRange(start, end);
		} else if (this.createTextRange) {
			var range = this.createTextRange();
			range.collapse(true);
			range.moveEnd('character', end);
			range.moveStart('character', start);
			range.select();
		}
	});
};

function stripscript(s) {
	var pattern = new RegExp(
			"[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]");
	var rs = "";
	for (var i = 0; i < s.length; i++) {
		rs = rs + s.substr(i, 1).replace(pattern, '');
	}
	return rs;
}


/*初始化验证码,防止读取浏览器缓存*/
function initVerifi(obj){
	$("#"+obj).trigger("click");
}


function encryption(str,k){
	var string = "";
	for (var i = 0; i < str.length; i++) {
		var c= str.charCodeAt(i);
		if(c>=97 && c<=122){
			c += k%26;
			if(c<97){
				c+=26;
			}
			if(c>122){
				c-=26;
			}
		}else if(c>=65 && c<=90){
			c+=k%26;
			if(c<65){
				c+=26;
			}
			if(c>122){
				c-=26;
			}
		}
		string+=String.fromCharCode(c);
	}
	return string;
}


function dencryption(str,n){
	var string = "";
	var k = parseInt("-"+n);
	for (var i = 0; i < str.length; i++) {
		var c= str.charCodeAt(i);
		if(c>=97 && c<=122){
			c += k%26;
			if(c<97){
				c+=26;
			}
			if(c>122){
				c-=26;
			}
		}else if(c>=65 && c<=90){
			c+=k%26;
			if(c<65){
				c+=26;
			}
			if(c>122){
				c-=26;
			}
		}
		string+=String.fromCharCode(c);
	}
	return string;
}