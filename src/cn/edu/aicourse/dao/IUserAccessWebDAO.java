package cn.edu.aicourse.dao;

import java.util.List;

import cn.edu.aicourse.entity.UserAccessWeb;

public interface IUserAccessWebDAO {

	public abstract void save(UserAccessWeb transientInstance);

	public abstract void delete(UserAccessWeb persistentInstance);

	public abstract UserAccessWeb findById(java.lang.Integer id);

	public abstract List findByProperty(String propertyName, Object value);

	public abstract List findByUserId(java.lang.Integer userId);

	public abstract List findByUserIp(Object userIp);

	public abstract List findAll();

	public abstract void attachDirty(UserAccessWeb instance);

	public abstract void attachClean(UserAccessWeb instance);

}