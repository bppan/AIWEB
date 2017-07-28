package cn.edu.aicourse.dao.impl;

import java.sql.Timestamp;
import java.util.List;

import org.hibernate.LockMode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import cn.edu.aicourse.dao.ITeacherfileDAO;
import cn.edu.aicourse.entity.Teacherfile;

/**
 * A data access object (DAO) providing persistence and search support for
 * Teacherfile entities. Transaction control of the save(), update() and
 * delete() operations can directly support Spring container-managed
 * transactions or they can be augmented to handle user-managed Spring
 * transactions. Each of these methods provides additional information for how
 * to configure it for the desired type of transaction control.
 * 
 * @see cn.edu.aicourse.entity.Teacherfile
 * @author MyEclipse Persistence Tools
 */
public class TeacherfileDAOImpl extends HibernateDaoSupport implements ITeacherfileDAO {
	private static final Logger log = LoggerFactory
			.getLogger(TeacherfileDAOImpl.class);
	// property constants
	public static final String FILE_NAME = "fileName";
	public static final String FILE_PATH = "filePath";
	public static final String FILE_SIZE = "fileSize";
	public static final String USER_ID = "userId";
	public static final String FILE_DOWN_LOAD_TIMES = "fileDownLoadTimes";

	protected void initDao() {
		// do nothing
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.ITeacherfileDAO#save(cn.edu.aicourse.entity.Teacherfile)
	 */
	@Override
	public void save(Teacherfile transientInstance) {
		log.debug("saving Teacherfile instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.ITeacherfileDAO#delete(cn.edu.aicourse.entity.Teacherfile)
	 */
	@Override
	public void delete(Teacherfile persistentInstance) {
		log.debug("deleting Teacherfile instance");
		try {
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.ITeacherfileDAO#findById(java.lang.Integer)
	 */
	@Override
	public Teacherfile findById(java.lang.Integer id) {
		log.debug("getting Teacherfile instance with id: " + id);
		try {
			Teacherfile instance = (Teacherfile) getHibernateTemplate().get(
					"cn.edu.aicourse.entity.Teacherfile", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.ITeacherfileDAO#findByExample(cn.edu.aicourse.entity.Teacherfile)
	 */
	@Override
	public List findByExample(Teacherfile instance) {
		log.debug("finding Teacherfile instance by example");
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
	 * @see cn.edu.aicourse.entity.ITeacherfileDAO#findByProperty(java.lang.String, java.lang.Object)
	 */
	@Override
	public List findByProperty(String propertyName, Object value) {
		log.debug("finding Teacherfile instance with property: " + propertyName
				+ ", value: " + value);
		try {
			
			System.out.println("---------FindBy---ppppp------------");
			String queryString = "from Teacherfile as model where model."
					+ propertyName + "= " + value;
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.ITeacherfileDAO#findByFileName(java.lang.Object)
	 */
	@Override
	public List findByFileName(Object fileName) {
		return findByProperty(FILE_NAME, fileName);
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.ITeacherfileDAO#findByFilePath(java.lang.Object)
	 */
	@Override
	public List findByFilePath(Object filePath) {
		return findByProperty(FILE_PATH, filePath);
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.ITeacherfileDAO#findByFileSize(java.lang.Object)
	 */
	@Override
	public List findByFileSize(Object fileSize) {
		return findByProperty(FILE_SIZE, fileSize);
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.ITeacherfileDAO#findByUserId(java.lang.Object)
	 */
	@Override
	public List findByUserId(Object userId) {
		return findByProperty(USER_ID, userId);
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.ITeacherfileDAO#findByFileDownLoadTimes(java.lang.Object)
	 */
	@Override
	public List findByFileDownLoadTimes(Object fileDownLoadTimes) {
		return findByProperty(FILE_DOWN_LOAD_TIMES, fileDownLoadTimes);
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.ITeacherfileDAO#findAll()
	 */
	@Override
	public List findAll() {
		log.debug("finding all Teacherfile instances");
		try {
			String queryString = "from Teacherfile";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public Teacherfile merge(Teacherfile detachedInstance) {
		log.debug("merging Teacherfile instance");
		try {
			Teacherfile result = (Teacherfile) getHibernateTemplate().merge(
					detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.ITeacherfileDAO#attachDirty(cn.edu.aicourse.entity.Teacherfile)
	 */
	@Override
	public void attachDirty(Teacherfile instance) {
		log.debug("attaching dirty Teacherfile instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	/* (non-Javadoc)
	 * @see cn.edu.aicourse.entity.ITeacherfileDAO#attachClean(cn.edu.aicourse.entity.Teacherfile)
	 */
	@Override
	public void attachClean(Teacherfile instance) {
		log.debug("attaching clean Teacherfile instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static ITeacherfileDAO getFromApplicationContext(
			ApplicationContext ctx) {
		return (ITeacherfileDAO) ctx.getBean("TeacherfileDAO");
	}
}