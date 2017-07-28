package cn.edu.aicourse.service.impl;

import java.util.List;

import cn.edu.aicourse.dao.IAlgorithmDAO;
import cn.edu.aicourse.entity.Algorithm;
import cn.edu.aicourse.service.IAlgorithmService;

public class AlgorithmServiceImpl implements IAlgorithmService {
	private IAlgorithmDAO algorithmdao;
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IAlgorithmService#save(cn.edu.aicourse.entity.Algorithm)
	 */
	@Override
	public void save(Algorithm transientInstance) {
		this.algorithmdao.save(transientInstance);
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IAlgorithmService#delete(cn.edu.aicourse.entity.Algorithm)
	 */
	@Override
	public void delete(Algorithm persistentInstance) {
		this.algorithmdao.delete(persistentInstance);
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IAlgorithmService#findById(java.lang.Integer)
	 */
	@Override
	public Algorithm findById(java.lang.Integer id) {
		return this.algorithmdao.findById(id);
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IAlgorithmService#findAll()
	 */
	@Override
	public List findAll() {
		return this.algorithmdao.findAll();
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IAlgorithmService#attachDirty(cn.edu.aicourse.entity.Algorithm)
	 */
	@Override
	public void attachDirty(Algorithm instance) {
		this.algorithmdao.attachDirty(instance);
	}
	
	public void setAlgorithmdao(IAlgorithmDAO algorithmdao)
	{
		this.algorithmdao = algorithmdao;
	}
	
}
