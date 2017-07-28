package cn.edu.aicourse.service;

import java.util.List;

import cn.edu.aicourse.entity.User;

public interface IUserService {

	public abstract void save(User transientInstance);

	public abstract void delete(User persistentInstance);

	public abstract User findById(java.lang.Integer id);

	public abstract List findByExample(User instance);

	public abstract List findByUserLoginName(Object userLoginName);

	public abstract List findByUserName(Object userName);

	public abstract List findByUserPassword(Object userPassword);
	
	public void attachDirty(User instance);

	public abstract List findAll();
	
	public abstract List findByUserType(Object userType);

}