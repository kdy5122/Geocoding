<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="EUC-KR"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>

<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>

  		<link rel="stylesheet" type="text/css" href="/css/indexcss.css"> 
  		<link rel="stylesheet" type="text/css" href="/css/loading.css">  		
        <link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
        <link rel="stylesheet" type="text/css" href="/css/jquery.mCustomScrollbar.css" />
        <link rel="stylesheet" type="text/css" href="/lib/sweetAlert2/alertCss.css" />
        <script src="../lib/sweetAlert2/alertJs.js"></script>
        <script src="/js/plugins/jquery.min.js"></script> 
        <script src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>
        <script src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>
        <script src="/js/plugins/jquery.wheelcolorpicker.js"></script>
        <script src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
        <script src="/js/plugins/EasyTree/jquery.easytree.min.js"></script> 
        <script src="/js/plugins/jquery.sha256.js"></script>
        <script src="/js/plugins/jquery.tagsinput.min.js"></script>
        <script src = "../js/geoSearch/geoSearchApi.js"></script>
        <script src="/js/plugins/imageCapture/rgbcolor.js"></script>
        <script src="/js/plugins/imageCapture/canvg.js"></script>
        <script src="/js/plugins/imageCapture/html2canvas.js"></script>
        <script src="/js/plugins/imageCapture/html2canvas.svg.js"></script> 
        <script src="../../../js/plugins/jquery.highlight.js"></script> 
        
</head>
<body>

<table class="index">
<div style = "width: 450px; margin: auto;">
<h2 class = "h21">�����ڵ� ���α׷� version 2</h2>

</div>
<tr>
<th rowspan= '2' style="width:150px;border:3px solid rgb(233,233,233);">���� �����ڵ�</th>
	<td style = "border:3px solid rgb(233,233,233);" ><h3>�����ڵ� �׽�Ʈ</h3>
	     <div class="search"> 
	        <input class="input_label" type="text" style = "font-size:13px; width:80px;text-align: center;" readonly="readonly" value = "�ּ��Է�">
	        <input class="input_box1 text_box" type="text" style ="font-size:13px;" name="address" value="">
	        <button type = "button" class="btn btn01" onclick = "javascript:$api.request.api_result_local()"> �˻����� </button> 
	     </div>
	     <br>
	</td>	
</tr>

<tr>

	<td>
	<div style = "border:3px solid rgb(233,233,233);"> 
	   <h3>������ �����ڵ�</h3>
	   <li><h4>����1 : �÷� �ۼ�</h4></li>
	     <div id = "test">
	        <input class="input_label" type="text" style = "font-size:13px; width:80px;text-align: center;" readonly="readonly" value = "����Ű1">
	        <input class="mapping_key1 text_box" type="text" style ="font-size:13px;width:59px;" name="query" value = "">
	        <input class="" type="text" style = "border:none; width:38px;" readonly="readonly" value = "���ʼ�"/>
	        <input class="input_label" type="text" style = "font-size:13px; width:80px;text-align: center;" readonly="readonly" value = "����Ű2">
	        <input class="mapping_key2 text_box" type="text" style ="font-size:13px;width:59px;" name="query" value = "">
	        <input class="input_label" type="text" style = "font-size:13px; width:80px;text-align: center;" readonly="readonly" value = "����Ű3">
	        <input class="mapping_key3 text_box" type="text" style ="font-size:13px;width:59px;" name="query" value = "">
	     </div>
	     <div>
	        <input class="input_label" type="text" style = "font-size:13px; width:80px;text-align: center;" readonly="readonly" value = "(��) �ּ�">
	        <input class="main_address text_box" type="text" style ="font-size:13px;width:110px;" name="query" value = "">
	        <input class="" type="text" style = "border:none; width:38px;" readonly="readonly" value = "���ʼ�"/>
	        <input class="input_label" type="text" style = "font-size:13px; width:80px;text-align: center;" readonly="readonly" value = "(��) �ּ�">
	        <input class="nvl_address text_box" type="text" style ="font-size:13px;width:110px;" name="query" value = "">	        
	     </div>
	     <div>
	         <input class="input_label" type="text" style = "font-size:13px; width:80px;text-align: center;" readonly="readonly" value = "���̺� �̸�">
	         <input class="table_name text_box" type="text" style ="font-size:13px;width:110px;" name="query" value = "">
	         <input class="" type="text" style = "border:none; width:38px;" readonly="readonly" value = "���ʼ�"/>
	         <input class="input_label" type="text" style = "font-size:13px; width:80px;text-align: center;" readonly="readonly" value = "������">
	         <input class="last_query text_box" type="text" style ="font-size:13px;width:110px;" name="query" value = "">
<!--  	         <button type = "button" class="btn btn01"  onclick = "javascript:$api.request.column_combine()">�ۼ��Ϸ�</button>	    -->
	         <button type = "button" class="btn btn01"  onclick = "javascript:$api.request.query_validation()">�ۼ��Ϸ�</button>        
	     </div>    	         
	     <div class="search">
	     <li><h4>����2 : �ۼ��� ������ �����ڵ� ����<h4></h4></li> 
	        <input class="input_label" type="text" style = "font-size:13px; width:80px;text-align: center;" readonly="readonly" value = "����">
	        <input class="input_box2 text_box" type="text" style ="font-size:13px; width:320px;" name="query" value = "" readonly="readonly">
	        <button type = "button" class="btn btn01" onclick = "javascript:$api.request.api_query_local(1)"> �����ڵ� ���� </button> 
	     </div>
	     <div>
	      <input class="input_label" type="text" style = "font-size:13px; width:80px; text-align:center;" readonly="readonly" value = "����â">
	      <input class="input_down_stat" type="text" style = "font-size:13px; width:80px; text-align:center;" readonly="readonly" value = "�������">	  
	           <div class="loading-container" style = "display:none;" >
                 <div class="loading"></div>
                 <div id="loading-text">loading</div>
               </div>	       
	     </div>
	     <div>
	     <li><h4>����3 : ���� �ٿ�ε�</h4></li> 
	     <input class="input_label" type="text" style = "font-size:13px; width:80px;text-align: center;" readonly="readonly" value = "���ϴٿ�">
	      <button type = "button" class="geo-success-down btn01" onclick = "javascript:$api.request.file_list('success')">���� ���ϸ�� ����
 	      </button>
 	      <button type = "button" class="geo-success-down btn01" onclick = "javascript:$api.request.file_list('fail')">���� ���ϸ�� ����
 	      </button>	   
	     </div>	
	     <br>    
	 </div>	 
     
<div class="fail_display" style = "display:none;border:3px solid rgb(233,233,233);">  
         <h3>������ ������ �ڵ� �÷�����</h3>

	     <div>
	        <input class="input_label" type="text" style = "font-size:13px; width:80px;text-align: center;" readonly="readonly" value = "(��) �ּ�">
	        <input class="main_address fail_main_address text_box" type="text" style ="font-size:13px;width:110px;" name="query" value = "">     
	        <input class="input_label" type="text" style = "font-size:13px; width:80px;text-align: center;" readonly="readonly" value = "(��) �ּ�">
	        <input class="nvl_address fail_nvl_address text_box" type="text" style ="font-size:13px;width:110px;" name="query" value = "">	     
            <button type = "button" class="btn btn01"  onclick = "javascript:$api.request.change_column('address')">�÷�����</button>
	     </div>
	      <div>
	        <input class="input_label" type="text" style = "font-size:13px; width:80px;text-align: center;" readonly="readonly" value = "������">
	        <input class="fail_key_column text_box" type="text" style ="font-size:13px;width:270px;" name="query" value = "">	
	        <button type = "button" id="fail_key_copy_local"  onclick = "javascript:$api.request.fail_key_copy_local()">�����ϱ�
	        <button type = "button" class="btn btn01"  onclick = "javascript:$api.request.change_column('last_query')">�÷�����</button>	      	        
	        </button>             
	     </div>
</div>	     
	</td>
</tr>

<tr>
<!-- <th rowspan= '2'>���θ� �����ڵ�</th> -->
<th style = "border:3px solid rgb(233,233,233);">���θ� �����ڵ�</th>
	<td style = "border:3px solid rgb(233,233,233);"><h3>�����ڵ� �׽�Ʈ</h3>
	     <div class="search"> 
	        <input class="input_label" type="text" style = "font-size:13px; width:80px;text-align: center;" readonly="readonly" value = "�ּ��Է�">
	        <input class="input_box4 text_box" type="text" style ="font-size:13px;" name="address" value = "">
	        <button type = "button" class="btn btn01" onclick = "javascript:$api.request.api_result_gsks()"> �˻����� 	        
	        </button> 	       
	     </div>
	      <br>
	</td>
</tr>

<!-- <tr> -->
<!--     <td><li>���θ� ���� ������ ���� �ڵ� (mapping_key,address)</li> -->
<!-- 	     <div class="search">  -->
<!-- 	        <input class="input_label" type="text" style = "font-size:13px; width:80px;text-align: center;" readonly="readonly" value = "�����Է�"> -->
<!-- 	        <input class="input_box5 text_box" type="text" style ="font-size:13px;" name="query" value = ""> -->
<!-- 	        <button type = "button" class="btn btn01" onclick = "javascript:$api.request.api_query_gsks()"> �����ڵ� ���� </button>  -->
<!-- 	     </div> -->
<!-- 	     <div> -->
<!-- 	      <input class="input_label" type="text" style = "font-size:13px; width:80px; text-align:center" readonly="readonly" value = "����â"> -->
<!-- 	      <input class="input_down_stat2" type="text" style = "font-size:13px; width:80px; text-align:center" readonly="readonly" value = "�������">	   -->
<!-- 	     </div> -->
<!-- 	     <div> -->
<!-- 	     <input class="input_label" type="text" style = "font-size:13px; width:80px;text-align: center;" readonly="readonly" value = "���ϴٿ�"> -->
<!-- 	      <button type = "button" class="geo-success-down btn01" onclick = "javascript:$api.request.geoCodeS_gsks_down()">�������� �ٿ�ε� -->
<!-- 	       </button>	      -->
<!-- 	       <button type = "button" class="geo-fail-down btn01" onclick = "javascript:$api.request.geoCodeF_gsks_down()">�������� �ٿ�ε�	      	         -->
<!-- 	       </button> -->
<!-- 	     </div> -->
<!-- 	     <div> -->
<!-- 	     <div> -->
<!-- 	      <input class="input_label" type="text" style = "font-size:13px; width:80px; text-align:center;" readonly="readonly" value = "failcolumn"> -->
<!-- 	      <input class="input_box6 text_box" type="text" style ="font-size:13px;" name="query" value = "" readonly="readonly"> -->
<!-- 	     </div> -->
<!-- 	</td>  -->
<!-- </tr> -->



<tr>
 <th style = "border:3px solid rgb(233,233,233);">ĸó</th>
 <td style = "border:3px solid rgb(233,233,233);">
  <button type = "button" class="capture_Down btn01" onclick = "javascript:$api.request.captureDown()"> �ٿ�ε� </button> 
 </td>
</tr>


</table>
</body>
</html>