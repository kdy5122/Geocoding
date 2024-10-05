package api.geoAPI;


import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;

@Controller
public class GeoQuery {	
    @Autowired
    private SqlSessionTemplate sqlsession;
    private static  List fail_Mapping_key1 = new ArrayList();
    private static  List fail_Mapping_key2 = new ArrayList();
    private static  List fail_Mapping_key3 = new ArrayList();
    @ResponseBody
	@RequestMapping("/geoAPI/query.json")
	public  Map<String, Object> geoCode(@RequestParam Map<String, Object> paramMap) throws IOException, JSONException {
      //ResponseBody return값을 자동으로 json 으로 변환하게 되어 return함 	
      //RequestParam (map으로 일일이 설정) RequestBody (joson으로 전달받음)      
      fail_Mapping_key1 = new ArrayList(); //실패 키 LIST 초기화
      fail_Mapping_key2 = new ArrayList(); //실패 키 LIST 초기화
      fail_Mapping_key3 = new ArrayList(); //실패 키 LIST 초기화
      Map<String, Object> fail_keys = new HashMap<>();
      List address = new ArrayList();
      String type = (String) paramMap.get("server");
      String url = null;
      String coord_x = null; //x좌표
	  String coord_y = null; //y좌표
	  String adm_cd = null;
	  String mapping_key1 = null;
	  String mapping_key2 = null;
	  String mapping_key3 = null;
	  String successDownPath = null; 
	  String failDownPath = null;
	  BufferedReader in = null;
	  String mapping_key1_column = ((String) paramMap.get("mapping_key1_column")).toLowerCase();
	  String mapping_key2_column = ((String) paramMap.get("mapping_key2_column")).toLowerCase();
	  String mapping_key3_column = ((String) paramMap.get("mapping_key3_column")).toLowerCase();
	  String address_column = ((String) paramMap.get("address_column")).toLowerCase();	  	  
	  String query =  (String) paramMap.get("query");
	  String file_success_text = null;
	  String file_fail_text = null;
	 // System.out.println("query 확인 " + query);
	  String mapping_key_index = (String) paramMap.get("mapping_key_index");
	  System.out.println("address_column 확인 " + address_column);
	  //현재 시간 구하기 
	  Date now = new Date();
	  SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
	  String formatedNow = formatter.format(now);
	  
	  //다운로드 경로 지정
	  if(type.equals("local")) {
		  successDownPath = "D:\\temp\\geo_success\\geoCodeS_local_"+formatedNow+".txt";
		  failDownPath = "D:\\temp\\geo_fail\\geoCodeF_local_"+formatedNow+".txt";
	  }else if(type.equals("gsks")) {   
		  successDownPath = "D:\\temp\\geoCodeS_gsks_"+formatedNow+".txt";
		  failDownPath = "D:\\temp\\geoCodeF_gsks_"+formatedNow+".txt";
	  }
	  
	  try {
		address =  sqlsession.selectList("api.geoAPI.xsql.GeoAPI.test", paramMap);
		  System.out.println("address 확인 " + address.get(0).toString());
		  if(mapping_key_index.equals("1")) {
			  file_success_text = "매핑키1("+mapping_key1_column+")"+"|"+"x좌표"+"|"+"y좌표";
			  file_fail_text = "매핑키1("+mapping_key1_column+")";
			   }else if(mapping_key_index.equals("2")) {
			  file_success_text = "매핑키1("+mapping_key1_column+")"+"|"+"매핑키2("+mapping_key2_column+")"+"|"+"x좌표"+"|"+"y좌표";  
			  file_fail_text = "매핑키1("+mapping_key1_column+")"+"|"+"매핑키2("+mapping_key2_column+")";
			   }else if(mapping_key_index.equals("3")){
		      file_success_text = "매핑키1("+mapping_key1_column+")"+"|"+"매핑키2("+mapping_key2_column+")"+"|"+"매핑키3("+mapping_key3_column+")"+"|"+"x좌표"+"|"+"y좌표";  
		      file_fail_text = "매핑키1("+mapping_key1_column+")"+"|"+"매핑키2("+mapping_key2_column+")"+"|"+"매핑키3("+mapping_key3_column+")";
			 }
		   //성공파일 첫줄 표시 
		   BufferedWriter bw2 = new BufferedWriter(new FileWriter(successDownPath, true));
		   bw2.write(file_success_text);
		   bw2.newLine();
		   bw2.close();
		   
		   //실패파일 첫줄 표시 
		   BufferedWriter bw = new BufferedWriter(new FileWriter(failDownPath, true));	
		   bw.write(file_fail_text);
		   bw.newLine();
		   bw.close();
	} catch (IOException e1) {		
		System.out.println("IOException 예외 : " + e1.getMessage());
	} catch (Exception e) {
		System.out.println("Exception 예외 : " +e.getMessage());
		fail_keys.put("query_error",e.getMessage());
       } finally {
	   if (sqlSession != null) {
           sqlSession.close();
	  }  
       }		  
	  	   
       for(int i = 0 ;i<address.size();i++) {
    	   
    	   try {
			Map tempMap = (Map)address.get(i);
			   String get_address = String.valueOf(tempMap.get(address_column));
			   
			   //※로컬,내부망 구분
			   if(type.equals("local")) {
					     url = "http://localhost:8080/SOPOpenAPI/OpenAPI3/addr/geocode.json?accessToken=BYPASS&absmatch=1&address="; //로컬
					     //url = "http://localhost:8080/SOPOpenAPI/OpenAPI3/addr/geocodewgs84.json?accessToken=BYPASS&absmatch=1&address="; //wgs84
			   }else if(type.equals("gsks")) {
					     url = "http://숨김처리/SOPOpenAPI/OpenAPI3/addr/geocode.json?accessToken=BYPASS&absmatch=1&address=";	 //내부망 (운영이라 매달 루신,사전 확인할 때만 테스트하기)
			   }
			   
			   //※주소값 튜닝하여 URL 적재 final_address  	       		 		   
			   if(mapping_key_index.equals("1")) { 
			   mapping_key1 =  String.valueOf(tempMap.get(mapping_key1_column)); //매핑키1
			   }else if(mapping_key_index.equals("2")) {   	
			   mapping_key1 =  String.valueOf(tempMap.get(mapping_key1_column)); //매핑키1
			   mapping_key2 =  String.valueOf(tempMap.get(mapping_key2_column)); //매핑키2
			   }else if(mapping_key_index.equals("3")) { 
			   mapping_key1 =  String.valueOf(tempMap.get(mapping_key1_column)); //매핑키1
			   mapping_key2 =  String.valueOf(tempMap.get(mapping_key2_column)); //매핑키2   
			   mapping_key3 =  String.valueOf(tempMap.get(mapping_key3_column)); //매핑키3
			   }			      	  
			   
			   url += URLEncoder.encode(get_address, "UTF-8");
				url = url.replace("%", "%25");
				url = url.replace("+", "%2520");
				url = url.replace("%28", "(");
				url = url.replace("%29", ")"); 	
				
				JSONObject jsonString = readJsonFromUrl(url);
				System.out.println("확인 jsonString : " + jsonString );
				if(jsonString.toString().indexOf("\"result\"") > 0) { //지오코딩 성공시 로직
					JSONObject jObject = jsonString.getJSONObject("result");
					JSONArray result_data = (JSONArray)jObject.get("resultdata");
					adm_cd=(String) result_data.getJSONObject(0).get("adm_cd");
					coord_x=(String) result_data.getJSONObject(0).get("x");
					coord_y=(String) result_data.getJSONObject(0).get("y");								
				    //fileUpdate(mapping_key1,mapping_key2,mapping_key3,coord_x,coord_y,successDownPath,failDownPath,mapping_key_index); //adm_cd 제외
					fileUpdate(mapping_key1,mapping_key2,mapping_key3,coord_x,coord_y,adm_cd,successDownPath,failDownPath,mapping_key_index); //adm_cd 포함
				}else { //지오코딩 실패시 로직
					fileUpdateFail(mapping_key1,mapping_key2,mapping_key3,successDownPath,failDownPath,mapping_key_index);
				}
		} catch (UnsupportedEncodingException e) {
			System.out.println("UnsupportedEncodingException 예외 : " + e.getMessage());
		} catch (IOException e) {
			System.out.println("IOException 예외 : " + e.getMessage());
		} catch (JSONException e) {
			System.out.println("JSONException 예외 : " + e.getMessage());
		}
							   
		   
       }//for문
       fail_keys.put("fail_Mapping_key1", fail_Mapping_key1);
       fail_keys.put("fail_Mapping_key2", fail_Mapping_key2);
       fail_keys.put("fail_Mapping_key3", fail_Mapping_key3);
       fail_keys.put("mapping_key1_column", mapping_key1_column);
       fail_keys.put("mapping_key2_column", mapping_key2_column);
       fail_keys.put("mapping_key3_column", mapping_key3_column);
       
		return fail_keys;
	}
    private void fileUpdate(String key1,String key2, String key3, String coord_x , String coord_y,String adm_cd,String successDownPath,String failDownPath,String key_index) throws IOException {
		//--------------------------------------- 매핑키 + x좌표 + y좌표 ---------------------------------------
		try {
			BufferedWriter bw = new BufferedWriter(new FileWriter(successDownPath, true));
			if(key_index.equals("1")) { //매핑키 1개일 때 
			bw.write(key1 +"|"+ coord_x +"|"+ coord_y);
		    //bw.write(key1 +"|"+ coord_x +"|"+ coord_y +"|" + adm_cd);	
			}else if(key_index.equals("2")) {//매핑키 2개일 때 
			bw.write(key1 +"|" + key2 + "|" + coord_x +"|"+ coord_y);	
			}else if(key_index.equals("3")) {//매핑키 3개일 때 
			bw.write(key1 +"|" + key2 + "|" + key3 + "|"+ coord_x +"|"+ coord_y);	
			}
			bw.newLine();
			bw.close();
			System.out.println("진행상황" + key1);
		} catch (IOException e) {
			System.out.println("IOException 예외 : " + e.getMessage());
		}		
	}
    
    private static void fileUpdateFail(String key1,String key2, String key3,String successDownPath,String failDownPath,String key_index) throws IOException {
    	//--------------------------------------- 실패한 매핑키 -----------------------------------------------
		try {
			BufferedWriter bw = new BufferedWriter(new FileWriter(failDownPath, true));
			if(key_index.equals("1")) {
			bw.write(key1);
			fail_Mapping_key1.add(key1);
			}else if(key_index.equals("2")){
			bw.write(key1 + "|" + key2);
			fail_Mapping_key1.add(key1);
			fail_Mapping_key2.add(key2);
			}else if(key_index.equals("3")){
			bw.write(key1 + "|" + key2 + "|" + key3);	
			fail_Mapping_key1.add(key1);
			fail_Mapping_key2.add(key2);
			fail_Mapping_key3.add(key3);
			}
			bw.newLine();
			bw.close();
			
			//System.out.println("keyList 확인" + fail_Mapping_key1);
		} catch (IOException e) {
			System.out.println("IOException 예외 : " + e.getMessage());
		}

		
	}
	private static String jsonReadAll(Reader reader) throws IOException{
		//StringBuilder로 메모리를 줄이고 string을 만든다 
		StringBuilder sb = new StringBuilder();
		int cp;
		while((cp = reader.read())!= -1) {
			sb.append((char) cp);
		}
		
		return sb.toString();
	}
	
	private static JSONObject readJsonFromUrl(String url) throws  IOException, JSONException {
		InputStream is = new URL(url).openStream();
		try {
			BufferedReader br = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
			String jsonText = jsonReadAll(br);
			JSONObject json = new JSONObject(jsonText);		
			return json;		
		} finally {
			is.close();
		}
		
	}
   
	
}
