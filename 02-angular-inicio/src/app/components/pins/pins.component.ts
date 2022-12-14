import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { RepositoryService } from 'src/app/services/repository.service';
import { PinsService } from './pins.service';
import { filter } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.scss'],
})
export class PinsComponent {
  public step = 0;
  public pins:any;
  private currentSubscription: Subscription = new Subscription;

  constructor(
    private repository: RepositoryService,
    private _snackBar:  MatSnackBar,
    private pinsService: PinsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.repository.getPins().subscribe(pins => {
      this.pins = pins.map((pin:any) => {
        const controls:any = {};

        pin.assets.forEach((asset:any) => {
          controls[asset._id] = this.formBuilder.control(asset.readed);
        });

        return {
          ...pin,
          formGroup: this.formBuilder.group(controls)
        };
      });
    });

    this.pinsService.$actionObserver.pipe(filter(action => action === 'save')).subscribe(action => {
      this.updateProgress(this.step);
    });
  }

  public setStep(index: number) {
    this.step = index;
    this.updatePercentage(index);
  }

  public nextStep() {
    this.step++;
  }

  public prevStep() {
    this.step--;
  }

  public updateProgress(index:any) {
    const pin = this.pins[index];
    this.repository
      .updatePin(pin._id, {
        title: pin.title,
        author: pin.author,
        description: pin.description,
        percentage: pin.percentage,
        tags: pin.tags,
        assets: pin.assets
      })
      .subscribe(pin => {
        this._snackBar.open('Progress updated!', 'OK', {
          duration: 2000
        });
      });
  }

  public openUrl(URL: string): void {
    window.open(URL, '_blank');
  }

  private updatePercentage(index:any) {
    if (this.currentSubscription && !this.currentSubscription.closed) {
      this.currentSubscription.unsubscribe();
    }

    this.currentSubscription = this.pins[index].formGroup.valueChanges.subscribe((values:any) => {
      const keys = Object.keys(values);
      const total = keys.length;
      const active = keys.map(key => values[key]).filter(value => value);
      const percentage = ((active.length * 100) / total).toFixed(2);

      this.pins[index].percentage = percentage;
      this.pins[index].assets = this.pins[index].assets.map((asset:any) => {
        return {
          ...asset,
          readed: values[asset._id]
        };
      });
    });
  }
}
