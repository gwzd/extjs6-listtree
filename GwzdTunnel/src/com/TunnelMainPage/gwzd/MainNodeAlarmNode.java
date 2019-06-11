package com.TunnelMainPage.gwzd;
public class MainNodeAlarmNode {
	private String alarmTime;
	private String alarmType;
	private int alarmNo;
	private int alarmJL;
	private String alarmPicPath;
	public MainNodeAlarmNode(String str_alarmTime,String str_alarmType,int i_alarmNo, int i_alarmJL , String str_alarmPicPath){
		setAlarmTime(str_alarmTime);
		setAlarmNo(i_alarmNo);
		setAlarmType(str_alarmType);
		setAlarmJL(i_alarmJL);
		setAlarmPicPath(str_alarmPicPath);
	}
	public String getAlarmTime() {
		return alarmTime;
	}
	public void setAlarmTime(String alarmTime) {
		this.alarmTime = alarmTime;
	}
	public int getAlarmNo() {
		return alarmNo;
	}
	public void setAlarmNo(int alarmNo) {
		this.alarmNo = alarmNo;
	}
	public int getAlarmJL() {
		return alarmJL;
	}
	public void setAlarmJL(int alarmJL) {
		this.alarmJL = alarmJL;
	}
	public String getAlarmPicPath() {
		return alarmPicPath;
	}
	public void setAlarmPicPath(String alarmPicPath) {
		this.alarmPicPath = alarmPicPath;
	}
	public String getAlarmType() {
		return alarmType;
	}
	public void setAlarmType(String alarmType) {
		this.alarmType = alarmType;
	}
}
