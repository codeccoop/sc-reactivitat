const { reactive, computed, watch } = require("./reactive");

const product = reactive({ price: 5, quantity: 2 });
let totalPrice = computed(() => product.price * product.quantity);
watch(totalPrice, "value", (to, from) => {
  console.log(`Total price changes from ${from} to ${to}`);
});

product.quantity = 10;
product.price = 4;

setTimeout(() => {
  product.price = 2;
}, 1000);
