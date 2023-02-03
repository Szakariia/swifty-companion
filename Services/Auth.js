import axios from "axios";

// POST : Token

const Auth_url = "https://api.intra.42.fr/oauth/token/";
const postAuth = async () => {
  try {
    const response = await axios.post(Auth_url, {
      grant_type: "client_credentials",
      client_id:
        "73b5ab5366744de81f1f97f40049b47f231864f49422222b49e7ef75129983da",
      client_secret:
        "ba9b0e82a6af8e78d91fc8dfbcd81ca6927f53d32d01e076c577560052064a02",
    });
    return response.data;
  } catch (error) {
    console.log("Data fetching cancelled");
  }
};

// Storage data

const storeData = async () => {
  const Auth = await postAuth();
  try {
    await AsyncStorage.setItem("auth", JSON.stringify(Auth));
    return Auth;
  } catch (error) {
    // Error saving data
    return null;
  }
};

// Retrieve data

const retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem("auth");
    let parsed = JSON.parse(value);
    if (parsed !== null) return parsed;
  } catch (error) {
    // Error retrieving data
  }
};

// Auth : Check expired Date
// case 1 - Auth expired
// case 2 - never stored befor

export const authExpiredChecker = async () => {
  const userAuth = await retrieveData();
  const toDayTime = Math.abs(new Date().getTime() / 1000);
  if (!userAuth) userAuth = await storeData();
  else if (userAuth && toDayTime >= userAuth.created_at + userAuth.expires_in)
    userAuth = await storeData();
  return userAuth;
};
