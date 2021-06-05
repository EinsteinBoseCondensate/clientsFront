import { Subscription } from "rxjs";

export function unsubscribeIfValid(subscription: Subscription){
    subscription && !subscription.closed ? subscription.unsubscribe() : undefined;
}
