const validateEmailFormat = (email: string) => {
    return !/\S+@\S+\.\S+/.test(email)
}