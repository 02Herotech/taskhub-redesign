"use client";
import React from "react";
import { useGetServiceProviderPaymentHistoryQuery } from "@/services/stripe";

/**Component for payment history for service provider */
function PaymentHistory() {
  const { data, isLoading } = useGetServiceProviderPaymentHistoryQuery({});

  console.log(data);

  return <div>PaymentHistory</div>;
}

export default PaymentHistory;
