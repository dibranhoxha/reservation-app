import {
  useQuery,
  useMutation,
  MutateOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

interface PutData {
  id: string;
  data: object;
}

const usePromiseGetAll = (
  name: string,
  url: string,
  config?: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    "queryFn" | "queryKey"
  >
) => {
  const query = useQuery(
    [name],
    async () => {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const parsedRes = await response.json();

      if (!response.ok) {
        throw new Error(parsedRes?.message);
      }
      return parsedRes;
    },
    config
  );

  return query;
};

const usePromiseGetById = (
  names: string[],
  url: string,

  config?: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    "initialData" | "queryFn" | "queryKey"
  >
) => {
  const [name, id] = names;

  const query = useQuery(
    [name],
    async () => {
      const response = await fetch(`${url}/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const parsedRes = await response.json();

      if (!response.ok) {
        throw new Error(parsedRes?.message);
      }
      return parsedRes;
    },
    config
  );
  return query;
};

const usePromisePost = (url: string, config?: MutateOptions) => {
  const mutation = useMutation(async (data) => {
    const response = fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const parsedRes = await (await response).json();

    if (!(await response).ok) {
      throw new Error(parsedRes?.message);
    }
    return parsedRes;
  }, config);

  return mutation;
};

const usePromisePut = (url: string, config?: MutateOptions) => {
  const mutation = useMutation(async (mutationData) => {
    const { id, data } = mutationData as unknown as PutData;
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const parsedRes = await response.json();

    if (!response.ok) {
      throw new Error(parsedRes?.message);
    }
    return parsedRes;
  }, config);

  return mutation;
};

const usePromiseDelete = (url: string, config?: MutateOptions) => {
  const mutation = useMutation(async (id) => {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const parsedRes = await response.json();

    if (!response.ok) {
      throw new Error(parsedRes?.message);
    }
    return parsedRes;
  }, config);

  return mutation;
};

export {
  usePromiseGetAll,
  usePromiseGetById,
  usePromisePost,
  usePromisePut,
  usePromiseDelete,
};
