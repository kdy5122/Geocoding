<%@page import="org.apache.poi.util.SystemOutLogger"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.List" %> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>  
<!DOCTYPE html>
<html>
<%!
List file_list;
List file_list_num;
int list_size;
Map geo_file_list;
String type = "fail";
%>
<%

try{
System.out.println("맵확인"  + request.getAttribute("list"));
System.out.println("파일 넘버 리스트 확인" + request.getAttribute("file_num_list"));
file_list_num = (List)request.getAttribute("file_num_list");
file_list = (List)request.getAttribute("list");

//file_list = (List)map.get("list");
//list_size = file_list.size();

// for(int i=0;i<file_list.size();i++){
// test =(String)file_list.get(i);
// 	System.out.println("file_list get확인"  + file_list.get(i));
// }
//System.out.println("스트링 확인" + file_list);
}catch(Exception e){
	System.out.println("예외발생"+e.getMessage());
}
%>
<head>
<meta charset="EUC-KR">
<style>
	 a{text-decoration: none; }       
</style>
<title>Insert title here</title>
	<link rel="stylesheet" type="text/css" href="/css/indexcss.css">   		
        <link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
        <link rel="stylesheet" type="text/css" href="/css/jquery.mCustomScrollbar.css" />
        <link rel="stylesheet" type="text/css" href="/lib/sweetAlert2/alertCss.css" />
        <script src="/js/plugins/jquery.min.js"></script> 
        <script src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>
        <script src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>
        <script src="/js/plugins/jquery.wheelcolorpicker.js"></script>
        <script src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
        <script src="/js/plugins/EasyTree/jquery.easytree.min.js"></script>
        <script src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>    
        <script src="/js/plugins/jquery.sha256.js"></script>
        <script src="/js/plugins/jquery.tagsinput.min.js"></script>
        <script src = "../js/geoSearch/geoSearchApi.js"></script>
        <script src="/js/plugins/imageCapture/rgbcolor.js"></script>
        <script src="/js/plugins/imageCapture/canvg.js"></script>
        <script src="/js/plugins/imageCapture/html2canvas.js"></script>
        <script src="/js/plugins/imageCapture/html2canvas.svg.js"></script>
        <script src="../../lib/sweetAlert2/alertJs.js"></script> 
</head>
<body>
<table class="geo_files">
<div id="outter">
 <h2 class = "h21"> 지오코딩 실패 파일 다운로드 </h2>
<div style = "text-align: right;">
      <button type = "button" class="btn01" onclick = "location.href='http://localhost:8080/geo/index'">HOME 화면
 	  </button>
 	   <button type = "button" class="btn01" onclick = "javascript:$api.request.file_list('success')">성공 파일목록 보기
 	  </button>
</div>
  <tr>
         <td style="width:20px;border:3px solid rgb(233,233,233);height:30px;text-align:center;">
            번호
         </td>  
         <td style="width:150px;border:3px solid rgb(233,233,233);text-align:center;">
            지오코딩 실패 파일 목록  
         </td>
          <td style="width:40px;border:3px solid rgb(233,233,233);text-align:center;">
            다운로드	
         </td>
  </tr>
<%for(int i=0;i<file_list.size();i++){ %>  
<tr>
         <td style="width:20px;border:3px solid rgb(233,233,233);">
            <div class = "file_num" style = "text-align:center;">
                <%=file_list_num.get(i)%>
            </div>
         </td>  
         <td style="width:150px;border:3px solid rgb(233,233,233);">
            <div id = "file_down_list">
                  
                      <ul>
                      <li class = "down_list<%=i%>" style="text-align:center;"><%=file_list.get(i)%></li>                     
                     </ul>
                   
            </div>
         </td>
         <td style="width:25px;border:3px solid rgb(233,233,233);text-align: center;">
            <div id = "file_down_list">
                 <button type = "button" class="geo-success-down btn01" onclick = "javascript:$api.request.geoCode_file_downLoad(<%=i%>,'fail')">다운로드
 	             </button> 
                   
            </div>
         </td>
  </tr>
  <%}%>  
</table>
<div style="display:block;text-align:center;">
   <c:if test="${paging.startPage !=1 }">
     <a href = "/geo/fileList?nowPage=${paging.startPage-1}&cntPerPage=${paging.cntPerPage}&type=<%=type%>">&lt;</a>
   </c:if>
   <c:forEach begin = "${paging.startPage}" end = "${paging.endPage}" var = "p">
       <c:choose>
          <c:when test="${p == paing.nowPage}">
               <b>${p }</b>
          </c:when>
          <c:when test="${p != paing.nowPage}">
               <a href = "/geo/fileList?nowPage=${p }&cntPerPage=${paging.cntPerPage}&type=<%=type%>">${p }</a>
          </c:when>
       </c:choose>
   </c:forEach>   
   <c:if test = "${paging.endPage != paging.lastPage }">
     <a href = "/geo/fileList?nowPage=${paging.endPage+1}&cntPerPage=${paging.cntPerPage}&type=<%=type%>">&gt;</a>
   </c:if>
   </div>
</div>   
</body>
</html>