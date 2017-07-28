package cn.edu.aicourse.service;

import java.util.List;

import cn.edu.aicourse.entity.KlgModule;

public interface IKlgModuleService {

	public abstract void save(KlgModule transientInstance);

	public abstract void delete(KlgModule persistentInstance);

	public abstract KlgModule findById(java.lang.Integer id);

	public abstract List findAll();

	public abstract List findByKlgModuleName(Object klgModuleName);

}