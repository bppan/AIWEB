package cn.edu.aicourse.service.impl;

import java.util.List;

import cn.edu.aicourse.dao.IViewTeacherDAO;
import cn.edu.aicourse.service.IViewTeacherServie;

public class ViewTeacherServiceImpl implements IViewTeacherServie {
	private IViewTeacherDAO teacherdao;
	
	public void setTeacherdao(IViewTeacherDAO teacherdao){
		this.teacherdao = teacherdao;
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IViewTeacherServie#findAll()
	 */
	@Override
	public List findAll() {
		return this.teacherdao.findAll();
	}
	
}
