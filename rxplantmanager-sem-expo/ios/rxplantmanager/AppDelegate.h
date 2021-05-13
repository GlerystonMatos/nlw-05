#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>


@interface AppDelegate : UMAppDelegateWrapper <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
