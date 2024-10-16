import { React, useEffect } from "react";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
  WrapperGG,
  WrapperFB,
} from "./style";
import InputForm from "../../Components/InputForm/InputForm";
import ButtonComponent from "../../Components/ButtonComponent/ButtonComponent";
import { Image } from "antd";
import imageLogo from "../../assests/images/logo-login.png";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from "../../service/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../Components/LoadingComponent/Loading";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slide/userSlide";
import * as messages from "../../Components/Message/Message";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "@react-oauth/google";

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const [isFbLogin, setIsFbLogin] = useState(false);
  // const user = useSelector((state) => state.user)

  const navigate = useNavigate();
  const mutation = useMutationHooks((data) => UserService.loginUser(data));

  const { data, isPending, isSuccess } = mutation;
  useEffect(() => {
    if (isSuccess) {
      if (location?.state) {
        navigate(location?.state);
      } else if (data.message === "the email is not defined") {
        messages.error("email không tồn tại");
      } else if (data.message === "the password is incorrect") {
        messages.error("password không đúng");
      } else {
        navigate("/");
      }
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(data?.refresh_token)
      );
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailUser(decoded?.id, data?.access_token);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handleGetDetailUser = async (id, token) => {
    const storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);
    const res = await UserService.getDetailUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
  };

  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  const handleSignIn = () => {
    if (!isGoogleLogin & !isFbLogin) {
      mutation.mutate({
        email,
        password,
      });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSignIn();
    }
  };
  const handleSuccess = async (credentialResponse) => {
    setIsGoogleLogin(true);
    try {
      const data = await UserService.ggLogin({
        token: credentialResponse.credential,
      });
      if (data.status === "OK") {
        // Xử lý sau khi đăng nhập thành công
        navigate("/");
        localStorage.setItem(
          "access_token",
          JSON.stringify(data?.access_token)
        );
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(data?.refresh_token)
        );
        if (data?.access_token) {
          const decoded = jwtDecode(data?.access_token);
          if (decoded?.id) {
            handleGetDetailUser(decoded?.id, data?.access_token);
          }
        }
      }
    } catch (e) {
      return e;
    }
  };
  const handleError = () => {
    messages.error("Đăng nhập thất bại");
  };

  const handleClickFb = (data) => {};

  const handleResponseFb = async (data) => {
    try {
      setIsFbLogin(true);
      const result = await UserService.fbLogin({
        name: data.name,
        email: data.email,
        avatar: data.picture.data.url,
      });
      if (result.status === "OK") {
        // Xử lý sau khi đăng nhập thành công
        navigate("/");
        localStorage.setItem(
          "access_token",
          JSON.stringify(result?.access_token)
        );
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(result?.refresh_token)
        );
        if (result?.access_token) {
          const decoded = jwtDecode(result?.access_token);
          if (decoded?.id) {
            handleGetDetailUser(decoded?.id, result?.access_token);
          }
        }
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.53)",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "445px",
          borderRadius: "6px",
          background: "#fff",
          display: "flex",
        }}
      >
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập và tạo tài khoản</p>
          <InputForm
            style={{ marginBottom: "10px" }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={handleOnchangeEmail}
            onKeyPress={handleKeyPress}
          />
          <div style={{ position: "relative" }}>
            <span
              onClick={() => {
                setIsShowPassword(!isShowPassword);
              }}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnchangePassword}
              onKeyPress={handleKeyPress}
            />
          </div>
          {data?.status === "ERR" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          <Loading isLoading={isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
              size={40}
              styleButton={{
                background: "rgb(255, 57, 69)",
                height: "48px",
                width: "100%",
                border: "none",
                borderRadius: "4px",
                margin: "26px 0 10px",
              }}
              textButton={"Đăng nhập"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </Loading>
          <p>
            <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
          </p>
          <p style={{ margin: 0 }}>
            Chưa có tài khoản?{" "}
            <WrapperTextLight
              onClick={handleNavigateSignUp}
              style={{ cursor: "pointer" }}
            >
              Tạo tài khoản
            </WrapperTextLight>
          </p>
          <WrapperGG>
            <GoogleLogin
              maxCount={1}
              onSuccess={handleSuccess}
              onError={handleError}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <img
                    src="/path/to/google-icon.svg"
                    alt="Google Icon"
                    className="google-icon"
                  />
                  Đăng Nhập với Google
                </button>
              )}
            />
          </WrapperGG>
          <div>
            <FacebookLogin
              appId={process.env.REACT_APP_FB_ID}
              autoLoad={false}
              fields="name,email,picture"
              callback={handleResponseFb}
              textButton="Đăng nhập với Facebook"
              cssClass="my-facebook-button"
            />

            <style jsx>{`
              .my-facebook-button {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                padding: 10px;
                margin-top: 10px;
                border: none;
                border-radius: 5px;
                background-color: #4267b2; /* Facebook Blue */
                color: white;
                font-weight: bold;
                cursor: pointer;
                transition: background-color 0.3s;
              }
              .my-facebook-button:hover {
                background-color: #365e9a; /* Màu khi hover */
              }
            `}</style>
          </div>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image
            src={imageLogo}
            alt={"imageLogo"}
            preview={false}
            height="203"
            width="203"
          />
          <h4>Mua sắm tại Shop Gnad</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;
