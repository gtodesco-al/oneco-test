//
//  EMVTransactionDelegate.h
//  PaymentSDK
//
//  Created by Ajeet Singh on 16/10/19.
//  Copyright © 2019 Zeamster. All rights reserved.
//

#ifndef EMVTransactionDelegate_h
#define EMVTransactionDelegate_h

// Protocol definition starts here
@protocol EMVTransactionDelegate <NSObject>
@required
- (void) deviceMessage: (NSString*)message;
- (void) deviceScanResponse: (NSString*)deviceID deviceName:(NSString*)deviceName;

- (void) deviceConnected;
- (void) deviceDisconnected;

- (void) outputLogs: (NSString*)logs;

- (void) msrData: (NSString*)data fallback: (BOOL)fallback serial: (NSString*)serial kernelVersion: (NSString*)kernelVersion;
- (void) emvChipData: (NSString*)data ksn: (NSString*)ksn serial: (NSString*)serial kernelVersion: (NSString*)kernelVersion;
- (void) emvTapData: (NSString*)data ksn: (NSString*)ksn serial: (NSString*)serial kernelVersion: (NSString*)kernelVersion;
@end

#endif /* EMVTransactionDelegate_h */
