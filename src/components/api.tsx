export function getProducts(page:number = 1, limit:number = 15, sort:string = 'price'){
    return fetch(`/products?_page=${page}&_limit=${limit}_sort=${sort}`)
    .then(data => data.json())
}