import { QueryClient } from "@tanstack/react-query";
import { authStore } from "../stores/authStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const [url, options = {}] = queryKey as [string, RequestInit?]; // options set as obj and if undefined  set to empty obj --> allow ...
        const { token } = authStore.getState(); //to directly access state from vanilla createStore

        const response = await fetch(`http://localhost:5000${url}`, {
          ...options,
          headers: {
            ...options?.headers,
            Authorization: token ? `Bearer ${token}` : "",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      },
    },
  },
});

export default queryClient;
