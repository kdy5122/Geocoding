package api.geoAPI;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.ibatis.mapping.FetchType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class GeoFile {
	
//파일 다운로드 로직
@RequestMapping("/geoAPI/fileDown.json")	
    public Map<String, Object> fileDown(HttpServletRequest request ,HttpServletResponse response) throws IOException {
	String file_Path = null;
	String down_File_Path = null;
	String file_name = request.getParameter("file_name");
	String type = request.getParameter("type");
         if(type.equals("success")) {
        	 file_Path="D:\\temp\\geo_success\\"+file_name;
         }else if(type.equals("fail")) {
        	 file_Path="D:\\temp\\geo_fail\\"+file_name;
         }
    	 
    	 down_File_Path=file_name;

	
	try {
		File file = new File(file_Path);
		response.setHeader("Content-Disposition", "attachment;filename="+down_File_Path);
		
		FileInputStream fileInputstream = new FileInputStream(file_Path);
		OutputStream out = response.getOutputStream();
		int read = 0;
		byte[] buffer = new byte[1024];
		while ((read = fileInputstream.read(buffer))!=-1) {
			out.write(buffer, 0, read);		
		}
	} catch (FileNotFoundException e) {
		System.out.println("FileNotFoundException 오류"+e.getMessage());
	} catch (IOException e) {
		System.out.println("IOException" + e.getMessage());
	}
	

	 return null;
    }
}
