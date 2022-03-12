export const setItemWithExpiry = (key, value, ttl) => {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
}

export const getItemWithExpiry = (key) => {
    const item = JSON.parse(localStorage.getItem(key) || "{}");
    const now = new Date();
    if(now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
}
