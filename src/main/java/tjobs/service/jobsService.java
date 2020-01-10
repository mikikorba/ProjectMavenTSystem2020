package tjobs.service;

import java.util.List;

import tjobs.entity.jobsEntity;

public interface jobsService {

	void addComment(jobsEntity job);

	List<jobsEntity> getAllJobs();

}
