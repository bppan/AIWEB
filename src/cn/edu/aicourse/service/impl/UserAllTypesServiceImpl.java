package cn.edu.aicourse.service.impl;

import java.util.List;

import cn.edu.aicourse.dao.IUserAllTypesDAO;
import cn.edu.aicourse.entity.UserAllTypes;
import cn.edu.aicourse.service.IUserAllTypesService;

public class UserAllTypesServiceImpl implements IUserAllTypesService{
	private IUserAllTypesDAO userAllTypesdao;
	
	public void setUserAllTypesdao(IUserAllTypesDAO userAllTypesdao){
		this.userAllTypesdao = userAllTypesdao;
	}
	
	public void save(UserAllTypes transientInstance) {
		this.userAllTypesdao.save(transientInstance);
	}
	public void delete(UserAllTypes persistentInstance) {
		this.userAllTypesdao.delete(persistentInstance);

	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IUserAllTypesService#findById(java.lang.Integer)
	 */
	@Override
	public UserAllTypes findById(java.lang.Integer id) {
		return this.userAllTypesdao.findById(id);
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IUserAllTypesService#findByUserTypeName(java.lang.Object)
	 */
	@Override
	public List findByUserTypeName(Object userTypeName) {
		return this.userAllTypesdao.findByUserTypeName(userTypeName);
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IUserAllTypesService#findAll()
	 */
	@Override
	public List findAll() {
		return this.userAllTypesdao.findAll();
	}
	
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IUserAllTypesService#attachDirty(cn.edu.aicourse.entity.UserAllTypes)
	 */
	@Override
	public void attachDirty(UserAllTypes instance) {
		this.userAllTypesdao.attachDirty(instance);
	}

}
