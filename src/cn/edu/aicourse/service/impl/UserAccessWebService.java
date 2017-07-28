package cn.edu.aicourse.service.impl;

import java.util.List;

import cn.edu.aicourse.dao.IUserAccessWebDAO;
import cn.edu.aicourse.entity.UserAccessWeb;
import cn.edu.aicourse.service.IUserAccessWebService;

public class UserAccessWebService implements IUserAccessWebService {

	private IUserAccessWebDAO useraccesswebserivce;
	
	public void setUseraccesswebserivce(IUserAccessWebDAO useraccesswebserivce){
		this.useraccesswebserivce = useraccesswebserivce;
	}
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IUserAccessWebService#save(cn.edu.aicourse.entity.UserAccessWeb)
	 */
	@Override
	public void save(UserAccessWeb transientInstance) {
		this.useraccesswebserivce.save(transientInstance);
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IUserAccessWebService#delete(cn.edu.aicourse.entity.UserAccessWeb)
	 */
	@Override
	public void delete(UserAccessWeb persistentInstance) {
		this.useraccesswebserivce.delete(persistentInstance);
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IUserAccessWebService#findById(java.lang.Integer)
	 */
	@Override
	public UserAccessWeb findById(java.lang.Integer id) {
		return this.useraccesswebserivce.findById(id);
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IUserAccessWebService#findByUserId(java.lang.Object)
	 */
	@Override
	public List findByUserId(java.lang.Integer userId) {
		return this.useraccesswebserivce.findByUserId(userId);
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IUserAccessWebService#findAll()
	 */
	@Override
	public List findAll() {
		return this.useraccesswebserivce.findAll();
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IUserAccessWebService#attachDirty(cn.edu.aicourse.entity.UserAccessWeb)
	 */
	@Override
	public void attachDirty(UserAccessWeb instance) {
		this.useraccesswebserivce.attachDirty(instance);
	}
	
}
