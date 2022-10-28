import R from 'assets';
import { useFormik } from 'formik';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { PROTECTED_ROUTES_PATH } from 'routes/RoutesPath';
import Button from 'shared/components/Button/Button';
import { Input, InputPassword } from 'shared/components/Input';
import { ContainerAuth } from 'shared/container/ContainerAuth';
import { Head } from 'shared/container/Head';
import { CliCookieService, CLI_COOKIE_KEYS } from 'shared/services/cli-cookie';
import * as Yup from 'yup';
import { requestLogin } from '../../../shared/api/auth.api';
export const Login = () => {
  const navigate: NavigateFunction = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().max(55, 'Maximum 55 characters').required('Required!'),
      password: Yup.string().min(6, 'Minimum 6 characters').required('Required!')
    }),

    onSubmit: async (values) => {
      try {
        const res = await requestLogin({
          identifier: values.email,
          password: values.password
        });

        CliCookieService.set(CLI_COOKIE_KEYS.ACCESS_TOKEN, res.data.accessToken?.replace(/"/g, ''));
        CliCookieService.set(
          CLI_COOKIE_KEYS.REFRESH_TOKEN,
          res.data.refreshToken?.replace(/"/g, '')
        );
        navigate(PROTECTED_ROUTES_PATH.HOME);
      } catch (error) {
        console.error('Exception ' + error);
      }
    }
  });
  return (
    <div>
      <Head title="Welcome to login" />
      <ContainerAuth>
        <div className="w-full h-screen flex justify-center ">
          <div className="mx-auto my-auto">
            <div className="w-[420px] p-10 bg-white rounded-2xl shadow">
              <div className="flex justify-center">
                <img src={R.images.logo_TL} alt="logo" />
              </div>
              <div className="flex flex-col items-center text-sky-500">
                <div className="text-center py-4 font-bold text-2xl italic">
                  Trường Đại Học Thủy Lợi
                </div>
                <span className="font-semibold text-lg">
                  Trang tin tức khoa Công nghệ thông tin
                </span>
              </div>
              <div className="mt-4">
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <div className="mt-2">
                      <div className="mb-1 text-medium-grey font-medium">
                        Email hoặc số điện thoại
                      </div>
                      <Input
                        placeholder="Enter email address"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                      <div className="text-red-500 mt-1">
                        {formik.errors.email && formik.touched.email && (
                          <p>{formik.errors.email}</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 ">
                      <div className="mb-1 text-medium-grey font-medium">Mật khẩu</div>
                      <InputPassword
                        placeholder="Enter password"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      <div className="text-red-500 mt-1">
                        {formik.errors.password && formik.touched.password && (
                          <p>{formik.errors.password}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-center p-4 ">
                    <span className="italic text-primary-color cursor-pointer hover:underline">
                      Quên mật khẩu
                    </span>
                  </div>
                  <div>
                    <Button
                      className="w-full p-4 bg-primary-color"
                      htmlType="submit"
                      style={{ width: '100%' }}>
                      Đăng nhập
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </ContainerAuth>
    </div>
  );
};
