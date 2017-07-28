package cn.edu.aicourse.dao;

import java.util.List;

import cn.edu.aicourse.entity.UserAllTypes;

public interface IUserAllTypesDAO {

	public abstract void save(UserAllTypes transientInstance);

	public abstract void delete(UserAllTypes persistentInstance);

	public abstract UserAllTypes findById(java.lang.Integer id);

	public abstract List findByExample(UserAllTypes instance);

	public abstract List findByProperty(String propertyName, Object value);

	public abstract List findByUserTypeName(Object userTypeName);

	public abstract List findAll();

	public abstract UserAllTypes merge(UserAllTypes detachedInstance);

	public abstract void attachDirty(UserAllTypes instance);

	public abstract void attachClean(UserAllTypes instance);

}