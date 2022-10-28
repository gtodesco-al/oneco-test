//
//  PluginDelegate.h
//  PaymentSDK
//
//  Created by Samstaurej Siddiquie on 27/12/19.
//  Copyright © 2019 Zeamster. All rights reserved.
//

#ifndef PluginDelegate_h
#define PluginDelegate_h

@protocol PluginDelegate <NSObject>
@required
- (void) deviceMessage: (NSString*)message;
- (void) deviceScanResponse: (NSString*)deviceID deviceName:(NSString*)deviceName;

- (void) deviceConnected;
- (void) deviceDisconnected;

- (void) outputLogs: (NSString*)logs;
- (void) transactionResponse: (NSString*)data;

@end

#endif /* PluginDelegate_h */
