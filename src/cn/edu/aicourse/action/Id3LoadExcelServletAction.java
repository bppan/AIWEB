package cn.edu.aicourse.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import cn.edu.aicourse.entity.Teacherfile;
import cn.edu.aicourse.entity.User;
import cn.edu.aicourse.service.ITeacherFileService;

import com.jspsmart.upload.SmartUpload;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class Id3LoadExcelServletAction extends ActionSupport {

	private String UPLOADDIR = "/id3File";

	// 上传文件集合
	private File file;
	private Teacherfile myfile;
	// 上传文件名集合
	private String fileFileName;
	// 上传文件内容类型集合
	private String fileContentType;
	private String result;

	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public String getFileFileName() {
		return this.fileFileName;
	}

	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}

	public String getFileContentType() {
		return this.fileContentType;
	}

	public void setFileContentType(String fileContentType) {
		this.fileContentType = fileContentType;
	}

	public String getResult() {
		return this.result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	@Override
	public String execute() throws Exception {
		// 循环上传每个文件
		try {
			if (this.getFile() == null) {
				this.result = "success";
				return "success";
			} else {
				uploadFile(this.getFile());
			}

		}

		catch (Exception e) {
			System.out.println(e);
			return "fail";
		}
		Map session = ActionContext.getContext().getSession();
		this.result = "success";
		return "success";
	}

	private void uploadFile(File file) throws Exception {
		try {
			Map session = ActionContext.getContext().getSession();
			User currUser = (User) session.get("user");
			this.UPLOADDIR = this.UPLOADDIR + currUser.getUserId();
			String dir = ServletActionContext.getRequest().getRealPath(UPLOADDIR);
			File fileLocation = new File(dir);
			// 此处也可以在应用根目录手动建立目标上传目录
			if (!fileLocation.exists()) {
				boolean isCreated = fileLocation.mkdir();
				if (!isCreated) {
					this.result = "fail";
					// 目标上传目录创建失败,可做其他处理,例如抛出自定义异常等,一般应该不会出现这种情况。
					return;
				}
			}
			String fileName = this.getFileFileName();
			File uploadFile = new File(dir, fileName);
			
			if(uploadFile.exists()){
				uploadFile.delete();
			}
				InputStream in = new FileInputStream(file);
				OutputStream out = new FileOutputStream(uploadFile);
				byte[] buffer = new byte[1024 * 1024];
				int length;
				while ((length = in.read(buffer)) > 0) {
					out.write(buffer, 0, length);
				}
				in.close();
				out.close();
				loadExcel(fileName);

		} catch (FileNotFoundException ex) {
			System.out.println("上传失败!");
			ex.printStackTrace();
		} catch (IOException ex) {
			System.out.println("上传失败!");
			ex.printStackTrace();
		}
	}

	private void loadExcel(String fileName) throws Exception {
		// TODO Auto-generated method stub
		String postfixName = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length());
		ServletActionContext.getRequest().setCharacterEncoding("utf-8");
		try {
			String filePath;
			if (!"".equals(fileName)) {
				ServletActionContext.getRequest().getSession().setAttribute("fileName", fileName);
				filePath = ServletActionContext.getRequest().getRealPath(UPLOADDIR) + File.separator + fileName;
				if ("xls".equals(postfixName)) {
					List<String> th = new ArrayList<String>();
					List<String> td = new ArrayList<String>();
					Workbook book = Workbook.getWorkbook(new File(filePath));
					Sheet sheet = book.getSheet(0);
					int colCount = sheet.getColumns();
					int rowCount = sheet.getRows();
					ServletActionContext.getRequest().getSession().setAttribute("colCount", colCount);
					ServletActionContext.getRequest().getSession().setAttribute("rowCount", rowCount);
					Cell[] cell = sheet.getRow(0);
					for (int i = 0; i < colCount; i++) {
						th.add(cell[i].getContents());
					}
					for (int i = 1; i < rowCount; i++) {
						cell = sheet.getRow(i);
						for (int j = 0; j < colCount; j++) {
							td.add(cell[j].getContents());
						}
					}
					ServletActionContext.getRequest().getSession().setAttribute("th", th);
					ServletActionContext.getRequest().getSession().setAttribute("td", td);
					ServletActionContext.getRequest().getSession().setAttribute("result", "success");
					book.close();
				}
			} else {
				ServletActionContext.getRequest().getSession().setAttribute("result", "fail");
			}
		} catch (Exception e1) {
			ServletActionContext.getRequest().getSession().setAttribute("result", "fail");
			e1.printStackTrace();
		}
	}

}
