package cn.edu.aicourse.action;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.util.Map;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.springframework.web.client.HttpServerErrorException;

import cn.edu.aicourse.entity.User;
import cn.edu.aicourse.service.IUserService;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class LoginImageCode extends ActionSupport {
	
	private IUserService userservice;
	
	@Override
	public String execute() throws Exception {

		Map session=ActionContext.getContext().getSession();		
		ServletActionContext.getResponse().setHeader("Cache-Control", "no-cache");
		int width = 80, height = 30;
		//在内存中创建图像
		BufferedImage image = new BufferedImage(width, height,
		BufferedImage.TYPE_INT_RGB);
		//获取画笔
		Graphics g = image.getGraphics();
		//设置画笔颜色
		
		g.setColor(getRandColor(200,250));
		g.fillRect(0, 0, width, height);
		//开始生成验证码,这里用加法求和
		Random r = new Random();
		int num1 = r.nextInt(10);//操作数1
		int num2 = r.nextInt(10);//操作数2
		int result = num1 + num2;//加法和结果
		String code = String.valueOf(result);
		//将验证码存入session
		session.put("imageCode", code);
		//将验证码显示到图像中
		g.setColor(Color.BLACK);
		g.setFont(new Font("", Font.ROMAN_BASELINE, 20));
		
		g.drawString(num1+"+"+num2+"= ?", 10, 22);
		//随即产生干扰图像
		//随即产生5条直线
		for (int i = 0; i < 10; i++) {
			int x = r.nextInt(width);
			int y = r.nextInt(height);
			int xs = r.nextInt(width);
			int ys = r.nextInt(height);
			g.setColor(getRandColor(100,200));
			g.drawLine(xs, ys, x, y);
		}
		//产生100个点
		for(int i=0;i<100;i++) {
			int x = r.nextInt(width);
			int y = r.nextInt(height);
			g.setColor(Color.BLUE);
			g.drawOval(x, y, 1, 1);
		}
			
		ImageIO.write(image, "JPEG",ServletActionContext.getResponse().getOutputStream());
		g.dispose();	
		return "success";
	}
	public Color getRandColor(int fc,int bc){
		   Random r = new Random();
		   if (fc>255) 
			   fc=255;
		   if (bc>255) 
			   bc=255;
		   int red = fc+r.nextInt(bc-fc);//红
		   int green = fc+r.nextInt(bc-fc);//绿
		   int blue = fc+r.nextInt(bc-fc);//蓝
		   return new Color(red,green,blue);
	}

}
