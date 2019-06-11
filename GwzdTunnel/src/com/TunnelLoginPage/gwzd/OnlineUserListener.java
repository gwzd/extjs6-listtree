package com.TunnelLoginPage.gwzd;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import com.TunnelTools.gwzd.DBTool;

public class OnlineUserListener implements HttpSessionListener{
	
	@Override
	public void sessionCreated(HttpSessionEvent event) {
		// TODO Auto-generated method stub
		HttpSession session=event.getSession();
        String id=session.getId();
        //SummerConstant.UserMap.put(id,Boolean.TRUE);//添加用户
        //System.out.println("创建新的session:" + id);
	}
	@Override
	public void sessionDestroyed(HttpSessionEvent event) {
		// TODO Auto-generated method stub
		HttpSession session=event.getSession();
        //String id=session.getId()+session.getCreationTime();
        //System.out.println("Session已经过期:" + id);
        String str_UserName = session.getAttribute("UserName")==null?"":session.getAttribute("UserName").toString();
        //操作数据库将该用户下线
        synchronized(this){
        	//线程锁
        	//System.out.println("------------客户的Session过期---------------------:" + str_UserName);
        	//System.out.println("------------客户的Session过期---------------------:" + session.getId());
        	if(str_UserName != null && !str_UserName.isEmpty()){
	            DBTool dbt = new DBTool();
	            int i_ret = dbt.logout(str_UserName);
	            if(i_ret > 0){
	            	session.setAttribute("Online", false);
	            }
        	}
        }
	}
}