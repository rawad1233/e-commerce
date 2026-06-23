import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectCartTotal, clearCart } from '@/features/cart/cartSlice';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useState } from 'react';

const Checkout = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const total = useAppSelector(selectCartTotal);
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
      phone: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      address: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      postalCode: Yup.string().required('Required'),
      phone: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      // Send `values` + cart items to your real order endpoint here
      dispatch(clearCart());
      setSubmitted(true);
    },
  });

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-6 py-32 text-center">
        <p className="text-sm">{t('checkout.orderSuccess')}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl font-bold mb-10">{t('checkout.title')}</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <Input label={t('checkout.fullName')} name="fullName" formik={formik} />
        <Input label={t('checkout.email')} name="email" type="email" formik={formik} />
        <Input label={t('checkout.address')} name="address" formik={formik} />
        <div className="grid grid-cols-2 gap-5">
          <Input label={t('checkout.city')} name="city" formik={formik} />
          <Input label={t('checkout.postalCode')} name="postalCode" formik={formik} />
        </div>
        <Input label={t('checkout.phone')} name="phone" formik={formik} />

        <div className="flex items-center justify-between pt-4 border-t border-line">
          <p className="text-sm uppercase tracking-widest">{t('cart.subtotal')}</p>
          <p className="text-xl font-medium">${total.toFixed(2)}</p>
        </div>

        <Button type="submit" className="w-full">{t('checkout.placeOrder')}</Button>
      </form>
    </div>
  );
};

export default Checkout;