package cn.edu.aicourse.service;

import java.util.List;

import cn.edu.aicourse.dao.IUserMessageDAO;
import cn.edu.aicourse.entity.UserMessage;

public interface IUserMessageService {

	public abstract void setUsermessagedao(IUserMessageDAO usermessagedao);

	public abstract List findAll();

	public abstract void attachDirty(UserMessage instance);

	public abstract List findByUserId(Object userId);

	public abstract void save(UserMessage transientInstance);

	public abstract UserMessage findById(java.lang.Integer id);

}