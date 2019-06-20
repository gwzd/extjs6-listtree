package com.alarm.gwzd;

import com.TunnelTools.gwzd.DBTool;
import com.opensymphony.xwork2.ActionSupport;

public class AlarmHandler extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private boolean success;
	private String alarmID;
	private String alarmMark;
	public String execute(){
		System.out.println("报警处理:" + alarmID + ":" + alarmMark);
		DBTool dbt = new DBTool();
		int i_ret = dbt.AlarmHandler(alarmID, alarmMark);
		if(i_ret > 0){
			setSuccess(true);
		}
		else{
			setSuccess(false);
		}
		return SUCCESS;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getAlarmID() {
		return alarmID;
	}
	public void setAlarmID(String alarmID) {
		this.alarmID = alarmID;
	}
	public String getAlarmMark() {
		return alarmMark;
	}
	public void setAlarmMark(String alarmMark) {
		this.alarmMark = alarmMark;
	}
}
