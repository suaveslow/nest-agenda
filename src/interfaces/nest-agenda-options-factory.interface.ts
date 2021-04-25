import {
  NestAgendaOptions,
} from './nest-agenda-options.interface';

export interface NestAgendaOptionsFactory {
  createNestAgendaOptions():
    | Promise<NestAgendaOptions>
    | NestAgendaOptions;
}
