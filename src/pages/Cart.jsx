import SimiliarProducts from "../components/partials/list/SimiliarProducts";
import ContentLayout from "../components/layouts/ContentLayout";
import CartList from "../components/partials/list/CartList";
import Modal from "../components/elements/custom/Modal";
import { appLinks } from "../constants/appLinks";
import { useBreads } from "../hooks/useBreads";
import { endpoints } from "../constants/init";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Cart = () => {
    const { dispatcher } = useBreads([{ title: appLinks.CART }]);
    const { carts } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatcher();
        document.title = `ZEON STORE | ${appLinks.CART}`;
    }, []);

    return (
        <ContentLayout>
            <Modal />
            <CartList />
            {carts.length === 0 && (
                <SimiliarProducts
                    recommened={true}
                    limit={5}
                    url={endpoints.PRODUCTS}
                    description="Возможно Вас заинтересует"
                    empty="На данный момент товаров нет!"
                />
            )}
        </ContentLayout>
    );
};

export default Cart;
