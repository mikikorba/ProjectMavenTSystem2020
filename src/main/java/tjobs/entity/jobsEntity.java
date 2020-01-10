package tjobs.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class jobsEntity {
	@Id
	@GeneratedValue
	private int ident;

	String dgkjhb;

	public jobsEntity() {
	}

	public jobsEntity(String dgkjhb) {
		this.dgkjhb = dgkjhb;
	}

	public String getDgkjhb() {
		return dgkjhb;
	}
}
