package cn.edu.aicourse.dao;

import java.util.List;

import cn.edu.aicourse.entity.UserMessage;

public interface IUserMessageDAO {

	public abstract void save(UserMessage transientInstance);

	public abstract void delete(UserMessage persistentInstance);

	public abstract UserMessage findById(java.lang.Integer id);

	public abstract List findByUserId(Object userId);

	public abstract List findAll();

	public abstract void attachDirty(UserMessage instance);

	public abstract void attachClean(UserMessage instance);

}