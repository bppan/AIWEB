package cn.edu.aicourse.service;

import java.util.List;

import cn.edu.aicourse.dao.ITeacherfileDAO;
import cn.edu.aicourse.entity.Teacherfile;

public interface ITeacherFileService {

	public abstract void setTeacherfiledao(ITeacherfileDAO teacherfiledao);

	public abstract void save(Teacherfile transientInstance);

	public abstract void delete(Teacherfile persistentInstance);

	public abstract Teacherfile findById(java.lang.Integer id);

	public abstract List findByFileName(Object fileName);

	public abstract List findByUserId(Object userId);

	public abstract List findAll();

	public abstract void attachDirty(Teacherfile instance);

}