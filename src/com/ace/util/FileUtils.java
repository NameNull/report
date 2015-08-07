package com.ace.util;

import java.io.File;
import java.text.DecimalFormat;

/**
 * 
 * @title FileUtils 文件工具类
 * @description  
 * @author 俞杰
 * @time 2015年5月15日-下午6:34:34
 * @version 1.0.0
 * @since JDK1.7
 */
public class FileUtils {
	/**
	 * 
	 * @description 根据文件路径名得到文件大小
	 * @方法名 countFileSize
	 * @param pathName
	 * @return String
	 * @exception
	 */
	public static String countFileSize(String pathName){
		String fileSizeString="";
		try{
			File file=new File(pathName);
			DecimalFormat df=new DecimalFormat("#.00");
			long fileS=file.length();
			if(fileS<1024){
				fileSizeString=df.format((double)fileS)+"byte";
			}else if(fileS<1048576){
				fileSizeString=df.format((double)fileS/1024)+"KB";	
			}else if(fileS<1073741824){
				fileSizeString=df.format(((double)fileS/1024/1024)-0.01)+"MB";
			}else{
				fileSizeString=df.format((double)fileS/1024/1024/1024)+"G";
			}		
		}catch(Exception e){
			e.printStackTrace();
		}
		return fileSizeString;
	}
	/**
	 * 
	 * @description 文件大小转换（size）
	 * @方法名 countFileSize
	 * @param size
	 * @return String
	 * @exception
	 */
	public static String countFileSize(long size){
		String fileSizeString="";
		try{
			DecimalFormat df=new DecimalFormat("#.00");
			long fileS=size;
			if(fileS<1024){
				fileSizeString=df.format((double)fileS)+"byte";
			}else if(fileS<1048576){
				fileSizeString=df.format((double)fileS/1024)+"KB";	
			}else if(fileS<1073741824){
				fileSizeString=df.format(((double)fileS/1024/1024)-0.01)+"MB";
			}else{
				fileSizeString=df.format((double)fileS/1024/1024/1024)+"G";
			}		
		}catch(Exception e){
			e.printStackTrace();
		}
		return fileSizeString;
	}
	

	/**
	 * 
	 * @description 获取文件后缀名  （带点）
	 * @方法名 getExt
	 * @param fileName
	 * @return String
	 * @exception
	 */
	public static String getExt(String fileName) {
		int pos = fileName.lastIndexOf(".");
		if (pos == -1)
			return "";
		return fileName.substring(pos, fileName.length());
	}
	/**
	 * 
	 * @description 获取文件名（不带后缀）
	 * @方法名 getFileName
	 * @param fileName
	 * @return String
	 * @exception
	 */
	public static String getFileName(String fileName) {
		int pos = fileName.lastIndexOf(".");
		if (pos == -1)
			return "";
		return fileName.substring(0, pos);
	}
	
	/**
	 * 
	 * @description 获取文件后缀名（不带点）
	 * @方法名 getExtNoPoint
	 * @param fileName
	 * @return String
	 * @exception
	 */
	public static String getExtNoPoint(String fileName) {
		if (fileName.lastIndexOf(".") == -1)
			return "";
		int pos = fileName.lastIndexOf(".") + 1;
		return fileName.substring(pos, fileName.length());
	}
}
