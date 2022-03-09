import { Statement } from "@modules/statements/entities/Statement";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateStatementUseCase } from "./CreateStatementUseCase";

enum OperationType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
  TRANSFER = "transfer",
}

export class CreateStatementController {
  async execute(request: Request, response: Response) {
    const { receiver_id } = request.params;
    const { id: user_id } = request.user;
    const { amount, description } = request.body;

    const createStatement = container.resolve(CreateStatementUseCase);

    const splittedPath = request.originalUrl.split("/");

    let statement: Statement;
    let type: OperationType;
    if (receiver_id) {
      type = splittedPath[splittedPath.length - 2] as OperationType;
      statement = await createStatement.execute({
        sender_id: user_id,
        type,
        amount,
        description,
        user_id: receiver_id,
      });
    } else {
      type = splittedPath[splittedPath.length - 1] as OperationType;
      statement = await createStatement.execute({
        user_id,
        type,
        amount,
        description,
      });
    }

    return response.status(201).json(statement);
  }
}
