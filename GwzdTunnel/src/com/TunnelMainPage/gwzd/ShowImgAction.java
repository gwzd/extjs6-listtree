package com.TunnelMainPage.gwzd;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

import com.PicServlet.gwzd.PicServerDelegate;
import com.PicServlet.gwzd.PicServerService;
import com.TunnelTools.gwzd.Tools;
import com.opensymphony.xwork2.ActionSupport;

public class ShowImgAction extends ActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	protected String imagePath = null;
	public String execute()
	{
		//System.out.println("imagePath:" + imagePath);
		return SUCCESS;
	}
	 /**
     * @描述：读取图片输入流
     * @开发人员：zxl
     * @开发时间：2017.11.30
     * @return  struts.xml配置 <param name="inputName">downloadFile</param> 因此这里的函数名为getDownloadFile
     * @throws FileNotFoundException
     */
    public InputStream getDownloadFile() throws FileNotFoundException {
        // 文件输出流 
        BufferedInputStream bis = null;
        try {
            if (imagePath == null || imagePath.trim().length() <= 0) {
                return null;
            }
            /*
            File fl = new File(imagePath);
            if (!fl.exists()) {
                return null;
            }
            // 读取生成的图片
            FileInputStream fis = new FileInputStream(fl);
            bis = new BufferedInputStream(fis);*/
            PicServerService serv = new PicServerService();
            PicServerDelegate delegate = serv.getPicServerPort();
            String picBase64 = delegate.getPicByPath(imagePath);
            Tools tool = new Tools();
            byte[] byteFile = tool.Decode(picBase64);
            InputStream is = new ByteArrayInputStream(byteFile);
            bis = new BufferedInputStream(is);

        } catch (Throwable t) {
            t.printStackTrace();
        }
        // 返回函数值
        return bis;
    }
	public String getImagePath() {
        return imagePath;
    }
    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}
