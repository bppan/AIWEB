package cn.edu.aicourse.dao.impl;

import java.util.List;

import org.hibernate.LockMode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import cn.edu.aicourse.dao.IUserAllTypesDAO;
import cn.edu.aicourse.entity.UserAllTypes;

/**
 * A data access object (DAO) providing persistence and search support for
 * UserAllTypes entities. Transaction control of the save(), update() and
 * delete() operations can directly support Spring container-managed
 * transactions or they can be augmented to handle user-managed Spring
 * transactions. Each of these methods provides additional information for how
 * to configure it for the desired type of transaction control.
 * 
 * @see cn.edu.aicourse.entity.UserAllTypes
 * @author MyEclipse Persistence Tools
 */
public class UserAllTypesDAOImpl extends HibernateDaoSupport implements IUserAllTypesDAO {
	private static final Logger log = LoggerFactory
			.getLogger(UserAllTypesDAOImpl.class);
	// property constants
	public static final String USER_TYPE_NAME = "userTypeName";

	protected void initDao() {
		// do nothing
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.dao.impl.IUserAllTypesDAO#save(cn.edu.aicourse.entity.UserAllTypes)
	 */
	@Override
	public void save(UserAllTypes transientInstance) {
		log.debug("saving UserAllTypes instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.dao.impl.IUserAllTypesDAO#delete(cn.edu.aicourse.entity.UserAllTypes)
	 */
	@Override
	public void delete(UserAllTypes persistentInstance) {
		log.debug("deleting UserAllTypes instance");
		try {
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.dao.impl.IUserAllTypesDAO#findById(java.lang.Integer)
	 */
	@Override
	public UserAllTypes findById(java.lang.Integer id) {
		log.debug("getting UserAllTypes instance with id: " + id);
		try {
			UserAllTypes instance = (UserAllTypes) getHibernateTemplate().get(
					"cn.edu.aicourse.entity.UserAllTypes", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.dao.impl.IUserAllTypesDAO#findByExample(cn.edu.aicourse.entity.UserAllTypes)
	 */
	@Override
	public List findByExample(UserAllTypes instance) {
		log.debug("finding UserAllTypes instance by example");
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
	 * @see cn.edu.aicourse.dao.impl.IUserAllTypesDAO#findByProperty(java.lang.String, java.lang.Object)
	 */
	@Override
	public List findByProperty(String propertyName, Object value) {
		log.debug("finding UserAllTypes instance with property: "
				+ propertyName + ", value: " + value);
		try {
			String queryString = "from UserAllTypes as model where model."
					+ propertyName + "= ?";
			return getHibernateTemplate().find(queryString, value);
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.dao.impl.IUserAllTypesDAO#findByUserTypeName(java.lang.Object)
	 */
	@Override
	public List findByUserTypeName(Object userTypeName) {
		return findByProperty(USER_TYPE_NAME, userTypeName);
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.dao.impl.IUserAllTypesDAO#findAll()
	 */
	@Override
	public List findAll() {
		log.debug("finding all UserAllTypes instances");
		try {
			String queryString = "from UserAllTypes";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.dao.impl.IUserAllTypesDAO#merge(cn.edu.aicourse.entity.UserAllTypes)
	 */
	@Override
	public UserAllTypes merge(UserAllTypes detachedInstance) {
		log.debug("merging UserAllTypes instance");
		try {
			UserAllTypes result = (UserAllTypes) getHibernateTemplate().merge(
					detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.dao.impl.IUserAllTypesDAO#attachDirty(cn.edu.aicourse.entity.UserAllTypes)
	 */
	@Override
	public void attachDirty(UserAllTypes instance) {
		log.debug("attaching dirty UserAllTypes instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.dao.impl.IUserAllTypesDAO#attachClean(cn.edu.aicourse.entity.UserAllTypes)
	 */
	@Override
	public void attachClean(UserAllTypes instance) {
		log.debug("attaching clean UserAllTypes instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static IUserAllTypesDAO getFromApplicationContext(
			ApplicationContext ctx) {
		return (IUserAllTypesDAO) ctx.getBean("UserAllTypesDAO");
	}
}