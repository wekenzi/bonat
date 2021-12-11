import React , { useCallback } from 'react';
import './Product.css';
import { IProduct } from './ProductModel';

const Product = ({ date, face, id, price, size }:IProduct) => {

    const toDollarFormat = useCallback((price:number) =>{
        return (price/100).toLocaleString("en-US", {style:"currency", currency:"USD"});
    },[])

    const dateFormatDaysAgo = useCallback((value:string) => {
        const date = new Date(value);
        const deltaDays = (date.getTime() - Date.now()) / (1000 * 3600 * 24);
        const formatter = new Intl.RelativeTimeFormat('en-US');
        if(Math.abs(Math.round(deltaDays)) === 0) return 'today';
        if(Math.abs(Math.round(deltaDays)) > 7) {
            const options:any = {
                weekday: "short",
                year: "numeric",
                month: "2-digit",
                day: "numeric"
            };
            return date.toLocaleString('en-US', options);
        }
        return formatter.format(Math.round(deltaDays), 'days');
    },[])

    return (
        <div className="col-md-3 col-sm-4 col-xs-2">
            <div className="card m-3">
                <div className="card-body">
                    <p className="face text-center" style={{fontSize:`${size}px`}}>{ face }</p>
                    <div className="d-flex justify-content-between">
                        <h5 className="text-primary m-0">{ toDollarFormat(price) }</h5>
                        <span className="text-secondary">{ dateFormatDaysAgo(date) }</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product;
