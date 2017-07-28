package cn.edu.aicourse.dao;

import java.util.List;

import cn.edu.aicourse.entity.KlgPointContain;

public interface IKlgPointContentDAO {

	public abstract void save(KlgPointContain transientInstance);

	public abstract void delete(KlgPointContain persistentInstance);

	public abstract KlgPointContain findById(java.lang.Integer id);

	public abstract List findByExample(KlgPointContain instance);

	public abstract List findByKlgPointContainText(Object klgPointContainText);

	public abstract List findAll();
	
	public abstract void attachDirty(KlgPointContain instance);

}