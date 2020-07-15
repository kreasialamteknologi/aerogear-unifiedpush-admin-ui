export const snippet = `
package com.push.pushapplication;

import android.util.Log;
import android.app.Application;

import org.jboss.aerogear.android.core.Callback;
import org.jboss.aerogear.android.unifiedpush.PushRegistrar;
import org.jboss.aerogear.android.unifiedpush.RegistrarManager;
import org.jboss.aerogear.android.unifiedpush.fcm.AeroGearFCMPushConfiguration;

import java.net.URI;

public class PushApplication extends Application {

    private final String VARIANT_ID       = "__VARIANTID__";
    private final String SECRET           = "__VARIANT_SECRET__";
    private final String FCM_SENDER_ID    = "__SENDERID__";
    private final String UNIFIED_PUSH_URL = "__SERVERURL__";

    private final String TAG = "ups";

    @Override
    public void onCreate() {
        super.onCreate();

        RegistrarManager.config("register", AeroGearFCMPushConfiguration.class)
                    .setPushServerURI(URI.create(UNIFIED_PUSH_URL))
                    .setSenderId(FCM_SENDER_ID)
                    .setVariantID(VARIANT_ID)
                    .setSecret(SECRET)
                    .asRegistrar();

        PushRegistrar registrar = RegistrarManager.getRegistrar("register");
        registrar.register(getApplicationContext(), new Callback<Void>() {
            @Override
            public void onSuccess(Void data) {
                Log.i(TAG, "Registration Succeeded!");
            }

            @Override
            public void onFailure(Exception e) {
                Log.e(TAG, e.getMessage(), e);
            }
        });

    }
}`;
