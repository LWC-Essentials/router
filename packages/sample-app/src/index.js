import '@lwc/synthetic-shadow';
import { buildCustomElementConstructor } from 'lwc';
import MyApp from 'my/app';
customElements.define('my-app', buildCustomElementConstructor(MyApp));
