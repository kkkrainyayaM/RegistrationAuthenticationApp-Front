import {Status} from './status.enum';

export class StatusUpdate {
  ids: number[];
  status: Status;

  constructor(ids: number[], status: Status) {
    this.ids = ids;
    this.status = status;
  }
}
