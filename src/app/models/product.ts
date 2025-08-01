export interface Product {
    id : number;
    cve_internal : string;
    description : string;
    investment : number;
    client_profile_price : number;
    client_complete_price : number;
    product_profit_profile : number;
    product_profit_per_complete : number;
    image : string;
    total_profiles : number;
    active_profiles : number;
    available_profiles : number;
    status : number;
    status_desc : string;
    created_at : Date;
    created_by : string;
    updated_at : Date;
    updated_by : string;
    access_identifier : string;
    access_password : string;
    expiration_date : Date;
}


