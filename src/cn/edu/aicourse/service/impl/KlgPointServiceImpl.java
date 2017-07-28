package cn.edu.aicourse.service.impl;

import java.util.List;

import cn.edu.aicourse.dao.IKlgPointDAO;
import cn.edu.aicourse.entity.KlgPoint;
import cn.edu.aicourse.service.IKlgPointService;

public class KlgPointServiceImpl implements IKlgPointService {
	private IKlgPointDAO klgpointdao;
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IKlgPointService#setKlgpointdao(cn.edu.aicourse.dao.IKlgPointDAO)
	 */
	@Override
	public void setKlgpointdao(IKlgPointDAO klgpointdao)
	{
		this.klgpointdao = klgpointdao;
	}
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IKlgPointService#findAll()
	 */
	@Override
	public List findAll() {
		return this.klgpointdao.findAll();
	}
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IKlgPointService#findByKlgPointName(java.lang.Object)
	 */
	@Override
	public List findByKlgPointName(Object klgPointName) {
		return this.klgpointdao.findByKlgPointName(klgPointName);
	}
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IKlgPointService#findById(java.lang.Integer)
	 */
	@Override
	public KlgPoint findById(java.lang.Integer id) {
		return this.klgpointdao.findById(id);
	}
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IKlgPointService#delete(cn.edu.aicourse.entity.KlgPoint)
	 */
	@Override
	public void delete(KlgPoint persistentInstance) {
		this.klgpointdao.delete(persistentInstance);
	}
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IKlgPointService#save(cn.edu.aicourse.entity.KlgPoint)
	 */
	@Override
	public void save(KlgPoint transientInstance) {
		this.klgpointdao.save(transientInstance);
	}

}
