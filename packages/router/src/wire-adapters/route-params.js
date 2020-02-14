import {
    register,
    ValueChangedEvent,
    LinkContextEvent
} from '@lwc/wire-service';

export const routeParams = Symbol('LWCE Router Params');

register(routeParams, eventTarget => {
    function routeParamsChanged(routeParams) {
        eventTarget.dispatchEvent(new ValueChangedEvent(routeParams));
    }

    function handleConfig(options) {}

    function handleConnect() {
        eventTarget.dispatchEvent(
            new LinkContextEvent(
                'lwcerouter_addwireadapter',
                routeParamsChanged
            )
        );
    }

    function handleDisconnect() {
        eventTarget.dispatchEvent(
            new LinkContextEvent('lwcerouter_removewireadapter', routeParamsChanged)
        );
    }

    // Connect the wire adapter
    eventTarget.addEventListener('config', handleConfig);
    eventTarget.addEventListener('connect', handleConnect);
    eventTarget.addEventListener('disconnect', handleDisconnect);
});
