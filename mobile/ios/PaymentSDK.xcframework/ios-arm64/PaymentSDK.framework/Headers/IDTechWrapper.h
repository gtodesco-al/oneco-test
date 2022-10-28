//
//  IDTechWrapper.h
//  BBPOS
//
//  Created by Ajeet Singh on 23/09/19.
//  Modified by Samstaurej Siddiquie on 27/12/19.
//  Modified by Samstaurej Siddiquie on 09/01/20.
//  Copyright © 2019 Zeamster. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "EMVTransactionDelegate.h"
#import "PluginDelegate.h"

@interface IDTechWrapper : NSObject {
   // Delegate to respond back
   id <EMVTransactionDelegate> _delegate;
   id <PluginDelegate> _pluginDelegate;
}
@property (nonatomic,strong) id delegate;
@property (nonatomic,strong) id pluginDelegate;

@property (nonatomic) NSMutableArray *deviceList;
@property (nonatomic) Boolean isEMV;
@property (nonatomic) Boolean isRefund;
@property (nonatomic) NSString *deviceSerial;
@property (nonatomic) NSString *deviceEMVKernelVersion;
@property (nonatomic) NSString *deviceCTLSEMVKernelVersion;
@property (nonatomic) NSMutableDictionary *finalTransactionTags;
@property (nonatomic) Boolean isNonTechnicalFallback;
@property (nonatomic) Boolean hasSwiped;
@property (nonatomic) Boolean hasInserted;
@property (nonatomic) Boolean hasProcessed;
@property (nonatomic) NSMutableDictionary *cardAIDsMap;
@property (nonatomic) NSMutableDictionary *cardHexValueMap;
@property (nonatomic) NSString* searchDeviceName;


- (instancetype)initWithValue: (NSString*) str;
- (void) appendMessageToResults:(NSString*) message;

- (void) stopDeviceSearch;
- (void) startDeviceSearch:(NSString*)friendlyName :(double)timeout :(Boolean) connect;
- (void) connectDevice:(NSString*)deviceName :(double) timeout;
- (void) startBLESearch:(NSString*)friendlyName :(double) timeout;
- (NSArray*) getSearchResults;
- (void) initialDeviceSetup:(NSDictionary*)deviceSettings;
- (NSDictionary*) getInitialDeviceSettings;
- (NSString*) getFirmware;
- (NSString*) getSerial;
- (Boolean) startEMVTransaction:(double) amount;
- (Boolean) cancelEMVTransaction;
- (Boolean) completeEMVTransaction:(NSTimer *)timer;
- (Boolean) disconnectDevice;
- (void) setTimeouts: (NSString *) timeoutLength;
- (void) soundLongBeep;
@end
