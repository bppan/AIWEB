package cn.edu.aicourse.dao.impl;

import java.util.List;

import org.hibernate.LockMode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import cn.edu.aicourse.entity.UserTeachCourse;
import cn.edu.aicourse.entity.UserTeachCourseId;

/**
 * A data access object (DAO) providing persistence and search support for
 * UserTeachCourse entities. Transaction control of the save(), update() and
 * delete() operations can directly support Spring container-managed
 * transactions or they can be augmented to handle user-managed Spring
 * transactions. Each of these methods provides additional information for how
 * to configure it for the desired type of transaction control.
 * 
 * @see cn.edu.aicourse.entity.UserTeachCourse
 * @author MyEclipse Persistence Tools
 */
public class UserTeachCourseDAOImpl extends HibernateDaoSupport {
	private static final Logger log = LoggerFactory
			.getLogger(UserTeachCourseDAOImpl.class);

	// property constants

	protected void initDao() {
		// do nothing
	}

	public void save(UserTeachCourse transientInstance) {
		log.debug("saving UserTeachCourse instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(UserTeachCourse persistentInstance) {
		log.debug("deleting UserTeachCourse instance");
		try {
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public UserTeachCourse findById(cn.edu.aicourse.entity.UserTeachCourseId id) {
		log.debug("getting UserTeachCourse instance with id: " + id);
		try {
			UserTeachCourse instance = (UserTeachCourse) getHibernateTemplate()
					.get("cn.edu.aicourse.entity.UserTeachCourse", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(UserTeachCourse instance) {
		log.debug("finding UserTeachCourse instance by example");
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
		log.debug("finding UserTeachCourse instance with property: "
				+ propertyName + ", value: " + value);
		try {
			String queryString = "from UserTeachCourse as model where model."
					+ propertyName + "= ?";
			return getHibernateTemplate().find(queryString, value);
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	public List findAll() {
		log.debug("finding all UserTeachCourse instances");
		try {
			String queryString = "from UserTeachCourse";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public UserTeachCourse merge(UserTeachCourse detachedInstance) {
		log.debug("merging UserTeachCourse instance");
		try {
			UserTeachCourse result = (UserTeachCourse) getHibernateTemplate()
					.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(UserTeachCourse instance) {
		log.debug("attaching dirty UserTeachCourse instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(UserTeachCourse instance) {
		log.debug("attaching clean UserTeachCourse instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static UserTeachCourseDAOImpl getFromApplicationContext(
			ApplicationContext ctx) {
		return (UserTeachCourseDAOImpl) ctx.getBean("UserTeachCourseDAO");
	}
}