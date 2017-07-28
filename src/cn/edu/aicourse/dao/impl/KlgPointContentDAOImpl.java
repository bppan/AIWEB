package cn.edu.aicourse.dao.impl;

import java.util.List;

import org.hibernate.LockMode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import cn.edu.aicourse.dao.IKlgPointContentDAO;
import cn.edu.aicourse.entity.KlgPointContain;
import cn.edu.aicourse.entity.KlgPoint;
/**
 * A data access object (DAO) providing persistence and search support for
 * KlgPointContain entities. Transaction control of the save(), update() and
 * delete() operations can directly support Spring container-managed
 * transactions or they can be augmented to handle user-managed Spring
 * transactions. Each of these methods provides additional information for how
 * to configure it for the desired type of transaction control.
 * 
 * @see cn.edu.aicourse.entity.KlgPointContain
 * @author MyEclipse Persistence Tools
 */
public class KlgPointContentDAOImpl extends HibernateDaoSupport implements IKlgPointContentDAO {
	private static final Logger log = LoggerFactory
			.getLogger(KlgPointContentDAOImpl.class);
	// property constants
	public static final String KLG_POINT_CONTAIN_TEXT = "klgPointContainText";
	public static final String KLG_POINT = "klgPoint";
	
	protected void initDao() {
		// do nothing
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgPointContainDAO#save(cn.edu.aicourse.entity.KlgPointContain)
	 */
	@Override
	public void save(KlgPointContain transientInstance) {
		log.debug("saving KlgPointContain instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgPointContainDAO#delete(cn.edu.aicourse.entity.KlgPointContain)
	 */
	@Override
	public void delete(KlgPointContain persistentInstance) {
		log.debug("deleting KlgPointContain instance");
		try {
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}
	
	@Override
	public KlgPointContain findById(java.lang.Integer id) {
		log.debug("getting KlgPointContain instance with id: " + id);
		try {
			KlgPointContain instance = (KlgPointContain) getHibernateTemplate()
					.get("cn.edu.aicourse.entity.KlgPointContain", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgPointContainDAO#findByExample(cn.edu.aicourse.entity.KlgPointContain)
	 */
	@Override
	public List findByExample(KlgPointContain instance) {
		log.debug("finding KlgPointContain instance by example");
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
		log.debug("finding KlgPointContain instance with property: "
				+ propertyName + ", value: " + value);
		try {
			String queryString = "from KlgPointContain as model where model."
					+ propertyName + "= ?";
			return getHibernateTemplate().find(queryString, value);
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgPointContainDAO#findByKlgPointContainText(java.lang.Object)
	 */
	@Override
	public List findByKlgPointContainText(Object klgPointContainText) {
		return findByProperty(KLG_POINT_CONTAIN_TEXT, klgPointContainText);
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgPointContainDAO#findAll()
	 */
	@Override
	public List findAll() {
		log.debug("finding all KlgPointContain instances");
		try {
			String queryString = "from KlgPointContain";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public KlgPointContain merge(KlgPointContain detachedInstance) {
		log.debug("merging KlgPointContain instance");
		try {
			KlgPointContain result = (KlgPointContain) getHibernateTemplate()
					.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(KlgPointContain instance) {
		log.debug("attaching dirty KlgPointContain instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(KlgPointContain instance) {
		log.debug("attaching clean KlgPointContain instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static IKlgPointContentDAO getFromApplicationContext(
			ApplicationContext ctx) {
		return (IKlgPointContentDAO) ctx.getBean("KlgPointContainDAO");
	}
}