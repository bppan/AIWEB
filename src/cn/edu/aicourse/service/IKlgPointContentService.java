package cn.edu.aicourse.service;

import java.util.List;

import cn.edu.aicourse.dao.IKlgPointContentDAO;
import cn.edu.aicourse.entity.KlgPointContain;

public interface IKlgPointContentService {

	public abstract void setKlgpointcontentdao(
			IKlgPointContentDAO klgpointcontentdao);

	public abstract List findAll();

	public abstract List findByKlgPointContainText(Object klgPointContainText);

	public abstract KlgPointContain findById(java.lang.Integer id);

	public abstract void delete(KlgPointContain persistentInstance);

	public abstract void save(KlgPointContain transientInstance);
	
	public List findByExample(KlgPointContain instance);
	
	public abstract void attachDirty(KlgPointContain instance);
}