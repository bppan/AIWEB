package cn.edu.aicourse.dao;

import java.util.List;

import cn.edu.aicourse.entity.KlgUnit;

public interface IKlgUnitDAO {

	public abstract void save(KlgUnit transientInstance);
	
	public void delete(KlgUnit persistentInstance);
	
	public abstract KlgUnit findById(java.lang.Integer id);

	public abstract List findByExample(KlgUnit instance);

	public abstract List findByProperty(String propertyName, Object value);

	public abstract List findByKlgUnitName(Object klgUnitName);

	public abstract List findAll();

	public abstract KlgUnit merge(KlgUnit detachedInstance);

}