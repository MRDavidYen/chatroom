const calculateGptTokenPrice = (token?: number) => {
    return (((token || 0) / 1000) * 0.12).toFixed(4)
}

export {
    calculateGptTokenPrice
}