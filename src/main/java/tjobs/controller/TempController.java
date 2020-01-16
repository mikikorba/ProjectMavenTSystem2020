package tjobs.controller;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.imageio.ImageIO;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class TempController {

	@RequestMapping("/filesys")
	public @ResponseBody String files(@RequestParam String s) {
		List<File> allOfThem = new ArrayList<>();
		File[] f = new File(s).getAbsoluteFile().listFiles();

		StringBuilder sb = new StringBuilder();
		sb.append("<style type=\"text/css\">*{margin:0px;padding:0px;border:0px;}</style>");
		for (File fl : f) {
			sb.append((fl.isFile() ? "<pre style=\"color: blue\">" : "<pre style=\"color: red\">")
					+ fl.getAbsolutePath().replace("\\", "/") + "</pre><br>");
		}
		return sb.toString();
	}

	@RequestMapping("/mk")
	public @ResponseBody String mkfile(@RequestParam String s) {
		File f = new File(s);
		try {
			Random r = new Random();
			BufferedImage img = new BufferedImage(500, 500, BufferedImage.TYPE_INT_RGB);
			Graphics g = img.getGraphics();
			g.setColor(Color.red);
			g.fillRect(0, 0, 500, 500);
			for (int i = 0; i < 200; i++) {
				g.setColor(new Color(r.nextInt(16777215)));
				g.drawRect(i, i, 500 - i * 2 - 1, 500 - i * 2 - 1);
			}

			ImageIO.write(img, "png", f);
		} catch (IOException e) {
			return "null";
		}

		return f.getAbsolutePath();
	}

	@RequestMapping("/rm")
	public @ResponseBody String rmfile(@RequestParam String s) {
		File f = new File(s);
		f.delete();
		return f.getAbsolutePath();
	}
	@RequestMapping("/os")
	public @ResponseBody String getOs(@RequestParam String s) {
		return java.lang.System.getProperties().getProperty("os.name");
	}

}
