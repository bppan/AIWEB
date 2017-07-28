package cn.edu.aicourse.dao;

import java.util.List;

import cn.edu.aicourse.entity.KlgPoint;

public interface IKlgPointDAO {

	public abstract void save(KlgPoint transientInstance);

	public abstract void delete(KlgPoint persistentInstance);

	public abstract KlgPoint findById(java.lang.Integer id);

	public abstract List findByExample(KlgPoint instance);

	public abstract List findByKlgPointName(Object klgPointName);

	public abstract List findAll();

}