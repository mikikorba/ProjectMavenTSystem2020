package tjobs.service;

import java.util.List;

import tjobs.entity.jobsEntity;

public interface JobsService {

	void addComment(jobsEntity job);

	List<jobsEntity> getAllJobs();

}
