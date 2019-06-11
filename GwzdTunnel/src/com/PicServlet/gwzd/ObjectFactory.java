package com.PicServlet.gwzd;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;

/**
 * This object contains factory methods for each Java content interface and Java
 * element interface generated in the com.PicServlet.gwzd package.
 * <p>
 * An ObjectFactory allows you to programatically construct new instances of the
 * Java representation for XML content. The Java representation of XML content
 * can consist of schema derived interfaces and classes representing the binding
 * of schema type definitions, element declarations and model groups. Factory
 * methods for each of these are provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

	private final static QName _GetPicByPathResponse_QNAME = new QName(
			"http://zxl.pic.com/", "GetPicByPathResponse");
	private final static QName _LoginResponse_QNAME = new QName(
			"http://zxl.pic.com/", "LoginResponse");
	private final static QName _GetPicByPath_QNAME = new QName(
			"http://zxl.pic.com/", "GetPicByPath");
	private final static QName _UpLoadAlarmResponse_QNAME = new QName(
			"http://zxl.pic.com/", "UpLoadAlarmResponse");
	private final static QName _GetBase64PicNewResponse_QNAME = new QName(
			"http://zxl.pic.com/", "GetBase64Pic_NewResponse");
	private final static QName _UpLoadAlarm_QNAME = new QName(
			"http://zxl.pic.com/", "UpLoadAlarm");
	private final static QName _Login_QNAME = new QName("http://zxl.pic.com/",
			"Login");
	private final static QName _GetBase64PicNew_QNAME = new QName(
			"http://zxl.pic.com/", "GetBase64Pic_New");

	/**
	 * Create a new ObjectFactory that can be used to create new instances of
	 * schema derived classes for package: com.PicServlet.gwzd
	 * 
	 */
	public ObjectFactory() {
	}

	/**
	 * Create an instance of {@link UpLoadAlarmResponse }
	 * 
	 */
	public UpLoadAlarmResponse createUpLoadAlarmResponse() {
		return new UpLoadAlarmResponse();
	}

	/**
	 * Create an instance of {@link GetPicByPathResponse }
	 * 
	 */
	public GetPicByPathResponse createGetPicByPathResponse() {
		return new GetPicByPathResponse();
	}

	/**
	 * Create an instance of {@link Login }
	 * 
	 */
	public Login createLogin() {
		return new Login();
	}

	/**
	 * Create an instance of {@link LoginResponse }
	 * 
	 */
	public LoginResponse createLoginResponse() {
		return new LoginResponse();
	}

	/**
	 * Create an instance of {@link UpLoadAlarm }
	 * 
	 */
	public UpLoadAlarm createUpLoadAlarm() {
		return new UpLoadAlarm();
	}

	/**
	 * Create an instance of {@link GetBase64PicNew }
	 * 
	 */
	public GetBase64PicNew createGetBase64PicNew() {
		return new GetBase64PicNew();
	}

	/**
	 * Create an instance of {@link GetPicByPath }
	 * 
	 */
	public GetPicByPath createGetPicByPath() {
		return new GetPicByPath();
	}

	/**
	 * Create an instance of {@link GetBase64PicNewResponse }
	 * 
	 */
	public GetBase64PicNewResponse createGetBase64PicNewResponse() {
		return new GetBase64PicNewResponse();
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}
	 * {@link GetPicByPathResponse }{@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://zxl.pic.com/", name = "GetPicByPathResponse")
	public JAXBElement<GetPicByPathResponse> createGetPicByPathResponse(
			GetPicByPathResponse value) {
		return new JAXBElement<GetPicByPathResponse>(
				_GetPicByPathResponse_QNAME, GetPicByPathResponse.class, null,
				value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link LoginResponse }
	 * {@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://zxl.pic.com/", name = "LoginResponse")
	public JAXBElement<LoginResponse> createLoginResponse(LoginResponse value) {
		return new JAXBElement<LoginResponse>(_LoginResponse_QNAME,
				LoginResponse.class, null, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link GetPicByPath }
	 * {@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://zxl.pic.com/", name = "GetPicByPath")
	public JAXBElement<GetPicByPath> createGetPicByPath(GetPicByPath value) {
		return new JAXBElement<GetPicByPath>(_GetPicByPath_QNAME,
				GetPicByPath.class, null, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}
	 * {@link UpLoadAlarmResponse }{@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://zxl.pic.com/", name = "UpLoadAlarmResponse")
	public JAXBElement<UpLoadAlarmResponse> createUpLoadAlarmResponse(
			UpLoadAlarmResponse value) {
		return new JAXBElement<UpLoadAlarmResponse>(_UpLoadAlarmResponse_QNAME,
				UpLoadAlarmResponse.class, null, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}
	 * {@link GetBase64PicNewResponse }{@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://zxl.pic.com/", name = "GetBase64Pic_NewResponse")
	public JAXBElement<GetBase64PicNewResponse> createGetBase64PicNewResponse(
			GetBase64PicNewResponse value) {
		return new JAXBElement<GetBase64PicNewResponse>(
				_GetBase64PicNewResponse_QNAME, GetBase64PicNewResponse.class,
				null, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link UpLoadAlarm }
	 * {@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://zxl.pic.com/", name = "UpLoadAlarm")
	public JAXBElement<UpLoadAlarm> createUpLoadAlarm(UpLoadAlarm value) {
		return new JAXBElement<UpLoadAlarm>(_UpLoadAlarm_QNAME,
				UpLoadAlarm.class, null, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link Login }{@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://zxl.pic.com/", name = "Login")
	public JAXBElement<Login> createLogin(Login value) {
		return new JAXBElement<Login>(_Login_QNAME, Login.class, null, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link GetBase64PicNew }
	 * {@code >}
	 * 
	 */
	@XmlElementDecl(namespace = "http://zxl.pic.com/", name = "GetBase64Pic_New")
	public JAXBElement<GetBase64PicNew> createGetBase64PicNew(
			GetBase64PicNew value) {
		return new JAXBElement<GetBase64PicNew>(_GetBase64PicNew_QNAME,
				GetBase64PicNew.class, null, value);
	}

}
