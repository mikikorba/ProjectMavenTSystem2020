package tjobs.service;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import org.springframework.stereotype.Component;

import tjobs.entity.Job;

@Component
@Transactional
public class jobsServiceJPA implements JobsService{

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public void addComment(Job job) {
		entityManager.persist(job);
		
	}

	@Override
	public List<Job> getAllJobs() {
		return (List<Job>)entityManager.createQuery("select j from jobsEntity j").getResultList();
	}

}
