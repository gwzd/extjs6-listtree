package com.TunnelMainPage.gwzd;

public class MainAllAlarmNode {
	private String alarmName;
	private String alarmTime;
	private String alarmType;
	private int alarmNo;
	private int alarmJL;
	private String alarmPicPath;
	private String cameraID;
	private String alarmID;
	public MainAllAlarmNode(String str_name,String str_alarmTime,String str_alarmType,int i_alarmNo, int i_alarmJL , String str_alarmPicPath,String str_cameraID,String str_AlarmID){
		setAlarmName(str_name);
		setAlarmTime(str_alarmTime);
		setAlarmNo(i_alarmNo);
		setAlarmType(str_alarmType);
		setAlarmJL(i_alarmJL);
		setAlarmPicPath(str_alarmPicPath);
		setCameraID(str_cameraID);
		setAlarmID(str_AlarmID);
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
	public String getCameraID() {
		return cameraID;
	}
	public void setCameraID(String cameraID) {
		this.cameraID = cameraID;
	}
	public String getAlarmName() {
		return alarmName;
	}
	public void setAlarmName(String alarmName) {
		this.alarmName = alarmName;
	}
	public String getAlarmID() {
		return alarmID;
	}
	public void setAlarmID(String alarmID) {
		this.alarmID = alarmID;
	}
}
