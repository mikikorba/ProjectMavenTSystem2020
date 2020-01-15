package tjobs.utils;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Random;

import javax.imageio.ImageIO;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

public class qrCodeGen {

	public static boolean qrFromURLtoFile(String qrCodeText, int size, String filePath) {
		try {
			String fileType = filePath.substring(filePath.lastIndexOf('.') + 1);
			File qrFile = new File(filePath);
			BufferedImage qrImg = createQRImage(qrCodeText, size);
			ImageIO.write(qrImg, fileType, qrFile);

			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	private static BufferedImage createQRImage(String qrCodeText, int size) throws IOException, WriterException {
		QRCodeWriter qrCodeWriter = new QRCodeWriter();
		BitMatrix byteMatrix = qrCodeWriter.encode(qrCodeText, BarcodeFormat.QR_CODE, size, size);
		int matrixWidth = byteMatrix.getWidth();
		BufferedImage qrCodeImage = new BufferedImage(matrixWidth, matrixWidth, BufferedImage.TYPE_INT_RGB);
		Graphics2D graphics = (Graphics2D) qrCodeImage.getGraphics();
		graphics.setColor(Color.WHITE);
		graphics.fillRect(0, 0, matrixWidth, matrixWidth);
		graphics.setColor(Color.BLACK);
		for (int i = 0; i < matrixWidth; i++) {
			for (int j = 0; j < matrixWidth; j++) {
				if (byteMatrix.get(i, j)) {
					graphics.fillRect(i, j, 1, 1);
				}
			}
		}
		return qrCodeImage;
	}

}
