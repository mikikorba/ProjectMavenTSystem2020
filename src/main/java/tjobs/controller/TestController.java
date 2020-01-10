package tjobs.controller;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.WebApplicationContext;

import tjobs.entity.jobsEntity;

@Controller
@Scope(WebApplicationContext.SCOPE_SESSION)
public class TestController {

	@Autowired
	private tjobs.service.jobsService jobsService;

	@RequestMapping("/")
	public String index() {
		
//		jobsService.addComment(new jobsEntity("hello"));
		
		System.out.println(jobsService.getAllJobs().get(0).getDgkjhb());
		
		return "index";
	}

}
