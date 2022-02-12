import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000",
// });

const baseUrl = "https://trello-clone-project.herokuapp.com";
// const baseUrl = "http://localhost:5000";

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

  // return API.get("/user/auth", {
  return axios.get(baseUrl + "/user/auth", {
    headers: {
      bearer_token: token,
    },
  });
};

export const signUp = (formData: SignupForm) => {
  // return API.post("/user/signup", formData);
  return axios.post(baseUrl + "/user/signup", formData);
};

export const login = (formData: LoginForm) => {
  // return API.post("/user/signin", formData);
  return axios.post(baseUrl + "/user/signin", formData);
};

export const createBoard = (title: String) => {
  const token = getToken();

  return axios.post(
    baseUrl + "/board/createBoard",
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

  return axios.get(baseUrl + "/board/getBoards", {
    headers: {
      bearer_token: token,
    },
  });
};

export const getBoard = (boardId: string) => {
  const token = getToken();

  return axios.get(baseUrl + `/board/getBoard/${boardId}`, {
    headers: {
      bearer_token: token,
    },
  });
};

export const addColumn = (boardId: string, columnId: string, title: string) => {
  const token = getToken();

  return axios.put(
    baseUrl + "/board/addColumn",
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

export const addCard = (title: string, board_id: string, column_id: string) => {
  const token = getToken();

  return axios.post(
    baseUrl + "/board/createCard",
    { title, board_id, column_id },
    {
      headers: {
        bearer_token: token,
      },
    }
  );
};

export const getCardsTitle = async (boardId: string) => {
  const token = getToken();

  return axios.get(baseUrl + `/board/getCards?boardId=${boardId}`, {
    headers: {
      bearer_token: token,
    },
  });
};

export const getCard = async (cardId: string) => {
  const token = getToken();

  return axios.get(baseUrl + `/board/getCard/${cardId}`, {
    headers: {
      bearer_token: token,
    },
  });
};

export const changeCardTitle = async (cardId: string, title: string) => {
  const token = getToken();

  return axios.put(
    baseUrl + "/board/changeCardTitle",
    {
      cardId,
      title,
    },
    {
      headers: {
        bearer_token: token,
      },
    }
  );
};

export const changeCardLabel = async (cardId: string, label: string) => {
  const token = getToken();

  return axios.put(
    baseUrl + "/board/changeCardLabel",
    {
      cardId,
      label,
    },
    {
      headers: {
        bearer_token: token,
      },
    }
  );
};

export const changeCardDescription = async (
  cardId: string,
  description: string
) => {
  const token = getToken();
  return axios.put(
    baseUrl + "/board/changeCardDescription",
    {
      cardId,
      description,
    },
    {
      headers: {
        bearer_token: token,
      },
    }
  );
};

export const updateDate = async (boardId: string) => {
  const token = getToken();

  return axios.put(
    baseUrl + "/board/updateDate",
    {
      boardId,
      newDate: new Date(),
    },
    {
      headers: {
        bearer_token: token,
      },
    }
  );
};

export const saveColumnsOrder = async (
  boardId: string,
  startIndex: number,
  finishIndex: number,
  columnId: string
) => {
  const token = getToken();

  return axios.put(
    baseUrl + "/board/saveColumnsOrder",
    {
      boardId,
      startIndex,
      finishIndex,
      columnId,
      newDate: new Date(),
    },
    {
      headers: {
        bearer_token: token,
      },
    }
  );
};

export const saveCardsOrderSameColumn = async (
  boardId: string,
  startIndex: number,
  finishIndex: number,
  columnId: string,
  cardId: string
) => {
  const token = getToken();

  return axios.put(
    baseUrl + "/board/saveCardsOrderSameColumn",
    {
      boardId,
      startIndex,
      finishIndex,
      columnId,
      cardId,
      newDate: new Date(),
    },
    {
      headers: {
        bearer_token: token,
      },
    }
  );
};

export const saveCardsOrderDifferentColumn = async (
  boardId: string,
  startIndex: number,
  finishIndex: number,
  startColumnId: string,
  finishColumnId: string,
  cardId: string
) => {
  const token = getToken();

  return axios.put(
    baseUrl + "/board/saveCardsOrderDifferentColumn",
    {
      boardId,
      startIndex,
      finishIndex,
      startColumnId,
      finishColumnId,
      cardId,
      newDate: new Date(),
    },
    {
      headers: {
        bearer_token: token,
      },
    }
  );
};

export const changeBoardTitle = async (boardId: string, title: string) => {
  const token = getToken();

  return axios.put(
    baseUrl + "/board/changeBoardTitle",
    {
      boardId,
      title,
    },
    {
      headers: {
        bearer_token: token,
      },
    }
  );
};

export const changeColumnTitle = async (
  boardId: string,
  columnId: string,
  title: string
) => {
  const token = getToken();

  return axios.put(
    baseUrl + "/board/changeColumnTitle",
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

export const deleteCard = async (cardId: string) => {
  const token = getToken();

  return axios.delete(baseUrl + "/board/deleteCard", {
    headers: {
      bearer_token: token,
    },
    data: { cardId, newDate: new Date() },
  });
};

export const deleteBoard = async (boardId: string) => {
  const token = getToken();

  return axios.delete(baseUrl + "/board/deleteBoard", {
    headers: {
      bearer_token: token,
    },
    data: { boardId },
  });
};

export const deleteColumn = async (boardId: string, columnId: string) => {
  const token = getToken();

  return axios.delete(baseUrl + "/board/deleteColumn", {
    headers: {
      bearer_token: token,
    },
    data: { columnId, boardId },
  });
};
