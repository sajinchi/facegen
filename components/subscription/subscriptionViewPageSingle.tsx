"use client";
import { GetSingleSubscription, IGetSingleSubscriptionResponse } from "@/services/subscription/subscription.getSingle.services";
import { ISubscription } from "@/types/ISubscriptionState";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const subscriptionViewPageSingle = () => {
  const [subscription, setSubscription] = useState<ISubscription>();
  const searchParams = useSearchParams();
  const data = searchParams.get("id");

  const getSingle = async (data: string) => {
    const subs:ISubscription = await GetSingleSubscription(data);
    console.log(subs);
    const sub: ISubscription = {
      created_at: subs.created_at,
      current_period_end: subs.current_period_end,
      current_period_start: subs.current_period_start,
      id: subs.id,
      package: subs.package,
      purchase_date: subs.purchase_date,
      status: subs.status,
      subscription_id: subs.subscription_id,
      type: subs.type,
      updated_at: subs.updated_at
    };
      setSubscription(sub);
  };

  useEffect(() => {
    if (data) {
      getSingle(data);
    }
  }, []);

  return (
    <div className="p-5">
      <div>Package:
        <div>ID:{subscription?.package.id}</div>
        <div>Name:{subscription?.package.name}</div>
        <div>Description:{subscription?.package.description}</div>
        <div>Amount:{subscription?.package.amount}</div>
        <div>Type:{subscription?.package.type}</div>
      </div>
      <div>ID:{subscription?.id}</div>
      <div>Created at: {subscription?.created_at}</div>
      <div>Current Period end: {subscription?.current_period_end}</div>
      <div>Purchase Date:{subscription?.purchase_date}</div>
      <div>Status:{subscription?.status}</div>
      <div>Subscription ID:{subscription?.subscription_id}</div>
      <div>Updated At:{subscription?.updated_at}</div>
    </div>
  );
};

export default subscriptionViewPageSingle;
