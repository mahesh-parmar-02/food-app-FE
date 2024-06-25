
import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:9090"
  });

export const httpGet = (url: string) => {
    return client.get(url);
}
export const userLogin = (data: any) => {
    return client.post('users/authenticate',data);
}

export const userSignUp = (data: any) => {
    return client.post('users/register', data);
}

export const addItemToCart = (params: any) => {
    let url = 'cart/add'
    return client.post(url, null, { params: params});
}

export const removeItemFromCart = (params: any) => {
    let url = 'cart/remove'
    return client.post(url, null, { params: params});
}

export const placeOrder = (params: any) => {
    return client.post('orders/place', null, { params: params});
}