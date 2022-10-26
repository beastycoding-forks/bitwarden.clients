import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";

import { HintComponent as BaseHintComponent } from "@bitwarden/angular/components/hint.component";
import { ApiService } from "@bitwarden/common/abstractions/api.service";
import { I18nService } from "@bitwarden/common/abstractions/i18n.service";
import { LogService } from "@bitwarden/common/abstractions/log.service";
import { PlatformUtilsService } from "@bitwarden/common/abstractions/platformUtils.service";

@Component({
  selector: "app-hint",
  templateUrl: "hint.component.html",
})
export class HintComponent extends BaseHintComponent implements OnInit {
  private destroy$ = new Subject<void>();

  constructor(
    router: Router,
    platformUtilsService: PlatformUtilsService,
    i18nService: I18nService,
    apiService: ApiService,
    logService: LogService,
    private route: ActivatedRoute
  ) {
    super(router, i18nService, apiService, platformUtilsService, logService);

    super.onSuccessfulSubmit = async () => {
      this.router.navigate([this.successRoute]);
    };
  }
  ngOnInit() {
    this.route?.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      if (params) {
        const queryParamsEmail = params["email"];
        if (queryParamsEmail != null && queryParamsEmail.indexOf("@") > -1) {
          this.email = queryParamsEmail;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
