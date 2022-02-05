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

  return API.get(`/board/getBoard/${boardId}`, {
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

export const addCard = (title: string, board_id: string, column_id: string) => {
  const token = getToken();

  return API.post(
    "/board/createCard",
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

  return API.get(`/board/getCards?boardId=${boardId}`, {
    headers: {
      bearer_token: token,
    },
  });
};

export const getCard = async (cardId: string) => {
  const token = getToken();

  return API.get(`/board/getCard/${cardId}`, {
    headers: {
      bearer_token: token,
    },
  });
};

export const changeCardTitle = async (cardId: string, title: string) => {
  const token = getToken();

  return API.put(
    "/board/changeCardTitle",
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

  return API.put(
    "/board/changeCardLabel",
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
  return API.put(
    "/board/changeCardDescription",
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

  return API.put(
    "/board/updateDate",
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

  return API.put(
    "/board/saveColumnsOrder",
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

  return API.put(
    "/board/saveCardsOrderSameColumn",
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

  return API.put(
    "/board/saveCardsOrderDifferentColumn",
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
