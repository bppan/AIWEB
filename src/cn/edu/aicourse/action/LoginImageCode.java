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
		//���ڴ��д���ͼ��
		BufferedImage image = new BufferedImage(width, height,
		BufferedImage.TYPE_INT_RGB);
		//��ȡ����
		Graphics g = image.getGraphics();
		//���û�����ɫ
		
		g.setColor(getRandColor(200,250));
		g.fillRect(0, 0, width, height);
		//��ʼ������֤��,�����üӷ����
		Random r = new Random();
		int num1 = r.nextInt(10);//������1
		int num2 = r.nextInt(10);//������2
		int result = num1 + num2;//�ӷ��ͽ��
		String code = String.valueOf(result);
		//����֤�����session
		session.put("imageCode", code);
		//����֤����ʾ��ͼ����
		g.setColor(Color.BLACK);
		g.setFont(new Font("", Font.ROMAN_BASELINE, 20));
		
		g.drawString(num1+"+"+num2+"= ?", 10, 22);
		//�漴��������ͼ��
		//�漴����5��ֱ��
		for (int i = 0; i < 10; i++) {
			int x = r.nextInt(width);
			int y = r.nextInt(height);
			int xs = r.nextInt(width);
			int ys = r.nextInt(height);
			g.setColor(getRandColor(100,200));
			g.drawLine(xs, ys, x, y);
		}
		//����100����
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
		   int red = fc+r.nextInt(bc-fc);//��
		   int green = fc+r.nextInt(bc-fc);//��
		   int blue = fc+r.nextInt(bc-fc);//��
		   return new Color(red,green,blue);
	}

}
