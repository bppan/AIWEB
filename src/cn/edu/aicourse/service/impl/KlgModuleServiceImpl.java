package cn.edu.aicourse.service.impl;

import java.util.List;

import cn.edu.aicourse.dao.IKlgModuleDAO;
import cn.edu.aicourse.entity.*;
import cn.edu.aicourse.service.IKlgModuleService;

public class KlgModuleServiceImpl implements IKlgModuleService {
	private IKlgModuleDAO klgmoduledao;
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IklgModuleService#save(cn.edu.aicourse.entity.KlgModule)
	 */
	@Override
	public void save(KlgModule transientInstance) {
		this.klgmoduledao.save(transientInstance);
	}
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IklgModuleService#delete(cn.edu.aicourse.entity.KlgModule)
	 */
	@Override
	public void delete(KlgModule persistentInstance) {
		this.klgmoduledao.delete(persistentInstance);
	}
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IklgModuleService#findById(java.lang.Integer)
	 */
	@Override
	public KlgModule findById(java.lang.Integer id) {
		return this.klgmoduledao.findById(id);
	}
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IklgModuleService#findAll()
	 */
	@Override
	public List findAll() {
		return this.klgmoduledao.findAll();
	}
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IklgModuleService#findByKlgModuleName(java.lang.Object)
	 */
	@Override
	public List findByKlgModuleName(Object klgModuleName) {
		return this.klgmoduledao.findByKlgModuleName(klgModuleName);
	}
	public void setKlgmoduledao(IKlgModuleDAO klgmoduledao)
	{
		this.klgmoduledao = klgmoduledao;
	}

}
