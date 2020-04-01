import {
    register,
    ValueChangedEvent,
    LinkContextEvent
} from '@lwc/wire-service';

export const history = Symbol('LWCE History');

register(history, eventTarget => {
    function historyParamsChanged(history) {
        eventTarget.dispatchEvent(new ValueChangedEvent(history));
    }

    function handleConfig(options) {}

    function handleConnect() {
        eventTarget.dispatchEvent(
            new LinkContextEvent(
                'lwcerouter_addhistoryadapter',
                historyParamsChanged
            )
        );
    }

    // Connect the wire adapter
    eventTarget.addEventListener('config', handleConfig);
    eventTarget.addEventListener('connect', handleConnect);
});
