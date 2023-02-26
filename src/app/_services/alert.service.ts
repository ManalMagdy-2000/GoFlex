import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

<<<<<<< HEAD:src/app/_services/alert.service.ts
import { Alert, AlertType } from '@app/_models';
=======
import { Alert } from '../_models';
import { AlertType } from '../_models';
>>>>>>> eed15adc5212a539c856651b6545744b256b06f9:flexISAngular/src/app/_services/alert.service.ts

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<Alert>();
    private defaultId = 'default-alert';

    // enable subscribing to alerts observable
    onAlert(id = this.defaultId): Observable<Alert> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    // convenience methods
    success(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Success, message }));
    }

    error(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Error, message }));
    }

    info(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Info, message }));
    }

    warn(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
    }

<<<<<<< HEAD:src/app/_services/alert.service.ts
    // main alert method    
=======
    // main alert method
>>>>>>> eed15adc5212a539c856651b6545744b256b06f9:flexISAngular/src/app/_services/alert.service.ts
    alert(alert: Alert) {
        alert.id = alert.id || this.defaultId;
        this.subject.next(alert);
    }

    // clear alerts
    clear(id = this.defaultId) {
        this.subject.next(new Alert({ id }));
    }
<<<<<<< HEAD:src/app/_services/alert.service.ts
}
=======
}
>>>>>>> eed15adc5212a539c856651b6545744b256b06f9:flexISAngular/src/app/_services/alert.service.ts
