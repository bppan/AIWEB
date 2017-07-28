package cn.edu.aicourse.service.impl;
import java.util.List;

import cn.edu.aicourse.dao.ITeacherfileDAO;
import cn.edu.aicourse.entity.Teacherfile;
import cn.edu.aicourse.service.ITeacherFileService;

public class TeacherFileServiceImpl implements ITeacherFileService {

	private ITeacherfileDAO teacherfiledao;
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.ITeacherFileService#setTeacherfiledao(cn.edu.aicourse.dao.ITeacherfileDAO)
	 */
	@Override
	public void setTeacherfiledao(ITeacherfileDAO teacherfiledao){
		this.teacherfiledao = teacherfiledao;
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.ITeacherFileService#save(cn.edu.aicourse.entity.Teacherfile)
	 */
	@Override
	public void save(Teacherfile transientInstance) {
		this.teacherfiledao.save(transientInstance);
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.ITeacherFileService#delete(cn.edu.aicourse.entity.Teacherfile)
	 */
	@Override
	public void delete(Teacherfile persistentInstance) {
		this.teacherfiledao.delete(persistentInstance);
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.ITeacherFileService#findById(java.lang.Integer)
	 */
	@Override
	public Teacherfile findById(java.lang.Integer id) {
		return this.teacherfiledao.findById(id);
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.ITeacherFileService#findByFileName(java.lang.Object)
	 */
	@Override
	public List findByFileName(Object fileName) {
		return this.teacherfiledao.findByFileName(fileName);
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.ITeacherFileService#findByUserId(java.lang.Object)
	 */
	@Override
	public List findByUserId(Object userId) {
		return this.teacherfiledao.findByUserId(userId);
	}
	
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.ITeacherFileService#findAll()
	 */
	@Override
	public List findAll() {
		return this.teacherfiledao.findAll();
	}
	/* (non-Javadoc)
	 * @see cn.edu.aicourse.service.impl.ITeacherFileService#attachDirty(cn.edu.aicourse.entity.Teacherfile)
	 */
	@Override
	public void attachDirty(Teacherfile instance) {
		this.teacherfiledao.attachDirty(instance);
	}
	
}

