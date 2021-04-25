import { Injectable, Inject, Logger } from '@nestjs/common';
import { NEST_AGENDA_OPTIONS} from './constants';
import { NestAgendaOptions } from './interfaces';
import { Agenda } from 'agenda';

interface INestAgendaService {
  getAgenda();
}

@Injectable()
export class NestAgendaService implements INestAgendaService {
  private readonly logger: Logger;
  private _agenda: any;
  constructor(
    @Inject(NEST_AGENDA_OPTIONS) private _NestAgendaOptions: NestAgendaOptions,
  ) {
    this.logger = new Logger('NestAgendaService');
    this.logger.log(`Options: ${JSON.stringify(this._NestAgendaOptions)}`);
  }

  async getAgenda() {
    if(!this._agenda) {
      this._agenda = new Agenda(this._NestAgendaOptions);
    }
    await this._agenda.start();
    return this._agenda;
  }
}