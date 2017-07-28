package cn.edu.aicourse.service;

import java.util.List;

import cn.edu.aicourse.dao.IAlgorithmDAO;
import cn.edu.aicourse.entity.Algorithm;

public interface IAlgorithmService {

	public abstract void save(Algorithm transientInstance);

	public abstract void delete(Algorithm persistentInstance);

	public abstract Algorithm findById(java.lang.Integer id);

	public abstract List findAll();

	public abstract void attachDirty(Algorithm instance);

}