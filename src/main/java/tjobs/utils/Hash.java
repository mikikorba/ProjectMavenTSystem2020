package tjobs.utils;

import java.io.IOException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Hash {

    public static String fingerprintString(String input) {
        String hashtext = "";
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] messageDigest = md.digest(input.getBytes());
            BigInteger no = new BigInteger(1, messageDigest);
            hashtext = no.toString(16);
        } catch (NoSuchAlgorithmException ex) {
        }
        return hashtext;
    }

    public static String fingerprintObject(Object o) {
        String hashtext = "";
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] messageDigest = md.digest(Serializer.serialize(o));
            BigInteger no = new BigInteger(1, messageDigest);
            hashtext = no.toString(16);
        } catch (NoSuchAlgorithmException ex) {
        } catch (IOException ex) {
        }
        return hashtext;
    }

}
