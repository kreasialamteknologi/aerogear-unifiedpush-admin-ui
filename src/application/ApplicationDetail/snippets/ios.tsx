export const snippet = `
// setup registration
let registration = DeviceRegistration(serverURL: URL(string: "<#AeroGear UnifiedPush Server URL#>")!)

// attempt to register
registration.register(
        clientInfo: { (clientDevice: ClientDeviceInformation!) in
            // setup configuration
            clientDevice.deviceToken = deviceToken
            clientDevice.variantID = "__VARIANTID__"
            clientDevice.variantSecret = "__VARIANT_SECRET__"

            // apply the token, to identify THIS device
            let currentDevice = UIDevice()

            // -- optional config --
            // set some 'useful' hardware information params
            clientDevice.operatingSystem = currentDevice.systemName
            clientDevice.osVersion = currentDevice.systemVersion
            clientDevice.deviceType = currentDevice.model
        },
        success: {
            print("UnifiedPush Server registration succeeded")
        },
        failure: { (error: Error!) in
            print("failed to register, error: \\(error.localizedDescription)")
        }
)
`;
