import * as types from 'redux/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

export const removeItem = (id, index) => {
    var items = JSON.parse(localStorage.getItem("shopping-card"));
    items = items.filter(q => q.id != id);

    // items = items.filter(q => q.index != index);

    if (items.length == 0) {
        localStorage.removeItem("shopping-card");
    }

    localStorage.setItem("shopping-card", JSON.stringify(items));
    return {
        type: types.SHOPPING_CARD_REMOVE_ITEM,
        payload: {
            id: id,
            index: index
        }
    }
}

export const removeItemCount = (item, init) => {
    const dynamicSort = (property) => {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
    if (init) {
        return {
            type: types.SHOPPING_CARD_Remove_ITEMCOUNT,
            payload: item
        }
    }

    //     data.addItem({ id: data.id, categoryName: data.categoryName, price: data.price, brandName: data.brandName, productName: data.productName });

    var model = {
        id: item.id,
        productName: item.productName,
        enTitle:item.enTitle,
        price: item.price,
        discountedPrice: item.discountedPrice,
        coverFile: item.coverFile,
        categoryId: item.categoryId,
        categoryName: item.categoryName,
        brandName: item.brandName,
        index: item.index,
        itemCount: item.itemCount ? item.itemCount - 1 : 1,
    };

    var items = [];
    if (localStorage.getItem("shopping-card") != null) {
        items = JSON.parse(localStorage.getItem("shopping-card"));
    }

    // toast.warning('⚠️ این محصول در سبد خرید شما موجود می باشد');
    let tempItem = items.find(f => f.id == item.id);
    items = items.filter(f => f.id != item.id);
    model.itemCount = tempItem ? tempItem.itemCount - 1 : 1;
    items.push(model);
    localStorage.setItem("shopping-card", JSON.stringify(items));



    return {
        type: types.SHOPPING_CARD_Remove_ITEMCOUNT,
        payload: items.sort(dynamicSort("id"))
    }
}



export const addItem = (item, init) => {
    const dynamicSort = (property) => {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
    if (init) {
        return {
            type: types.SHOPPING_CARD_ADD_ITEM,
            payload: item
        }
    }

    //     data.addItem({ id: data.id, categoryName: data.categoryName, price: data.price, brandName: data.brandName, productName: data.productName });

    var model = {
        id: item.id,
        productName: item.productName,
        price: item.price,
        discountedPrice: item.discountedPrice,
        coverFile: item.coverFile,
        categoryId: item.categoryId,
        categoryName: item.categoryName,
        brandName: item.brandName,
        index: item.index,
        itemCount: item.itemCount ? item.itemCount + 1 : 1,
        enTitle: item.enTitle,

    };

    var items = [];
    if (localStorage.getItem("shopping-card") != null) {
        items = JSON.parse(localStorage.getItem("shopping-card"));
    }

    if (!items.find(q => q.id == item.id)) {
        items.push(model);
        localStorage.setItem("shopping-card", JSON.stringify(items));
        toast.success('✔️ محصول به سبد خرید شما اضافه شد');
    }
    else {
        // toast.warning('⚠️ این محصول در سبد خرید شما موجود می باشد');
        let tempItem = items.find(f => f.id == item.id);
        items = items.filter(f => f.id != item.id);
        model.itemCount = tempItem ? tempItem.itemCount + 1 : 1;
        items.push(model);
        localStorage.setItem("shopping-card", JSON.stringify(items));

    }

    return {
        type: types.SHOPPING_CARD_ADD_ITEM,
        payload: items.sort(dynamicSort("id"))
    }
}

export const clear = () => {
    var items = JSON.parse(localStorage.getItem("shopping-card"));
    if (items.length > 0) {
        localStorage.removeItem("shopping-card");
    }

    return {
        type: types.SHOPPING_CARD_CLEAR,
    }
}

export const getAll = () => {
    let items = [];
    
    const dynamicSort = (property) => {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    if (typeof window !== 'undefined' && localStorage.getItem("shopping-card")) {
        items = JSON.parse(localStorage.getItem("shopping-card"));
    }

    return {
        type: types.SHOPPING_CARD_GETALL,
        payload: items.sort(dynamicSort("id"))
    }

}


export const getCount = (id) => {
    let items = [];

    let count = 0;
    if (typeof window !== 'undefined' && localStorage.getItem("shopping-card")) {
        items = JSON.parse(localStorage.getItem("shopping-card"));
        count = items.find(f=>f.id==id)?.itemCount
    }

    return {
        type: types.SHOPPING_CARD_GETCount,
        payload: count
    }
}