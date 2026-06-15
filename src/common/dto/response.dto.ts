export class ApiResponse<T> {
  message: string;
  data: T[];

  constructor(message: string, data: T | T[]) {
    this.message = message;
    this.data = Array.isArray(data) ? data : [data];
  }
}
