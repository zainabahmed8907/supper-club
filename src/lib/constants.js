const GOLD_PLAN = "price_1OZTmnIcPvspbNwYahvQxjA5";
const DIAMOND_PLAN = "price_1OZTwyIcPvspbNwY2DO4agK9";
const PLATINUM_PLAN = "price_1OZU0uIcPvspbNwYUlOfk8XK";

export {
    GOLD_PLAN,
    DIAMOND_PLAN,
    PLATINUM_PLAN
}

export const handleOAuth = (provider) => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_KEY}/auth/${provider}`;
    

    
}
