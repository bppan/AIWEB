package cn.edu.aicourse.service.impl;

import java.util.List;

import cn.edu.aicourse.dao.IKlgPointContentDAO;
import cn.edu.aicourse.entity.KlgPointContain;
import cn.edu.aicourse.service.IKlgPointContentService;

public class KlgPointContentServiceImpl implements IKlgPointContentService {
	private IKlgPointContentDAO klgpointcontentdao;
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IKlgPointContentService#setKlgpointcontentdao(cn.edu.aicourse.dao.IKlgPointContentDAO)
	 */
	@Override
	public void setKlgpointcontentdao(IKlgPointContentDAO klgpointcontentdao){
		this.klgpointcontentdao = klgpointcontentdao;
	}
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IKlgPointContentService#findAll()
	 */
	@Override
	public List findAll() {
		return this.klgpointcontentdao.findAll();
	}
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IKlgPointContentService#findByKlgPointContainText(java.lang.Object)
	 */
	@Override
	public List findByKlgPointContainText(Object klgPointContainText) {
		return this.klgpointcontentdao.findByKlgPointContainText(klgPointContainText);
	}
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IKlgPointContentService#findById(java.lang.Integer)
	 */
	@Override
	public KlgPointContain findById(java.lang.Integer id) {
		return this.klgpointcontentdao.findById(id);
	}
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IKlgPointContentService#delete(cn.edu.aicourse.entity.KlgPointContain)
	 */
	@Override
	public void delete(KlgPointContain persistentInstance) {
		this.klgpointcontentdao.delete(persistentInstance);
	}
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IKlgPointContentService#save(cn.edu.aicourse.entity.KlgPointContain)
	 */
	@Override
	public void save(KlgPointContain transientInstance) {
		this.klgpointcontentdao.save(transientInstance);
	}
	@Override
	public List findByExample(KlgPointContain instance){
		return this.klgpointcontentdao.findByExample(instance);
	}
	@Override
	public void attachDirty(KlgPointContain instance){
		this.klgpointcontentdao.attachDirty(instance);
	}
}
