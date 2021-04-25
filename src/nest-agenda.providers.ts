import { NestAgendaOptions } from './interfaces';
import { NEST_AGENDA_OPTIONS } from './constants';

export function createNestAgendaProviders(
  options: NestAgendaOptions,
) {
  return [
    {
      provide: NEST_AGENDA_OPTIONS,
      useValue: options,
    },
  ];
}
