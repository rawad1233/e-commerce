import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import axiosClient from '@/api/axiosClient';
const push = "" ;
const Login = () => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
  email: Yup.string().required('Required'),
  password: Yup.string().min(6, 'Min 6 characters').required('Required'),
}),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        // DummyJSON auth endpoint as a placeholder — swap with your real auth API
        const data = await axiosClient.post('/auth/login', {
          username: values.email,
          password: values.password,
        });
        localStorage.setItem('auth_token', data.accessToken || data.token);
      } catch (err) {
        setStatus(err.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto px-6 py-24">
      <h1 className="font-display text-3xl font-bold mb-10 text-center">{t('auth.loginTitle')}</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <Input label={t('auth.email')} name="email" type="email" formik={formik} />
        <Input label={t('auth.password')} name="password" type="password" formik={formik} />
        {formik.status && <p className="text-xs text-red-500">{formik.status}</p>}
        <Button type="submit" disabled={formik.isSubmitting} className="w-full">
          {t('auth.loginButton')}
        </Button>
      </form>
    </div>
  );
};

export default Login;