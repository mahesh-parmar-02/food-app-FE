// Set Session Storage Function //
export const handleSessionStorage = (action: string, key: string, target: any): void | any => {
    // Set to SessionStorage
    if (action === 'set') {
        sessionStorage.setItem( key, JSON.stringify(target))
    }
    // Get from SessionStorage
    else if (action === 'get') {
        return sessionStorage.getItem(key);
    }
    // Remove From SessionStorage
    else if (action === 'remove') {
        sessionStorage.removeItem(key)
    }
}