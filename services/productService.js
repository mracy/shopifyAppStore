const { getOrders } = require('./shopifyService');
const Product = require('../models/Product');

const calculateBestSellingProducts = async () => {
  try {
    // Fetch orders from Shopify
    const orders = await getOrders();
    const productSales = {};

    // Log fetched orders for debugging
    console.log('Fetched orders:', JSON.stringify(orders, null, 2));

    // Aggregate sales quantities for each product
    orders.forEach(order => {
      order.line_items.forEach(item => {
        if (!productSales[item.product_id]) {
          productSales[item.product_id] = 0;
        }
        productSales[item.product_id] += item.quantity;
      });
    });

    // Log product sales aggregation
    console.log('Aggregated product sales:', JSON.stringify(productSales, null, 2));

    // Update the Product collection with quantitySold
    for (const [productId, quantitySold] of Object.entries(productSales)) {
      const result = await Product.updateOne(
        { productId: productId },
        { $inc: { quantitySold: quantitySold } }  // Increment quantitySold
      );
      // Log update result
      console.log(`Updated product ${productId} with quantitySold ${quantitySold}:`, result);
    }

    // Retrieve top 5 products sorted by quantitySold
    const topProducts = await Product.find({})
      .sort({ quantitySold: -1 })
      .limit(5);

    // Log top 5 products
    console.log('Top 5 products:', JSON.stringify(topProducts, null, 2));

    return topProducts;
  } catch (error) {
    console.error('Error calculating best-selling products:', error);
    throw new Error('Failed to calculate best-selling products');
  }
};

module.exports = {
  calculateBestSellingProducts,
};
