package cn.edu.aicourse.service;

import java.util.List;

import cn.edu.aicourse.entity.UserAllTypes;

public interface IUserAllTypesService {

	public abstract UserAllTypes findById(java.lang.Integer id);

	public abstract List findByUserTypeName(Object userTypeName);

	public abstract List findAll();

	public abstract void attachDirty(UserAllTypes instance);

}