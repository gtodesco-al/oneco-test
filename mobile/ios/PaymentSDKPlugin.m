#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(PaymentSDKPlugin, RCTEventEmitter)

RCT_EXTERN_METHOD(execute:(NSString *)action args:(NSString *)args)

@end
