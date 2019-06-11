package com.TunnelTools.gwzd;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

import javax.imageio.stream.FileImageInputStream;
import javax.imageio.stream.FileImageOutputStream;

public class Tools {

	/**zxl
	 * @function byte[] 编码 base64
	 * @param bstr
	 * @return
	 */
	@SuppressWarnings("restriction")
	public String Encoide(byte[] bstr)
	{
		//return new sun.misc.BASE64Encoder().encode(bstr);
		return new sun.misc.BASE64Encoder().encode(bstr);
	}
	/**讲base64的String解码成byte[]
	 * @author zxl
	 * @param base64Str
	 * @return
	 */
	@SuppressWarnings("restriction")
	public byte[] Decode(String base64Str)
	{
		byte[] bt = null;
		try{
			sun.misc.BASE64Decoder decoder = new sun.misc.BASE64Decoder();
			bt = decoder.decodeBuffer(base64Str);
		}catch(IOException e)
		{
			e.printStackTrace();
		}
		return bt;
	}
	// 判断文件夹是否存在
	public boolean judeDirExists(File file) {

		if (file.exists()) {
			if (file.isDirectory()) {
				//System.out.println("exists");
			} else {
				//System.out.println("the same name file exists, can not create");
				return false;
			}
			return true;
		} else {
			if(file.mkdir())
			{
				//System.out.println("not exists and create success");
				return true;
			}
			else
			{
				//System.out.println("not exists and create false");
				return false;
			}
		}
	}
	/**根据绝对路径获取图片
	 * @author zxl
	 * @param str_Path 图片路径
	 * @return	base64编码的图片
	 */
	public String GetPicByPath(String str_Path)
	{
		byte[] imagefile = null;
		try{
			int len = 0;
			File file = new File(str_Path);
			FileImageInputStream fr = null;
			if(file.exists())
			{
				fr = new FileImageInputStream(file);
				len = (int) fr.length();
				imagefile = new byte[len];
				fr.read(imagefile);
				fr.close();
			}
		}
		catch(IOException e)
		{
			e.printStackTrace();
		}
		String str_picBase64 = "";
		if(imagefile != null)
		{
			str_picBase64 = Encoide(imagefile);
		}
		return str_picBase64;
	}
	/**保存图片到目录
	 * @author //lhj20190319
	 * @param str_picPathHead 保存文件目录头
	 * @param str_time
	 * @param str_cameraID
	 * @param str_base64Pic
	 * @return
	 */
	public String SavePic(String str_picPathHead,String str_time,String str_cameraID,String str_base64Pic)
	{
		String str_picPath="";
		byte[] picbyte = Decode(str_base64Pic);
		try {
			str_picPath += str_picPathHead;
			File dir = new File(str_picPath);
			//System.out.printf("str_picPath=%s\r\n",str_picPath);
			if(judeDirExists(dir)==false)  return "";
			
			String year = str_time.substring(0,4);
			str_picPath+="/"+year;
			//System.out.printf("str_picPath=%s\r\n",str_picPath);
			File diryear = new File(str_picPath);
			if(judeDirExists(diryear)==false)  return "";
			
			String month = str_time.substring(4,6);
			str_picPath+="/"+month;
			//System.out.printf("str_picPath=%s\r\n",str_picPath);
			File dirmonth = new File(str_picPath);
			if(judeDirExists(dirmonth)==false)  return "";
			
			String day = str_time.substring(6,8);
			str_picPath+="/"+day;
			//System.out.printf("str_picPath=%s\r\n",str_picPath);
			File dirday = new File(str_picPath);
			if(judeDirExists(dirday)==false)  return "";
			
			str_picPath+="/"+str_cameraID+"_"+str_time+".jpg";
			
			//System.out.println("图像路径:"+str_picPath);
			FileImageOutputStream imageOutput = new FileImageOutputStream(new File(str_picPath));
			imageOutput.write(picbyte, 0, picbyte.length);//将byte写入硬盘
		    imageOutput.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return str_picPath;
	}
}
