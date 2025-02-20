import axios from "axios";
export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/sign-in`,
    data
  );
  return res.data;
};

export const signUpUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/sign-up`,
    data
  );
  return res.data;
};

export const getDetailUser = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/user/get-detail/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const refreshToken = async (refreshToken) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/user/refresh-token`,
    {},
    {
      headers: {
        token: `Bearer ${refreshToken}`,
      },
    }
  );
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`);
  return res.data;
};

export const updateUser = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/user/update-user/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
        "Content-Type": `multipart/form-data`,
      },
    }
  );
  return res.data;
};

export const getAllUser = async (access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/user/getAll`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteUser = async (id, access_token, data) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/user/soft-delete-user/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteManyUser = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/user/delete-many`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getFollower = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/user/get-follower/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getUserInMessage = async (id, filter) => {
  let res = {};
  if (filter) {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/get-user-message/${id}?name=${filter}`
    );
  } else {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/get-user-message/${id}`
    );
  }
  return res.data;
};

export const ggLogin = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/gg-login`,
    data
  );
  return res.data;
};

export const fbLogin = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/fb-login`,
    data
  );
  return res.data;
};
