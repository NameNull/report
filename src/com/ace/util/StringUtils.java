package com.ace.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.DecimalFormat;
import java.util.HashMap;

import sun.misc.BASE64Encoder;

public class StringUtils {
	/**
	 * 
	 * @description md5加密 
	 * @方法名 md5Base64
	 * @param str
	 * @return String
	 * @exception
	 */
	public static String md5Base64(String str) {
		try {
			MessageDigest md5 = MessageDigest.getInstance("MD5");
			return base64Encode(md5.digest(str.getBytes()));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static String base64Encode(byte[] b) {
		if (b == null) {
			return null;
		}
		return new BASE64Encoder().encode(b);
	}
	
	public static String saltPassword(String slatString,String password){
		return md5Base64(slatString+password);
	}
	/**
	 * 
	 * @description 截取文章
	 * @方法名 cutContent
	 * @param content
	 * @param begin
	 * @param end
	 * @return String
	 * @exception
	 */
	public static String cutContent(String content,int begin,int end){
		if(StringUtils.isEmpty(content))return "";
		String start = "";
		String result = "";
		if(content.length() > end){
			start = content.substring(begin,end);
			result = "<span id='moreContent' style='display:none;'>"+content.substring(end,content.length())+"</span>";
			return start+result+"&nbsp;&nbsp;<a onclick='tm_show_expand(this)' href='javascript:void(0)'>展开</a>";
		}else{
			return content;
		}
	}
	/**
	 * 
	 * @description 数字转中文
	 * @方法名 intToChnNumConverter
	 * @param num
	 * @return String
	 * @exception
	 */
	public static String intToChnNumConverter(int num){
	    String resultNumber = null;
	    if(num > 10000 || num < 0){
	        return "";
	    }
	    HashMap<Integer,String> chnNumbers = new HashMap<Integer,String>();
	    chnNumbers.put(0, "零");
	    chnNumbers.put(1, "一");
	    chnNumbers.put(2, "二");
	    chnNumbers.put(3, "三");
	    chnNumbers.put(4, "四");
	    chnNumbers.put(5, "五");
	    chnNumbers.put(6, "六");
	    chnNumbers.put(7, "七");
	    chnNumbers.put(8, "八");
	    chnNumbers.put(9, "九");
	 
	    HashMap<Integer,String> unitMap = new HashMap<Integer,String>();
	    unitMap.put(1, "");
	    unitMap.put(10, "十");
	    unitMap.put(100, "百");
	    unitMap.put(1000, "千");
	    int[] unitArray = {1000, 100, 10, 1};
	 
	    StringBuilder result = new StringBuilder();
	    int i = 0;
	    while(num > 0){
	        int n1 = num / unitArray[i];
	        if(n1 > 0){
	            result.append(chnNumbers.get(n1)).append(unitMap.get(unitArray[i]));
	        }
	        if(n1 == 0){
	            if(result.lastIndexOf("零") != result.length()-1){
	                result.append("零");
	            }
	        }
	        num = num % unitArray[i++];
	        if(num == 0){
	            break;
	        }
	    }
	    resultNumber = result.toString();
	    if(resultNumber.startsWith("零")){
	        resultNumber = resultNumber.substring(1);
	    }
	    if(resultNumber.startsWith("一十")){
	        resultNumber = resultNumber.substring(1);
	    }
	    return resultNumber;
	}
	/**
	 * 
	 * @description 数字转字母
	 * @方法名 getCharacter
	 * @param num
	 * @return String
	 * @exception
	 */
	public static String getCharacter(int num){
		String cweek = "";
		if(num==1)cweek = "A";
		if(num==2)cweek = "B";
		if(num==3)cweek = "C";
		if(num==4)cweek = "D";
		if(num==5)cweek = "E";
		if(num==6)cweek = "F";
		if(num==7)cweek = "G";
		if(num==8)cweek = "H";
		if(num==9)cweek = "I";
		if(num==10)cweek = "J";
		if(num==11)cweek = "K";
		if(num==12)cweek = "M";
		if(num==13)cweek = "L";
		if(num==14)cweek = "N";
		if(num==15)cweek = "O";
		if(num==16)cweek = "P";
		if(num==17)cweek = "Q";
		if(num==18)cweek = "R";
		if(num==19)cweek = "S";
		if(num==20)cweek = "T";
		if(num==21)cweek = "U";
		if(num==22)cweek = "V";
		if(num==23)cweek = "W";
		if(num==24)cweek = "X";
		if(num==25)cweek = "Y";
		if(num==26)cweek = "Z";
		return cweek;
	}
	/**
	 * 
	 * @description 数字转星期
	 * @方法名 getWeekChinesee
	 * @param week
	 * @return String
	 * @exception
	 */
	public static String getWeekChinesee(int week){
		String cweek = "";
		if(week==1)cweek = "一";
		if(week==2)cweek = "二";
		if(week==3)cweek = "三";
		if(week==4)cweek = "四";
		if(week==5)cweek = "五";
		if(week==6)cweek = "六";
		if(week==7)cweek = "日";
		return cweek;
	}
	/**
	 * 
	 * @description 字符串转小写
	 * @方法名 toLower
	 * @param content
	 * @return String
	 * @exception
	 */
	public static String toLower(String content){
		if(StringUtils.isEmpty(content))return null;
		return content.toLowerCase();
	}
	/**
	 * 
	 * @description 字符串转大写字母
	 * @方法名 toUpper
	 * @param content
	 * @return String
	 * @exception
	 */
	public static String toUpper(String content){
		if(StringUtils.isEmpty(content))return null;
		return content.toUpperCase();
	}
	/**
	 * 
	 * @description 冒泡排序 true为降序 false为升序
	 * @方法名 sorts
	 * @param datas
	 * @param flag
	 * @return int[]
	 * @exception
	 */
	public static int[] sorts(int[] datas,boolean flag){
		for (int i = 0; i < datas.length-1; i++) {//轮询次数
			for(int j=0; j < datas.length-1-i; j++){//交换次数
				if(flag){ 
					if(datas[j] < datas[j+1]){
						int temp = datas[j];
						datas[j] = datas[j+1];
						datas[j+1] = temp;
					}
				}else{
					if(datas[j] < datas[j+1]){
						int temp = datas[j];
						datas[j] = datas[j+1];
						datas[j+1] = temp;
					}
				}
			}
		}
		return datas;
	}
	/**
	 * 
	 * @description 百分比转换 如:String[] s=new String[]{"#.#####","#.####"};String str=getPercent(1,3,s);
	 * @方法名 getPercent
	 * @param num
	 * @param totalCount
	 * @param objects
	 * @return String
	 * @exception
	 */
	public static String getPercent(int num,float totalCount,String...objects){//动态参数
		String format = "#.##";
		if(objects!=null && objects.length>0){
			format = objects[0];
		}
		return StringUtils.doubleToString((num/totalCount)*100,format)+"%";
	}
	/**
	 * 
	 * @description 将小数格式化成字符串，会进行四舍五入  如：doubleToString(123123.3232,"#.###")
	 * @方法名 doubleToString
	 * @param dou
	 * @param format
	 * @return String
	 * @exception
	 */
	
	public static String doubleToString(double dou,String format) {
		if(isEmpty(format))format = "#.##";
		DecimalFormat decimalFormat = new DecimalFormat(format);
		String string = decimalFormat.format(dou);// 四舍五入，逢五进一
		return string;
	}
	/**
	 * 
	 * @description 判断是否为空
	 * @方法名 isEmpty
	 * @param str
	 * @return boolean
	 * @exception
	 */
	public static boolean isEmpty(String str) {
		return null == str || str.length() == 0 || "".equals(str)
				|| str.matches("\\s*");
	}
	/**
	 * 
	 * @description 非空判断 
	 * @方法名 isNotEmpty
	 * @param str
	 * @return boolean
	 * @exception
	 */
	public static boolean isNotEmpty(String str) {
		return !isEmpty(str);
	}
	/**
	 * 
	 * @description 0,1,2转性别
	 * @方法名 sex
	 * @param male
	 * @return String
	 * @exception
	 */
	public static String sex(int male){
		String result = null;
		if(male==1){
			result = "男";
		}else if(male==0){
			result = "女";
		}else if(male==2){
			result = "保密";
		}
		return result;
	}
	/**
	 * 凯德加密
	 * 方法名：encryption<BR>
	 * 创建人：xiaowei <BR>
	 * 时间：2014年10月25日-下午9:48:19 <BR>
	 * @param str
	 * @param k
	 * @return String<BR>
	 * @exception <BR>
	 * @since  1.0.0
	 */
	public static String encryption(String str,int k){
		String string = "";
		for (int i = 0; i < str.length(); i++) {
			char c= str.charAt(i);
			if(c>='a' && c<='z'){
				c += k%26;
				if(c<'a'){
					c+=26;
				}
				if(c>'z'){
					c-=26;
				}
			}else if(c>='A' && c<='Z'){
				c+=k%26;
				if(c<'A'){
					c+=26;
				}
				if(c>'Z'){
					c-=26;
				}
			}
			string+=c;
		}
		return string;
	}
	
	/**
	 * 凯德解密
	 * 方法名：dencryption<BR>
	 * 创建人：xiaowei <BR>
	 * 时间：2014年10月25日-下午9:48:35 <BR>
	 * @param str
	 * @param n
	 * @return String<BR>
	 * @exception <BR>
	 * @since  1.0.0
	 */
	public static String dencryption(String str,int n){
		String string = "";
		int k = Integer.parseInt("-"+n);
		for (int i = 0; i < str.length(); i++) {
			char c= str.charAt(i);
			if(c>='a' && c<='z'){
				c += k%26;
				if(c<'a'){
					c+=26;
				}
				if(c>'z'){
					c-=26;
				}
			}else if(c>='A' && c<='Z'){
				c+=k%26;
				if(c<'A'){
					c+=26;
				}
				if(c>'Z'){
					c-=26;
				}
			}
			string+=c;
		}
		return string;
	}
	
}

