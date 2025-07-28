import { Layout } from "@/components/layout";
import { useAuth } from "@/hooks/useAuth";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { User } from "@/types/user";
// import { InputType } from "@/components/ui/input";
// import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
// import { ErrorResponseAPI } from "@/types/response-api";
// import { AxiosError } from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

enum RoleList {
  level_1 = "level_1",
  level_2 = "level_2",
  level_3 = "level_3",
  level_4 = "level_4",
  level_5 = "level_5",
  admin = "Admin",
}

type Role = {
  id: string;
  role: RoleList;
};

function Dashboard() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { authData } = useAuth();
  const [level, setLevel] = useState(1);

  const { data: dataRole } = useQuery({
    queryKey: ["role"],
    queryFn: useCallback(async () => {
      const { data } = await axiosPrivate.get("/role");
      return data as Role[];
    }, [axiosPrivate]),
  });

  const { data: dataUsers } = useQuery({
    queryKey: ["users"],
    queryFn: useCallback(async () => {
      const { data } = await axiosPrivate.get("/user");
      return data as User[];
    }, [axiosPrivate]),
  });

  const { mutate: mutateCreate, isPending: isPendingCreate } = useMutation({
    mutationFn: async (data: { roleId: number; userId?: number }) =>
      await axiosPrivate.post("/role/assign", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      alert("Berhasil pilih role");
    },
  });

  useEffect(() => {
    if (authData.user.roles) {
      setLevel(authData.user.roles.length);
    }
  }, [authData.user.roles]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const role = formData.get("role");
    const userId = formData.get("userId");
    if (userId) {
      mutateCreate({ roleId: Number(role), userId: Number(userId) });
    } else {
      mutateCreate({ roleId: Number(role) });
    }
  };

  type MenuFirst = "level1" | "level2" | "level3" | "level4" | "level5";
  const [openMenuFirst, setOpenMenuFirst] = useState<
    Record<MenuFirst, boolean>
  >({
    level1: false,
    level2: false,
    level3: false,
    level4: false,
    level5: false,
  });

  type MenuSecond = "level2_1" | "level2_2" | "level2_3";
  const [openMenuSecond, setOpenMenuSecond] = useState<
    Record<MenuSecond, boolean>
  >({
    level2_1: false,
    level2_2: false,
    level2_3: false,
  });

  type MenuThird = "level3_1" | "level3_2" | "level3_3";
  const [openMenuThird, setOpenMenuThird] = useState<
    Record<MenuThird, boolean>
  >({
    level3_1: false,
    level3_2: false,
    level3_3: false,
  });

  return (
    <Layout pageScroll={false} className="">
      {authData?.user?.roles!.length > 0 ? (
        <div>
          <h1 className="text-center text-2xl font-semibold">
            Selamat datang, {authData.user.name}!
          </h1>
          <p className="text-center text-lg">
            Role Anda:{" "}
            {Array.isArray(authData.user.roles)
              ? authData.user.roles.join(", ")
              : authData.user.roles}
          </p>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-[350px] pb-5 pt-14">
          <form
            onSubmit={onSubmit}
            className="relative flex w-full flex-col items-center gap-1.5 rounded-lg border-2 border-blue-400 bg-gradient-to-br from-blue-300 via-cyan-300 to-sky-300 pb-6 pt-4"
          >
            <>
              <label htmlFor="role">
                Role Anda belum tersedia. Silahkan pilih role!
              </label>
              <select name="role" id="role">
                {dataRole?.map((role: Role) => (
                  <option key={role.id} value={role.id}>
                    {role.role}
                  </option>
                ))}
              </select>
              <div className="pt-5">
                <button
                  type="submit"
                  className="rounded-lg bg-sky-400 px-8 py-1.5"
                >
                  {isPendingCreate ? (
                    <span className="block size-4 animate-spin rounded-full border-b-2 border-t-2" />
                  ) : (
                    "Pilih Role"
                  )}
                </button>
              </div>
            </>
          </form>
        </div>
      )}

      {authData?.user.roles?.includes(RoleList.admin) && (
        <div className="mx-auto w-full max-w-[900px] py-10">
          <p className="text-center text-lg">
            Anda memiliki akses penuh sebagai Admin.
          </p>
          <div>
            <h2 className="text-center text-xl font-semibold">
              Daftar Pengguna
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Nama
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Roles
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Assign Role
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {dataUsers?.map((user: User) => (
                    <tr key={user.id}>
                      <td className="whitespace-nowrap px-6 py-4">{user.id}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {user.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {user.roles?.join(", ") || "-"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <form onSubmit={onSubmit}>
                          <select name="role" id="role">
                            {dataRole?.map((role: Role) => (
                              <option key={role.id} value={role.id}>
                                {role.role}
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            name="userId"
                            value={user.id}
                            className="hidden"
                          />
                          <button
                            type="submit"
                            className="ml-2 rounded-lg bg-blue-400 px-4 py-1 text-white"
                          >
                            {isPendingCreate ? (
                              <span className="block size-4 animate-spin rounded-full border-b-2 border-t-2" />
                            ) : (
                              "Assign"
                            )}
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto w-72 py-10">
        <div>
          <h1>Menu</h1>
          <ul className="space-y-1">
            {Array.from({ length: 5 }, (_, i) => {
              // Map number to LevelKey
              const levelKeys: MenuFirst[] = [
                "level1",
                "level2",
                "level3",
                "level4",
                "level5",
              ];
              const key = levelKeys[i];
              return (
                <li key={i}>
                  <p
                    onClick={() => {
                      if (
                        level >= i + 1 ||
                        authData?.user?.roles!.includes(RoleList.admin)
                      ) {
                        setOpenMenuFirst({
                          ...openMenuFirst,
                          [key]: !openMenuFirst[key],
                        });
                      } else {
                        alert("Anda belum memiliki akses ke level ini.");
                      }
                    }}
                    className="cursor-pointer text-blue-400 hover:underline"
                  >
                    Level {i + 1} Menu +
                  </p>
                  <div
                    className={`ml-5 ${openMenuFirst[key] ? "block" : "hidden"}`}
                  >
                    {level > 0 &&
                      Array.from({ length: 2 }, (_, j) => (
                        <>
                          <p
                            key={j}
                            onClick={() => {
                              if (
                                level >= i + 1 ||
                                authData?.user?.roles!.includes(RoleList.admin)
                              ) {
                                const subMenuKey = `level${i + 1}_${
                                  j + 1
                                }` as MenuSecond;
                                setOpenMenuSecond({
                                  ...openMenuSecond,
                                  [subMenuKey]: !openMenuSecond[subMenuKey],
                                });
                              } else {
                                alert(
                                  "Anda belum memiliki akses ke level ini.",
                                );
                              }
                            }}
                            className="cursor-pointer text-blue-400 hover:underline"
                          >
                            Menu {i + 1}.{j + 1}
                          </p>
                          <div
                            className={`ml-5 ${
                              openMenuSecond[
                                `level${i + 1}_${j + 1}` as MenuSecond
                              ]
                                ? "block"
                                : "hidden"
                            }`}
                          >
                            {Array.from({ length: 2 }, (_, k) => (
                              <>
                                <p
                                  key={k}
                                  onClick={() => {
                                    if (
                                      level >= i + 1 ||
                                      authData?.user?.roles!.includes(
                                        RoleList.admin,
                                      )
                                    ) {
                                      const subMenuKey =
                                        `level${i + 1}_${j + 1}_${k + 1}` as MenuThird;
                                      setOpenMenuThird({
                                        ...openMenuThird,
                                        [subMenuKey]:
                                          !openMenuThird[subMenuKey],
                                      });
                                    } else {
                                      alert(
                                        "Anda belum memiliki akses ke level ini.",
                                      );
                                    }
                                  }}
                                  className="cursor-pointer text-blue-400 hover:underline"
                                >
                                  Menu {i + 1}.{j + 1}.{k + 1}
                                </p>
                                <div
                                  className={`ml-5 ${
                                    openMenuThird[
                                      `level${i + 1}_${j + 1}_${k + 1}` as MenuThird
                                    ]
                                      ? "block"
                                      : "hidden"
                                  }`}
                                >
                                  {Array.from(
                                    {
                                      length: 2,
                                    },
                                    (_, l) => (
                                      <p
                                        key={l}
                                        className="cursor-pointer text-blue-400 hover:underline"
                                      >
                                        Menu {i + 1}.{j + 1}.{k + 1}.{l + 1}
                                      </p>
                                    ),
                                  )}
                                </div>
                              </>
                            ))}
                          </div>
                        </>
                      ))}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

// const input: InputType[] = [
//   {
//     inputFor: "image",
//     type: "file",
//     placeholder: "Image",
//     multiple: false,
//     size: 46670.4,
//   },
//   {
//     inputFor: "name",
//     type: "text",
//     placeholder: "Name",
//     required: true,
//   },
//   {
//     inputFor: "phone",
//     type: "text",
//     placeholder: "Phone",
//     required: true,
//   },
//   {
//     inputFor: "position",
//     type: "text",
//     placeholder: "Position",
//     required: true,
//   },
// ];

export default Dashboard;
// needs to be updated, adopt a modular style
