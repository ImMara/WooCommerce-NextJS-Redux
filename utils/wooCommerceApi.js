import wooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import * as process from 'process';
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";

const WooCommerce = new wooCommerceRestApi({

});

export async function getProducts(page=1,category=null) {
    try{
        const products = await WooCommerce.get('products', {
            per_page: 3,
            page: page,
            category: category,
        });
        return products;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function getProduct(id) {
    try{
        const product = await WooCommerce.get(`products/${id}`);
        return product;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function getProductBySlug(slug) {
    try{
        const products = await WooCommerce.get('products', {
            slug,
        });
        return products;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function createOrder(order) {
    try{
        const newOrder = await WooCommerce.post('orders', order);
        return newOrder;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function getCategories() {
    try{
        const categories = await WooCommerce.get('products/categories');
        return categories;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
export async function getFeaturedProducts() {
    try{
        const products = await WooCommerce.get('products', {
            featured: true,
        });
        return products;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}