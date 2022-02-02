import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

interface SignupForm {
  name: string;
  email: string;
  password: string;
}

interface LoginForm {
  email: string;
  password: string;
}

const getToken = () => {
  const profile = localStorage.getItem("trello_clone_token");

  if (!profile) return "";

  const user = JSON.parse(profile);
  if (!user.token) {
    return "";
  }

  return user.token;
};

export const loadUser = () => {
  const token = getToken();

  return API.get("/user/auth", {
    headers: {
      bearer_token: token,
    },
  });
};

export const signUp = (formData: SignupForm) => {
  return API.post("/user/signup", formData);
};

export const login = (formData: LoginForm) => {
  return API.post("/user/signin", formData);
};

export const createBoard = (title: String) => {
  const token = getToken();

  return API.post(
    "/board/createBoard",
    { title },
    {
      headers: {
        bearer_token: token,
      },
    }
  );
};

export const getBoards = () => {
  const token = getToken();

  return API.get("/board/getBoards", {
    headers: {
      bearer_token: token,
    },
  });
};

export const getBoard = (boardId: string) => {
  const token = getToken();

  return API.get(`/board/${boardId}`, {
    headers: {
      bearer_token: token,
    },
  });
};

export const addColumn = (boardId: string, columnId: string, title: string) => {
  const token = getToken();

  return API.put(
    "/board/addColumn",
    {
      boardId,
      columnId,
      title,
    },
    {
      headers: {
        bearer_token: token,
      },
    }
  );
};
