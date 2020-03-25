export class Payment {
  constructor(
    uid,
    payment,
    bonus,
    tips,
    orderId,
    delivery_completed_note,
    delivery_compeleted_time
  ) {
    this.uid = uid;
    this.payment = payment;
    this.bonus = bonus;
    this.tips = tips;
    this.orderId = orderId;
    this.delivery_completed_note = delivery_completed_note;
    this.delivery_compeleted_time = delivery_compeleted_time;
  }
}
