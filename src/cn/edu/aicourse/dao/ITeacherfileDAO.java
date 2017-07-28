package cn.edu.aicourse.dao;

import java.util.List;

import cn.edu.aicourse.entity.Teacherfile;

public interface ITeacherfileDAO {

	public abstract void save(Teacherfile transientInstance);

	public abstract void delete(Teacherfile persistentInstance);

	public abstract Teacherfile findById(java.lang.Integer id);

	public abstract List findByExample(Teacherfile instance);

	public abstract List findByProperty(String propertyName, Object value);

	public abstract List findByFileName(Object fileName);

	public abstract List findByFilePath(Object filePath);

	public abstract List findByFileSize(Object fileSize);

	public abstract List findByUserId(Object userId);

	public abstract List findByFileDownLoadTimes(Object fileDownLoadTimes);

	public abstract List findAll();

	public abstract void attachDirty(Teacherfile instance);

	public abstract void attachClean(Teacherfile instance);

}