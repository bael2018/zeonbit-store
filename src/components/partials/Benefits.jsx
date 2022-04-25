import cls from "../../scss/components/partials/benefit.module.scss";
import Description from "../elements/custom/Description";
import BenefitItem from "../elements/BenefitItem";
import { useRequest } from "../../hooks/useRequest";
import Loader from "../elements/ui/Loader";
import Empty from "../elements/custom/Empty";
import { useEffect } from "react";

const Benefits = () => {
    const { data, status, error, fetching } = useRequest('get', "app");

    useEffect(() => {
        fetching();
    }, []);

    return (
        <div className={cls.benefit}>
            <Description text="Наши преимущества" />
            <div className={cls.benefit__list}>
                {
                    status ? <Loader/> : (
                        data[0]?.benefits.length ? (
                            data[0]?.benefits.map((benefit) => (
                                <BenefitItem key={benefit.id} {...benefit} />
                            ))
                        ) : <Empty></Empty>
                    )
                }
            </div>
        </div>
    );
};

export default Benefits;