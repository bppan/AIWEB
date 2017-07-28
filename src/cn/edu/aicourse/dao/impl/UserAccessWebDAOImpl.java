package cn.edu.aicourse.dao.impl;

import java.sql.Timestamp;
import java.util.List;

import org.hibernate.LockMode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import cn.edu.aicourse.dao.IUserAccessWebDAO;
import cn.edu.aicourse.entity.UserAccessWeb;

/**
 * A data access object (DAO) providing persistence and search support for
 * UserAccessWeb entities. Transaction control of the save(), update() and
 * delete() operations can directly support Spring container-managed
 * transactions or they can be augmented to handle user-managed Spring
 * transactions. Each of these methods provides additional information for how
 * to configure it for the desired type of transaction control.
 * 
 * @see cn.edu.aicourse.entity.UserAccessWeb
 * @author MyEclipse Persistence Tools
 */
public class UserAccessWebDAOImpl extends HibernateDaoSupport implements IUserAccessWebDAO {
	private static final Logger log = LoggerFactory
			.getLogger(UserAccessWebDAOImpl.class);
	// property constants
	public static final String USER_ID = "userId";
	public static final String USER_IP = "userIp";

	protected void initDao() {
		// do nothing
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IUserAccessWebDAO#save(cn.edu.aicourse.entity.UserAccessWeb)
	 */
	@Override
	public void save(UserAccessWeb transientInstance) {
		log.debug("saving UserAccessWeb instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IUserAccessWebDAO#delete(cn.edu.aicourse.entity.UserAccessWeb)
	 */
	@Override
	public void delete(UserAccessWeb persistentInstance) {
		log.debug("deleting UserAccessWeb instance");
		try {
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IUserAccessWebDAO#findById(java.lang.Integer)
	 */
	@Override
	public UserAccessWeb findById(java.lang.Integer id) {
		log.debug("getting UserAccessWeb instance with id: " + id);
		try {
			UserAccessWeb instance = (UserAccessWeb) getHibernateTemplate()
					.get("cn.edu.aicourse.entity.UserAccessWeb", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(UserAccessWeb instance) {
		log.debug("finding UserAccessWeb instance by example");
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

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IUserAccessWebDAO#findByProperty(java.lang.String, java.lang.Object)
	 */
	@Override
	public List findByProperty(String propertyName, Object value) {
		
		log.debug("finding UserAccessWeb instance with property: "
				+ propertyName + ", value: " + value);
		try {
			System.out.println("------tttt----");
			String queryString = "from UserAccessWeb as model where model."
					+ propertyName + "= " + value;
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IUserAccessWebDAO#findByUserId(java.lang.Object)
	 */
	@Override
	public List findByUserId(java.lang.Integer userId) {
	
		return findByProperty(USER_ID, userId);
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IUserAccessWebDAO#findByUserIp(java.lang.Object)
	 */
	@Override
	public List findByUserIp(Object userIp) {
		return findByProperty(USER_IP, userIp);
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IUserAccessWebDAO#findAll()
	 */
	@Override
	public List findAll() {
		log.debug("finding all UserAccessWeb instances");
		try {
			String queryString = "from UserAccessWeb";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public UserAccessWeb merge(UserAccessWeb detachedInstance) {
		log.debug("merging UserAccessWeb instance");
		try {
			UserAccessWeb result = (UserAccessWeb) getHibernateTemplate()
					.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IUserAccessWebDAO#attachDirty(cn.edu.aicourse.entity.UserAccessWeb)
	 */
	@Override
	public void attachDirty(UserAccessWeb instance) {
		log.debug("attaching dirty UserAccessWeb instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IUserAccessWebDAO#attachClean(cn.edu.aicourse.entity.UserAccessWeb)
	 */
	@Override
	public void attachClean(UserAccessWeb instance) {
		log.debug("attaching clean UserAccessWeb instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static IUserAccessWebDAO getFromApplicationContext(
			ApplicationContext ctx) {
		return (IUserAccessWebDAO) ctx.getBean("UserAccessWebDAO");
	}
}