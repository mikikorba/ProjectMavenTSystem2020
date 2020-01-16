package tjobs.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import tjobs.entity.jobsEntity;
import tjobs.service.JobsService;

@RestController
public class JobsRestController {
	@Autowired
	private JobsService jobsService;
	
	@RequestMapping(path = "/api/jobs", method = RequestMethod.GET)
	List<jobsEntity> getAllJobs() {
		return jobsService.getAllJobs();
	}
}
