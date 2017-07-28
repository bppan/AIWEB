package cn.edu.aicourse.dao.impl;

import java.util.List;
import java.util.Set;

import org.hibernate.LockMode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import cn.edu.aicourse.dao.IKlgPointDAO;
import cn.edu.aicourse.entity.KlgPoint;

/**
 * A data access object (DAO) providing persistence and search support for
 * KlgPoint entities. Transaction control of the save(), update() and delete()
 * operations can directly support Spring container-managed transactions or they
 * can be augmented to handle user-managed Spring transactions. Each of these
 * methods provides additional information for how to configure it for the
 * desired type of transaction control.
 * 
 * @see cn.edu.aicourse.entity.KlgPoint
 * @author MyEclipse Persistence Tools
 */
public class KlgPointDAOImpl extends HibernateDaoSupport implements IKlgPointDAO {
	private static final Logger log = LoggerFactory
			.getLogger(KlgPointDAOImpl.class);
	// property constants
	public static final String KLG_POINT_NAME = "klgPointName";

	protected void initDao() {
		// do nothing
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgPointDAO#save(cn.edu.aicourse.entity.KlgPoint)
	 */
	@Override
	public void save(KlgPoint transientInstance) {
		log.debug("saving KlgPoint instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgPointDAO#delete(cn.edu.aicourse.entity.KlgPoint)
	 */
	@Override
	public void delete(KlgPoint persistentInstance) {
		log.debug("deleting KlgPoint instance");
		try {
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgPointDAO#findById(java.lang.Integer)
	 */
	@Override
	public KlgPoint findById(java.lang.Integer id) {
		log.debug("getting KlgPoint instance with id: " + id);
		try {
			KlgPoint instance = (KlgPoint) getHibernateTemplate().get(
					"cn.edu.aicourse.entity.KlgPoint", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgPointDAO#findByExample(cn.edu.aicourse.entity.KlgPoint)
	 */
	@Override
	public List findByExample(KlgPoint instance) {
		log.debug("finding KlgPoint instance by example");
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
		log.debug("finding KlgPoint instance with property: " + propertyName
				+ ", value: " + value);
		try {
			String queryString = "from KlgPoint as model where model."
					+ propertyName + "= ?";
			return getHibernateTemplate().find(queryString, value);
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgPointDAO#findByKlgPointName(java.lang.Object)
	 */
	@Override
	public List findByKlgPointName(Object klgPointName) {
		return findByProperty(KLG_POINT_NAME, klgPointName);
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgPointDAO#findAll()
	 */
	@Override
	public List findAll() {
		log.debug("finding all KlgPoint instances");
		try {
			String queryString = "from KlgPoint";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public KlgPoint merge(KlgPoint detachedInstance) {
		log.debug("merging KlgPoint instance");
		try {
			KlgPoint result = (KlgPoint) getHibernateTemplate().merge(
					detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(KlgPoint instance) {
		log.debug("attaching dirty KlgPoint instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(KlgPoint instance) {
		log.debug("attaching clean KlgPoint instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static IKlgPointDAO getFromApplicationContext(ApplicationContext ctx) {
		return (IKlgPointDAO) ctx.getBean("KlgPointDAO");
	}
}