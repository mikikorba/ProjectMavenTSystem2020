package tjobs.service;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import org.springframework.stereotype.Component;

import tjobs.entity.jobsEntity;

@Component
@Transactional
public class jobsServiceJPA implements JobsService{

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public void addComment(jobsEntity job) {
		entityManager.persist(job);
		
	}

	@Override
	public List<jobsEntity> getAllJobs() {
		return (List<jobsEntity>)entityManager.createQuery("select j from jobsEntity j").getResultList();
	}

}
