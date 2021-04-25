import { AGENDA_INSTANCE } from './constants';
import { NestAgendaService } from './nest-agenda.service';

export const agendaFactory = {
  provide: AGENDA_INSTANCE,
  useFactory: async nestAgendaService => {
    return nestAgendaService.getAgenda();
  },
  inject: [NestAgendaService],
};