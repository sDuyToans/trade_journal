import {createContext, useContext, useState} from "react";

const PriceContext = createContext(null);

const tiers = [
    {
        name: 'Hobby',
        id: 'tier-hobby',
        href: '#',
        priceMonthly: '$29',
        description: "The perfect plan if you're just getting started with our product.",
        features: ['25 products', 'Up to 10,000 subscribers', 'Advanced analytics', '24-hour support response time'],
        featured: false,
    },
    {
        name: 'Enterprise',
        id: 'tier-enterprise',
        href: '#',
        priceMonthly: '$99',
        description: 'Dedicated support and infrastructure for your company.',
        features: [
            'Unlimited products',
            'Unlimited subscribers',
            'Advanced analytics',
            'Dedicated support representative',
            'Marketing automations',
            'Custom integrations',
        ],
        featured: true,
    },
]

export const PriceProvider = ({ children }) => {
    const [tier, setTier] = useState(0);


    return <PriceContext.Provider value={{ tier, setTier, tiers }}>
        {children}
    </PriceContext.Provider>
}

export const usePrice = () => {
    const { tier, setTier, tiers} = useContext(PriceContext);
    return { tier, setTier, tiers };
}