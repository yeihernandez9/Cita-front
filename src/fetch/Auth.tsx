interface SignInData {
  username: string;
  password: string;
}

interface SignInResponse {
  statusCode: number;
  data?: Record<string, unknown>;
  token?: string;
}

export const SignIn = async (url: string, data: SignInData): Promise<SignInResponse | null> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData: SignInResponse = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error posting data:", error);
    return null;
  }
};

export interface SignUpData {
  username: string;
  password: string;
  role: string;
}

export interface SignUpResponse {
  user: {
    id: string;
    username: string;
    role: string;
  };
  statusCode: number;
}

export const SignUp = async (url: string, data: SignUpData): Promise<SignInResponse | null> => {
  console.log(data)
  try {
    const requestData = {
      username: data.username,
      password: data.password,
      roles: [data.role],
    };
    console.log(requestData)
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const responseData: SignUpResponse = await response.json();
    console.log(responseData)
    return responseData;
  } catch (error) {
    console.error("Error posting data:", error);
    return null;
  }
};