import api from './api';
import axios from "axios";
import TokenService from "./token.service";

class ProductService {
    getPublicContent() 
    {
        return api.get('products')
    }

    getOneProduct(id) 
    {
        return api.get('admin/products/' + id);
    }

    postProduct(product) 
    {
        let uData = new FormData();
        let image = product.image;
        delete product["image"];
        uData.append("image", image[0])
        uData.append("product", JSON.stringify(product))
        // console.log(uData.has('image'));
        const token = TokenService.getLocalAccessToken();

        try {
            return axios.post("http://127.0.0.1:8000/api/admin/products", uData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": 'Bearer ' + token
                },
            }).then((res) => {
                return res.data;
            });
        } catch (_error) {
            return Promise.reject(_error);
        }
    }

    imageUpload(image) 
    {
        let uData = new FormData();
        uData.append("image", image)
        // console.log(uData.has('image'));
        const token = TokenService.getLocalAccessToken();

        try {
            return axios.post("http://127.0.0.1:8000/api/admin/products/imageUpload", uData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": 'Bearer ' + token
                },
            }).then((res) => {
                return res.data;
            });
        } catch (_error) {
            return Promise.reject(_error);
        }
    }

    async putProduct(product, id) {
        if(Array.isArray(product.image)) {
            let res = await this.imageUpload(product.image[0]);
            product.image = res.data;
        }



        let jsonProduct = JSON.stringify(product);
        
        try {
            return api.put("admin/products/" + id, jsonProduct);
        } catch (_error) {
            return Promise.reject(_error);
        }
    }

    deleteProduct(id) {        
        try {
            return api.delete("admin/products/" + id);
        } catch (_error) {
            return Promise.reject(_error);
        }
    }
}

export default new ProductService();
