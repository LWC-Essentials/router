import { LightningElement, wire } from 'lwc';
import { history } from '@lwce/router';

export default class Profile extends LightningElement {
    @wire(history) history;

    goToTeam() {
        this.history.push('/settings/team');
    }
}
