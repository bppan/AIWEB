package cn.edu.aicourse.dao;

import java.util.List;

import cn.edu.aicourse.entity.KlgModule;

public interface IKlgModuleDAO {

	public abstract void save(KlgModule transientInstance);

	public abstract void delete(KlgModule persistentInstance);

	public abstract KlgModule findById(java.lang.Integer id);

	public abstract List findByExample(KlgModule instance);

	public abstract List findByProperty(String propertyName, Object value);

	public abstract List findByKlgModuleName(Object klgModuleName);

	public abstract List findAll();

	public abstract KlgModule merge(KlgModule detachedInstance);

	public abstract void attachDirty(KlgModule instance);

	public abstract void attachClean(KlgModule instance);

}