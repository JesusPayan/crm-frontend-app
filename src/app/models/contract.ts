export interface Contract {
    id : number,
    client_id : number,
    product_id : number,
    contract_type : number,
    contract_type_desc : string,
    start_date : Date,
    end_date : Date,
    days_left :  Date,
    status :  Date,
    status_desc : string,
    created_at :  Date,
    created_by : string
    updated_at :  Date,
    updated_by : string,
    total_price : Date
}
