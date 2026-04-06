"use client";

import { useEffect, useMemo, useState } from "react";
import Button from "../common/Button";
import { bagistoApi } from "../../lib/bagisto";

const initialForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  company_name: "",
  address1: "",
  city: "",
  state: "",
  postcode: "",
  country: "IN",
  use_for_shipping: true,
  billing_first_name: "",
  billing_last_name: "",
  billing_email: "",
  billing_phone: "",
  billing_company_name: "",
  billing_address1: "",
  billing_city: "",
  billing_state: "",
  billing_postcode: "",
  billing_country: "IN",
  shipping_method: "flatrate_flatrate",
  payment: "cashondelivery",
};

function Field({ label, name, value, onChange, type = "text", required = false }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary ml-1">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="input-field shadow-sm"
      />
    </label>
  );
}

export default function CheckoutForm({ hasItems }) {
  const [form, setForm] = useState(initialForm);
  const [countries, setCountries] = useState([]);
  const [shippingStates, setShippingStates] = useState([]);
  const [billingStates, setBillingStates] = useState([]);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const billingMirror = useMemo(() => {
    if (!form.use_for_shipping) return null;
    return {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone: form.phone,
      company_name: form.company_name,
      address1: form.address1,
      city: form.city,
      state: form.state,
      postcode: form.postcode,
      country: form.country,
    };
  }, [form]);

  useEffect(() => {
    let ignore = false;
    async function loadCountries() {
      try {
        const response = await bagistoApi.directory.getCountries();
        const items = Array.isArray(response) ? response : response?.data || response?.countries || [];
        if (!ignore) setCountries(items);
      } catch {
        if (!ignore) setCountries([]);
      }
    }
    loadCountries();
    return () => { ignore = true; };
  }, []);

  useEffect(() => {
    let ignore = false;
    async function loadShippingStates() {
      if (!form.country) {
        setShippingStates([]);
        return;
      }
      try {
        const response = await bagistoApi.directory.getStates(form.country);
        const items = Array.isArray(response) ? response : response?.data || response?.states || [];
        if (!ignore) setShippingStates(items);
      } catch {
        if (!ignore) setShippingStates([]);
      }
    }
    loadShippingStates();
    return () => { ignore = true; };
  }, [form.country]);

  useEffect(() => {
    let ignore = false;
    async function loadBillingStates() {
      const countryCode = form.use_for_shipping ? form.country : form.billing_country;
      if (!countryCode) {
        setBillingStates([]);
        return;
      }
      try {
        const response = await bagistoApi.directory.getStates(countryCode);
        const items = Array.isArray(response) ? response : response?.data || response?.states || [];
        if (!ignore) setBillingStates(items);
      } catch {
        if (!ignore) setBillingStates([]);
      }
    }
    loadBillingStates();
    return () => { ignore = true; };
  }, [form.billing_country, form.country, form.use_for_shipping]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!hasItems) {
      setMessage("Please add items to your bag before proceeding.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    const shippingAddress = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone: form.phone,
      company_name: form.company_name,
      address1: [form.address1],
      city: form.city,
      state: form.state,
      postcode: form.postcode,
      country: form.country,
    };

    const billingAddress = form.use_for_shipping
      ? {
          ...shippingAddress,
          ...billingMirror,
          address1: [billingMirror?.address1 || form.address1],
        }
      : {
          first_name: form.billing_first_name,
          last_name: form.billing_last_name,
          email: form.billing_email,
          phone: form.billing_phone,
          company_name: form.billing_company_name,
          address1: [form.billing_address1],
          city: form.billing_city,
          state: form.billing_state,
          postcode: form.billing_postcode,
          country: form.billing_country,
        };

    try {
      await bagistoApi.checkout.saveAddresses({
        billing: billingAddress,
        shipping: shippingAddress,
      });

      await bagistoApi.checkout.saveShippingMethod({
        shipping_method: form.shipping_method,
      });

      await bagistoApi.checkout.savePaymentMethod({
        payment: { method: form.payment },
      });

      const orderResponse = await bagistoApi.checkout.placeOrder({
        payment: { method: form.payment },
      });

      const orderNumber =
        orderResponse?.data?.order?.increment_id ||
        orderResponse?.order?.increment_id ||
        orderResponse?.increment_id;

      setStatus("success");
      setMessage(
        orderNumber
          ? `Order confirmed. Reference: ${orderNumber}`
          : "Details captured securely for this session."
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        error?.message ||
        "Secure connection interrupted. Please ensure your Bagisto session is active."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-12 lg:gap-16">
      
      {/* 1. Shipping Details */}
      <section className="flex flex-col gap-8 bg-white p-8 md:p-12 border border-border shadow-sm shadow-black/5 rounded-[32px]">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-secondary opacity-50">Step 01</span>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-primary">Shipping Information</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="First Name" name="first_name" value={form.first_name} onChange={handleChange} required />
          <Field label="Last Name" name="last_name" value={form.last_name} onChange={handleChange} required />
          <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
          <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} required />
          <div className="sm:col-span-2">
            <Field label="Address" name="address1" value={form.address1} onChange={handleChange} required />
          </div>
          <Field label="Apartment, suite, etc. (optional)" name="company_name" value={form.company_name} onChange={handleChange} />
          <Field label="City" name="city" value={form.city} onChange={handleChange} required />
          
          <label className="flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary ml-1">Country</span>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="input-field shadow-sm appearance-none bg-white"
            >
              <option value="IN">India</option>
              {countries.map((country) => (
                <option key={country.code || country.id} value={country.code || country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary ml-1">State</span>
            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              className="input-field shadow-sm appearance-none bg-white"
            >
              <option value="">Select state</option>
              {shippingStates.map((state) => (
                <option key={state.code || state.id} value={state.code || state.default_name || state.name}>
                  {state.default_name || state.name}
                </option>
              ))}
            </select>
          </label>

          <Field label="Postal Code" name="postcode" value={form.postcode} onChange={handleChange} required />
        </div>
      </section>

      {/* 2. Billing Details */}
      <section className="flex flex-col gap-8 bg-white p-8 md:p-12 border border-border shadow-sm shadow-black/5 rounded-[32px]">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-secondary opacity-50">Step 02</span>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-primary">Billing Address</h2>
        </div>

        <label className="flex items-center gap-3 cursor-pointer group w-fit">
          <div className={`w-5 h-5 border-2 rounded-sm flex items-center justify-center transition-colors ${form.use_for_shipping ? 'bg-primary border-primary' : 'border-border group-hover:border-primary'}`}>
             {form.use_for_shipping && <div className="w-2.5 h-2.5 bg-white scale-1" />}
          </div>
          <input
            type="checkbox"
            name="use_for_shipping"
            checked={form.use_for_shipping}
            onChange={handleChange}
            className="hidden"
          />
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Same as shipping address</span>
        </label>

        {!form.use_for_shipping && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 pt-8 border-t border-border/40 fade-in">
            <Field label="First Name" name="billing_first_name" value={form.billing_first_name} onChange={handleChange} required={!form.use_for_shipping} />
            <Field label="Last Name" name="billing_last_name" value={form.billing_last_name} onChange={handleChange} required={!form.use_for_shipping} />
            <Field label="Email" name="billing_email" type="email" value={form.billing_email} onChange={handleChange} required={!form.use_for_shipping} />
            <Field label="Phone" name="billing_phone" value={form.billing_phone} onChange={handleChange} required={!form.use_for_shipping} />
            <div className="sm:col-span-2">
              <Field label="Address" name="billing_address1" value={form.billing_address1} onChange={handleChange} required={!form.use_for_shipping} />
            </div>
            <Field label="Apartment, suite, etc." name="billing_company_name" value={form.billing_company_name} onChange={handleChange} />
            <Field label="City" name="billing_city" value={form.billing_city} onChange={handleChange} required={!form.use_for_shipping} />

            <label className="flex flex-col gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary ml-1">Country</span>
              <select name="billing_country" value={form.billing_country} onChange={handleChange} className="input-field shadow-sm appearance-none bg-white">
                <option value="IN">India</option>
                {countries.map((country) => (
                  <option key={`bill-${country.code || country.id}`} value={country.code || country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary ml-1">State</span>
              <select name="billing_state" value={form.billing_state} onChange={handleChange} className="input-field shadow-sm appearance-none bg-white">
                <option value="">Select state</option>
                {billingStates.map((state) => (
                  <option key={`bill-${state.code || state.id}`} value={state.code || state.default_name || state.name}>
                    {state.default_name || state.name}
                  </option>
                ))}
              </select>
            </label>

            <Field label="Postal Code" name="billing_postcode" value={form.billing_postcode} onChange={handleChange} required={!form.use_for_shipping} />
          </div>
        )}
      </section>

      {/* 3. Delivery & Payment */}
      <section className="flex flex-col gap-8 bg-white p-8 md:p-12 border border-border shadow-sm shadow-black/5 rounded-[32px]">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-secondary opacity-50">Step 03</span>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-primary">Delivery & Payment</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary ml-1">Shipping Method</span>
            <div className="flex flex-col gap-3">
              {[
                { id: "flatrate_flatrate", label: "Standard Delivery", desc: "3-5 business days" },
                { id: "freeshipping_freeshipping", label: "Complimentary Express", desc: "1-2 business days (Orders over $500)" }
              ].map((method) => (
                <label key={method.id} className={`flex items-center justify-between p-4 border rounded-none cursor-pointer transition-all ${form.shipping_method === method.id ? 'border-primary bg-primary/5' : 'border-border bg-white hover:border-black/30'}`}>
                  <div className="flex items-center gap-3">
                     <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${form.shipping_method === method.id ? 'border-primary' : 'border-border'}`}>
                        {form.shipping_method === method.id && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                     </div>
                     <span className="text-xs font-bold uppercase tracking-widest text-primary">{method.label}</span>
                  </div>
                  <span className="text-[10px] text-secondary italic opacity-80">{method.desc}</span>
                  <input type="radio" name="shipping_method" value={method.id} checked={form.shipping_method === method.id} onChange={handleChange} className="hidden" />
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary ml-1">Payment Method</span>
            <div className="flex flex-col gap-3">
               {[
                 { id: "moneytransfer", label: "Direct Bank Transfer" },
                 { id: "cashondelivery", label: "Cash on Delivery" }
               ].map((method) => (
                 <label key={method.id} className={`flex items-center p-4 border rounded-none cursor-pointer transition-all ${form.payment === method.id ? 'border-primary bg-primary/5' : 'border-border bg-white hover:border-black/30'}`}>
                   <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${form.payment === method.id ? 'border-primary' : 'border-border'}`}>
                         {form.payment === method.id && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">{method.label}</span>
                   </div>
                   <input type="radio" name="payment" value={method.id} checked={form.payment === method.id} onChange={handleChange} className="hidden" />
                 </label>
               ))}
            </div>
          </div>
        </div>
      </section>

      {message && (
        <div className={`p-4 border text-[11px] font-black uppercase tracking-widest ${status === 'error' ? 'border-error/20 bg-error/5 text-error' : 'border-primary/20 bg-primary/5 text-primary'}`}>
          {message}
        </div>
      )}

      {/* Submit Action */}
      <div className="flex flex-col items-center gap-6 mt-4">
        <Button 
          type="submit" 
          variant="primary" 
          className="w-full h-16 shadow-2xl shadow-black/10"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Processing..." : "Complete Purchase"}
        </Button>
      </div>
    </form>
  );
}
