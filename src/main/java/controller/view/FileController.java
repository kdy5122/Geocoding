package controller.view;
import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class FileController {

	@RequestMapping(value="/geo/fileList")
	public ModelAndView index(PagingVO vo, Model model,HttpServletRequest request, HttpServletResponse response) {
		
		//파일 리스트 가져오기
	String type = request.getParameter("type");
	String geoFile_path = null;
//		List file_name = new ArrayList();
		if(type.equals("success")) { //성공파일 목록 불러오기
			geoFile_path = "D:\\temp\\geo_success\\";
		}else if(type.equals("fail")) { //실패파일 목록 불러오기
			geoFile_path = "D:\\temp\\geo_fail\\";
		}
		
		File dir = new File(geoFile_path);
		String[] file_list = dir.list();		
	    Map geo_file_list = new HashMap();
	    List paging_file_list = new ArrayList(); 
	    List paging_file_num = new ArrayList();

       //맵 키 : number ,  value : 파일이름 작업 DB쓰지않고 페이징처리하기 위한 작업 
	    Arrays.sort(file_list,Collections.reverseOrder());
       for(int i=0;i<file_list.length;i++) {
    	   geo_file_list.put(i, file_list[i]);
       }
       
        System.out.println("geo_file_list 작업 결과 @@@@@@ " + geo_file_list.get(1));
		//페이징 처리 
		int total = geo_file_list.size();
		System.out.println("total 확인" + total);
		String nowPage = request.getParameter("nowPage");
		//System.out.println("nowPage 확인" + nowPage);
		String cntPerPage = request.getParameter("cntPerPage");
		//System.out.println("cntPerPage 확인" + cntPerPage);		
//		int total = file_name.size();
		
		//해당하는 페이지에 맞게 파일 list 추출 (DB없이)
		//int file_total_cnt = (int)Math.ceil((double)total / (double)Integer.parseInt(request.getParameter("cntPerPage")));
		

		if(nowPage == null && cntPerPage == null) {
			 nowPage = "1";
			 cntPerPage = "10";
		} else if(nowPage == null) {
			 nowPage = "1";
		} else if( cntPerPage == null) {
			 cntPerPage = "10";
		}
		System.out.println("nowPage확인 : " + nowPage);
		System.out.println("cntPerPage 확인 : "+cntPerPage);
        int file_start_index = (Integer.parseInt(nowPage)-1) * (Integer.parseInt(cntPerPage));
		int endPage = (int)Math.ceil((double)total / (double)(Integer.parseInt(cntPerPage)));
		int file_list_cnt;
		
		//마지막 페이지 파일개수가 cntPerPage 미만일 때 처리 	
		if(endPage == Integer.parseInt(nowPage) && total > Integer.parseInt(cntPerPage)) {			
            file_list_cnt = total % Integer.parseInt(cntPerPage); //total을 cntPerPage를 나눈 나머지값을 cnt에 적용
		}else{
			file_list_cnt = Integer.parseInt(cntPerPage);
		}		
		System.out.println("확인 file_list_cnt"+file_list_cnt);
		for(int i= 0 ;i<file_list_cnt;i++) {
			paging_file_list.add(geo_file_list.get(file_start_index+i));
			paging_file_num.add(file_start_index+i+1);
		}

		vo = new PagingVO(total , Integer.parseInt(nowPage),Integer.parseInt(cntPerPage));
        model.addAttribute("paging", vo);
        model.addAttribute("file_num_list", paging_file_num);
        if(type.equals("success")) {
         return new ModelAndView("file/fileSdown","list",paging_file_list);
        }else{
         return new ModelAndView("file/fileFdown","list",paging_file_list);
        }
		
	}


	
	
}
