import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { FilterPipe } from './shared/filter.pipe';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    FilterPipe
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
