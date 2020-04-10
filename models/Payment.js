export class Payment {
  constructor(payment, bonus, tips, orderId, total_time, completed_date_ms) {
    this.payment = payment;
    this.bonus = bonus;
    this.tips = tips;
    this.orderId = orderId;
    this.total_time = total_time;
    this.completed_date_ms = completed_date_ms;
  }
}
