import React from 'react';
import qs from 'qs';
import { useRouter } from 'next/navigation';



interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
  }

export interface PropsFilter extends PriceProps{
        sizes: string[];
        pizzaTypes: string[];
        ingredients: string[];

}

export const useQueryFilters = (filters: PropsFilter) => {
  const isMounted = React.useRef(false);
  const router = useRouter();

  React.useEffect(() => {
    if (isMounted.current) {


      const query = qs.stringify(filters, {
        arrayFormat: 'comma',
      });

      router.push(`?${query}`, {
        scroll: false,
      });

      console.log(filters, 999);
    }

    isMounted.current = true;
  }, [filters]);
};
