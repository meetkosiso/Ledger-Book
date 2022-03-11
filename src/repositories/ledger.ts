import moment from "moment";
import DatabaseFactory from "../providers/database";
import { ILedger } from "../interface/ledger";
import LedgerModel from "../models/ledger";

class LedgerRepository {
  dbProvider: any;

  constructor() {
    this.dbProvider = DatabaseFactory.getDatabaseProvider(LedgerModel);
  }

  saveLedger(ledger: ILedger) {
    return this.dbProvider.add(ledger);
  }

  findUserLedger(user: string, startDate: string, endDate: string) {
    return this.dbProvider.findAll({
      createdAt: {
        $gte: moment(startDate).startOf("day").toISOString(),
        $lte: moment(endDate).endOf("day").toISOString(),
      },
      user,
    });
  }
}

export default LedgerRepository;
