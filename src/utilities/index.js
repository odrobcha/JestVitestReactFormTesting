export function formatCurrency (currency){
    return new Intl.NumberFormat("en-Us", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits : 2
      }).format(currency)
 };


