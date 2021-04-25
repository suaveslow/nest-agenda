import { Module, DynamicModule, Provider, Global } from '@nestjs/common';
import { NestAgendaService } from './nest-agenda.service';
import {
  NEST_AGENDA_OPTIONS,
} from './constants';
import {
  NestAgendaOptions,
  NestAgendaAsyncOptions,
  NestAgendaOptionsFactory,
} from './interfaces';
import { createNestAgendaProviders } from './nest-agenda.providers';
import { agendaFactory } from './nest-agenda-instance.provider';

@Global()
@Module({
  providers: [NestAgendaService, agendaFactory],
  exports: [NestAgendaService, agendaFactory],
})
export class NestAgendaModule {
  /**
   * Registers a configured NestAgenda Module for import into the current module
   */
  public static register(
    options: NestAgendaOptions,
  ): DynamicModule {
    return {
      module: NestAgendaModule,
      providers: createNestAgendaProviders(options),
    };
  }

  /**
   * Registers a configured NestAgenda Module for import into the current module
   * using dynamic options (factory, etc)
   */
  public static registerAsync(
    options: NestAgendaAsyncOptions,
  ): DynamicModule {
    return {
      module: NestAgendaModule,
      providers: [
        ...this.createProviders(options),
      ],
    };
  }

  private static createProviders(
    options: NestAgendaAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createOptionsProvider(options)];
    }

    return [
      this.createOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createOptionsProvider(
    options: NestAgendaAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: NEST_AGENDA_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    // For useExisting...
    return {
  provide: NEST_AGENDA_OPTIONS,
      useFactory: async (optionsFactory: NestAgendaOptionsFactory) =>
        await optionsFactory.createNestAgendaOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }

 }
