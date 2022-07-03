import { faker } from '@faker-js/faker';
import fs from 'fs';

faker.setLocale('de');


const randomCategoryList = n => {
    if (n <= 0) return [];
     const categoryList = [];

     Array.from(new Array(n)).forEach(() => {
        const category = {
            id: faker.datatype.uuid(),
            name: faker.commerce.department(),
            createAt: Date.now,
            updateAt: Date.now,
        };
        categoryList.push(category);
     })
    return categoryList;
}

const randomProductList = (categoryList, numberOfProducts) => {
    if (numberOfProducts <= 0) return [];
    const productList = [];
    for (const category of categoryList) {
        Array.from(new Array(numberOfProducts)).forEach(() => {
        const product =  {
            categoryId: category.id,
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            color: faker.color.human(),
            price: Number.parseFloat(faker.commerce.price()),
            description: faker.commerce.productDescription(),
            createAt: Date.mow,
            updateAt: Date.now,
            thumbnail: faker.image.imageUrl(400, 400),
        }

        productList.push(product);
        });
    }
    return productList;
}



(() => {
    // random data
    const categoryList = randomCategoryList(4);
    const productList = randomProductList(categoryList, 5);
    // init db object
    const db = {
        categories: categoryList,
        products: productList,
        profile: {
            name: "Thai Tran"
        },
    }
    // write db object to db
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log('Generate data success')
    })
})()