package cn.edu.aicourse.service.impl;

import java.util.List;

import cn.edu.aicourse.dao.IUserMessageDAO;
import cn.edu.aicourse.entity.UserMessage;
import cn.edu.aicourse.service.IUserMessageService;

public class UserMessageServiceImpl implements IUserMessageService {

	private IUserMessageDAO usermessagedao;
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IUserMessageService#setUsermessagedao(cn.edu.aicourse.dao.IUserMessageDAO)
	 */
	@Override
	public void setUsermessagedao(IUserMessageDAO usermessagedao){
		this.usermessagedao = usermessagedao;
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IUserMessageService#findAll()
	 */
	@Override
	public List findAll() {
		return this.usermessagedao.findAll();
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IUserMessageService#attachDirty(cn.edu.aicourse.entity.UserMessage)
	 */
	@Override
	public void attachDirty(UserMessage instance) {
		this.usermessagedao.attachDirty(instance);
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IUserMessageService#findByUserId(java.lang.Object)
	 */
	@Override
	public List findByUserId(Object userId) {
		return this.usermessagedao.findByUserId(userId);
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IUserMessageService#save(cn.edu.aicourse.entity.UserMessage)
	 */
	@Override
	public void save(UserMessage transientInstance) {
		this.usermessagedao.save(transientInstance);
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IUserMessageService#findById(java.lang.Integer)
	 */
	@Override
	public UserMessage findById(java.lang.Integer id) {
		
		return this.usermessagedao.findById(id);
	}
}
