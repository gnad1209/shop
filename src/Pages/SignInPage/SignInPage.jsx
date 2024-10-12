import { React, useEffect } from "react";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
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
import { GoogleLogin } from "@react-oauth/google";
import * as messages from "../../Components/Message/Message";

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  // const user = useSelector((state) => state.user)

  const navigate = useNavigate();
  const mutation = useMutationHooks((data) => UserService.loginUser(data));

  const { data, isPending, isSuccess } = mutation;
  useEffect(() => {
    if (isSuccess) {
      if (location?.state) {
        navigate(location?.state);
      } else if (data.message === "The input is email") {
        messages.error("Không tìm thấy tài khoản");
      } else if (data.message === "the password is incorrect") {
        messages.error("Mật khẩu không chính xác");
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
    if (!isGoogleLogin) {
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
          <GoogleLogin
            class=""
            maxCount={1}
            onSuccess={handleSuccess}
            onError={handleError}
          />
          <br />
          <a href="/auth/facebook" class="btn btn-primary">
            <span class="fa fa-facebook"></span> SignIn with Facebook
          </a>
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
