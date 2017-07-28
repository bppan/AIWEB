package cn.edu.aicourse.service.impl;
import java.util.List;

import org.hibernate.LockMode;
import org.springframework.context.ApplicationContext;

import cn.edu.aicourse.dao.*;
import cn.edu.aicourse.entity.User;
import cn.edu.aicourse.service.IUserService;

public class UserServiceImpl implements IUserService {
	private IUserDAO userdao;
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.IUserService#save(cn.edu.aicourse.entity.User)
	 */
	@Override
	public void save(User transientInstance) {
		userdao.save(transientInstance);
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.IUserService#delete(cn.edu.aicourse.entity.User)
	 */
	@Override
	public void delete(User persistentInstance) {
		userdao.delete(persistentInstance);
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.IUserService#findById(java.lang.Integer)
	 */
	@Override
	public User findById(java.lang.Integer id) {
		return userdao.findById(id);
	}
	@Override
	public void attachDirty(User instance){
		this.userdao.attachDirty(instance);
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.IUserService#findByExample(cn.edu.aicourse.entity.User)
	 */
	@Override
	public List  findByExample(User instance) {
		return userdao.findByExample(instance);
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.IUserService#findByUserLoginName(java.lang.Object)
	 */
	@Override
	public List findByUserLoginName(Object userLoginName) {
		
		System.out.println("here1");
		if(userdao == null)
		{
			System.out.println("hhhh");
		}
		List result = userdao.findByUserLoginName(userLoginName);
		
		System.out.println("here2");
		return result;
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.IUserService#findByUserName(java.lang.Object)
	 */
	@Override
	public List findByUserName(Object userName) {
		return userdao.findByUserName(userName);
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.IUserService#findByUserPassword(java.lang.Object)
	 */
	@Override
	public List findByUserPassword(Object userPassword) {
		return userdao.findByUserPassword(userPassword);
	}
	
	public List findByUserType(Object userType) {
		return this.userdao.findByUserType(userType);
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.IUserService#findAll()
	 */
	@Override
	public List findAll() {
		return userdao.findAll();
	}
	
	public void setUserdao(IUserDAO userdao)
	{
		this.userdao = userdao;
	}

}
