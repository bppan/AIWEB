package cn.edu.aicourse.dao.impl;

import java.util.List;

import org.hibernate.LockMode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import cn.edu.aicourse.dao.IUserMessageDAO;
import cn.edu.aicourse.entity.UserMessage;

/**
 * A data access object (DAO) providing persistence and search support for
 * UserMessage entities. Transaction control of the save(), update() and
 * delete() operations can directly support Spring container-managed
 * transactions or they can be augmented to handle user-managed Spring
 * transactions. Each of these methods provides additional information for how
 * to configure it for the desired type of transaction control.
 * 
 * @see cn.edu.aicourse.entity.UserMessage
 * @author MyEclipse Persistence Tools
 */
public class UserMessageDAOImpl extends HibernateDaoSupport implements IUserMessageDAO {
	private static final Logger log = LoggerFactory
			.getLogger(UserMessageDAOImpl.class);
	// property constants
	public static final String USER_ID = "userId";
	public static final String USER_SEX = "userSex";
	public static final String USER_BIRTH_DATE = "userBirthDate";
	public static final String USER_GRADUATE_SCHOOL = "userGraduateSchool";
	public static final String USER_DEGREE = "userDegree";
	public static final String USER_MAJOR = "userMajor";
	public static final String USER_POST = "userPost";
	public static final String USER_COLLAGE = "userCollage";
	public static final String USER_JOB_TITLE = "userJobTitle";
	public static final String USER_LABORATORY = "userLaboratory";
	public static final String USER_OFFICE_PHONE = "userOfficePhone";
	public static final String USER_EMAIL = "userEmail";
	public static final String USER_ADDRESS = "userAddress";
	public static final String USER_POSTCODE = "userPostcode";
	public static final String USER_RESUME = "userResume";
	public static final String USER_RESEARCH_DIRECTION = "userResearchDirection";
	public static final String USER_TEACH_WORK = "userTeachWork";
	public static final String USER_AWARDS = "userAwards";
	public static final String USER_BOOK = "userBook";
	public static final String USER_JOB = "userJob";

	protected void initDao() {
		// do nothing
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IUserMessageDAO#save(cn.edu.aicourse.entity.UserMessage)
	 */
	@Override
	public void save(UserMessage transientInstance) {
		log.debug("saving UserMessage instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IUserMessageDAO#delete(cn.edu.aicourse.entity.UserMessage)
	 */
	@Override
	public void delete(UserMessage persistentInstance) {
		log.debug("deleting UserMessage instance");
		try {
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IUserMessageDAO#findById(java.lang.Integer)
	 */
	@Override
	public UserMessage findById(java.lang.Integer id) {
		log.debug("getting UserMessage instance with id: " + id);
		try {
			UserMessage instance = (UserMessage) getHibernateTemplate().get(
					"cn.edu.aicourse.entity.UserMessage", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(UserMessage instance) {
		log.debug("finding UserMessage instance by example");
		try {
			List results = getHibernateTemplate().findByExample(instance);
			log.debug("find by example successful, result size: "
					+ results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}

	public List findByProperty(String propertyName, Object value) {
		log.debug("finding UserMessage instance with property: " + propertyName
				+ ", value: " + value);
		try {
			String queryString = "from UserMessage as model where model."
					+ propertyName + "= "+ value;
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IUserMessageDAO#findByUserId(java.lang.Object)
	 */
	@Override
	public List findByUserId(Object userId) {
		return findByProperty(USER_ID, userId);
	}

	public List findByUserSex(Object userSex) {
		return findByProperty(USER_SEX, userSex);
	}

	public List findByUserBirthDate(Object userBirthDate) {
		return findByProperty(USER_BIRTH_DATE, userBirthDate);
	}

	public List findByUserGraduateSchool(Object userGraduateSchool) {
		return findByProperty(USER_GRADUATE_SCHOOL, userGraduateSchool);
	}

	public List findByUserDegree(Object userDegree) {
		return findByProperty(USER_DEGREE, userDegree);
	}

	public List findByUserMajor(Object userMajor) {
		return findByProperty(USER_MAJOR, userMajor);
	}

	public List findByUserPost(Object userPost) {
		return findByProperty(USER_POST, userPost);
	}

	public List findByUserCollage(Object userCollage) {
		return findByProperty(USER_COLLAGE, userCollage);
	}

	public List findByUserJobTitle(Object userJobTitle) {
		return findByProperty(USER_JOB_TITLE, userJobTitle);
	}

	public List findByUserLaboratory(Object userLaboratory) {
		return findByProperty(USER_LABORATORY, userLaboratory);
	}

	public List findByUserOfficePhone(Object userOfficePhone) {
		return findByProperty(USER_OFFICE_PHONE, userOfficePhone);
	}

	public List findByUserEmail(Object userEmail) {
		return findByProperty(USER_EMAIL, userEmail);
	}

	public List findByUserAddress(Object userAddress) {
		return findByProperty(USER_ADDRESS, userAddress);
	}

	public List findByUserPostcode(Object userPostcode) {
		return findByProperty(USER_POSTCODE, userPostcode);
	}

	public List findByUserResume(Object userResume) {
		return findByProperty(USER_RESUME, userResume);
	}

	public List findByUserResearchDirection(Object userResearchDirection) {
		return findByProperty(USER_RESEARCH_DIRECTION, userResearchDirection);
	}

	public List findByUserTeachWork(Object userTeachWork) {
		return findByProperty(USER_TEACH_WORK, userTeachWork);
	}

	public List findByUserAwards(Object userAwards) {
		return findByProperty(USER_AWARDS, userAwards);
	}

	public List findByUserBook(Object userBook) {
		return findByProperty(USER_BOOK, userBook);
	}

	public List findByUserJob(Object userJob) {
		return findByProperty(USER_JOB, userJob);
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IUserMessageDAO#findAll()
	 */
	@Override
	public List findAll() {
		log.debug("finding all UserMessage instances");
		try {
			String queryString = "from UserMessage";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public UserMessage merge(UserMessage detachedInstance) {
		log.debug("merging UserMessage instance");
		try {
			UserMessage result = (UserMessage) getHibernateTemplate().merge(
					detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IUserMessageDAO#attachDirty(cn.edu.aicourse.entity.UserMessage)
	 */
	@Override
	public void attachDirty(UserMessage instance) {
		log.debug("attaching dirty UserMessage instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IUserMessageDAO#attachClean(cn.edu.aicourse.entity.UserMessage)
	 */
	@Override
	public void attachClean(UserMessage instance) {
		log.debug("attaching clean UserMessage instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static IUserMessageDAO getFromApplicationContext(
			ApplicationContext ctx) {
		return (IUserMessageDAO) ctx.getBean("UserMessageDAO");
	}
}