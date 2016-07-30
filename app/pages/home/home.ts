import {Page} from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import * as moment from 'moment';

@Page({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {

    user: FirebaseObjectObservable<any>;
    dayCount: number;

    constructor(af: AngularFire) {
        let self = this;
        af.auth.subscribe(function (auth) {
            if (auth) {
                let userRef = af.database.object('/users/'+auth.uid);
                userRef.subscribe(function(snapshot) {
                    self.user = snapshot;
                    console.debug('user snapshot',snapshot);
                    let nextCycleMoment = self.getNextCycleStartMoment(snapshot.cycleDate);
                    self.dayCount = self.getDaysUntilNextCycle(nextCycleMoment);
                });
            }
        });
    }

    getDaysUntilNextCycle(nextCycleMoment: any) {
        return Math.abs(moment().startOf('day').diff(nextCycleMoment, 'days'));
    }

    getNextCycleStartMoment(originalCycleDateString: any) {
        let cycle = 28;
        let now = moment();
        let originalCycleMoment = moment(originalCycleDateString);
        let nextCycleMoment = originalCycleMoment;
        while (nextCycleMoment.isBefore(now)) {
            nextCycleMoment = nextCycleMoment.add(cycle, 'days');
        }
        return nextCycleMoment.startOf('day');
    }
}
