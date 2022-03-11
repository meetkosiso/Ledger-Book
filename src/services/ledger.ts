import moment from "moment";
import LedgerRepository from "../repositories/ledger";
import UserRepository from "../repositories/user";
import Ledger from "../utils/ledger";

import { ILedger } from "../interface/ledger";
import { LedgerEntity } from "../entity/ledger";

class LedgerService {
  repository: LedgerRepository;
  ledger: Ledger;
  userRepository: UserRepository;

  constructor() {
    this.repository = new LedgerRepository();
    this.userRepository = new UserRepository();
    this.ledger = new Ledger();
  }

  async saveLedger(
    ledgerRequest: ILedger,
    conversionRate: number,
    dailyMaximumAllowedToken: number
  ) {
    const ledgerEntity = LedgerEntity(ledgerRequest);

    if (ledgerEntity.isError === true) {
      throw ledgerEntity.error;
    }

    const currentDay = moment().toISOString();
    const { token, user } = ledgerEntity;

    const userFound = await this.userRepository.findUser(user);

    if (!userFound) {
      throw "User not found";
    }

    const currentUserLedger = await this.repository.findUserLedger(
      userFound.id,
      currentDay,
      currentDay
    );

    const currentUserTokens = this.ledger.getStatistics(currentUserLedger);

    if (
      parseFloat(currentUserTokens.totalToken) + token >=
      dailyMaximumAllowedToken
    ) {
      throw "This will exceeed the daily maximum number of tokens that are allowed to be won";
    }

    const usdEquivalent = this.ledger.currencyConversion(token, conversionRate);

    const response = await this.repository.saveLedger({
      ...ledgerEntity,
      user: userFound.id,
      usd: usdEquivalent,
    });

    return response;
  }

  async currentUserTokenHistory(user: string) {
    const currentDay = moment().toISOString();
    const historyFound = await this.repository.findUserLedger(
      user,
      currentDay,
      currentDay
    );

    const history = this.ledger.responseWithAllowedFields(historyFound, [
      "token",
      "createdAt",
    ]);

    return history;
  }

  async currentUserUSDHistory(user: string) {
    const currentDay = moment().toISOString();
    const previousDay = moment().subtract(1, "days").toISOString();
    const historyFound = await this.repository.findUserLedger(
      user,
      previousDay,
      currentDay
    );

    const history = this.ledger.responseWithAllowedFields(historyFound, [
      "usd",
      "createdAt",
    ]);

    return history;
  }

  async currentUserStatistics(user: string) {
    const currentDay = moment().toISOString();
    const historyFound = await this.repository.findUserLedger(
      user,
      currentDay,
      currentDay
    );

    const userStatistics = this.ledger.getStatistics(historyFound);

    return {
      ...userStatistics,
      currentDay,
    };
  }

  async userTransactionHistory(user: string, requestedDate: string) {
    if (!user) {
      throw "User name was not provided";
    }

    if (!requestedDate) {
      throw "Requested date was not provided";
    }
    const historyFound = await this.repository.findUserLedger(
      user,
      requestedDate,
      requestedDate
    );

    const history = this.ledger.responseWithAllowedFields(historyFound, [
      "token",
      "usd",
      "createdAt",
    ]);

    return history;
  }
}

export default LedgerService;
