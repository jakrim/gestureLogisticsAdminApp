export class Grunner {
  constructor(
    uid,
    current_order,
    current_status,
    current_zone,
    first_name,
    last_name,
    os,
    public_courier_id
  ) {
    this.uid = uid;
    this.current_order = current_order;
    this.current_status = current_status;
    this.current_zone = current_zone;
    this.first_name = first_name;
    this.last_name = last_name;
    this.os = os;
    this.public_courier_id = public_courier_id;
  }
}
