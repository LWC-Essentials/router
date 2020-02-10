import { register, buildCustomElementConstructor } from 'lwc';
import MyApp from 'my/app';
import { registerWireService } from '@lwc/wire-service';

registerWireService(register);
customElements.define('my-app', buildCustomElementConstructor(MyApp));
