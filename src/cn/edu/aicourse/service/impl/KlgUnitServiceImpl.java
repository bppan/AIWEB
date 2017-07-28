package cn.edu.aicourse.service.impl;

import java.util.List;

import cn.edu.aicourse.dao.IKlgUnitDAO;
import cn.edu.aicourse.entity.KlgUnit;
import cn.edu.aicourse.service.IKlgUnitService;

public class KlgUnitServiceImpl implements IKlgUnitService {

	private IKlgUnitDAO klgunitdao;
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IKlgUnitService#setKlgunitdao(cn.edu.aicourse.dao.IKlgUnitDAO)
	 */
	@Override
	public void setKlgunitdao(IKlgUnitDAO klgunitdao)
	{
		this.klgunitdao = klgunitdao;
	}
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IKlgUnitService#findAll()
	 */
	@Override
	public List findAll() {
		return this.klgunitdao.findAll();
	}
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IKlgUnitService#findByKlgUnitName(java.lang.Object)
	 */
	@Override
	public List findByKlgUnitName(Object klgUnitName) {
		return this.klgunitdao.findByKlgUnitName(klgUnitName);
	}
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IKlgUnitService#findById(java.lang.Integer)
	 */
	@Override
	public KlgUnit findById(java.lang.Integer id) {
		return this.klgunitdao.findById(id);
	}
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IKlgUnitService#delete(cn.edu.aicourse.entity.KlgUnit)
	 */
	@Override
	public void delete(KlgUnit persistentInstance) {
		this.klgunitdao.delete(persistentInstance);
	}
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IKlgUnitService#save(cn.edu.aicourse.entity.KlgUnit)
	 */
	@Override
	public void save(KlgUnit transientInstance) {
		this.klgunitdao.save(transientInstance);
	}
}
