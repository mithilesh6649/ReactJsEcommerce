const moment = require("moment");
const db = require("../models/index");
const UserMenuItem = db.user_menu_items;
const Packages = db.packages;
const Carts = db.carts;
const CartItems = db.cart_items;
const UserAddress = db.user_addresses;
const { Sequelize } = require("sequelize");
const FeeTypes = db.fee_types;
const UserFees = db.user_fees;

const taxCalculation = async (userAddresId, CategoryId) => {
  try {
    return 0;
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

const fetchCartData = async (cart_id) => {
  return await Carts.findOne({
    include: [
      {
        model: CartItems,
        as: "cart_items",
        include: [
          { model: Packages, as: "packages" },
          { model: UserMenuItem, as: "user_menu_items" },
        ],
      },
    ],
    where: { id: cart_id },
  });
};


const fetchAddressesAndVendor = async (user_address_id, vendor_id) => {
  const userAddress = await UserAddress.findOne({ where: { id: user_address_id } });
  const vendorAddress = await UserAddress.findOne({ where: { user_id: vendor_id } });
  return { userAddress, vendorAddress };
};


const calculateFees = async (vendor_id, collection_type, userAddress, vendorAddress, selectedServingHrs) => {
  const vendorFees = await UserFees.findAll({
    include: [{ model: FeeTypes, as: "fee_type" }],
    where: { user_id: vendor_id, status: 1 },
  });

  let deliveryFee = 0, pickupFee = 0, servingFee = 0, bookingFee = 0;

  vendorFees.forEach((vendorFee) => {
    const feeType = vendorFee.fee_type;
    if (feeType) {
      if (feeType.slug === "delivery_fee" && collection_type === 1) {
        deliveryFee = calculateDeliveryFee(vendorFee, userAddress, vendorAddress);
      } else if (feeType.slug === "pickup_fee" && collection_type === 2) {
        pickupFee = vendorFee.amount;
      } else if (feeType.slug === "serving_fee" && collection_type === 3) {
        servingFee = calculateServingFee(vendorFee, selectedServingHrs);
      } else if (feeType.slug === "booking_fee") {
        bookingFee = vendorFee.amount;
      }
    }
  });

  return { deliveryFee, pickupFee, servingFee, bookingFee };
};


const calculateDeliveryFee = (vendorFee, userAddress, vendorAddress) => {
  if (vendorFee.mode === "fixed") return vendorFee.amount;
  if (vendorFee.mode === "km") {
    const deliveryChargePerKm = vendorFee.amount;
    const distance = haversineDistance(userAddress.latitude, userAddress.longitude, vendorAddress.latitude, vendorAddress.longitude);
    return parseFloat((distance * deliveryChargePerKm).toFixed(2));
  }
  return 0;
};

const calculateServingFee = (vendorFee, selectedServingHrs) => {
  if (vendorFee.mode === "fixed") return vendorFee.amount;
  if (vendorFee.mode === "hrs") return parseFloat((selectedServingHrs * vendorFee.amount).toFixed(2));
  return 0;
};


function haversineDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371; // Radius of Earth in kilometers

  // Convert degrees to radians
  const lat1Rad = deg2rad(lat1);
  const lon1Rad = deg2rad(lon1);
  const lat2Rad = deg2rad(lat2);
  const lon2Rad = deg2rad(lon2);

  // Differences in coordinates
  const dLat = lat2Rad - lat1Rad;
  const dLon = lon2Rad - lon1Rad;

  // Haversine formula
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1Rad) *
    Math.cos(lat2Rad) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate the distance in kilometers
  const distance = earthRadius * c;

  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}


// const calculateTaxAndAppBookingFee = (subtotal, servingFee, pickupFee, deliveryFee, bookingFee) => {
//   const taxRate = 0.08;  // 8% state tax
//   const ccFee = 0.029;
//   const newStateTaxRate = taxRate + ccFee;

//   const appBookingFee = parseFloat(((subtotal + servingFee + pickupFee + deliveryFee + bookingFee) * 0.095).toFixed(2));
//   const tax = parseFloat(((subtotal + servingFee + pickupFee + deliveryFee + bookingFee) * newStateTaxRate).toFixed(2));
//   const grandTotal = parseFloat((subtotal + servingFee + pickupFee + deliveryFee + bookingFee + tax + appBookingFee).toFixed(2));

//   return { tax, appBookingFee, grandTotal };
// };



const calculateTaxAndAppBookingFee = (subtotal, servingFee, pickupFee, deliveryFee, bookingFee) => {
  const taxRate = 0.08;  // 8% state tax
  const ccFee = 0.029;
  const newStateTaxRate = taxRate + ccFee;

  const appBookingFee = parseFloat(((subtotal + servingFee + pickupFee + deliveryFee + bookingFee) * 0.095).toFixed(2));
  const tax = parseFloat(((subtotal + servingFee + pickupFee + deliveryFee + bookingFee) * newStateTaxRate).toFixed(2));
  const grandTotal = parseFloat((subtotal + servingFee + pickupFee + deliveryFee + bookingFee + tax + appBookingFee).toFixed(2));

  return { tax, appBookingFee, grandTotal };
};

// Export the function
module.exports = {
  fetchCartData,
  taxCalculation,
  fetchAddressesAndVendor,
  calculateFees,
  calculateDeliveryFee,
  calculateServingFee,
  calculateTaxAndAppBookingFee
};



/*********************userCartPriceDetails**************** ****/
userCartPriceDetails = async (req, res, next) => {
  try {
    const cart_id = parseInt(req.query.cart_id);
    const user_address_id = parseInt(req.query.user_address_id);
    const collection_type = parseInt(req.query.collection_type);
    const selectedServingHrs = parseInt(req.query.serving_hrs);
    if (!cart_id || !user_address_id || !collection_type) {
      let data = helper.failed(
        404,
        "cart_id, user_address_id, and collection_type are required"
      );
      return res.status(404).json(data);
    }

    if (
      collection_type !== 1 &&
      collection_type !== 2 &&
      collection_type !== 3
    ) {
      let data = helper.failed(
        400,
        "collection_type must be either 1 : delivery , 2: pickup or 3:serving"
      );
      return res.status(400).json(data);
    }

    if (collection_type === 3 && !selectedServingHrs) {
      let data = helper.failed(
        400,
        "selectedServingHrs is required when collection_type is 3"
      );
      return res.status(400).json(data);
    }

    // Fetch cart data
    const cartData = await fetchCartData(cart_id);

    if (!cartData) {
      return res
        .status(200)
        .json(helper.success(200, "No cart found for this user", null));
    }

    if (cartData.cart_items.length === 0) {
      return res
        .status(200)
        .json(helper.success(200, "No items in this cart", null));
    }

    const { userAddress, vendorAddress } = await fetchAddressesAndVendor(user_address_id, cartData.vendor_id);

    if (!userAddress || !vendorAddress) {
      return res
        .status(200)
        .json(helper.success(200, "Invalid User/Vendor Address", null));
    }

    // Fetch vendor details to get the minimum_spend_limit
    const vendor = await User.findOne({
      where: { id: cartData.vendor_id },
      include: [
        {
          model: UserDetail,
          as: "userDetail",
          required: false,
          attributes: ["minimum_spend_limit"],
        },
      ],
    });

    if (!vendor || !vendor.userDetail) {
      return res
        .status(404)
        .json(
          helper.failed(
            404,
            "Vendor not found or minimum spend limit not defined",
            null
          )
        );
    }

    // const minimumSpendLimit = vendor.userDetail.minimum_spend_limit || 0;

    // Calculate the subtotal of the cart
    let menuSubtotal = 0;
    cartData.cart_items.forEach((item) => {
      const itemTotal = item.quantity * (item.price || 0);
      menuSubtotal += itemTotal;
    });

    // Check if the subtotal is less than the minimum spend limit
    // if (menuSubtotal < minimumSpendLimit) {
    //   const additionalAmountNeeded = minimumSpendLimit - menuSubtotal; // Calculate the amount the user needs to add
    //   return res.status(400).json({
    //     message: `Your cart total is below the minimum spend limit of ${minimumSpendLimit}. Please add $${additionalAmountNeeded.toFixed(
    //       2
    //     )} more to proceed.`,
    //   });
    // }

    // Calculate fees
    const { deliveryFee, pickupFee, servingFee, bookingFee } = await calculateFees(cartData.vendor_id, collection_type, userAddress, vendorAddress, selectedServingHrs);

    // Calculate tax and app booking fee
    const { tax, appBookingFee, grandTotal } = calculateTaxAndAppBookingFee(menuSubtotal, servingFee, pickupFee, deliveryFee, bookingFee);



    // Calculate Admin & Vendor Amount............

    // Total amount that needs to be split between Admin and Vendor
    // Calculate total fee to split between Admin and Vendor
    const totalFees = servingFee + pickupFee + deliveryFee + bookingFee;

    // Calculate Admin (OneStop) fee: 5% of total fees + app booking fee
    const adminShare = totalFees * 0.05 + appBookingFee + tax;

    // Calculate Vendor share: 95% of total fees + menu subtotal
    const vendorShare = totalFees * 0.95 + menuSubtotal;

    console.log(`Total Amount to Split: ${totalFees.toFixed(2)}`);
    console.log(`Admin Fee (OneStop): ${adminShare.toFixed(2)}`);
    console.log(`Vendor Fee: ${vendorShare.toFixed(2)}`);

    const fee_note_data = await MdDropdowns.findAndCountAll({
      where: {
        slug: [
          "delivery_fee_note",
          "pickup_fee_note",
          "serving_fee_note",
          "vendor_fee_note",
          "app_booking_fee_note",
        ],
      },
    });

    const feeNotes = fee_note_data.rows.reduce((acc, note) => {
      acc[note.slug] = note.value;
      return acc;
    }, {});

    // End Calculate Admin & Vendor Amount........

    // Breakdown for the cart summary
    const breakdownArray = [
      {
        label: "Subtotal",
        amount: menuSubtotal,
      },
      ...(collection_type === 1
        ? [
          {
            label: "Delivery Fee",
            amount: deliveryFee,
            note: feeNotes["delivery_fee_note"],
          },
        ]
        : []), // Include delivery fee if collection_type is 1
      ...(collection_type === 2
        ? [
          {
            label: "Pickup Fee",
            amount: pickupFee,
            note: feeNotes["pickup_fee_note"],
          },
        ]
        : []), // Include pickup fee if collection_type is 2
      ...(collection_type === 3
        ? [
          {
            label: "Serving Fee",
            amount: servingFee,
            note: feeNotes["serving_fee_note"],
          },
        ]
        : []), // Include pickup fee if collection_type is 2
      {
        label: "Vendor Fee",
        amount: bookingFee,
        note: feeNotes["vendor_fee_note"],
      },
      {
        // label: "App Booking Fee (9.5%)",
        label: "Coordination Fee (9.5%)",
        amount: appBookingFee,
        note: feeNotes["app_booking_fee_note"],
      },
      {
        label: "State Tax + CC Fee (10.9%)",
        amount: tax,
      },
      {
        label: "Grand Total",
        amount: grandTotal,
      },
    ];

    // Assuming grandTotal, adminShare, and vendorShare are already defined

    const amountShareDetails = [
      { key: "amount", value: grandTotal.toFixed(2) },
      { key: "admin_share", value: adminShare.toFixed(2) },
      { key: "vendor_share", value: vendorShare.toFixed(2) },
    ];

    // Convert the values to numbers using parseFloat
    const shareAmount = amountShareDetails.map((item) => ({
      key: item.key,
      value: parseFloat(item.value), // Convert string to number
    }));
    const filteredBreakdown = breakdownArray.filter(
      (item) => item.amount > 0
    );
    // Returning response
    return res.status(200).json(
      helper.success(200, "Cart price get successfully", {
        breakdown: filteredBreakdown,
        // breakdown: breakdownArray,
        shareAmount: shareAmount,
      })
    );
  } catch (e) {
    console.error("Error fetching cart details:", e);
    next(e);
    // return res.status(500).json(helper.failed(500, "Something went wrong!"));
  }
};