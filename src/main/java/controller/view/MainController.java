package controller.view;

import java.io.File;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MainController {
    
	@RequestMapping(value="geo/index")
	public ModelAndView index(HttpServletRequest request, HttpServletResponse response) {
		String geoFile_path = "D:\\temp\\geo_success\\";
		  File dir = new File(geoFile_path);
	        System.out.println(dir.list());
		
		
		return new ModelAndView("index");
	}
}
