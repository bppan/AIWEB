package cn.edu.aicourse.dao.impl;

import java.util.List;
import java.util.Set;

import org.hibernate.LockMode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import cn.edu.aicourse.dao.IKlgUnitDAO;
import cn.edu.aicourse.entity.KlgUnit;

/**
 * A data access object (DAO) providing persistence and search support for
 * KlgUnit entities. Transaction control of the save(), update() and delete()
 * operations can directly support Spring container-managed transactions or they
 * can be augmented to handle user-managed Spring transactions. Each of these
 * methods provides additional information for how to configure it for the
 * desired type of transaction control.
 * 
 * @see cn.edu.aicourse.entity.KlgUnit
 * @author MyEclipse Persistence Tools
 */
public class KlgUnitDAOImpl extends HibernateDaoSupport implements IKlgUnitDAO {
	private static final Logger log = LoggerFactory.getLogger(KlgUnitDAOImpl.class);
	// property constants
	public static final String KLG_UNIT_NAME = "klgUnitName";

	protected void initDao() {
		// do nothing
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgUnitDAO#save(cn.edu.aicourse.entity.KlgUnit)
	 */
	@Override
	public void save(KlgUnit transientInstance) {
		log.debug("saving KlgUnit instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(KlgUnit persistentInstance) {
		log.debug("deleting KlgUnit instance");
		try {
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgUnitDAO#findById(java.lang.Integer)
	 */
	@Override
	public KlgUnit findById(java.lang.Integer id) {
		log.debug("getting KlgUnit instance with id: " + id);
		try {
			KlgUnit instance = (KlgUnit) getHibernateTemplate().get(
					"cn.edu.aicourse.entity.KlgUnit", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgUnitDAO#findByExample(cn.edu.aicourse.entity.KlgUnit)
	 */
	@Override
	public List findByExample(KlgUnit instance) {
		log.debug("finding KlgUnit instance by example");
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
	 * @see cn.edu.aicourse.entity.IKlgUnitDAO#findByProperty(java.lang.String, java.lang.Object)
	 */
	@Override
	public List findByProperty(String propertyName, Object value) {
		log.debug("finding KlgUnit instance with property: " + propertyName
				+ ", value: " + value);
		try {
			String queryString = "from KlgUnit as model where model."
					+ propertyName + "= ?";
			return getHibernateTemplate().find(queryString, value);
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgUnitDAO#findByKlgUnitName(java.lang.Object)
	 */
	@Override
	public List findByKlgUnitName(Object klgUnitName) {
		return findByProperty(KLG_UNIT_NAME, klgUnitName);
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgUnitDAO#findAll()
	 */
	@Override
	public List findAll() {
		log.debug("finding all KlgUnit instances");
		try {
			String queryString = "from KlgUnit";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgUnitDAO#merge(cn.edu.aicourse.entity.KlgUnit)
	 */
	@Override
	public KlgUnit merge(KlgUnit detachedInstance) {
		log.debug("merging KlgUnit instance");
		try {
			KlgUnit result = (KlgUnit) getHibernateTemplate().merge(
					detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(KlgUnit instance) {
		log.debug("attaching dirty KlgUnit instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(KlgUnit instance) {
		log.debug("attaching clean KlgUnit instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static IKlgUnitDAO getFromApplicationContext(ApplicationContext ctx) {
		return (IKlgUnitDAO) ctx.getBean("KlgUnitDAO");
	}
}