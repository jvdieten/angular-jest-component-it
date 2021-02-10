import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';

const mockRouter = {
  events: of({ url: '/' })
};

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    providers: [
      mockProvider(Router, mockRouter)
    ],
    imports: [RouterTestingModule]
  });

  const routerSubscribeSpy = jest.spyOn(mockRouter.events, 'subscribe');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should showWriteArticleBtn be true', () => {
    spectator = createComponent({ detectChanges: false });
    expect(spectator.component.showWriteArticleBtn).toBe(true);
  });

  describe('ngOnInit', () => {
    it('should subscribe to router.events', () => {
      spectator = createComponent({ detectChanges: false });

      spectator.component.ngOnInit();

      expect(routerSubscribeSpy).toHaveBeenCalled();
    });

    it('should set showWriteArticleBtn to true when url is /', () => {
      spectator = createComponent({ detectChanges: false });
      spectator.component.showWriteArticleBtn = false;

      spectator.component.ngOnInit();

      expect(spectator.component.showWriteArticleBtn).toBe(true);
    });

    it('should set showWriteArticleBtn to true when url is /articles', () => {
      const mockRouterArticles = {
        events: of({ url: '/articles' })
      };
      spectator = createComponent({ detectChanges: false, providers: [mockProvider(Router, mockRouterArticles)] });
      spectator.component.showWriteArticleBtn = false;

      spectator.component.ngOnInit();

      expect(spectator.component.showWriteArticleBtn).toBe(true);
    });

    it('should set showWriteArticleBtn to false when url is something else', () => {
      const mockRouterSomeUrl = {
        events: of({ url: '/someUrl' })
      };
      spectator = createComponent({ detectChanges: false, providers: [mockProvider(Router, mockRouterSomeUrl)] });
      spectator.component.showWriteArticleBtn = true;

      spectator.component.ngOnInit();

      expect(spectator.component.showWriteArticleBtn).toBe(false);
    });
  });

});
