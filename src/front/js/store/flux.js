const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      admin: false,
      token: null,
      message: null,
      artists: [],
      news: [],
      next_page: [],
      productsArray: [
        {
          id: "1",
          title: "Volta Ticket",
          price: 59.99,
        },
        {
          id: "2",
          title: "Nile Ticket",
          price: 119.99,
        },
        {
          id: "3",
          title: "Congo Ticket",
          price: 199.99,
        },
      ],
    },
    actions: {
      login: async (email, password) => {
        const options = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/login",
            options
          );
          console.log(process.env.BACKEND_URL);

          if (resp.status === 200) {
            const data = await resp.json();
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("admin", data.admin);
            setStore({ token: data.access_token });
            setStore({ admin: data.admin });
            return true;
          } else {
            alert("An error ocurred");
            return false;
          }
        } catch (error) {
          console.log("There has been an error");
        }
      },

      userSignup: async (email, password) => {
        const opts = {
          method: "POST",

          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            is_active: true,
          }),
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/signup",
            opts
          );
          if (resp.status !== 200) {
            alert("An error ocurred");
            return false;
          }
          const data = await resp.json();
          return true;
        } catch (error) {
          console.log("There has been an error", error);
        }
      },

      adminValidation: async () => {
        const store = getStore();
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        };
        try {
          const res = await fetch(
            process.env.BACKEND_URL + "/api/admin/news",
            requestOptions
          );
          const data = await res.json();
          setStore({ admin: true });
          return data;
        } catch (error) {
          console.log(error);
        }
      },

      userValidation: async () => {
        const store = getStore();
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        };
        try {
          const res = await fetch(
            process.env.BACKEND_URL + "/api/user/tickets",
            requestOptions
          );
          const data = await res.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },

      UserLogout: () => {
        localStorage.removeItem("token");
        setStore({ token: null, logged: false });
      },

      syncToken: () => {
        const token = localStorage.getItem("token");
        const admin = localStorage.getItem("admin");
        token && token != "" && token != undefined && setStore({ token });
        admin && admin != "" && admin != undefined && setStore({ admin });
      },

      insertArtists: (data) => {
        setStore({
          artists: getStore().artists.concat(data.results),
          next_page: data.next,
        });
      },
      inserttNews: (data) => {
        setStore({
          news: getStore().news.concat(data.results),
          next_page: data.next,
        });
      },
    },
  };
};

export default getState;
