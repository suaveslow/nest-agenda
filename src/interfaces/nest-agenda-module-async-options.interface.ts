/* Dependencies */
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

/* Interfaces */
import {
  NestAgendaOptions,
} from './nest-agenda-options.interface';
import {
  NestAgendaOptionsFactory,
} from './nest-agenda-options-factory.interface';

export interface NestAgendaAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<NestAgendaOptionsFactory>;
  useClass?: Type<NestAgendaOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<NestAgendaOptions> | NestAgendaOptions;
}