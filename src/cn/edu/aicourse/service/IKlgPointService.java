package cn.edu.aicourse.service;

import java.util.List;

import cn.edu.aicourse.dao.IKlgPointDAO;
import cn.edu.aicourse.entity.KlgPoint;

public interface IKlgPointService {

	public abstract void setKlgpointdao(IKlgPointDAO klgpointdao);

	public abstract List findAll();

	public abstract List findByKlgPointName(Object klgPointName);

	public abstract KlgPoint findById(java.lang.Integer id);

	public abstract void delete(KlgPoint persistentInstance);

	public abstract void save(KlgPoint transientInstance);

}