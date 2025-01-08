import { hashSync } from "bcrypt";
import { prisma } from "./prisma-client";
import { _ingredients, categories, products } from "./constants";
import { Prisma } from "@prisma/client";
import { connect } from "http2";


const randomDecimalNumber = (min: number, max:number) =>{
    return Math.floor(Math.random() * (max - min) * 10 + min * 10)/10;
}
 
const generatedProductItem = ({productId, pizzaType, size} :  {productId: number, pizzaType?: 1 | 2, size?: 20 | 30 | 40} )=>{
    return{
        productId,
        price: randomDecimalNumber(190, 600),
        pizzaType,
        size
    } as Prisma.ProductItemUncheckedCreateInput
}
function generatePizzaProducts(pizzaId : number) {
    return [
        generatedProductItem({
            productId: pizzaId,
            pizzaType: 1,
            size: 20,
        }),
        generatedProductItem({
            productId: pizzaId,
            pizzaType: 1,
            size: 30,
        }),
        generatedProductItem({
            productId: pizzaId,
            pizzaType: 1,
            size: 40,
        }),
        generatedProductItem({
            productId: pizzaId,
            pizzaType: 2,
            size: 20,
        }),
        generatedProductItem({
            productId: pizzaId,
            pizzaType: 2,
            size: 30,
        }),
        generatedProductItem({
            productId: pizzaId,
            pizzaType: 2,
            size: 40,
        }),
    ];
}

async function up() {
    
    await prisma.user.createMany({
        data: [
            {
                fullName: 'User Test',
                email: 'user@test.ru',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'USER',
              },
              {
                fullName: 'Admin Admin',
                email: 'admin@test.ru',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'ADMIN',
              },
        ]
    });

    await prisma.category.createMany({
        data: categories
    });
    await prisma.ingredient.createMany({
        data: _ingredients
    });
    await prisma.product.createMany({
        data: products
    });

    const pizza1 = await prisma.product.create({
        data: {
          name: 'Пепперони фреш',
          imageUrl:
            'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
          categoryId: 1,
          ingredients: {
            connect: _ingredients.slice(0, 5),
          },
        },
      });
    
      const pizza2 = await prisma.product.create({
        data: {
          name: 'Сырная',
          imageUrl:
            'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
          categoryId: 1,
          ingredients: {
            connect: _ingredients.slice(5, 10),
          },
        },
      });
    
      const pizza3 = await prisma.product.create({
        data: {
          name: 'Чоризо фреш',
          imageUrl:
            'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
          categoryId: 1,
          ingredients: {
            connect: _ingredients.slice(10, 40),
          },
        },
      });


      await prisma.productItem.createMany({
        data: [...generatePizzaProducts(pizza1.id), ...generatePizzaProducts(pizza2.id), ...generatePizzaProducts(pizza3.id),
            generatedProductItem({ productId: 1}),
            generatedProductItem({ productId: 2 }),
            generatedProductItem({ productId: 4 }),
            generatedProductItem({ productId: 5 }),
            generatedProductItem({ productId: 6 }),
            generatedProductItem({ productId: 7 }),
            generatedProductItem({ productId: 3 }),
            generatedProductItem({ productId: 8 }),
            generatedProductItem({ productId: 9 }),
            generatedProductItem({ productId: 10 }),
            generatedProductItem({ productId: 11 }),
            generatedProductItem({ productId: 12 }),
            generatedProductItem({ productId: 13 }),
            generatedProductItem({ productId: 14 }),
            generatedProductItem({ productId: 15 }),
            generatedProductItem({ productId: 16 }),
            generatedProductItem({ productId: 17 }),
        ]
    
      })

      await prisma.cart.createMany({
        data: [
          {
            userId: 1,
            totalAmount: 0,
            token: "123",
          },
          {
            userId: 2,
            totalAmount: 0,
            token: "12345",
          }
        ]
      })

      await prisma.cartItem.create({
        data: {
            productItemId: 1,
            cartId: 1,
            quantity: 2,
            ingredients: {
              connect: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
            }
          },
      });
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;  
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;  
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;  
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;  
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;  
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;  
  
}
 
async function main() {
    try{
        await down();
        await up();
    }catch(e){
        console.error(e);
    }
}


main().then(async (e) => {
    await prisma.$disconnect();
})
.catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})