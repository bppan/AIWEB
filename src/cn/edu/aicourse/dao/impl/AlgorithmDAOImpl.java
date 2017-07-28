package cn.edu.aicourse.dao.impl;

import java.util.List;

import org.hibernate.LockMode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import cn.edu.aicourse.dao.IAlgorithmDAO;
import cn.edu.aicourse.entity.Algorithm;

/**
 * A data access object (DAO) providing persistence and search support for
 * Algorithm entities. Transaction control of the save(), update() and delete()
 * operations can directly support Spring container-managed transactions or they
 * can be augmented to handle user-managed Spring transactions. Each of these
 * methods provides additional information for how to configure it for the
 * desired type of transaction control.
 * 
 * @see cn.edu.aicourse.entity.Algorithm
 * @author MyEclipse Persistence Tools
 */
public class AlgorithmDAOImpl extends HibernateDaoSupport implements IAlgorithmDAO {
	private static final Logger log = LoggerFactory
			.getLogger(AlgorithmDAOImpl.class);
	// property constants
	public static final String ALGORITHM_NAME = "algorithmName";

	protected void initDao() {
		// do nothing
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IAlgorithmDAO#save(cn.edu.aicourse.entity.Algorithm)
	 */
	@Override
	public void save(Algorithm transientInstance) {
		log.debug("saving Algorithm instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IAlgorithmDAO#delete(cn.edu.aicourse.entity.Algorithm)
	 */
	@Override
	public void delete(Algorithm persistentInstance) {
		log.debug("deleting Algorithm instance");
		try {
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IAlgorithmDAO#findById(java.lang.Integer)
	 */
	@Override
	public Algorithm findById(java.lang.Integer id) {
		log.debug("getting Algorithm instance with id: " + id);
		try {
			Algorithm instance = (Algorithm) getHibernateTemplate().get(
					"cn.edu.aicourse.entity.Algorithm", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IAlgorithmDAO#findByExample(cn.edu.aicourse.entity.Algorithm)
	 */
	@Override
	public List findByExample(Algorithm instance) {
		log.debug("finding Algorithm instance by example");
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
		log.debug("finding Algorithm instance with property: " + propertyName
				+ ", value: " + value);
		try {
			String queryString = "from Algorithm as model where model."
					+ propertyName + "= ?";
			return getHibernateTemplate().find(queryString, value);
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IAlgorithmDAO#findByAlgorithmName(java.lang.Object)
	 */
	@Override
	public List findByAlgorithmName(Object algorithmName) {
		return findByProperty(ALGORITHM_NAME, algorithmName);
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IAlgorithmDAO#findAll()
	 */
	@Override
	public List findAll() {
		log.debug("finding all Algorithm instances");
		try {
			String queryString = "from Algorithm";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public Algorithm merge(Algorithm detachedInstance) {
		log.debug("merging Algorithm instance");
		try {
			Algorithm result = (Algorithm) getHibernateTemplate().merge(
					detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IAlgorithmDAO#attachDirty(cn.edu.aicourse.entity.Algorithm)
	 */
	@Override
	public void attachDirty(Algorithm instance) {
		log.debug("attaching dirty Algorithm instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IAlgorithmDAO#attachClean(cn.edu.aicourse.entity.Algorithm)
	 */
	@Override
	public void attachClean(Algorithm instance) {
		log.debug("attaching clean Algorithm instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static IAlgorithmDAO getFromApplicationContext(ApplicationContext ctx) {
		return (IAlgorithmDAO) ctx.getBean("AlgorithmDAO");
	}
}