# [3.0.0](https://github.com/aerogear/unifiedpush-admin-ui/compare/2.2.0...3.0.0) (2020-09-17)


### Bug Fixes

* **sender:** push sender variant.id-> variantID ([a67aa82](https://github.com/aerogear/unifiedpush-admin-ui/commit/a67aa82bb657d8fb61928b2ed51d196239836b61))
* /app routes to applicationlist now ([e46f2c6](https://github.com/aerogear/unifiedpush-admin-ui/commit/e46f2c67fb0a571df440422db28906c01595ed17))
* 🐛 android form validation didn't check the variant name ([81b6130](https://github.com/aerogear/unifiedpush-admin-ui/commit/81b613003b7fafdb04cf850bed07e447b96e8eda))
* 🐛 app and variant statistics were not working properly ([3099149](https://github.com/aerogear/unifiedpush-admin-ui/commit/3099149345ae279d2182f0221fc8942417fc9239))
* 🐛 create variant status was not correctly initialised ([34a4d37](https://github.com/aerogear/unifiedpush-admin-ui/commit/34a4d37af7b660e72ecbfcecdd340c8377c052d6))
* 🐛 fixed messages count in application list ([8134219](https://github.com/aerogear/unifiedpush-admin-ui/commit/81342195e675448231f988670fef388a5b577e95))
* 🐛 fixed status reset when changing variant type ([71bc8da](https://github.com/aerogear/unifiedpush-admin-ui/commit/71bc8da19c760c615628cdab3b27ec51c7b47e50))
* 🐛 fixed status reset when changing variant type (ioscert) ([8047239](https://github.com/aerogear/unifiedpush-admin-ui/commit/80472395e3a79e3ad1c32688aed7e9999e25eb68))
* 🐛 fixed variant doc links in the wizard ([4e55993](https://github.com/aerogear/unifiedpush-admin-ui/commit/4e559933197ce583be2b74e8d6afb5c917e31ce6))
* 🐛 fixed webpush alias validation ([22960b1](https://github.com/aerogear/unifiedpush-admin-ui/commit/22960b1574bd9d1e89bbbcfa6e011f8cb26f81cc))
* 🐛 now we can skip to step 5/6 only after having an app ([d36e57a](https://github.com/aerogear/unifiedpush-admin-ui/commit/d36e57aa40c0e0744ecb6c449f903c5bd5cb199f))
* 🐛 Various fixes for the wizard pages ([80993d5](https://github.com/aerogear/unifiedpush-admin-ui/commit/80993d54dd46208566668d2c6fb88715eab77a58))
* adding build image ([a307ab8](https://github.com/aerogear/unifiedpush-admin-ui/commit/a307ab88cd94c0e058ae6951f7021d3648b9a4fd))
* refreshing redirects to the app ([4ce71f1](https://github.com/aerogear/unifiedpush-admin-ui/commit/4ce71f18a44cd7ffd29b893632bcb1f5ce09790b))
* trim sender url ([8033240](https://github.com/aerogear/unifiedpush-admin-ui/commit/80332402d4b5cdfbd8ca3b3e3f77f0d6a5403206))
* UPS_DISABLED is a string, not a string array ([24ed03e](https://github.com/aerogear/unifiedpush-admin-ui/commit/24ed03eaac13c1f41256ab1062d2c662a3172d9f))
* **activity_log:** separate 0 pages for no messages and no devices ([a9370b9](https://github.com/aerogear/unifiedpush-admin-ui/commit/a9370b955c8d3546d43339bdb9e0378e5a3b52d6))
* **alerting:** fixed error handling ([0fddbd9](https://github.com/aerogear/unifiedpush-admin-ui/commit/0fddbd97ecab9d9912566ce3205721829eafac55))
* **application:** fixed null error when refreshing on page detail ([94d9d31](https://github.com/aerogear/unifiedpush-admin-ui/commit/94d9d31d35847e6ab70daf51c0e737bdec12ad54))
* **config:** the static server does wrong things if config does not have an extension ([3e89ea6](https://github.com/aerogear/unifiedpush-admin-ui/commit/3e89ea6362e273f8f7e60f6025b6261400cfc0c2))
* **css:** added hover styles for the applist ([d94dd1b](https://github.com/aerogear/unifiedpush-admin-ui/commit/d94dd1b3965055aaff36a73f34504b255198f07c))
* **ios-token:** fixed status reset when changing variant type ([34a5f65](https://github.com/aerogear/unifiedpush-admin-ui/commit/34a5f65e694d70d9e90cee964f03befa761cd425))
* **patternfly:** updated patternfly to the correct version ([4a6d11d](https://github.com/aerogear/unifiedpush-admin-ui/commit/4a6d11dd4216c3a85c91d4151c20e8058974168d))


### Features

* 🎸 added add variant feature in app detail page ([f446b1d](https://github.com/aerogear/unifiedpush-admin-ui/commit/f446b1d20d19d2cbe141d5ae96852909e5affd89))
* 🎸 added logout and username info ([dfb7085](https://github.com/aerogear/unifiedpush-admin-ui/commit/dfb708520be64b331ed5ead1b5d0f49ec9efd056))
* 🎸 adding dynamic configuration ([dab68eb](https://github.com/aerogear/unifiedpush-admin-ui/commit/dab68ebb513b0545c33d30dea1dbf2ff56680da5))
* 🎸 changed npm serve to nginx ([e1ee2d8](https://github.com/aerogear/unifiedpush-admin-ui/commit/e1ee2d8a11d30018c2760011011153027a70650d))
* 🎸 integrated UPS_DISABLED configuration into admin ui ([3723435](https://github.com/aerogear/unifiedpush-admin-ui/commit/37234351db533f62bcf3f6a5597643b66dec11d3))
* Activity Log ([d961e39](https://github.com/aerogear/unifiedpush-admin-ui/commit/d961e39c7c2774d9e18efa8e657dceef29cd9be1))
* added a new component to handle secrets ([2c544ea](https://github.com/aerogear/unifiedpush-admin-ui/commit/2c544eaf17eb283f216bc8ec94f5d2ec76ff58de))
* container image ([513b091](https://github.com/aerogear/unifiedpush-admin-ui/commit/513b091a2930316af918460c3d2bfd32946f8b71))
* push senderui ([85b2eef](https://github.com/aerogear/unifiedpush-admin-ui/commit/85b2eefdee6518d5a4a562fa8283d05fcd29109d))
* **alerting:** added ability to show alert toasts ([#73](https://github.com/aerogear/unifiedpush-admin-ui/issues/73)) ([a9ea8c1](https://github.com/aerogear/unifiedpush-admin-ui/commit/a9ea8c17ce55597602aa1be450d74f1f54bc988d))
* **applications:** added the router component so that we can avoid using a dialog for the app details ([#78](https://github.com/aerogear/unifiedpush-admin-ui/issues/78)) ([5286d26](https://github.com/aerogear/unifiedpush-admin-ui/commit/5286d260d5a67fb971a63f19b1c9ca4efa8adbd8))
* **applications:** added the sender API panel ([315dfb0](https://github.com/aerogear/unifiedpush-admin-ui/commit/315dfb08736e30b3a42ce1932f96cadd96a606d5))
* **docs:** added dynamic links as received from the UPS server ([2bf480e](https://github.com/aerogear/unifiedpush-admin-ui/commit/2bf480e7e3e57377c87169c6f00a0016a3383abb))
* **ios:** implemented ios certificate variant details ([#71](https://github.com/aerogear/unifiedpush-admin-ui/issues/71)) ([32e34e5](https://github.com/aerogear/unifiedpush-admin-ui/commit/32e34e540b92f508f68f4a948df69ba9865df07e))
* **ios:** implementing iosTokenVariant details ([#70](https://github.com/aerogear/unifiedpush-admin-ui/issues/70)) ([d0b14a8](https://github.com/aerogear/unifiedpush-admin-ui/commit/d0b14a8e30f67ce09555545c037a862dc4834b59))
* **variant:** added Android variant details panel ([#62](https://github.com/aerogear/unifiedpush-admin-ui/issues/62)) ([78831bb](https://github.com/aerogear/unifiedpush-admin-ui/commit/78831bb8c3265712993cabf3dd7aa607dd3c1696))
* **variant:** added No Variants page ([#63](https://github.com/aerogear/unifiedpush-admin-ui/issues/63)) ([0ddddb8](https://github.com/aerogear/unifiedpush-admin-ui/commit/0ddddb87d9f3c3d3f8d549ab4c4c2981bfb90987))
* **webpush:** implemented webpush variant details ([#72](https://github.com/aerogear/unifiedpush-admin-ui/issues/72)) ([bd40249](https://github.com/aerogear/unifiedpush-admin-ui/commit/bd4024929acee8b7dbe84e0a11341a6520be2240))



# 2.2.0 (2019-09-30)



