package tjobs.service;

import java.util.List;

import tjobs.entity.Job;

public interface JobsService {

	void addComment(Job job);

	List<Job> getAllJobs();

}
