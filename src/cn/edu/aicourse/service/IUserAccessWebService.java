package cn.edu.aicourse.service;

import java.util.List;

import cn.edu.aicourse.entity.UserAccessWeb;

public interface IUserAccessWebService {

	public abstract void save(UserAccessWeb transientInstance);

	public abstract void delete(UserAccessWeb persistentInstance);

	public abstract UserAccessWeb findById(java.lang.Integer id);

	public abstract List findByUserId(java.lang.Integer userId);

	public abstract List findAll();

	public abstract void attachDirty(UserAccessWeb instance);

}