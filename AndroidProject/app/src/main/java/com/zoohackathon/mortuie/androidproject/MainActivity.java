package com.zoohackathon.mortuie.androidproject;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.Image;
import android.net.Uri;
import android.nfc.Tag;
import android.os.Environment;
import android.os.StrictMode;
import android.preference.PreferenceActivity;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;

import com.kosalgeek.android.photoutil.ImageBase64;
import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.RequestParams;
import com.loopj.android.http.SyncHttpClient;
import com.loopj.android.http.TextHttpResponseHandler;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class MainActivity extends AppCompatActivity {

    private Button b;
    private static final int  SELECT_PHOTO = 100;
    private Bitmap s;
    private ImageView i;
    private static byte[] arr;

//    @Override
//    protected void onActivityResult(int requestCode, int resultCode, Intent imageReturnedIntent) {
//        super.onActivityResult(requestCode, resultCode, imageReturnedIntent);
//
//                    Uri selectedImage = imageReturnedIntent.getData();
//                    Log.d("TEST", selectedImage.toString());
//                    Log.v("TEST", encodeString(selectedImage));
//                    Log.d("TEST", "IS THIS EVEN WORKING?");
//
//
//    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        StrictMode.setThreadPolicy(new StrictMode.ThreadPolicy.Builder().detectDiskReads().detectDiskWrites().detectNetwork().penaltyLog().build());

        //Intent photoPickerIntent = new Intent();
        //photoPickerIntent.setAction(Intent.ACTION_GET_CONTENT);
        //photoPickerIntent.setType("image/*");
        //startActivityForResult(Intent.createChooser(photoPickerIntent, "select"), 1);

        b = (Button) findViewById(R.id.pressButton);



        b.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                try {
                    String s = encodeString();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    private void sendRequest(String s) throws IOException {



    }

    private String encodeString() throws IOException {
        Log.d("TEST", "Banter");

        Bitmap largeIcon = BitmapFactory.decodeResource(getResources(), R.mipmap.retard);


        //Bitmap b = BitmapFactory.decodeFile(new File(R.mipmap.testpic));
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        largeIcon.compress(Bitmap.CompressFormat.JPEG, 100, baos);
        arr = baos.toByteArray();


//        String s = Base64.encodeToString(arr, Base64.DEFAULT);
        //String s = new String(Base64.encodeBase64(arr), "UTF-8");




        OkHttpClient client = new OkHttpClient();

        MediaType mediaType = MediaType.parse("application/x-www-form-urlencoded");
        RequestBody body = RequestBody.create(mediaType, "image_data=data%3Aimage%2Fjpg%3Bbase64%2C" + getString(arr) + "&image_name=whale");

        Log.v("TEST", "got passed the intialisation");

        Request request = new Request.Builder()
                .url("http://35.195.201.85/upload.php")
                .post(body)
                .addHeader("content-type", "application/x-www-form-urlencoded")
                .build();

        Log.v("TEST", "got passed here");

        Response response = client.newCall(request).execute();

        Log.v("TEST", response.toString());

        return response.toString();
    }

    private static String getString(byte[] arr) {
        return Base64.encodeBase64URLSafeString(arr);
    }


}
