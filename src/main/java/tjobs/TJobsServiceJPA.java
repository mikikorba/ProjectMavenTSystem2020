package tjobs;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Component;

@Component
@Transactional
public class TJobsServiceJPA {

	@PersistenceContext
	private EntityManager entityManager;

	public void addJobs(TJobsEntity job) {
		entityManager.persist(job);
	}

}
