package cn.edu.aicourse.dao;

import java.util.List;

import cn.edu.aicourse.entity.Algorithm;

public interface IAlgorithmDAO {

	public abstract void save(Algorithm transientInstance);

	public abstract void delete(Algorithm persistentInstance);

	public abstract Algorithm findById(java.lang.Integer id);

	public abstract List findByExample(Algorithm instance);

	public abstract List findByAlgorithmName(Object algorithmName);

	public abstract List findAll();

	public abstract void attachDirty(Algorithm instance);

	public abstract void attachClean(Algorithm instance);

}