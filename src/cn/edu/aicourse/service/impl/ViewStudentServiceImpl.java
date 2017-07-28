package cn.edu.aicourse.service.impl;

import java.util.List;

import cn.edu.aicourse.dao.IViewStudentDAO;
import cn.edu.aicourse.service.IViewStudentService;

public class ViewStudentServiceImpl implements IViewStudentService {
	private IViewStudentDAO viewStudentdao;
	
	public void setViewStudentdao(IViewStudentDAO viewStudentdao){
		this.viewStudentdao = viewStudentdao;
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.IViewStudentService#findAll()
	 */
	@Override
	public List findAll(){
		return this.viewStudentdao.findAll();
	}
	
}
