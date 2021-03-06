package cn.edu.aicourse.dao.impl;

import java.util.List;
import java.util.Set;

import org.hibernate.LockMode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import cn.edu.aicourse.dao.IKlgModuleDAO;
import cn.edu.aicourse.entity.KlgModule;

/**
 * A data access object (DAO) providing persistence and search support for
 * KlgModule entities. Transaction control of the save(), update() and delete()
 * operations can directly support Spring container-managed transactions or they
 * can be augmented to handle user-managed Spring transactions. Each of these
 * methods provides additional information for how to configure it for the
 * desired type of transaction control.
 * 
 * @see cn.edu.aicourse.entity.KlgModule
 * @author MyEclipse Persistence Tools
 */
public class KlgModuleDAOImpl extends HibernateDaoSupport implements IKlgModuleDAO {
	private static final Logger log = LoggerFactory
			.getLogger(KlgModuleDAOImpl.class);
	// property constants
	public static final String KLG_MODULE_NAME = "klgModuleName";

	protected void initDao() {
		// do nothing
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgModuleDAO#save(cn.edu.aicourse.entity.KlgModule)
	 */
	@Override
	public void save(KlgModule transientInstance) {
		log.debug("saving KlgModule instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgModuleDAO#delete(cn.edu.aicourse.entity.KlgModule)
	 */
	@Override
	public void delete(KlgModule persistentInstance) {
		log.debug("deleting KlgModule instance");
		try {
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgModuleDAO#findById(java.lang.Integer)
	 */
	@Override
	public KlgModule findById(java.lang.Integer id) {
		log.debug("getting KlgModule instance with id: " + id);
		try {
			KlgModule instance = (KlgModule) getHibernateTemplate().get(
					"cn.edu.aicourse.entity.KlgModule", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgModuleDAO#findByExample(cn.edu.aicourse.entity.KlgModule)
	 */
	@Override
	public List findByExample(KlgModule instance) {
		log.debug("finding KlgModule instance by example");
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
	 * @see cn.edu.aicourse.entity.IKlgModuleDAO#findByProperty(java.lang.String, java.lang.Object)
	 */
	@Override
	public List findByProperty(String propertyName, Object value) {
		log.debug("finding KlgModule instance with property: " + propertyName
				+ ", value: " + value);
		try {
			String queryString = "from KlgModule as model where model."
					+ propertyName + "= ?";
			return getHibernateTemplate().find(queryString, value);
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgModuleDAO#findByKlgModuleName(java.lang.Object)
	 */
	@Override
	public List findByKlgModuleName(Object klgModuleName) {
		return findByProperty(KLG_MODULE_NAME, klgModuleName);
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgModuleDAO#findAll()
	 */
	@Override
	public List findAll() {
		log.debug("finding all KlgModule instances");
		try {
			String queryString = "from KlgModule";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgModuleDAO#merge(cn.edu.aicourse.entity.KlgModule)
	 */
	@Override
	public KlgModule merge(KlgModule detachedInstance) {
		log.debug("merging KlgModule instance");
		try {
			KlgModule result = (KlgModule) getHibernateTemplate().merge(
					detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgModuleDAO#attachDirty(cn.edu.aicourse.entity.KlgModule)
	 */
	@Override
	public void attachDirty(KlgModule instance) {
		log.debug("attaching dirty KlgModule instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.IKlgModuleDAO#attachClean(cn.edu.aicourse.entity.KlgModule)
	 */
	@Override
	public void attachClean(KlgModule instance) {
		log.debug("attaching clean KlgModule instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static IKlgModuleDAO getFromApplicationContext(ApplicationContext ctx) {
		return (IKlgModuleDAO) ctx.getBean("KlgModuleDAO");
	}
}