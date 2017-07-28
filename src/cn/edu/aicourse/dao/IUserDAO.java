package cn.edu.aicourse.dao;

import java.util.List;

import cn.edu.aicourse.entity.User;

public interface IUserDAO {

	public abstract void save(User transientInstance);

	public abstract void delete(User persistentInstance);

	public abstract User findById(java.lang.Integer id);

	public abstract List findByExample(User instance);

	public abstract List findByProperty(String propertyName, Object value);

	public abstract List findByUserLoginName(Object userLoginName);

	public abstract List findByUserName(Object userName);

	public abstract List findByUserPassword(Object userPassword);

	public abstract List findByUserType(Object userType);

	public abstract List findAll();

	public abstract User merge(User detachedInstance);

	public abstract void attachDirty(User instance);

	public abstract void attachClean(User instance);

}