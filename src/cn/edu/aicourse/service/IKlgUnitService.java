package cn.edu.aicourse.service;

import java.util.List;

import cn.edu.aicourse.dao.IKlgUnitDAO;
import cn.edu.aicourse.entity.KlgUnit;

public interface IKlgUnitService {

	public abstract void setKlgunitdao(IKlgUnitDAO klgunitdao);

	public abstract List findAll();

	public abstract List findByKlgUnitName(Object klgUnitName);

	public abstract KlgUnit findById(java.lang.Integer id);

	public abstract void delete(KlgUnit persistentInstance);

	public abstract void save(KlgUnit transientInstance);

}