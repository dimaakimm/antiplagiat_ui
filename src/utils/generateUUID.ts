export const generateUUID = () => {
    return self.crypto.randomUUID
        ? self.crypto.randomUUID()
        : Date.now().toString(36) + Math.random().toString(36).substring(2)
}
