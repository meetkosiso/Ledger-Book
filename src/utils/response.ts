import { Response } from "express";

export function success(
  res: Response,
  status: number,
  entity: unknown,
  msg: string
): void {
  res.status(status || 200).json({
    success: true,
    data: entity,
    message: msg || "Record(s)",
  });
}

export function fail(res: Response, status: number, msg: string): void {
  res.status(status || 500).json({
    success: false,
    data: [],
    message: msg || "Record(s)",
  });
}
