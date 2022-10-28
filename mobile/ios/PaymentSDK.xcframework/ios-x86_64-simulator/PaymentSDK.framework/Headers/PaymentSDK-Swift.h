#if 0
#elif defined(__x86_64__) && __x86_64__
// Generated by Apple Swift version 5.7 (swiftlang-5.7.0.127.4 clang-1400.0.29.50)
#ifndef PAYMENTSDK_SWIFT_H
#define PAYMENTSDK_SWIFT_H
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wgcc-compat"

#if !defined(__has_include)
# define __has_include(x) 0
#endif
#if !defined(__has_attribute)
# define __has_attribute(x) 0
#endif
#if !defined(__has_feature)
# define __has_feature(x) 0
#endif
#if !defined(__has_warning)
# define __has_warning(x) 0
#endif

#if __has_include(<swift/objc-prologue.h>)
# include <swift/objc-prologue.h>
#endif

#pragma clang diagnostic ignored "-Wduplicate-method-match"
#pragma clang diagnostic ignored "-Wauto-import"
#if defined(__OBJC__)
#include <Foundation/Foundation.h>
#endif
#if defined(__cplusplus)
#include <cstdint>
#include <cstddef>
#include <cstdbool>
#else
#include <stdint.h>
#include <stddef.h>
#include <stdbool.h>
#endif

#if !defined(SWIFT_TYPEDEFS)
# define SWIFT_TYPEDEFS 1
# if __has_include(<uchar.h>)
#  include <uchar.h>
# elif !defined(__cplusplus)
typedef uint_least16_t char16_t;
typedef uint_least32_t char32_t;
# endif
typedef float swift_float2  __attribute__((__ext_vector_type__(2)));
typedef float swift_float3  __attribute__((__ext_vector_type__(3)));
typedef float swift_float4  __attribute__((__ext_vector_type__(4)));
typedef double swift_double2  __attribute__((__ext_vector_type__(2)));
typedef double swift_double3  __attribute__((__ext_vector_type__(3)));
typedef double swift_double4  __attribute__((__ext_vector_type__(4)));
typedef int swift_int2  __attribute__((__ext_vector_type__(2)));
typedef int swift_int3  __attribute__((__ext_vector_type__(3)));
typedef int swift_int4  __attribute__((__ext_vector_type__(4)));
typedef unsigned int swift_uint2  __attribute__((__ext_vector_type__(2)));
typedef unsigned int swift_uint3  __attribute__((__ext_vector_type__(3)));
typedef unsigned int swift_uint4  __attribute__((__ext_vector_type__(4)));
#endif

#if !defined(SWIFT_PASTE)
# define SWIFT_PASTE_HELPER(x, y) x##y
# define SWIFT_PASTE(x, y) SWIFT_PASTE_HELPER(x, y)
#endif
#if !defined(SWIFT_METATYPE)
# define SWIFT_METATYPE(X) Class
#endif
#if !defined(SWIFT_CLASS_PROPERTY)
# if __has_feature(objc_class_property)
#  define SWIFT_CLASS_PROPERTY(...) __VA_ARGS__
# else
#  define SWIFT_CLASS_PROPERTY(...)
# endif
#endif

#if __has_attribute(objc_runtime_name)
# define SWIFT_RUNTIME_NAME(X) __attribute__((objc_runtime_name(X)))
#else
# define SWIFT_RUNTIME_NAME(X)
#endif
#if __has_attribute(swift_name)
# define SWIFT_COMPILE_NAME(X) __attribute__((swift_name(X)))
#else
# define SWIFT_COMPILE_NAME(X)
#endif
#if __has_attribute(objc_method_family)
# define SWIFT_METHOD_FAMILY(X) __attribute__((objc_method_family(X)))
#else
# define SWIFT_METHOD_FAMILY(X)
#endif
#if __has_attribute(noescape)
# define SWIFT_NOESCAPE __attribute__((noescape))
#else
# define SWIFT_NOESCAPE
#endif
#if __has_attribute(ns_consumed)
# define SWIFT_RELEASES_ARGUMENT __attribute__((ns_consumed))
#else
# define SWIFT_RELEASES_ARGUMENT
#endif
#if __has_attribute(warn_unused_result)
# define SWIFT_WARN_UNUSED_RESULT __attribute__((warn_unused_result))
#else
# define SWIFT_WARN_UNUSED_RESULT
#endif
#if __has_attribute(noreturn)
# define SWIFT_NORETURN __attribute__((noreturn))
#else
# define SWIFT_NORETURN
#endif
#if !defined(SWIFT_CLASS_EXTRA)
# define SWIFT_CLASS_EXTRA
#endif
#if !defined(SWIFT_PROTOCOL_EXTRA)
# define SWIFT_PROTOCOL_EXTRA
#endif
#if !defined(SWIFT_ENUM_EXTRA)
# define SWIFT_ENUM_EXTRA
#endif
#if !defined(SWIFT_CLASS)
# if __has_attribute(objc_subclassing_restricted)
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# else
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# endif
#endif
#if !defined(SWIFT_RESILIENT_CLASS)
# if __has_attribute(objc_class_stub)
#  define SWIFT_RESILIENT_CLASS(SWIFT_NAME) SWIFT_CLASS(SWIFT_NAME) __attribute__((objc_class_stub))
#  define SWIFT_RESILIENT_CLASS_NAMED(SWIFT_NAME) __attribute__((objc_class_stub)) SWIFT_CLASS_NAMED(SWIFT_NAME)
# else
#  define SWIFT_RESILIENT_CLASS(SWIFT_NAME) SWIFT_CLASS(SWIFT_NAME)
#  define SWIFT_RESILIENT_CLASS_NAMED(SWIFT_NAME) SWIFT_CLASS_NAMED(SWIFT_NAME)
# endif
#endif

#if !defined(SWIFT_PROTOCOL)
# define SWIFT_PROTOCOL(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
# define SWIFT_PROTOCOL_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
#endif

#if !defined(SWIFT_EXTENSION)
# define SWIFT_EXTENSION(M) SWIFT_PASTE(M##_Swift_, __LINE__)
#endif

#if !defined(OBJC_DESIGNATED_INITIALIZER)
# if __has_attribute(objc_designated_initializer)
#  define OBJC_DESIGNATED_INITIALIZER __attribute__((objc_designated_initializer))
# else
#  define OBJC_DESIGNATED_INITIALIZER
# endif
#endif
#if !defined(SWIFT_ENUM_ATTR)
# if defined(__has_attribute) && __has_attribute(enum_extensibility)
#  define SWIFT_ENUM_ATTR(_extensibility) __attribute__((enum_extensibility(_extensibility)))
# else
#  define SWIFT_ENUM_ATTR(_extensibility)
# endif
#endif
#if !defined(SWIFT_ENUM)
# define SWIFT_ENUM(_type, _name, _extensibility) enum _name : _type _name; enum SWIFT_ENUM_ATTR(_extensibility) SWIFT_ENUM_EXTRA _name : _type
# if __has_feature(generalized_swift_name)
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME, _extensibility) enum _name : _type _name SWIFT_COMPILE_NAME(SWIFT_NAME); enum SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_ENUM_ATTR(_extensibility) SWIFT_ENUM_EXTRA _name : _type
# else
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME, _extensibility) SWIFT_ENUM(_type, _name, _extensibility)
# endif
#endif
#if !defined(SWIFT_UNAVAILABLE)
# define SWIFT_UNAVAILABLE __attribute__((unavailable))
#endif
#if !defined(SWIFT_UNAVAILABLE_MSG)
# define SWIFT_UNAVAILABLE_MSG(msg) __attribute__((unavailable(msg)))
#endif
#if !defined(SWIFT_AVAILABILITY)
# define SWIFT_AVAILABILITY(plat, ...) __attribute__((availability(plat, __VA_ARGS__)))
#endif
#if !defined(SWIFT_WEAK_IMPORT)
# define SWIFT_WEAK_IMPORT __attribute__((weak_import))
#endif
#if !defined(SWIFT_DEPRECATED)
# define SWIFT_DEPRECATED __attribute__((deprecated))
#endif
#if !defined(SWIFT_DEPRECATED_MSG)
# define SWIFT_DEPRECATED_MSG(...) __attribute__((deprecated(__VA_ARGS__)))
#endif
#if __has_feature(attribute_diagnose_if_objc)
# define SWIFT_DEPRECATED_OBJC(Msg) __attribute__((diagnose_if(1, Msg, "warning")))
#else
# define SWIFT_DEPRECATED_OBJC(Msg) SWIFT_DEPRECATED_MSG(Msg)
#endif
#if defined(__OBJC__)
#if !defined(IBSegueAction)
# define IBSegueAction
#endif
#endif
#if !defined(SWIFT_EXTERN)
# if defined(__cplusplus)
#  define SWIFT_EXTERN extern "C"
# else
#  define SWIFT_EXTERN extern
# endif
#endif
#if !defined(SWIFT_CALL)
# define SWIFT_CALL __attribute__((swiftcall))
#endif
#if defined(__cplusplus)
#if !defined(SWIFT_NOEXCEPT)
# define SWIFT_NOEXCEPT noexcept
#endif
#else
#if !defined(SWIFT_NOEXCEPT)
# define SWIFT_NOEXCEPT 
#endif
#endif
#if defined(__cplusplus)
#if !defined(SWIFT_CXX_INT_DEFINED)
#define SWIFT_CXX_INT_DEFINED
namespace swift {
using Int = ptrdiff_t;
using UInt = size_t;
}
#endif
#endif
#if defined(__OBJC__)
#if __has_feature(modules)
#if __has_warning("-Watimport-in-framework-header")
#pragma clang diagnostic ignored "-Watimport-in-framework-header"
#endif
@import Foundation;
@import ObjectiveC;
#endif

#import <PaymentSDK/PaymentSDK.h>

#endif
#pragma clang diagnostic ignored "-Wproperty-attribute-mismatch"
#pragma clang diagnostic ignored "-Wduplicate-method-arg"
#if __has_warning("-Wpragma-clang-attribute")
# pragma clang diagnostic ignored "-Wpragma-clang-attribute"
#endif
#pragma clang diagnostic ignored "-Wunknown-pragmas"
#pragma clang diagnostic ignored "-Wnullability"
#pragma clang diagnostic ignored "-Wdollar-in-identifier-extension"

#if __has_attribute(external_source_symbol)
# pragma push_macro("any")
# undef any
# pragma clang attribute push(__attribute__((external_source_symbol(language="Swift", defined_in="PaymentSDK",generated_declaration))), apply_to=any(function,enum,objc_interface,objc_category,objc_protocol))
# pragma pop_macro("any")
#endif

#if defined(__OBJC__)
typedef SWIFT_ENUM(NSInteger, DeviceTypeOBJC, open) {
  DeviceTypeOBJCUNKNOWN = 0,
  DeviceTypeOBJCIDTECH_VP3300BT = 1,
  DeviceTypeOBJCIDTECH_VP8800 = 2,
  DeviceTypeOBJCMAGTEK_IDYNAMO = 3,
  DeviceTypeOBJCMAGTEK_TDYNAMO = 4,
};

@protocol EMVUIDelegate;
@protocol PluginDelegate;
@class IDTechWrapper;
@class RestServiceClient;
@class NSString;

SWIFT_CLASS("_TtC10PaymentSDK14EMVTransaction")
@interface EMVTransaction : NSObject <EMVTransactionDelegate>
@property (nonatomic, weak) id <EMVUIDelegate> _Nullable delegate;
@property (nonatomic, weak) id <PluginDelegate> _Nullable pluginDelegate;
@property (nonatomic) BOOL isPluginRequest;
@property (nonatomic, strong) IDTechWrapper * _Nonnull idtechDeviceWrapper;
@property (nonatomic, strong) RestServiceClient * _Nonnull restServiceClient;
- (nonnull instancetype)initWithRestClient:(RestServiceClient * _Nonnull)restClient OBJC_DESIGNATED_INITIALIZER;
- (nonnull instancetype)initWithRestClient:(RestServiceClient * _Nonnull)restClient device:(enum DeviceTypeOBJC)device OBJC_DESIGNATED_INITIALIZER;
- (void)deviceMessage:(NSString * _Null_unspecified)message;
- (void)deviceScanResponse:(NSString * _Null_unspecified)deviceID deviceName:(NSString * _Null_unspecified)deviceName;
- (void)deviceConnected;
- (void)deviceDisconnected;
- (void)outputLogs:(NSString * _Null_unspecified)logs;
- (void)msrData:(NSString * _Null_unspecified)data fallback:(BOOL)fallback serial:(NSString * _Null_unspecified)serial kernelVersion:(NSString * _Null_unspecified)kernelVersion;
- (void)emvChipData:(NSString * _Null_unspecified)data ksn:(NSString * _Null_unspecified)ksn serial:(NSString * _Null_unspecified)serial kernelVersion:(NSString * _Null_unspecified)kernelVersion;
- (void)emvTapData:(NSString * _Null_unspecified)data ksn:(NSString * _Null_unspecified)ksn serial:(NSString * _Null_unspecified)serial kernelVersion:(NSString * _Null_unspecified)kernelVersion;
- (BOOL)setDeviceTypeOBJCWithDeviceType:(enum DeviceTypeOBJC)deviceType SWIFT_WARN_UNUSED_RESULT;
- (BOOL)scanForDevices SWIFT_WARN_UNUSED_RESULT;
- (BOOL)scanForDevicesWithTimeout:(double)timeout SWIFT_WARN_UNUSED_RESULT;
- (BOOL)scanForDevicesWithSearchString:(NSString * _Null_unspecified)searchString timeout:(double)timeout SWIFT_WARN_UNUSED_RESULT;
- (BOOL)initialDeviceSetup SWIFT_WARN_UNUSED_RESULT;
- (BOOL)setTimeoutsWithIdleMinutes:(NSInteger)idleMinutes sleepMinutes:(NSInteger)sleepMinutes SWIFT_WARN_UNUSED_RESULT;
- (BOOL)connectDeviceByNameWithName:(NSString * _Nonnull)name SWIFT_WARN_UNUSED_RESULT;
- (BOOL)PerformEMVSaleWithJsonPayload:(NSDictionary<NSString *, NSString *> * _Nonnull)map SWIFT_WARN_UNUSED_RESULT;
- (BOOL)CancelEMVSale SWIFT_WARN_UNUSED_RESULT;
- (BOOL)DisconnectDevice SWIFT_WARN_UNUSED_RESULT;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end


SWIFT_PROTOCOL("_TtP10PaymentSDK13EMVUIDelegate_")
@protocol EMVUIDelegate
- (void)deviceMessageWithMessage:(NSString * _Null_unspecified)message;
- (void)deviceScanResponseWithDeviceID:(NSString * _Null_unspecified)deviceID deviceName:(NSString * _Null_unspecified)deviceName;
- (void)deviceConnected;
- (void)deviceDisconnected;
- (void)outputLogsWithLogs:(NSString * _Null_unspecified)logs;
- (void)transactionResponseWithData:(NSString * _Null_unspecified)data;
@end


SWIFT_CLASS("_TtC10PaymentSDK17RestServiceClient")
@interface RestServiceClient : NSObject
- (nonnull instancetype)initWithApiProtocol:(NSString * _Nonnull)_protocol apiHostName:(NSString * _Nonnull)_hostName apiEndpointPath:(NSString * _Nullable)_endpoint OBJC_DESIGNATED_INITIALIZER;
- (BOOL)setHTTPRequestHeadersWithHeaderParams:(NSDictionary * _Nonnull)params SWIFT_WARN_UNUSED_RESULT;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end

typedef SWIFT_ENUM(NSInteger, TransactionActionOBJC, open) {
  TransactionActionOBJCNotSelected = 0,
  TransactionActionOBJCSale = 1,
  TransactionActionOBJCRefund = 2,
  TransactionActionOBJCVoid = 3,
  TransactionActionOBJCAuthOnly = 4,
  TransactionActionOBJCAuthComplete = 5,
  TransactionActionOBJCAuthIncrement = 6,
  TransactionActionOBJCForce = 7,
  TransactionActionOBJCTipAdjust = 8,
  TransactionActionOBJCDebit = 9,
  TransactionActionOBJCCredit = 10,
  TransactionActionOBJCEdit = 11,
  TransactionActionOBJCAVSOnly = 12,
  TransactionActionOBJCViewRecord = 13,
  TransactionActionOBJCViewRecordList = 14,
  TransactionActionOBJCGetBinInfo = 15,
  TransactionActionOBJCStore = 16,
};

@class NSMutableDictionary;

SWIFT_CLASS("_TtC10PaymentSDK18TransactionService")
@interface TransactionService : NSObject
- (nonnull instancetype)initWithRestClient:(RestServiceClient * _Nonnull)restClient OBJC_DESIGNATED_INITIALIZER;
- (void)processTransactionWithTransactionAction:(enum TransactionActionOBJC)action paramMap:(NSMutableDictionary * _Nonnull)map transactionId:(NSString * _Nullable)id completion:(void (^ _Nonnull)(NSString * _Nonnull))completion;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end

#endif
#if defined(__cplusplus)
#endif
#if __has_attribute(external_source_symbol)
# pragma clang attribute pop
#endif
#pragma clang diagnostic pop
#endif

#else
#error unsupported Swift architecture
#endif
