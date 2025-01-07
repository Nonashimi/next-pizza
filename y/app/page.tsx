import Container from "@/components/shared/container";
import Filters from "@/components/shared/filters";
import ProductCard from "@/components/shared/product-card";
import ProductsGroupList from "@/components/shared/products-group-list";
import { Title } from "@/components/shared/title";
import TopBar from "@/components/shared/top-bar";

export default function Home() {
  const products = [
    {
      id: 0,
      name: "Креветки со сладким чили",
      price: 550,
      items: [{price: 550}],
      imageUrl: "https://media.dodostatic.net/image/r:233x233/11ef01fee6dd7261a9c36187149758d0.avif",
    },
    {
      id: 1,
      name: "Пепперони",
      price: 450,
      items: [{price: 550}],
      imageUrl: "https://media.dodostatic.net/image/r:233x233/11ef01fee6dd7261a9c36187149758d0.avif",
    },
    {
      id: 2,
      name: "Маргарита",
      price: 400,
      items: [{price: 550}],
      imageUrl: "https://media.dodostatic.net/image/r:233x233/11ee7d5f837255b58b25a62c60ffdb38.avif",
    },
    {
      id: 3,
      name: "Четыре сыра",
      price: 500,
      items: [{price: 550}],
      imageUrl: "https://media.dodostatic.net/image/r:233x233/11ee7d5f837255b58b25a62c60ffdb38.avif",
    },
    {
      id: 4,
      name: "Цезарь",
      price: 600,
      items: [{price: 550}],
      imageUrl: "https://media.dodostatic.net/image/r:233x233/11ee7d5f837255b58b25a62c60ffdb38.avif",
    },
    {
      id: 5,
      name: "Ветчина и грибы",
      price: 480,
      items: [{price: 550}],
      imageUrl: "https://media.dodostatic.net/image/r:233x233/11ee7d5f837255b58b25a62c60ffdb38.avif",
    },
    {
      id: 6,
      name: "Ветчина и грибы",
      price: 480,
      items: [{price: 550}],
      imageUrl: "https://media.dodostatic.net/image/r:233x233/11ee7d5f837255b58b25a62c60ffdb38.avif",
    },
  ];
  
  return (
    <>
      <Container className="mt-10">
        <Title text = "Все пиццы" size="lg" className="font-extrabold"/>
      </Container>
      <TopBar/>
      <Container className="mt-10">
        <div className="flex gap-[80px]">
            <div className="w-[250px]">
              <Filters/>
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-16">
                <ProductsGroupList title="Пиццы" items = {products} categoryId={1}/>
                <ProductsGroupList title="Комбо" items = {products} categoryId={2}/>
              </div>
            </div>
        </div>
      </Container>
    </>
  );
}
