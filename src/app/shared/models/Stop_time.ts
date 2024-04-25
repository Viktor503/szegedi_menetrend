export interface Stop_time {
    trip_id:string,
    arrival_time:{seconds:number,nanoseconds:number},
    departure_time:{seconds:number,nanoseconds:number},
    stop_id:number,
    stop_sequence:number,
    pickup_type:number,
    drop_off_type:number,
    shape_dist_traveled:number
}