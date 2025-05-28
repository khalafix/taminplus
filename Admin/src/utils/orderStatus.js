module.exports = {
  OrderStatus: {
    //[Display(Name = " ثبت درخواست و در انتظار پرداخت")]
    Register: 10,
    // [Display(Name = " ثبت درخواست و پرداخت موفق")]
    PaymentSuccess: 20,

    //[Display(Name = "پرداخت ناموفق")]
    PaymentFailed: 30 ,

    //  // [Display(Name = "بررسی نشده")]
    //   NotVisited :30,
    // [Display(Name = "در حال بررسی")]
    InProgress: 40,
    //  [Display(Name = "رد شده")]
    Reject: 50,
    // [Display(Name = "آماده سازی برای ارسال")]
    Sending: 60,
    //  [Display(Name = "ارسال شده")]
    Sent: 70,
    // [Display(Name = "تحویل داده شده")]
    Delivered: 80,
    // [Display(Name = "مرجوع توسط مشتری")]
    ReturnByCustomer: 90,
  },
};
