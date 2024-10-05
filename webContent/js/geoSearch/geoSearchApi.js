/**
 * 지오코딩 검색 api 구현 
 * SCOPE : "변수에 근접할 수 있는 범위" 
 * 자바스크립트는 function scope를 가지기 때문에 이를 통해 private scope를 가질 수 있다.
 *}(window, document)); 로 jQuery.함수 식으로 호출할 필요 없이 $ 로 접근가능 
 *깊게 이해해보기 : 
 */

(function(W, D) {
	W.$api = W.$api || {};
	var mapping_key_inex; // 1=1개 , 2=2개, 3=3개
	var query_check = false;
	var address;
	
	$api.request = {
			
			//로컬 서버 지오코딩 테스트 펑션
			api_result_local:function(){
				 var address = $(".input_box1").val();
				 if(address.length<1) {
				 Swal.fire({
					 title : '주소를 입력해주세요~!',		
				     icon : 'warning'		
				 });
				 return;
				 }		 
				var url = "http://localhost:8080/SOPOpenAPI/OpenAPI3/addr/geocode.json?accessToken=BYPASS&absmatch=1&address=";
				//location.href = url+address;
				window.open(url+address,"pop","width=300,heighbt=200,top=100,left100,location=yes");
				
			},
			//내부망 서버 지오코딩 테스트 펑션
			api_result_gsks:function(){
				var address = $(".input_box4").val();
				 if(address.length<1) {
				 Swal.fire({
					 title : '주소를 입력해주세요~!',		
				     icon : 'warning'		
				 });
				 return;
				 }
				var url = "http://10.175.80.206/SOPOpenAPI/OpenAPI3/addr/geocode.json?accessToken=BYPASS&absmatch=1&address=";
				//location.href = url+address;
				window.open(url+address,"pop","width=500,heighbt=500,top=100,left100,location=yes");
				
			},
			//컬럼 튜닝 함수
			column_combine:function(){                		
				var mapping_key1 = null;
				var mapping_key2 = null;
				var mapping_key3 = null;
				var main_address = null;
				var nvl_address = null;
				var table_name = null;
				var query = null;
				var last_query = null;
								
				mapping_key1 = $(".mapping_key1").val();
				mapping_key2 = $(".mapping_key2").val();
				mapping_key3 = $(".mapping_key3").val();
				main_address = $(".main_address").val();
				nvl_address = $(".nvl_address").val();
				table_name = $(".table_name").val();
				last_query = $(".last_query").val();
				
				//매핑키 1개일 경우
				if(mapping_key1!="" && mapping_key2=="" && mapping_key3=="" && main_address!="" && nvl_address!="") {//매핑키 1개에 도로명주소 + 지번주소
					query = "select"+" "+mapping_key1+", "+"NVL("+main_address + "," + nvl_address+") "+"from"+" "+table_name+" "+last_query;
					$(".input_box2").val(query);
					mapping_key_index = 1;
					//address_index = 3;
					address = "NVL("+main_address + ","+ nvl_address+")";
				}else if(mapping_key1!="" && mapping_key2=="" && mapping_key3=="" && main_address!="" && nvl_address=="") {//매핑키 1개에 도로명주소
				    query = "select"+" "+mapping_key1+", "+main_address+" "+"from"+" "+table_name+" "+last_query;
					$(".input_box2").val(query);	
					mapping_key_index = 1;
					//address_index = 1;
					address = main_address;
				}else if(mapping_key1!="" && mapping_key2=="" && mapping_key3=="" && main_address=="" && nvl_address!="") {//매핑키 1개에 지번주소
				    query = "select"+" "+mapping_key1+", "+nvl_address+" "+"from"+" "+table_name+" "+last_query;
					$(".input_box2").val(query);	
					mapping_key_index = 1;
					//address_index = 2;
					address = nvl_address;
				}
				
				//매핑키 2개일 경우
				if(mapping_key1!="" && mapping_key2!="" && mapping_key3=="" && main_address!="" && nvl_address!="") {//매핑키 2개에 도로명주소 + 지번주소
					query = "select"+" "+mapping_key1+", "+mapping_key2+", "+"NVL("+main_address+","+nvl_address+") "+"from"+" "+table_name+" "+last_query;
					$(".input_box2").val(query);
					mapping_key_index = 2;
					//address_index = 3;
					address = "NVL("+main_address+","+nvl_address+")";
				}else if(mapping_key1!="" && mapping_key2!="" && mapping_key3=="" && main_address!="" && nvl_address=="") {//매핑키 2개에 도로명주소
					query = "select"+" "+mapping_key1+", "+mapping_key2+", "+main_address+" "+"from"+" "+table_name+" "+last_query;
					$(".input_box2").val(query);	
					mapping_key_index = 2;
					//address_index = 1;
					address = main_address;
				}else if(mapping_key1!="" && mapping_key2!="" && mapping_key3=="" && main_address=="" && nvl_address!="") {//매핑키 2개에 지번주소
					query = "select"+" "+mapping_key1+", "+mapping_key2+", "+nvl_address+" "+"from"+" "+table_name+" "+last_query;
					$(".input_box2").val(query);	
					mapping_key_index = 2;
					//address_index = 2;
					address = nvl_address;
				}
				
				//매핑키 3개일 경우
				if(mapping_key1!="" && mapping_key2!="" && mapping_key3!="" && main_address!="" && nvl_address!="") {//매핑키 3개에 도로명주소 + 지번주소
					query = "select"+" "+mapping_key1+", "+mapping_key2+", "+mapping_key3+", "+"NVL("+main_address+","+nvl_address+") "+"from"+" "+table_name+" "+last_query;
					$(".input_box2").val(query);
					mapping_key_index = 3;
					//address_index = 3;
					address = "NVL("+main_address+","+nvl_address+")";
				}else if(mapping_key1!="" && mapping_key2!="" && mapping_key3!="" && main_address!="" && nvl_address=="") {//매핑키 3개에 도로명주소
					query = "select"+" "+mapping_key1+", "+mapping_key2+", "+mapping_key3+", "+main_address+" "+"from"+" "+table_name+" "+last_query;
					$(".input_box2").val(query);
					mapping_key_index = 3;
					//address_index = 1;
					address = main_address;
				}else if(mapping_key1!="" && mapping_key2!="" && mapping_key3!="" && main_address=="" && nvl_address!="") {//매핑키 3개에 지번주소
					query = "select"+" "+mapping_key1+", "+mapping_key2+", "+mapping_key3+", "+nvl_address+" "+"from"+" "+table_name+" "+last_query;
					$(".input_box2").val(query);	
					mapping_key_index = 3;
					//address_index = 2;
					address = nvl_address;
				}
				
				
				query_check = true;
			},	
			//쿼리 유효성 검사  ( sweetAlert2 라이브러리 사용 ) 
			query_validation:function(){ 
			 var mapping_key1_val = $(".mapping_key1").val(); //매핑키1 
			 var mapping_key2_val = $(".mapping_key2").val(); //매핑키2 
			 var mapping_key3_val = $(".mapping_key3").val(); //매핑키3 
			 
			 var main_address_val = $(".main_address").val(); //(주)주소
			 var nvl_address_val = $(".nvl_address").val(); //(부)주소
			 
			 var table_name_val = $(".table_name").val(); //테이블이름 
			 var last_query_val = $(".last_query").val(); //조건절 
			 
			 var eng_validation = /^[a-zA-z]+$/;
			 var query_validation = /^[a-zA-Z0-9\s]+$/; //조건절은 숫자,영어,띄워쓰기 허용
			 var table_validation = /^[a-zA-Z0-9_]+$/;

			 if(mapping_key1_val.length <1) {
				 Swal.fire({
					 title : '매핑키1의 값이 빈값입니다!',		
					 text : '매핑키1의 컬럼을 작성해주세요.',
				     icon : 'warning'		
				 });			
				 $(".mapping_key1").focus();
				 return;
			 }else if(!(eng_validation.test(mapping_key1_val))) {
				 Swal.fire({
					 title : '매핑키1의 값이 잘못되었습니다!',		
					 text : '매핑키1의 컬럼을 영어로만 작성해주세요.',
				     icon : 'warning'		
				 });
				 $(".mapping_key1").focus();
				 return;
			 }else if(mapping_key2_val.length>0 && !(eng_validation.test(mapping_key2_val))) {
				 Swal.fire({
					 title : '매핑키2의 값이 잘못되었습니다!',		
					 text : '매핑키2의 컬럼을 영어로만 작성해주세요.',
				     icon : 'warning'		
				 });
				 $(".mapping_key2").focus();
				 return;
			 }else if(mapping_key3_val.length>0 && !(eng_validation.test(mapping_key3_val))) {
				 Swal.fire({
					 title : '매핑키3의 값이 잘못되었습니다!',		
					 text : '매핑키3의 컬럼을 영어로만 작성해주세요.',
				     icon : 'warning'		
				 });
				 $(".mapping_key3").focus();
				 return;
			 }
			 
			 
			 
			 if(main_address_val.length <1) {
				 Swal.fire({
					 title : '(주)주소의 값이 빈값입니다!',		
					 text : '(주)주소의 컬럼을 작성해주세요.',
				     icon : 'warning'		
				 });
				 $(".main_address").focus();
				 return;
			 }else if(!(eng_validation.test(main_address_val))) {
				 Swal.fire({
					title : '(주)주소의 값이 잘못되었습니다!',		
					 text : '(주)주소의 컬럼을 영어로만 작성해주세요.',
				     icon : 'warning'		
				 });
				 $(".main_address").focus();
				 return;
			 }else if(nvl_address_val.length>0 && !(eng_validation.test(nvl_address_val))) {
				 Swal.fire({
					 title : '부(주소)의 값이 잘못되었습니다!',		
					 text : '부(주소)의 컬럼을 영어로만 작성해주세요.',
				     icon : 'warning'		
				 });
				 $(".nvl_address").focus();
				 return;
			 }
			 
			 if(table_name_val.length <1) {
				 Swal.fire({
					 title : '테이블의 값이 빈값입니다!',		
					 text : '테이블을 작성해주세요.',
				     icon : 'warning'		
				 });
				 $(".table_name").focus();
				 return;
			 }else if(!(table_validation.test(table_name_val))) {
				 Swal.fire({
						title : '테이블의 값이 잘못되었습니다!',		
						 text : '테이블의 컬럼을 올바르게 작성해주세요.',
					     icon : 'warning'		
					 });
				 $(".table_name").focus();
				 return;
			 }	
			 
//			 if(last_query_val.length>0 && !(query_validation.test(last_query_val))) {
//				 Swal.fire({
//					 title : '조건절 값이 잘못되었습니다!',		
//					 text : '조건절의 컬럼을 영어로만 작성해주세요.',
//				     icon : 'warning'		
//				 });
//				 $(".last_query").focus();
//				 return;
//			 }
			 
			 Swal.fire({
				 title :'쿼리가 작성완료 되었습니다.' ,
				 text : '순서2의 쿼리입력란을 보시면      완성된 쿼리가 적용되어 있습니다.',
				 icon : 'success'
			 });
			 $api.request.column_combine();
			},			
			
			//로컬 서버 지오코딩 (쿼리) 펑션
			api_query_local:function(){
				if(!(query_check)) { //작성완료 하지않고 지오코딩 실행하는 경우 return
					 Swal.fire({
							title : '먼저 순서1에서 컬럼를 작성해주세요!',		
							 text : '작성완료를 하여야 지오코딩을 실행하실 수 있습니다.',
						     icon : 'warning'		
						 });
					 return;
				}
			    var down_stat = $(".input_down_stat").val();
			    var title = null;
			    if(down_stat == "진행중") {
			    	 Swal.fire({
							title : '현재 지오코딩이 실행중에 있습니다!',		
							 text : '실행이 완료된 후 다시 실행해주세요~!',
						     icon : 'warning'		
						 });
					 return;
			    }
				
				Swal.fire({ //sweetAlert2 confirm 구현
					 title : "지오코딩을 실행하시겠습니까?" ,
					 icon : 'warning',
					 showCancelButton : true, 
					 confirmButtonColor : '#3085d6',
					 cancelButtonColor : '#d33',
					 confirmButtonText : '실행' ,
					 cancelButtonText : '취소',					 
				 }).then(result=>{
					 if(result.isConfirmed) {
						 $(".loading-container").css("display","block");
						 var fail_keyF = null;
							var fail_keyS = null;
							var fail_key = null;
							var mapping_key1 = null;
							var mapping_key2 = null;
							var mapping_key3 = null;
							var query = null;
							
						    mapping_key1 = $(".mapping_key1").val();
						    mapping_key2 = $(".mapping_key2").val();
						    mapping_key3 = $(".mapping_key3").val();	
						    query =  $(".input_box2").val();
																									
							$(".input_down_stat").val("진행중");
							$(".input_down_stat").css("color","red");
							
							$.ajax({
								type : "GET",
								url : "/geoAPI/query.json",
								data : {
									server : "local", //로컬
									query : query , //쿼리
									mapping_key_index : mapping_key_index ,//key 개수
									mapping_key1_column : mapping_key1,
									mapping_key2_column : mapping_key2,
									mapping_key3_column : mapping_key3,
									address_column : address
									//address_index : address_index // 주소 index
								},
								success : function(res){
									$(".loading-container").css("display","none");
									var query_error = res.query_error;
								   if(query_error!=undefined && query_error.length>0) {
									$(".input_down_stat").css("color","red");
									$(".input_down_stat").val("실패");
									Swal.fire({
										 title : '쿼리오류입니다!!!',		
										 text : '컬럼이 정확하게 작성되었는지 확인해주세요',
									     icon : 'warning'		
									 });
									 return;
									
								   }
									
								   if(type=1) {
							       $(".input_down_stat").css("color","blue");
							       $(".input_down_stat").val("완료");
								   }else if(type=2) {
								   $(".input_fail_stat").css("color","blue");
								   $(".input_fail_stat").val("완료");   
								   }
							        var fail_mapping_key1 = null;
							        var fail_mapping_key1F = null;
							        var fail_mapping_key1S = null;
							        
							       var fail_mapping_key2 = null;
							        var fail_mapping_key2F = null;
							        var fail_mapping_key2S = null;
							       
							       var fail_mapping_key3 = null;
							        var fail_mapping_key3F = null;
							        var fail_mapping_key3S = null;
							        
							       var fail_column_text = null; 

							       //실패한 키 값들 정리하여 튜닝 작업 시
							       //정규식 마지막 문자(,)없애기  / : 정규식 전체를 둘러싸고 있는 '/'는 정규식의 시작과 끝을 표시 
							       //                      , : 찾고 있는 콤마(,)문자
							       //                     \s : space 나 tab 과 같은 공백을 나타냄.
							       //                      * : 0번 이상을 의미 , 공백이 0번 이상을 의미 
							       //                      $ : 문자열의 끝을 의미함 
							       				       
//							       for(i=0;i<res.length;i++) {
//							    	   fail_keyF += res[i] + ","; 				    	   
//							       }
//							       fail_keyS = fail_keyF.split("null");//null 분리
//							       fail_key = "in("+fail_keyS[1].replace(/,\s*$/,"")+")";	//마지막 콤마값 빈값으로 replace함 
//							       $(".input_box3").val(fail_key);
//			                     컬럼 값 추가 해야함 
							       
							       for(i=0;i<res.fail_Mapping_key1.length;i++) {
							    	   fail_mapping_key1 += res.fail_Mapping_key1[i] + ",";		    	  
							       }
							       if(fail_mapping_key1 != undefined && fail_mapping_key1 != "" && fail_mapping_key1 != null) {//지오코딩 실패한데이터가 있을 때 
							    	   $(".fail_display").css("display","block");
								       fail_mapping_key1F = fail_mapping_key1.split("null");//null 분리
							    	   fail_mapping_key1S = "where"+" "+res.mapping_key1_column+" "+"in("+fail_mapping_key1F[1].replace(/,\s*$/,"")+")"; //마지막 콤마값 빈값으로 replace함
							    	   
							    	   if(res.mapping_key2_column != "") {
									       for(i=0;i<res.fail_Mapping_key2.length;i++) {
									    	   fail_mapping_key2 += res.fail_Mapping_key2[i] + ",";				    	  
									       }
									       fail_mapping_key2F = fail_mapping_key2.split("null");//null 분리
								    	   fail_mapping_key2S =" "+"and"+" "+res.mapping_key2_column+" "+"in("+fail_mapping_key2F[1].replace(/,\s*$/,"")+")"; //마지막 콤마값 빈값으로 replace함 
							    	   }
							    	   
							    	   if(res.mapping_key3_column != "") {
									       for(i=0;i<res.fail_Mapping_key3.length;i++) {
									    	   fail_mapping_key3 += res.fail_Mapping_key3[i] + ",";				    	
									       }
									       fail_mapping_key3F = fail_mapping_key3.split("null");//null 분리
								    	   fail_mapping_key3S = " "+"and"+" "+res.mapping_key3_column+" "+"in("+fail_mapping_key3F[1].replace(/,\s*$/,"")+")"; //마지막 콤마값 빈값으로 replace함 
								    	   }
								       
								       //완성 실패 조건 컬럼 
							    	   if(res.mapping_key2_column == "" && res.mapping_key3_column == "") {
							    		   fail_column_text = fail_mapping_key1S; 
							    	   }else if(res.mapping_key2_column != "" && res.mapping_key3_column == "") {
							    		   fail_column_text = fail_mapping_key1S + fail_mapping_key2S;
							    	   }else if(res.mapping_key2_column != "" && res.mapping_key3_column != "") {
							    		   fail_column_text = fail_mapping_key1S + fail_mapping_key2S + fail_mapping_key3S;
							    	   }			    	    			    	   
							    	   $(".fail_key_column").val(fail_column_text); //실패키 컬럼 적재
							    	   fail_mapping_key1 = null;
							       }else {
							    	   $(".fail_display").css("display","none");
							       }
						    	   
						    	   //실패한 데이터로 다시 지오코딩하기위한 주소 컬럼 적재						    	   
						    	   if($(".main_address").val() != "" && $(".nvl_address").val() !="") { //주 주소, 부 주소로 지오코딩 한경우만 change
						    		   $(".fail_main_address").val($(".nvl_address").val());
						    		   $(".fail_nvl_address").val($(".main_address").val());
						    	   }else{
						    		   
						    	   }
						    	   
						    	   //alert 실패한 데이터가 있을 떄 , 없을 때 
						    	   if(fail_mapping_key1 != undefined) { // 있을 때 
						    		   Swal.fire({
											 title :'지오코딩이 완료되었습니다!' ,
											 text : '실패한 데이터로 자동 생성된 컬럼을 적용하여    다시 지오코딩을 실행해 보세요~',
											 icon : 'success'
										 });
						    	   }else {
						    		   Swal.fire({ // 없을 때 
											 title :'지오코딩이 완료되었습니다!' ,
											 text : '순서3에서 파일을 다운로드 하세요~',
											 icon : 'success'
										 });
						    	   }	
						    	   query_check=false;
								}							
							});	 
					 }					 
				 });
				
				
			},
			//실패한 컬럼 적용
			change_column(type){
				if(type=="address") {//주소 적용
					Swal.fire({ //sweetAlert2 confirm 구현
						 title : '바뀐 주소 컬럼을 적용하시겠습니까?' ,
						 icon : 'warning',
						 showCancelButton : true, 
						 confirmButtonColor : '#3085d6',
						 cancelButtonColor : '#d33',
						 confirmButtonText : '실행' ,
						 cancelButtonText : '취소',					 
					 }).then(result=>{
						 if(result.isConfirmed) {
							    var main_address = $(".fail_main_address").val(); 
								var nvl_address	= $(".fail_nvl_address").val(); 
								$(".main_address").val(main_address);
								$(".nvl_address").val(nvl_address);	
								Swal.fire({
									 title :'바뀐 주소 컬럼이 적용 되었습니다.' ,
									 text : '순서1의 주소컬럼란을 보시면 바뀐 컬럼이 적용되어 있습니다.',
									 icon : 'success'
								 });
						 }
					 });
								
				}else if(type=="last_query") {//조건절 적용					
					Swal.fire({ //sweetAlert2 confirm 구현
						 title : '바뀐 주소 컬럼을 적용하시겠습니까?' ,
						 icon : 'warning',
						 showCancelButton : true, 
						 confirmButtonColor : '#3085d6',
						 cancelButtonColor : '#d33',
						 confirmButtonText : '실행' ,
						 cancelButtonText : '취소',					 
					 }).then(result=>{
						 if(result.isConfirmed) {
							    var last_query = $(".fail_key_column").val();
								$(".last_query").val(last_query);
								Swal.fire({
									 title :'바뀐 조건 컬럼이 적용 되었습니다.' ,
									 text : '순서1의 조건 컬럼란을 보시면 바뀐 컬럼이 적용되어 있습니다.',
									 icon : 'success'
								 });
						 }
					 });
				}
				
			},
			
			
			//내부망 서버 지오코딩 (쿼리) 펑션
//			api_query_gsks:function(){
//				var query =  $(".input_box5").val();
//				$(".input_down_stat2").val("진행중");
//				$(".input_down_stat2").css("color","red");
//								
//				$.ajax({
//					type : "GET",
//					url : "/geoAPI/query.json",
//					data : {
//						server : "gsks", //내부망
//						query : query,
//					},
//					success : function(res){
//						$(".input_down_stat2").css("color","blue");
//						$(".input_down_stat2").val("완료");
//						
//					}
//
//					
//				});
//			},
			captureDown:function(){
				html2canvas($(".index")[0], {
	    			logging: false,
	    			useCORS: false,
	    		}).then(function(canvas) {
	    			var title = "인덱스 캡처";
	    			
	    			var a = document.createElement('a');
	    			a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

	    			a.download = title+".png";
	    			a.click();	    				    	
	    		});									
			},			
			
            file_list:function(type){
				var down_stat = $(".input_down_stat").val();
				if(down_stat == "진행중") {
				 Swal.fire({
						title : '현재 지오코딩이 실행중에 있습니다!',		
						 text : '실행이 완료된 후 다시 실행해주세요~!',
					     icon : 'warning'		
					 });
				 return;
				}
				location.href = "/geo/fileList?type=" + type;
			},
			geoCode_file_downLoad:function(class_num,type){
				var title; 
				if(type=="success") {
					title = "지오코딩 성공파일을 다운받으시겠습니까?";
				}else if(type=="fail") {
					title = "지오코딩 실패파일을 다운받으시겠습니까?";
				}
				Swal.fire({ //sweetAlert2 confirm 구현
					 title : title ,
					 icon : 'warning',
					 showCancelButton : true, 
					 confirmButtonColor : '#3085d6',
					 cancelButtonColor : '#d33',
					 confirmButtonText : '확인' ,
					 cancelButtonText : '취소',					 
				 }).then(result=>{
					 if(result.isConfirmed) {
							var down_list_class = ".down_list"+class_num;
							var file_name = $(down_list_class).text();							
							location.href = "/geoAPI/fileDown.json?file_name="+file_name+"&type="+type;							
					 }
				 });
			
				
				
			},
			
			fail_key_copy_local:function(){
				window.navigator.clipboard.writeText(fail_key_column.value).then(()=>{					
					alert("복사완료");
				})
			
			},
			
			

			bulkInsert:function(){
				$.ajax({
					type : "GET",
					url : "/geoAPI/bulk.json",
					data : {
					},
					success : function(res){
						
					}
				});	
			},
			
	}
}(window, document));